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
import { Auth } from '@pages/auth'
import { LazyDashboard as Dashboard } from '@pages/dashboard'
import { AppContext } from '@context'

function App() {
  return (
    <AppContext.Provider value={{ userProfile: undefined }}>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />

            <Route path="auth" element={<Auth />}>
              <Route index element={<Navigate to="/auth/login" />} />

              <Route path="sign-up" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>

            <Route path="dashboard">
              <Route index element={<Dashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
