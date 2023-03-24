import { Outlet } from 'react-router-dom'

export default function DashScreen() {
  return (
    <div>
      <div className="flex items-center justify-between p-4 max-w-xl mx-auto">
        <h1>Logo</h1>
        <button>Theme</button>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
