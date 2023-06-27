import { Link, Outlet } from 'react-router-dom'

export const RootContainer = () => {
  return (
    <>
      <div className="container m-auto">
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
      <div className="container m-auto">
        <Outlet />
      </div>
    </>
  )
}
