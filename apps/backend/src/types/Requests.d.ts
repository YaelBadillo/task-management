/* eslint-disable @typescript-eslint/no-unused-vars */
namespace Requests {
  interface RegisterUser extends Express.Request {
    body: RegisterUserDto
  }

  interface LogInUser extends Express.Request {
    body: LogInUserDto
  }

  interface WithUser extends Express.Request {
    user?: IUser
  }

  interface Logout extends WithUser {
    cookies: AccessTokenCookie
  }

  type AccessTokenCookie = {
    access_token?: string
  }
}
