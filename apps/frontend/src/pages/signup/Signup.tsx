import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'
import { Loading } from '@components/loading'
import { useSignup } from '@signup/useSignup'
import {
  SignupAuthSwitch,
  SignupConfirmPasswordInput,
  SignupPasswordInput,
  SignupUsernameInput,
} from '@signup/signup.const'
import { AsyncStatus } from '@hooks'

export const Signup = () => {
  const { form, status } = useSignup()
  const { fields, hasError, handleSubmit, handleBlur, handleChange } = form
  const { username, password, passwordConfirm } = fields

  if (status === AsyncStatus.PENDING) return <Loading />

  return (
    <>
      <Heading>Create your account</Heading>
      <Form handleSubmit={handleSubmit}>
        <Input
          type={SignupUsernameInput.type}
          placeholder={SignupUsernameInput.placeholder}
          name={SignupUsernameInput.name}
          value={username.value}
          error={username.error}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          type={SignupPasswordInput.type}
          placeholder={SignupPasswordInput.placeholder}
          name={SignupPasswordInput.name}
          value={password.value}
          error={password.error}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          type={SignupConfirmPasswordInput.type}
          placeholder={SignupConfirmPasswordInput.placeholder}
          name={SignupConfirmPasswordInput.name}
          value={passwordConfirm.value}
          error={passwordConfirm.error}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Button disabled={hasError}>Sign up</Button>
      </Form>
      <AuthSwitch
        linkText={SignupAuthSwitch.linkText}
        linkPath={SignupAuthSwitch.linkPath}
      >
        Already have an account?
      </AuthSwitch>
    </>
  )
}
