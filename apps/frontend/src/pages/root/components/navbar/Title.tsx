import { FC } from 'react'

import { Link } from 'react-router-dom'

interface TitleProps {
  to: string
  children: string
}

export const Title: FC<TitleProps> = ({ to, children }) => {
  return (
    <div className="flex-1">
      <Link to={to} className="btn-ghost btn text-xl normal-case">
        {children}
      </Link>
    </div>
  )
}
