import { FC } from 'react'

interface HeadingProps {
  children?: string
}

export const Heading: FC<HeadingProps> = ({ children: text }) => {
  return (
    <article className="prose-xl prose-stone prose m-auto">
      <h3>{text}</h3>
    </article>
  )
}
