import { FC } from 'react'

import profileImage from '@assets/profile.png'

interface UserDropdownProps {
  children?: JSX.Element | JSX.Element[]
}

export const UserDropdown: FC<UserDropdownProps> = ({ children }) => {
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <img src={profileImage} />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
      >
        {children}
      </ul>
    </div>
  )
}
