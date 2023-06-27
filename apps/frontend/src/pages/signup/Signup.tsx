import { AuthSwitch, Button, Form, Heading, Input } from '@components/auth-form'

export const Signup = () => {
  return (
    <>
      <Heading>Create your account</Heading>
      <Form>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm password" />
        <Button>Sign up</Button>
      </Form>
      <AuthSwitch linkText="Login" linkPath="/auth/login">
        Already have an account?
      </AuthSwitch>
    </>
  )
}
