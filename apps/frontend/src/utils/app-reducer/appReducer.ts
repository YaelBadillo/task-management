import { UserDto } from 'shared'

interface AppState {
  userProfile?: UserDto
}

export type AppActions = SetUserProfile

type SetUserProfile = { type: '[dashboard] set user profile'; payload: UserDto }

export const appReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case '[dashboard] set user profile':
      return { ...state, userProfile: action.payload }

    default:
      return state
  }
}
