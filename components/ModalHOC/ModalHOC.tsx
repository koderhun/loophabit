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
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" />

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <DialogPanel className="min-w-xs max-w-lg space-y-4 bg-white p-4">
              <DialogTitle className="font-bold">{title}</DialogTitle>
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
