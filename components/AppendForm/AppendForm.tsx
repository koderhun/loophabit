'use client'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useLogicStore, selectedType} from '@/store'
import {Btn} from '@/components'
import {BtnGroup} from './components'

type FormValues = {
  habit: string
}

type Props = {
  closeModal?: () => void
}

export const AppendForm = ({closeModal}: Props) => {
  const appendHabit = useLogicStore(state => state.appendHabit)
  const {register, handleSubmit} = useForm<FormValues>()

  const [selectedId, setSelectedId] = useState<selectedType>('logic')

  const handleSelect = (id: selectedType) => {
    setSelectedId(id)
  }

  const onSubmit = (data: FormValues) => {
    appendHabit({
      habit: data.habit,
      days: [],
    })

    if (closeModal) {
      closeModal()
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-w-sm flex-col gap-6">
      <div>
        <label
          htmlFor="habitText"
          className="text-md mb-2 block font-medium text-gray-900 dark:text-white">
          Название привычки
        </label>
        <input
          type="text"
          id="habitText"
          {...register('habit', {required: true})}
          className="block w-full border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900
            focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700
            dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
            dark:focus:ring-blue-500"
          placeholder="Текст привычки"
          required
        />
      </div>
      <BtnGroup
        selected={selectedId}
        onSelect={handleSelect}
      />

      <Btn
        type="submit"
        className="">
        Создать
      </Btn>
    </form>
  )
}
