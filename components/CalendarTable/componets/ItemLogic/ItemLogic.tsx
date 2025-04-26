'use client'
import React from 'react'
import {FaCheck} from 'react-icons/fa'
import {getDayColor} from '@/utils'

type ItemLogicProps = {
  index: number
  date: {
    date: string
    isToday: boolean
  }
  habit: {
    habit: string
    days: {day: string; isComplite: boolean}[]
  }
  handleCheckHabit: (habit: string, date: string) => () => void
}

export const ItemLogic: React.FC<ItemLogicProps> = ({
  index,
  date,
  habit,
  handleCheckHabit,
}) => {
  return (
    <td
      key={`${String(index)}_${String(date.date)}`}
      onClick={handleCheckHabit(habit.habit, date.date)}
      className={`cursor-pointer border border-gray-300 px-4 py-2 text-center dark:border-gray-600
        ${getDayColor(date.isToday)}`}>
      {habit.days.some(day => day.day === date.date && day.isComplite) && (
        <FaCheck className="inline-block text-green-500" />
      )}
    </td>
  )
}
