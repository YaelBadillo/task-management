import { Link } from 'react-router-dom'

export const Signup = () => {
  return (
    <>
      <article className="prose-xl prose-stone prose m-auto">
        <h3>Create your account</h3>
      </article>
      <form action="" className="form-control w-full max-w-sm gap-y-4">
        <input
          type="text"
          placeholder="Name"
          className="input-bordered input-primary input w-full max-w-sm"
        />
        <input
          type="password"
          placeholder="Password"
          className="input-bordered input-primary input w-full max-w-sm"
        />
        <button className="btn-block btn bg-primary">Sign up</button>
      </form>
      <article className="prose m-auto">
        <p className="">
          Already have an account?{' '}
          <Link to="/auth/login" className="link">
            Login
          </Link>
        </p>
      </article>
    </>
  )
}
