'use client'
import React, {useState} from 'react'
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from '@headlessui/react'

interface dialogProps {
  title: string
}

type ModalHOCProps = {
  Modal: React.FC<dialogProps>
  isOpen: boolean
  handleOpen: () => void
}

type componentProps = {
  closeModal: () => void
}

export const ModalHOC = (
  Component: React.FC<componentProps>,
): ModalHOCProps => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)

  const closeModal = () => setIsOpen(false)

  return {
    Modal: ({title}: dialogProps) => {
      return (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-black/30" />

          <div className="fixed inset-0 flex w-screen items-center justify-center">
            <DialogPanel className="w-lg space-y-4 bg-white">
              <DialogTitle className="mb-0 border-b border-gray-300 p-4 text-center text-2xl">
                {title}
              </DialogTitle>
              <div className="p-4">
                <Component closeModal={closeModal} />
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )
    },
    isOpen,
    handleOpen,
  }
}
