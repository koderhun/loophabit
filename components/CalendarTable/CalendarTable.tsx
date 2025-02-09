import React from 'react'

const generateCurrentMonthDates = () => {
  const dates = []
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day)
    dates.push({
      date: currentDate.toISOString().split('T')[0],
      day: dayNames[currentDate.getDay()],
      isToday: today.toDateString() === currentDate.toDateString(),
    })
  }

  return dates
}

const getDayColor = (day: string, isToday: boolean) => {
  if (isToday) {
    return 'bg-green-200 text-green-800 dark:bg-green-500 dark:text-white font-bold'
  }
  switch (day) {
    case 'Saturday':
      return 'border-r-black border-r-2'
    default:
      return ''
  }
}

export const CalendarTable: React.FC = () => {
  const dates = generateCurrentMonthDates()

  return (
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
  )
}
