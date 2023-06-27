import { FC } from 'react'

interface InputProps {
  type: 'text' | 'password'
  placeholder: string
}

export const Input: FC<InputProps> = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input-bordered input-primary input w-full max-w-sm"
    />
  )
}
