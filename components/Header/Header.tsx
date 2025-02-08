'use client'
import React from 'react'
import Image from 'next/image'
import {path} from '@/store'
import {Navbar} from 'flowbite-react'

export const Header: React.FC = () => {
  return (
    <Navbar fluid rounded className="shadow-md sm:shadow-lg">
      <Navbar.Brand href="/">
        <Image
          width={24}
          height={24}
          src={`${path.images}logo.svg`}
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          LoopHabit
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
