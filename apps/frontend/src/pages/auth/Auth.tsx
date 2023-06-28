import { Outlet } from 'react-router-dom'

export const Auth = () => {
  return (
    <div className="absolute left-1/2 top-1/2 flex h-max w-full max-w-sm -translate-x-1/2 -translate-y-3/4 flex-col gap-y-5">
      <Outlet />
    </div>
  )
}
