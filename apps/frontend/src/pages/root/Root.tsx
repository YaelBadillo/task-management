import { Link, Outlet } from 'react-router-dom'
import { UserDto } from 'shared'

import { AppContext } from '@context'
import { useLocalStorage } from '@hooks'

export const Root = () => {
  const [userProfile] = useLocalStorage<UserDto>('userProfile')

  return (
    <>
      <div className="container m-auto flex-none">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link to="/" className="btn-ghost btn text-xl normal-case">
              Task Management App
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal gap-x-1 px-1">
              <li>
                <Link to="/auth/sign-up">Sign up</Link>
              </li>
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container relative m-auto flex flex-1">
        <AppContext.Provider value={{ userProfile }}>
          <Outlet />
        </AppContext.Provider>
      </div>
    </>
  )
}
