import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import { Home } from '@pages/home'
import { Signup } from '@pages/signup'
import { Login } from '@pages/login'
import { AuthContainer, RootContainer } from '@layouts'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootContainer />}>
          <Route index element={<Home />} />

          <Route path="auth" element={<AuthContainer />}>
            <Route index element={<Navigate to="/auth/login" />} />

            <Route path="sign-up" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>
      </Routes>

      <Route path="*" element={<Navigate to="/" />} />
    </Router>
  )
}

export default App
