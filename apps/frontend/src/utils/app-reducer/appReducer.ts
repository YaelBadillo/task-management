import { UserDto } from 'shared'

interface AppState {
  userProfile?: UserDto
  authenticated?: boolean
}

export type AppActions = SetUserProfile | SetAuthenticated

type SetUserProfile = {
  type: '[dashboard] set user profile'
  payload?: UserDto
}
type SetAuthenticated = {
  type: '[auth] set user authenticated'
  payload?: boolean
}

export const appReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case '[dashboard] set user profile':
      return { ...state, userProfile: action.payload }

    case '[auth] set user authenticated':
      return { ...state, authenticated: action.payload }

    default:
      return state
  }
}
