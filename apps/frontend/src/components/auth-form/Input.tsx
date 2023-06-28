import { ChangeEventHandler, FC } from 'react'

interface InputProps {
  type: 'text' | 'password'
  placeholder: string
  name: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const Input: FC<InputProps> = ({
  type,
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="input-bordered input-primary input w-full max-w-sm"
    />
  )
}
