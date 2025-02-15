'use client'

import {create} from 'zustand'

export type ModalState = {
  isOpen: boolean
  title: string
  message: string
  onConfirm: (() => void) | null
  onCancel: (() => void) | null
}

type Store = {
  modal: ModalState
  openModal: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
  ) => void
  closeModal: () => void
}

export const useViewStore = create<Store>(set => ({
  modal: {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
  },
  openModal: (title, message, onConfirm, onCancel) => {
    set({
      modal: {
        isOpen: true,
        title,
        message,
        onConfirm,
        onCancel: onCancel || null,
      },
    })
  },
  closeModal: () => {
    set({
      modal: {
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        onCancel: null,
      },
    })
  },
}))
