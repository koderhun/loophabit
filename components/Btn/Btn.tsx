import React, {ReactNode, ButtonHTMLAttributes} from 'react'

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconLeft?: ReactNode
  iconRight?: ReactNode
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export const Btn: React.FC<BtnProps> = ({
  onClick,
  iconLeft,
  iconRight,
  disabled,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={`flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-white
        hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}>
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  )
}
