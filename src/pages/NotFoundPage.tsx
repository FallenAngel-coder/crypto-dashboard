import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <>
      <h2>404 — сторінку не знайдено</h2>
      <Link className="back-link" to="/">На головну</Link>
    </>
  )
}

export default NotFoundPage
