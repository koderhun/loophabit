'use client'
import {DayType} from '@/utils'
import {useStore} from '@/store'

type Props = {
  dates: DayType[]
}

interface Day {
  day: string // Дата в формате ISO (YYYY-MM-DD)
  isComplite: boolean | string
}

const areDateEqual = (date1: string, date2: string): boolean => {
  return date1 === date2
}

const getDayColor = (isToday: boolean) => {
  if (isToday) {
    return 'bg-green-200 text-green-800 dark:bg-green-500 dark:text-white font-bold'
  }
}

export const HabitList = ({dates}: Props) => {
  const list = useStore((state) => state.habitList)
  console.log(list)

  return list.map((habit, key1) => {
    return (
      <tr key={key1}>
        <td className="sticky left-0 border border-gray-300 bg-gray-100 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
          {habit.habit}
        </td>
        {dates.map((date, index) => (
          <td
            key={index}
            className={`border border-gray-300 px-4 py-2 text-center dark:border-gray-600 ${getDayColor(date.isToday)}`}>
            {habit.days.some((day) => areDateEqual(day.day, date.date)) && (
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
            )}
          </td>
        ))}
      </tr>
    )
  })
}
