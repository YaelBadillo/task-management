import { FC } from 'react'

interface MenuProps {
  children: JSX.Element | JSX.Element[]
}

export const Menu: FC<MenuProps> = ({ children }) => {
  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal gap-x-1 px-1">{children}</ul>
    </div>
  )
}
