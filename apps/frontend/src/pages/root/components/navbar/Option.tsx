import { FC } from 'react'

import { Link } from 'react-router-dom'

interface OptionProps {
  to: string
  children: string
}

export const Option: FC<OptionProps> = ({ to, children }) => {
  return (
    <li>
      <Link to={to}>{children}</Link>
    </li>
  )
}
