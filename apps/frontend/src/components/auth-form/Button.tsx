import { FC } from 'react'

interface ButtonProps {
  children?: string
}

export const Button: FC<ButtonProps> = ({ children: text }) => {
  return <button className="btn-block btn bg-primary">{text}</button>
}