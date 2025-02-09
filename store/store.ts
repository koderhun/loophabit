import {create} from 'zustand'

interface Day {
  day: string // Дата в формате ISO (YYYY-MM-DD)
  isComplite: boolean | string
}

interface Habit {
  habit: string
  days: Day[] // Массив дней, связанных с привычкой
}

type Store = {
  habitList: Habit[]
  appendHabit: (habit: Habit) => void
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
}))
