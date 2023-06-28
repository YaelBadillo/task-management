import { FC, FormEventHandler } from 'react'

interface FormProps {
  handleSubmit: FormEventHandler<HTMLFormElement>
  children: JSX.Element | JSX.Element[]
}

export const Form: FC<FormProps> = ({ handleSubmit, children }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="form-control w-full max-w-sm gap-y-4"
    >
      {children}
    </form>
  )
}
