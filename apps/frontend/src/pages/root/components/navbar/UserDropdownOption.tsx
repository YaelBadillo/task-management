import { FC } from 'react'

interface UserDropdownOptionProps {
  children: string
  badge?: BadgeTypes
  badgeText?: string
}

const Badges = {
  primary: 'badge-primary',
}

type BadgeTypes = 'primary'

export const UserDropdownOption: FC<UserDropdownOptionProps> = ({
  children,
  badge,
  badgeText,
}) => {
  return (
    <li>
      <a className="justify-between">
        {children}
        {badge ? (
          <span className={`badge ${Badges[badge]}`}>{badgeText}</span>
        ) : (
          <></>
        )}
      </a>
    </li>
  )
}
