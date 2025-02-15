'use client'

import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

export interface Day {
  day: string // Дата в формате ISO (YYYY-MM-DD)
  isComplite: boolean | string
  count: number | null // Если null то значит у нас boolean тип привычки
}

export interface HabitType {
  habit: string
  days: Day[] // Массив дней, связанных с привычкой
}

type Store = {
  habitList: HabitType[]
  appendHabit: (habit: HabitType) => void
  toggleDayToHabit: (habitName: string, targetDay: string) => void
  deleteHabit: (habitName: string) => void
  editHabit: (oldHabitName: string, newHabitName: string) => void // Новая функция
  loadHabits: () => void
}

export const useLogicStore = create<Store>()(
  persist(
    (set, get) => ({
      habitList: [],
      appendHabit: (habit: HabitType) => {
        set(state => {
          const updatedHabitList = [...state.habitList, habit]
          return {habitList: updatedHabitList}
        })
      },
      toggleDayToHabit: (habitName: string, targetDay: string) => {
        set(state => {
          const updatedHabitList = state.habitList.map(habit => {
            if (habit.habit === habitName) {
              const dayIndex = habit.days.findIndex(
                day => day.day === targetDay,
              )

              if (dayIndex !== -1) {
                // Переключаем состояние дня
                habit.days[dayIndex].isComplite =
                  !habit.days[dayIndex].isComplite
              } else {
                // Добавляем новый день
                habit.days.push({day: targetDay, isComplite: true, count: null})
              }
            }
            return habit
          })

          return {habitList: updatedHabitList}
        })
      },
      deleteHabit: (habitName: string) => {
        set(state => {
          const updatedHabitList = state.habitList.filter(
            habit => habit.habit !== habitName,
          )
          return {habitList: updatedHabitList}
        })
      },
      editHabit: (oldHabitName: string, newHabitName: string) => {
        set(state => {
          const updatedHabitList = state.habitList.map(habit => {
            if (habit.habit === oldHabitName) {
              return {...habit, habit: newHabitName}
            }
            return habit
          })

          return {habitList: updatedHabitList}
        })
      },
      loadHabits: () => {
        // Загрузка данных из localStorage происходит автоматически благодаря persist
        const loadedHabits = get().habitList
        set({habitList: loadedHabits})
      },
    }),
    {
      name: 'habit-storage', // Уникальное имя для localStorage
      storage: createJSONStorage(() => localStorage), // Используем localStorage
    },
  ),
)
