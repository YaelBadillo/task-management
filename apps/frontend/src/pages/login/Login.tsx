import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'
import { Loading } from '@components/loading'
import { useLogin } from '@login/useLogin'

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
          type="text"
          placeholder="Username"
          name="username"
          value={username.value}
          error={username.error}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password.value}
          error={password.error}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Button disabled={hasError}>Continue</Button>
        <AuthSwitch linkText="Sign up" linkPath="/auth/sign-up">
          Don't have an account?
        </AuthSwitch>
      </Form>
    </>
  )
}
