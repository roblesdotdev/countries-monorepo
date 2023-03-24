import { Outlet } from 'react-router-dom'

export default function DashScreen() {
  return (
    <div>
      <h1>Dash Screen</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
