import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import { UserDto } from 'shared'

import { Home } from '@pages/home'
import { Signup } from '@pages/signup'
import { Login } from '@pages/login'
import { Root } from '@pages/root'
import { Auth } from '@pages/auth'
import { AppContext } from '@context'
import { useLocalStorage } from '@hooks'

function App() {
  const [userProfile] = useLocalStorage<UserDto>('userProfile')

  return (
    <Router>
      <Routes>
        <AppContext.Provider value={{ userProfile }}>
          <Route path="/" element={<Root />}>
            <Route index element={<Home />} />

            <Route path="auth" element={<Auth />}>
              <Route index element={<Navigate to="/auth/login" />} />

              <Route path="sign-up" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Route>
        </AppContext.Provider>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
