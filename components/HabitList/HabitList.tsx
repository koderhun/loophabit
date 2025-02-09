import {DayType, getDayColor} from '@/utils'

type Props = {
  dates: DayType[]
}

interface Day {
  day: string // Дата в формате ISO (YYYY-MM-DD)
  isComplite: boolean | string
}

interface Habit {
  habit: string
  days: Day[] // Массив дней, связанных с привычкой
}

const list: Habit[] = [
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
]

const areDateEqual = (date1: string, date2: string): boolean => {
  return date1 === date2
}

export const HabitList = ({dates}: Props) => {
  return list.map((habit) => {
    return (
      <tr>
        <td className="sticky left-0 border border-gray-300 bg-gray-100 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
          {habit.habit}
        </td>
        {dates.map((date, index) => (
          <td
            key={index}
            className={`border border-gray-300 px-4 py-2 text-center dark:border-gray-600 ${getDayColor(date.day, date.isToday)}`}>
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
