import type { ReactNode } from 'react'

export default function PageIntro({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <header className="page-intro">
      <div>
        <h1>{title}</h1>
        {action ? <div className="action-pair page-intro__action">{action}</div> : null}
      </div>
      <p>{description}</p>
    </header>
  )
}
