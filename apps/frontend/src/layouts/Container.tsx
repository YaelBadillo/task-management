import { FC } from 'react'

interface ContainerProps {
  children: JSX.Element | JSX.Element[]
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="container m-auto flex-none">{children}</div>
}
