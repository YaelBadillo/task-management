import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'
import { Loading } from '@components/loading'
import { useSignup } from '@signup/useSignup'

export const Signup = () => {
  const { form, status } = useSignup()
  const { fields, hasError, handleSubmit, handleBlur, handleChange } = form
  const { username, password, passwordConfirm } = fields

  if (status === 'pending') return <Loading />

  return (
    <>
      <Heading>Create your account</Heading>
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
        <Input
          type="password"
          placeholder="Confirm password"
          name="passwordConfirm"
          value={passwordConfirm.value}
          error={passwordConfirm.error}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Button disabled={hasError}>Sign up</Button>
      </Form>
      <AuthSwitch linkText="Login" linkPath="/auth/login">
        Already have an account?
      </AuthSwitch>
    </>
  )
}
