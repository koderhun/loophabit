'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import {useLogicStore} from '@/store'

type FormValues = {
  habit: string
}

type Props = {
  closeModal?: () => void
}

export const AppendForm = ({closeModal}: Props) => {
  const appendHabit = useLogicStore(state => state.appendHabit)
  const {register, handleSubmit} = useForm<FormValues>()

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
      className="flex flex-col gap-6">
      <div>
        <div className="mb-2 block">habit</div>
        <input
          {...register('habit', {required: true})}
          type="text"
          placeholder="Sport"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
