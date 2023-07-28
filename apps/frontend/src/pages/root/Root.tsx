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
import { useReadCookie } from '@hooks'

export const Root = () => {
  const [authenticatedCookie] = useReadCookie<boolean>('authenticated')

  const [appState, dispatch] = useReducer(appReducer, {
    authenticated: authenticatedCookie,
  })
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
