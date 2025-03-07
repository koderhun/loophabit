'use client'
import React, {ReactNode, ButtonHTMLAttributes} from 'react'

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconLeft?: ReactNode
  iconRight?: ReactNode
  className?: string
  children?: ReactNode
}

export const Btn: React.FC<BtnProps> = ({
  iconLeft,
  iconRight,
  className,
  children,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`text-small flex cursor-pointer items-center justify-center bg-blue-500 px-4 py-2
        text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400
        ${className}`}
      {...rest}>
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  )
}
