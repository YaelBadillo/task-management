import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import { Home } from '@pages/home'
import { Signup } from '@pages/signup'
import { Login } from '@pages/login'
import { Root } from '@pages/root'
import { Auth, PublicRoute } from '@pages/auth'
import { LazyDashboard as Dashboard, PrivateRoute } from '@pages/dashboard'

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
