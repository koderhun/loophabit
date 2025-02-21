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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type componentProps = {
  closeModal: () => void
}

export const ModalHOC = (
  Component: React.FC<componentProps>,
): ModalHOCProps => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)

  return {
    Modal: ({title}: dialogProps) => {
      return (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-black/30" />

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-lg space-y-4 bg-white p-4">
              <DialogTitle className="mb-6 text-center text-2xl font-bold">
                {title}
              </DialogTitle>
              <Component closeModal={closeModal} />
            </DialogPanel>
          </div>
        </Dialog>
      )
    },
    isOpen,
    setIsOpen,
  }
}
