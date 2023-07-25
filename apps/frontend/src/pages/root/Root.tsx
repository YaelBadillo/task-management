import { Link, Outlet } from 'react-router-dom'
import { UserDto } from 'shared'

import { AppContext } from '@context'
import { useLocalStorage } from '@hooks'
import { Container } from '@layouts'
import { Navbar } from '@pages/root/Navbar'
import { Menu, Option, Title } from '@pages/root/components/navbar'

export const Root = () => {
  const [userProfile] = useLocalStorage<UserDto>('userProfile')

  return (
    <>
      <Container>
        <Navbar>
          <Title to="/">Task Management App</Title>
          <Menu>
            <Option to="/auth/sign-up">Sign up</Option>
            <Option to="/auth/login">Login</Option>
          </Menu>
        </Navbar>
      </Container>

      <div className="container relative m-auto flex flex-1">
        <AppContext.Provider value={{ userProfile }}>
          <Outlet />
        </AppContext.Provider>
      </div>
    </>
  )
}
