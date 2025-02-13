'use client'
import {createPortal} from 'react-dom'
import {FaCheck} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'

import {DayType} from '@/utils'
import {ModalConfirm} from '@/components'
import {useStore, HabitType} from '@/store'

type Props = {
  dates: DayType[]
  list: HabitType[]
}

const getDayColor = (isToday: boolean) => {
  if (isToday) {
    return 'bg-green-200 text-green-800 dark:bg-green-500 dark:text-white font-bold'
  }
}

export const HabitList = ({dates, list}: Props) => {
  const {openModal, closeModal, toggleDayToHabit, deleteHabit} = useStore()

  const handleCheckHabit = (habit: string, date: string) => () => {
    console.log('okkk', habit, date)
    toggleDayToHabit(habit, date)
  }

  const handleRemoveHabit = (habit: string) => () => {
    openModal(
      'Delete Habit',
      `Are you sure you want to delete habit "${habit}"?`,
      () => {
        console.log('Item deleted!')
        deleteHabit(habit)
        closeModal()
      },
    )
  }

  return (
    <>
      {createPortal(<ModalConfirm />, document.body)}
      {list.map((habit, key1) => {
        return (
          <tr key={key1}>
            <td className="sticky left-0 w-1/3 border border-gray-300 bg-gray-100 px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
              <div className="flex gap-4 align-middle">
                <button
                  onClick={handleRemoveHabit(habit.habit)}
                  type="button"
                  className="flex items-center justify-center self-center text-red-600"
                  aria-label="Delete">
                  <IoMdClose />
                </button>
                <div className="line-clamp-3" title={habit.habit}>
                  {habit.habit}
                </div>
              </div>
            </td>
            {dates.map((date, index) => (
              <td
                key={`${String(index)}_${String(date.date)}`}
                onClick={handleCheckHabit(habit.habit, date.date)}
                className={`cursor-pointer border border-gray-300 px-4 py-2 text-center dark:border-gray-600 ${getDayColor(date.isToday)}`}>
                {habit.days.some(
                  (day) => day.day === date.date && day.isComplite,
                ) && <FaCheck className="inline-block text-green-500" />}
              </td>
            ))}
          </tr>
        )
      })}
    </>
  )
}
