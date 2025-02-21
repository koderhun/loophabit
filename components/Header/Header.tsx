'use client'
import React from 'react'
import Image from 'next/image'
import {path} from '@/store'
import {FaBars} from 'react-icons/fa6'

export const Header: React.FC = () => {
  return (
    <nav className="border-b border-gray-300 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            width={24}
            height={24}
            src={`${path.images}logo.svg`}
            className="mr-3 h-6 sm:h-9"
            alt="Logo"
          />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            Loop Habit
          </span>
        </a>
      </div>
    </nav>
  )
}
