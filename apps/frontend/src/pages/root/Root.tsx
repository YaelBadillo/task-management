import { useReducer } from 'react'

import { Outlet } from 'react-router-dom'

import { Container } from '@layouts'
import { Navbar } from '@pages/root/Navbar'
import {
  Menu,
  Option,
  Title,
  UserDropdown,
  UserDropdownOption,
} from '@pages/root/components/navbar'
import { AppContext } from '@context'
import { appReducer } from '@utils/app-reducer'

export const Root = () => {
  const [appState, dispatch] = useReducer(appReducer, {})
  const { userProfile, authenticated } = appState

  return (
    <>
      <Container>
        <Navbar>
          <Title to="/">Task Management App</Title>
          {authenticated ? (
            <UserDropdown>
              <UserDropdownOption
                badge="primary"
                badgeText={userProfile?.username}
              >
                Profile
              </UserDropdownOption>
              <UserDropdownOption>Settings</UserDropdownOption>
              <UserDropdownOption>Logout</UserDropdownOption>
            </UserDropdown>
          ) : (
            <Menu>
              <Option to="/auth/sign-up">Sign up</Option>
              <Option to="/auth/login">Login</Option>
            </Menu>
          )}
        </Navbar>
      </Container>

      <div className="container relative m-auto flex flex-1">
        <AppContext.Provider value={{ ...appState, dispatch }}>
          <Outlet />
        </AppContext.Provider>
      </div>
    </>
  )
}
