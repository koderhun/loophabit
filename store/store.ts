'use client'

import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

export interface Day {
  day: string // Дата в формате ISO (YYYY-MM-DD)
  isComplite: boolean | string
}

export interface HabitType {
  habit: string
  days: Day[] // Массив дней, связанных с привычкой
}

type ModalState = {
  isOpen: boolean
  title: string
  message: string
  onConfirm: (() => void) | null
  onCancel: (() => void) | null
}

type Store = {
  habitList: HabitType[]
  appendHabit: (habit: HabitType) => void
  toggleDayToHabit: (habitName: string, targetDay: string) => void
  deleteHabit: (habitName: string) => void
  editHabit: (oldHabitName: string, newHabitName: string) => void // Новая функция
  loadHabits: () => void

  // Модальное окно
  modal: ModalState
  openModal: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
  ) => void
  closeModal: () => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      habitList: [],
      appendHabit: (habit: HabitType) => {
        set((state) => {
          const updatedHabitList = [...state.habitList, habit]
          return {habitList: updatedHabitList}
        })
      },
      toggleDayToHabit: (habitName: string, targetDay: string) => {
        set((state) => {
          const updatedHabitList = state.habitList.map((habit) => {
            if (habit.habit === habitName) {
              const dayIndex = habit.days.findIndex(
                (day) => day.day === targetDay,
              )

              if (dayIndex !== -1) {
                // Переключаем состояние дня
                habit.days[dayIndex].isComplite =
                  !habit.days[dayIndex].isComplite
              } else {
                // Добавляем новый день
                habit.days.push({day: targetDay, isComplite: true})
              }
            }
            return habit
          })

          return {habitList: updatedHabitList}
        })
      },
      deleteHabit: (habitName: string) => {
        set((state) => {
          const updatedHabitList = state.habitList.filter(
            (habit) => habit.habit !== habitName,
          )
          return {habitList: updatedHabitList}
        })
      },
      editHabit: (oldHabitName: string, newHabitName: string) => {
        set((state) => {
          const updatedHabitList = state.habitList.map((habit) => {
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

      // Модальное окно
      modal: {
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        onCancel: null,
      },
      openModal: (title, message, onConfirm, onCancel) => {
        set({
          modal: {
            isOpen: true,
            title,
            message,
            onConfirm,
            onCancel: onCancel || null,
          },
        })
      },
      closeModal: () => {
        set({
          modal: {
            isOpen: false,
            title: '',
            message: '',
            onConfirm: null,
            onCancel: null,
          },
        })
      },
    }),
    {
      name: 'habit-storage', // Уникальное имя для localStorage
      storage: createJSONStorage(() => localStorage), // Используем localStorage
    },
  ),
)
