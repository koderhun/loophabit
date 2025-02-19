'use client'
import React from 'react'
import {Button, Label, TextInput} from 'flowbite-react'
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
        <div className="mb-2 block">
          <Label
            htmlFor="habit"
            value="Your Habit"
          />
        </div>
        <TextInput
          {...register('habit', {required: true})}
          type="text"
          placeholder="Sport"
        />
      </div>
      <Button
        className=""
        type="submit">
        Submit
      </Button>
    </form>
  )
}
