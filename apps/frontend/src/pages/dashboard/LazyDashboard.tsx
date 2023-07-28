import { Suspense, lazy } from 'react'

const Dashboard = lazy(() => import('@dashboard/Dashboard'))

export const LazyDashboard = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Dashboard />
    </Suspense>
  )
}
