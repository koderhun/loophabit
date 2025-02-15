'use client'
import {FaCheck} from 'react-icons/fa'
import {Mod} from './Mod'

import {DayType} from '@/utils'
import {ModalConfirm} from '@/components'
import {useLogicStore, HabitType, useViewStore} from '@/store'

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
  const {toggleDayToHabit, deleteHabit, editHabit} = useLogicStore()
  const {openModal, closeModal} = useViewStore()

  const handleCheckHabit = (habit: string, date: string) => () => {
    toggleDayToHabit(habit, date)
  }

  const handleRemoveHabit = (habit: string) => () => {
    openModal(
      'Delete Habit',
      `Are you sure you want to delete habit "${habit}"?`,
      () => {
        deleteHabit(habit)
        closeModal()
      },
    )
  }

  const handleEditHabit = (habit: HabitType) => () => {
    // Логика для редактирования привычки
    const newHabitName = prompt('Enter new habit name:', habit.habit)
    if (newHabitName) {
      editHabit(habit.habit, newHabitName)
    }
  }

  return (
    <>
      <ModalConfirm />
      {list.map((habit, key1) => (
        <tr key={key1}>
          <td
            className="sticky left-0 w-1/3 border border-gray-300 bg-gray-100 px-4 py-2
              dark:border-gray-600 dark:bg-gray-700">
            <div className="flex gap-4 align-middle">
              <Mod />
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
    </>
  )
}
