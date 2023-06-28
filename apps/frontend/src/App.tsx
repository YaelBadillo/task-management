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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />

          <Route path="auth" element={<Auth />}>
            <Route index element={<Navigate to="/auth/login" />} />

            <Route path="sign-up" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
