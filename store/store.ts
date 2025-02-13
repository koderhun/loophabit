import {create} from 'zustand'

export interface Day {
  day: string // Дата в формате ISO (YYYY-MM-DD)
  isComplite: boolean | string
}

export interface Habit {
  habit: string
  days: Day[] // Массив дней, связанных с привычкой
}

type Store = {
  habitList: Habit[]
  appendHabit: (habit: Habit) => void
  toggleDayToHabit: (habitName: string, targetDay: string) => void
}

export const useStore = create<Store>()((set) => ({
  habitList: [
    {
      habit: 'Read a book',
      days: [
        {
          day: '2025-02-01',
          isComplite: true,
        },
      ],
    },
    {
      habit: 'Sport',
      days: [
        {
          day: '2025-02-02',
          isComplite: true,
        },
        {
          day: '2025-02-09',
          isComplite: true,
        },
      ],
    },
  ],
  appendHabit: (habit: Habit) => {
    set((state) => ({
      habitList: [...state.habitList, habit],
    }))
  },
  toggleDayToHabit: (habitName: string, targetDay: string) => {
    set((state) => ({
      habitList: state.habitList.map((habit) => {
        if (habit.habit === habitName) {
          // Проверяем, существует ли день
          const dayIndex = habit.days.findIndex((day) => day.day === targetDay)

          if (dayIndex !== -1) {
            // Если день найден, переключаем его состояние
            const updatedDays = habit.days.map((day, index) =>
              index === dayIndex ? {...day, isComplite: !day.isComplite} : day,
            )
            return {...habit, days: updatedDays}
          } else {
            // Если день не найден, добавляем его с состоянием isComplite: true
            return {
              ...habit,
              days: [...habit.days, {day: targetDay, isComplite: true}],
            }
          }
        }
        // Если это не целевая привычка, возвращаем ее без изменений
        return habit
      }),
    }))
  },
}))
