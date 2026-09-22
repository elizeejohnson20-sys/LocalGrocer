import { useState } from 'react'
import { API_URL } from '../api'
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Login failed'
        )
      }

      localStorage.setItem(
        'localgrocer-token',
        data.token
      )

      localStorage.setItem(
        'localgrocer-user',
        JSON.stringify(data.user)
      )

      window.dispatchEvent(
        new Event('localgrocer-auth-change')
      )

      const destination =
        location.state?.from || '/'

      navigate(destination, {
        replace: true,
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">

      <section className="auth-card">

        <div className="auth-header">

          <p className="section-eyebrow">
            WELCOME BACK
          </p>

          <h1>
            Login to LocalGrocer
          </h1>

          <p>
            Sign in to continue shopping from your
            local store.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
            />
          </label>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? 'Signing in...'
              : 'Login'}
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/register">
            Create one
          </Link>
        </p>

      </section>

    </main>
  )
}

export default Login