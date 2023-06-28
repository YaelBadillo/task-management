import { FC } from 'react'

import { Link } from 'react-router-dom'

interface AuthSwitchProps {
  children: string
  linkText: string
  linkPath: string
}

export const AuthSwitch: FC<AuthSwitchProps> = ({
  children: text,
  linkText,
  linkPath,
}) => {
  return (
    <article className="prose m-auto">
      <p>
        {`${text} `}
        <Link to={linkPath} className="link">
          {linkText}
        </Link>
      </p>
    </article>
  )
}
