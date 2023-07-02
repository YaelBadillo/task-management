import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'
import { Loading } from '@components/loading'
import { useForm } from '@hooks'
import { validate } from '@utils/validate'
import { SignupSchema } from '@pages/signup/SignupSchema'

export const Signup = () => {
  const { formik, status } = useForm({
    url: 'http://localhost:3000/api/auth/sign-up',
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validate: validate(SignupSchema),
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success') navigate('/auth/login')
  }, [status, navigate])

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
