import { Outlet } from 'react-router-dom'

import { AppContext } from '@context'
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

export const Root = () => {
  const authenticated = useVerifyLogin()

  return (
    <>
      <Container>
        <Navbar>
          <Title to="/">Task Management App</Title>
          {authenticated ? (
            <UserDropdown>
              <UserDropdownOption badge="primary" badgeText={'another name'}>
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
        <AppContext.Provider value={{ userProfile: undefined }}>
          <Outlet />
        </AppContext.Provider>
      </div>
    </>
  )
}
