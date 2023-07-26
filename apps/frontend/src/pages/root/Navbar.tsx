import { FC } from 'react'

interface NavbarProps {
  children: JSX.Element | JSX.Element[]
}

export const Navbar: FC<NavbarProps> = ({ children }) => {
  return <div className="navbar bg-base-100">{children}</div>
}
