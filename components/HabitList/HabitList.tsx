'use client'
import {memo, useEffect} from 'react'
import {DayType} from '@/utils'
import {useStore, HabitType} from '@/store'

type Props = {
  dates: DayType[]
  list: HabitType[]
}

const getDayColor = (isToday: boolean) => {
  if (isToday) {
    return 'bg-green-200 text-green-800 dark:bg-green-500 dark:text-white font-bold'
  }
}

const Check = memo(() => (
  <svg
    className="inline-block h-[30px] w-[30px] text-gray-800 dark:text-white"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M5 11.917 9.724 16.5 19 7.5"
    />
  </svg>
))

export const HabitList = ({dates, list}: Props) => {
  const toggleDayToHabit = useStore((state) => state.toggleDayToHabit)
  const loadHabits = useStore((state) => state.loadHabits)

  const handleClick = (habit: string, date: string) => () => {
    console.log('okkk', habit, date)
    toggleDayToHabit(habit, date)
  }

  return list.map((habit, key1) => {
    return (
      <tr key={key1}>
        <td className="sticky left-0 border border-gray-300 bg-gray-100 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
          <div className="line-clamp-3" title={habit.habit}>
            {habit.habit}
          </div>
        </td>
        {dates.map((date, index) => (
          <td
            key={`${String(index)}_${String(date.date)}`}
            onClick={handleClick(habit.habit, date.date)}
            className={`cursor-pointer border border-gray-300 px-4 py-2 text-center dark:border-gray-600 ${getDayColor(date.isToday)}`}>
            {habit.days.some(
              (day) => day.day === date.date && day.isComplite,
            ) && <Check />}
          </td>
        ))}
      </tr>
    )
  })
}
