/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Requests {
  interface RegisterUser extends Express.Request {
    body: import('shared').RegisterUserDto
  }

  interface LogInUser extends Express.Request {
    body: import('shared').LogInUserDto
  }

  interface WithUser extends Express.Request {
    user?: import('@database/models').IUser
  }

  interface Logout extends WithUser {
    cookies: AccessTokenCookie
  }

  type AccessTokenCookie = {
    access_token?: string
  }
}
