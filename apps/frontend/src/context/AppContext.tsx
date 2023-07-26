import { createContext } from 'react'

import { UserDto } from 'shared'

interface IAppContext {
  userProfile?: UserDto
}

export const AppContext = createContext<IAppContext>({ userProfile: undefined })
