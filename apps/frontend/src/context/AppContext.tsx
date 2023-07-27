import { Dispatch, createContext } from 'react'

import { UserDto } from 'shared'

import { AppActions } from '@utils/app-reducer'

interface IAppContext {
  userProfile?: UserDto
  dispatch?: Dispatch<AppActions>
}

export const AppContext = createContext<IAppContext>({})
