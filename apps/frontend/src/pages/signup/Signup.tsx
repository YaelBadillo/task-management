import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'
import { Loading } from '@components/loading'
import { useForm } from '@hooks'

export const Signup = () => {
  const { formik, status, value } = useForm({
    url: 'http://localhost:3000/api/auth/sign-up',
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success' && value !== undefined) navigate('/auth/login')
  }, [status])

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
          onChange={formik.handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          name="passwordConfirm"
          value={formik.values.passwordConfirm}
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
