'use client'
import React, {useEffect} from 'react'
import {FaCheck} from 'react-icons/fa'
import {generateDay} from '@/utils'
import {useLogicStore} from '@/store'
import {AppendForm, ModalHOC} from '@/components'

const getDayColor = (isToday: boolean) => {
  if (isToday) {
    return 'bg-green-200 text-green-800 dark:bg-green-500 dark:text-white font-bold'
  }
}

export const CalendarTable: React.FC = () => {
  const {loadHabits, habitList} = useLogicStore()
  const dates = generateDay()

  const {toggleDayToHabit} = useLogicStore()

  const {Modal: AppendModal, isOpen, setIsOpen} = ModalHOC(AppendForm)

  const handleCheckHabit = (habit: string, date: string) => () => {
    toggleDayToHabit(habit, date)
  }

  useEffect(() => {
    loadHabits()
  }, [loadHabits])

  return (
    <>
      {habitList.length ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr>
                <th
                  className="sticky left-0 border border-gray-300 bg-gray-300 px-4 py-2 dark:border-gray-600
                    dark:bg-gray-700">
                  Habit
                </th>
                {dates.map((date, index) => (
                  <th
                    key={index}
                    className={`border border-gray-300 px-4 py-2 dark:border-gray-600
                      ${getDayColor(date.isToday)}`}>
                    <div>{date.day}</div>
                    <div className="whitespace-nowrap text-sm text-gray-400">
                      {date.date}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habitList.map((habit, key1) => (
                <tr key={key1}>
                  <td
                    className="sticky left-0 w-1/3 border border-gray-300 bg-gray-100 px-4 py-2
                      dark:border-gray-600 dark:bg-gray-700">
                    <div className="flex gap-4 align-middle">
                      <div
                        className="line-clamp-3"
                        title={habit.habit}>
                        {habit.habit}
                      </div>
                    </div>
                  </td>
                  {dates.map((date, index) => (
                    <td
                      key={`${String(index)}_${String(date.date)}`}
                      onClick={handleCheckHabit(habit.habit, date.date)}
                      className={`cursor-pointer border border-gray-300 px-4 py-2 text-center dark:border-gray-600
                        ${getDayColor(date.isToday)}`}>
                      {habit.days.some(
                        day => day.day === date.date && day.isComplite,
                      ) && <FaCheck className="inline-block text-green-500" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        'No habit...'
      )}
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 block w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white
            hover:bg-blue-700">
          Append
        </button>
      </div>
      <AppendModal title={'ok'} />
    </>
  )
}
