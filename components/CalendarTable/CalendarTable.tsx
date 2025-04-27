'use client'
import React, {useEffect} from 'react'
import {generateDay, getDayColor} from '@/utils'
import {useLogicStore} from '@/store'
import {AppendForm, ModalHOC, Btn} from '@/components'
import {ItemLogic, ItemCount} from './componets'

export const CalendarTable: React.FC = () => {
  const {habitList} = useLogicStore()
  const dates = generateDay()

  const {toggleDayToHabit, updateHabitDayCount} = useLogicStore()

  const {Modal: AppendModal, handleOpen} = ModalHOC(AppendForm)

  const handleCheckHabit = (habit: string, date: string) => () => {
    toggleDayToHabit(habit, date)
  }

  return (
    <>
      {habitList.length ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-blue-50">
                <th
                  className="sticky left-0 border border-gray-300 px-4 py-2 dark:border-gray-600
                    dark:bg-blue-700">
                  Привычка
                </th>
                {dates.map((date, index) => (
                  <th
                    key={index}
                    className={`border border-gray-300 px-4 py-2 dark:border-gray-600
                      ${getDayColor(date.isToday)}`}>
                    <div>{date.day}</div>
                    <div className="text-sm whitespace-nowrap text-gray-400">
                      {date.date}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {habitList.map((habit, key1) => {
                console.log('ff', habit)
                return (
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
                    {dates.map((date, index) => {
                      if (habit.typeHabit === 'count') {
                        return <ItemCount {...date} />
                      }
                      return (
                        <ItemLogic
                          {...{
                            index,
                            date,
                            habit,
                            handleCheckHabit,
                          }}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        'Нет привычек...'
      )}
      <div className="mt-6">
        <Btn onClick={() => handleOpen()}>Добавить привычку</Btn>
      </div>
      <AppendModal title={'Создать привычку'} />
    </>
  )
}
