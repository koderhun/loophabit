'use client'
import React from 'react'
import {selectedType} from '@/store'

interface BtnGroupProps {
  selected: selectedType
  onSelect: (id: selectedType) => void
}

export const BtnGroup: React.FC<BtnGroupProps> = ({selected, onSelect}) => {
  const activeClass = `bg-blue-500 text-white`
  const defaultClass = `bg-white text-gray-900`

  return (
    <>
      <div className="inline-flex rounded-md shadow-xs">
        <button
          type="button"
          onClick={() => onSelect('logic')}
          className={`cursor-pointer border border-blue-500 px-4 py-2 text-sm font-medium
            ${selected === 'logic' ? activeClass : defaultClass}`}>
          Логический
        </button>
        <button
          type="button"
          onClick={() => onSelect('count')}
          className={`cursor-pointer border border-blue-500 px-4 py-2 text-sm font-medium
            ${selected === 'count' ? activeClass : defaultClass}`}>
          Количественный
        </button>
      </div>
    </>
  )
}
