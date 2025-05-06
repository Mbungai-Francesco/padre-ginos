import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/past')({
  component: Past,
})

function Past() {
  return <div>Hello "/past"!</div>
}
