import React from 'react'
import {generateDay} from '@/utils'

const getDayColor = (day: string, isToday: boolean) => {
  if (isToday) {
    return 'bg-green-200 text-green-800 dark:bg-green-500 dark:text-white font-bold'
  }
}

export const CalendarTable: React.FC = () => {
  const dates = generateDay()
  console.log(dates)

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr>
              <th className="sticky left-0 border border-gray-300 bg-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
                Day
              </th>
              {dates.map((date, index) => (
                <th
                  key={index}
                  className={`border border-gray-300 px-4 py-2 dark:border-gray-600 ${getDayColor(date.day, date.isToday)}`}>
                  <div>{date.day}</div>
                  <div className="whitespace-nowrap text-sm text-gray-400">
                    {date.date}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="sticky left-0 border border-gray-300 bg-gray-100 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
                John Doe
              </td>
              {dates.map((date, index) => (
                <td
                  key={index}
                  className={`border border-gray-300 px-4 py-2 dark:border-gray-600 ${getDayColor(date.day, date.isToday)}`}>
                  Present
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="py-4">
        <button
          type="button"
          className="inline-flex items-center rounded-lg bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Habit
        </button>
      </div>
    </>
  )
}
