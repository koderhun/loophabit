'use client'
import React, {useState} from 'react'
import {FaCheck} from 'react-icons/fa'
import {getDayColor} from '@/utils'
import {Day} from '@/store'

type ItemLogicProps = {
  index: number
  date: {
    date: string
    isToday: boolean
  }
  habit: Day
  handleCheckHabit: (habit: string, date: string) => () => void
}

export const ItemCount: React.FC<ItemLogicProps> = ({
  index,
  date,
  habit,
  handleCheckHabit,
}) => {
  const [isView, setView] = useState(false)

  const [count, setCount] = useState(habit.count)

  console.log('habit', habit)
  return (
    <td
      key={`${String(index)}_${String(date.date)}`}
      onClick={() => setView(!isView)}
      className={`cursor-pointer border border-gray-300 px-4 py-2 text-center dark:border-gray-600
        ${getDayColor(date.isToday)}`}>
      {isView ? (
        <div>{habit.count}</div>
      ) : (
        <div>
          <input
            type="text"
            placeholder={'0'}
          />
        </div>
      )}
    </td>
  )
}
