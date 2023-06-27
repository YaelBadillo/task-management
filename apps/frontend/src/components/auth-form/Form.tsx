import { FC } from 'react'

interface FormProps {
  children: JSX.Element | JSX.Element[]
}

export const Form: FC<FormProps> = ({ children }) => {
  return (
    <form className="form-control w-full max-w-sm gap-y-4">{children}</form>
  )
}
