'use client'
import React, {JSX, useState} from 'react'

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    // Названия месяцев
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    // Получаем первый день месяца
    const firstDay = new Date(year, month, 1).getDay()

    // Количество дней в месяце
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Создаем массив для отображения дней
    const days: JSX.Element[] = []

    // Добавляем пустые ячейки перед первым днем месяца
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="text-transparent">
          0
        </div>,
      )
    }

    // Добавляем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()

      days.push(
        <div
          key={day}
          className={`rounded p-2 text-center ${
            isToday ? 'bg-blue-500 font-bold text-white' : 'bg-gray-100' }`}>
          {day}
        </div>,
      )
    }

    return (
      <>
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            &lt;
          </button>
          <h2 className="text-xl font-bold">
            {monthNames[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center font-bold">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-2">{days}</div>
      </>
    )
  }

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    )
  }

  return (
    <div className="rounded bg-white p-4 shadow-md">{renderCalendar()}</div>
  )
}
