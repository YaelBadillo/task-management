import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'
import { Loading } from '@components/loading'
import { useLogin } from '@login/useLogin'
import {
  LoginAuthSwitch,
  LoginPasswordInput,
  LoginUsernameInput,
} from '@login/login.const'

export const Login = () => {
  const { form, status } = useLogin()
  const { fields, hasError, handleSubmit, handleBlur, handleChange } = form
  const { username, password } = fields

  if (status === 'pending') return <Loading />

  return (
    <>
      <Heading>Welcome back</Heading>
      <Form handleSubmit={handleSubmit}>
        <Input
          type={LoginUsernameInput.type}
          placeholder={LoginUsernameInput.placeholder}
          name={LoginUsernameInput.name}
          value={username.value}
          error={username.error}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          type={LoginPasswordInput.type}
          placeholder={LoginPasswordInput.placeholder}
          name={LoginPasswordInput.name}
          value={password.value}
          error={password.error}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Button disabled={hasError}>Continue</Button>
        <AuthSwitch
          linkText={LoginAuthSwitch.linkText}
          linkPath={LoginAuthSwitch.linkPath}
        >
          Don't have an account?
        </AuthSwitch>
      </Form>
    </>
  )
}
