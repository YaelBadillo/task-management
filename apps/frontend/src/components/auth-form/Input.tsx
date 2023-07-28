import { ChangeEventHandler, FC, FocusEventHandler } from 'react'

interface InputProps {
  type: 'text' | 'password'
  placeholder: string
  name: string
  value: string
  error?: string
  onBlur: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const Input: FC<InputProps> = ({
  type,
  placeholder,
  name,
  value,
  error,
  onBlur,
  onChange,
}) => {
  return (
    <div className="form-control w-full max-w-sm">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={`input-bordered ${
          error ? 'input-error' : 'input-primary'
        } input w-full max-w-sm`}
      />
      {error ? (
        <label className="label">
          <span className="label-text-alt">{error}</span>
        </label>
      ) : (
        <></>
      )}
    </div>
  )
}
