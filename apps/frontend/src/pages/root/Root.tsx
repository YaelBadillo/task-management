import { useContext } from 'react'

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
import { useVerifyLogin } from '@pages/root/useVerifyLogin'
import { AppContext } from '@context'

export const Root = () => {
  const authenticated = useVerifyLogin()
  const { userProfile } = useContext(AppContext)

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
        <Outlet />
      </div>
    </>
  )
}
