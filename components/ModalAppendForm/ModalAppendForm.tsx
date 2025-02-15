'use client'

import {useState} from 'react'
import {Button, Modal, Label, TextInput} from 'flowbite-react'
import {useForm} from 'react-hook-form'
import {useLogicStore} from '@/store'

interface FormValues {
  habit: string
}
export const ModalAppendForm = () => {
  const appendHabit = useLogicStore(state => state.appendHabit)
  const [openModal, setOpenModal] = useState(false)
  const {register, handleSubmit, reset} = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    appendHabit({
      habit: data.habit,
      days: [],
    })

    reset()
    setOpenModal(false)
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Add habit</Button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}>
        <Modal.Header>Append Habit</Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>
    </>
  )
}
