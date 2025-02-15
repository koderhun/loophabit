'use client'
import {createPortal} from 'react-dom'
import {useViewStore} from '@/store'

export const ModalConfirm = () => {
  const {modal, closeModal} = useViewStore()

  return createPortal(
    <>
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-bold">{modal.title}</h2>
            <p className="mt-2">{modal.message}</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={modal.onCancel || closeModal}
                className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                Cancel
              </button>
              <button
                onClick={modal.onConfirm || closeModal}
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document?.body || null,
  )
}
