import { FC } from 'react'

interface ButtonProps {
  disabled?: boolean
  children?: string
}

export const Button: FC<ButtonProps> = ({ disabled, children: text }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="btn-block btn bg-primary"
    >
      {text}
    </button>
  )
}
