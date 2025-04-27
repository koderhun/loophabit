'use client'
import React from 'react'
import {FaCheck} from 'react-icons/fa'
import type {Day} from '@/store'

interface ItemLogicProps extends Day {}

export const ItemLogic: React.FC<ItemLogicProps> = props => {
  return (
    <td
      className={
        'cursor-pointer border border-gray-300 px-4 py-2 text-center dark:border-gray-600'
      }>
      <FaCheck className="inline-block text-green-500" />
    </td>
  )
}
