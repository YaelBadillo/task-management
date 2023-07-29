import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'
import { Loading } from '@components/loading'
import { useSignup } from '@signup/useSignup'
import { hasError, hasErrors } from '@utils/form-errors'

export const Signup = () => {
  const { formik, status } = useSignup()
  const { errors, touched } = formik

  if (status === 'pending') return <Loading />

  return (
    <>
      <Heading>Create your account</Heading>
      <Form handleSubmit={formik.handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          name="username"
          value={formik.values.username}
          error={hasError(errors.username, touched.username)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          error={hasError(errors.password, touched.password)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          name="passwordConfirm"
          value={formik.values.passwordConfirm}
          error={hasError(errors.passwordConfirm, touched.passwordConfirm)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Button disabled={hasErrors(errors)}>Sign up</Button>
      </Form>
      <AuthSwitch linkText="Login" linkPath="/auth/login">
        Already have an account?
      </AuthSwitch>
    </>
  )
}
