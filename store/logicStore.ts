'use client'

import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

export type selectedType = 'logic' | 'count'

export interface Day {
  day: string // Дата в формате ISO (YYYY-MM-DD)
  isComplite?: boolean | string
  count?: number | null // Если null то значит у нас boolean тип привычки
}

export interface HabitType {
  typeHabit: selectedType
  habit: string
  days: Day[] // Массив дней, связанных с привычкой
}

type Store = {
  habitList: HabitType[]
  appendHabit: (habit: HabitType) => void
  toggleDayToHabit: (habitName: string, targetDay: string) => void
  deleteHabit: (habitName: string) => void
  editHabit: (oldHabitName: string, newHabitName: string) => void
  loadHabits: () => void
  updateHabitDayCount: (
    habitName: string,
    targetDay: string,
    count: number,
  ) => void // New function
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
                habit.days[dayIndex].isComplite =
                  !habit.days[dayIndex].isComplite
              } else {
                habit.days.push({
                  day: targetDay,
                  isComplite: true,
                  count: null,
                })
              }
            }
            return habit
          })

          return {habitList: updatedHabitList}
        })
      },
      updateHabitDayCount: (
        habitName: string,
        targetDay: string,
        count: number,
      ) => {
        set(state => {
          const updatedHabitList = state.habitList.map(habit => {
            if (habit.habit === habitName) {
              const dayIndex = habit.days.findIndex(
                day => day.day === targetDay,
              )

              if (dayIndex !== -1) {
                habit.days[dayIndex].count = count
              } else {
                habit.days.push({
                  day: targetDay,
                  isComplite: false,
                  count: count,
                })
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
        const loadedHabits = get().habitList
        set({habitList: loadedHabits})
      },
    }),
    {
      name: 'habit-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
