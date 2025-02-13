'use client'
import {create} from 'zustand'

export interface Day {
  day: string // Дата в формате ISO (YYYY-MM-DD)
  isComplite: boolean | string
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
  loadHabits: () => void // Метод для загрузки данных из localStorage
}

// Проверка доступности localStorage
const isLocalStorageAvailable = (() => {
  try {
    const testKey = '__test__'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch {
    console.error('localStorage is not available.')
    return false
  }
})()

// Функция для загрузки данных из localStorage
const loadFromLocalStorage = (): HabitType[] => {
  if (!isLocalStorageAvailable) return []
  try {
    const data = localStorage.getItem('habitList')
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return []
  }
}

// Функция для сохранения данных в localStorage
const saveToLocalStorage = (() => {
  if (!isLocalStorageAvailable) return () => {}
  return (habitList: HabitType[]) => {
    try {
      localStorage.setItem('habitList', JSON.stringify(habitList))
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === 'QuotaExceededError'
      ) {
        console.error('localStorage quota exceeded. Cannot save data.')
      } else {
        console.error('Error saving to localStorage:', error)
      }
    }
  }
})()

export const useStore = create<Store>()((set) => ({
  habitList: [], // Изначально пустой массив, данные загружаются на клиенте
  appendHabit: (habit: HabitType) => {
    set((state) => {
      const updatedHabitList = [...state.habitList, habit]
      saveToLocalStorage(updatedHabitList) // Сохраняем обновленный список в localStorage
      return {habitList: updatedHabitList}
    })
  },
  toggleDayToHabit: (habitName: string, targetDay: string) => {
    set((state) => {
      const updatedHabitList = state.habitList.map((habit) => {
        if (habit.habit === habitName) {
          const dayIndex = habit.days.findIndex((day) => day.day === targetDay)

          if (dayIndex !== -1) {
            // Переключаем состояние дня
            habit.days[dayIndex].isComplite = !habit.days[dayIndex].isComplite
          } else {
            // Добавляем новый день
            habit.days.push({day: targetDay, isComplite: true})
          }
        }
        return habit
      })

      saveToLocalStorage(updatedHabitList) // Сохраняем обновленный список в localStorage
      return {habitList: updatedHabitList}
    })
  },
  deleteHabit: (habitName: string) => {
    set((state) => {
      const updatedHabitList = state.habitList.filter(
        (habit) => habit.habit !== habitName,
      )
      saveToLocalStorage(updatedHabitList) // Сохраняем обновленный список в localStorage
      return {habitList: updatedHabitList}
    })
  },
  loadHabits: () => {
    set(() => {
      const loadedHabits = loadFromLocalStorage()
      return {habitList: loadedHabits}
    })
  },
}))
