import { GithubIcon } from '@/components/icons'
import { Title } from '@/components/lib'
import { Link, Outlet } from 'react-router-dom'

export default function DashScreen() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between p-4 max-w">
        <Link to="/dash">
          <Title text="Countries" size="small" />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            className="btn btn-icon"
            to="/dash/activities/new"
            style={{ fontSize: '12px' }}
          >
            New Activity
          </Link>
          <a
            href="https://github.com/roblesdotdev"
            target="_blank"
            rel="noreferrer"
            className="btn btn-link"
          >
            <GithubIcon />
          </a>
        </div>
      </nav>
    </div>
  )
}
