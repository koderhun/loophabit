'use client'

import {Button, Modal} from 'flowbite-react'
import {useState} from 'react'

export const ModalAppendForm = () => {
  const [openModal, setOpenModal] = useState(true)

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Add habit</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Append Habit</Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Append</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
