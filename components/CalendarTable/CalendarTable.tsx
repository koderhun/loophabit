'use client'
import React, {useEffect} from 'react'
import {HabitList, ModalAppendForm} from '@/components'
import {generateDay} from '@/utils'
import {useLogicStore} from '@/store'

const getDayColor = (isToday: boolean) => {
  if (isToday) {
    return 'bg-green-200 text-green-800 dark:bg-green-500 dark:text-white font-bold'
  }
}

export const CalendarTable: React.FC = () => {
  const {loadHabits, habitList} = useLogicStore()
  const dates = generateDay()

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
              <HabitList
                dates={dates}
                list={habitList}
              />
            </tbody>
          </table>
        </div>
      ) : (
        'No habit...'
      )}
      <div className="py-4">
        <ModalAppendForm />
      </div>
    </>
  )
}
