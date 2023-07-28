import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'
import { Loading } from '@components/loading'
import { useSignup } from '@signup/useSignup'

export const Signup = () => {
  const { formik, status } = useSignup()

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
          error={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : undefined
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : undefined
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          name="passwordConfirm"
          value={formik.values.passwordConfirm}
          error={
            formik.touched.passwordConfirm && formik.errors.passwordConfirm
              ? formik.errors.passwordConfirm
              : undefined
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Button>Sign up</Button>
      </Form>
      <AuthSwitch linkText="Login" linkPath="/auth/login">
        Already have an account?
      </AuthSwitch>
    </>
  )
}
