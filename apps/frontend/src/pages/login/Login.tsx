import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'
import { Loading } from '@components/loading'
import { useLogin } from '@login/useLogin'

export const Login = () => {
  const { formik, status } = useLogin()

  if (status === 'pending') return <Loading />

  return (
    <>
      <Heading>Welcome back</Heading>
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
        <Button
          disabled={
            formik.errors.username || formik.errors.password ? true : false
          }
        >
          Continue
        </Button>
        <AuthSwitch linkText="Sign up" linkPath="/auth/sign-up">
          Don't have an account?
        </AuthSwitch>
      </Form>
    </>
  )
}
