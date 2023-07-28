import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import {
  Auth,
  LazyDashboard as Dashboard,
  Home,
  Login,
  Root,
  Signup,
} from '@pages'
import { PrivateRoute, PublicRoute } from '@components/routes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />

          <Route
            path="auth"
            element={
              <PublicRoute redirect="/dashboard">
                <Auth />
              </PublicRoute>
            }
          >
            <Route index element={<Navigate to="/auth/login" />} />

            <Route path="sign-up" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="dashboard">
            <Route
              index
              element={
                <PrivateRoute redirect="/auth/login">
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
