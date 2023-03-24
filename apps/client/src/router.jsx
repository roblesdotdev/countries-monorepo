import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  CountriesScreen,
  CountryScreen,
  DashScreen,
  NotFoundScreen,
  WelcomeScreen,
} from '@/screens'
import { Navigate } from 'react-router-dom'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route index element={<WelcomeScreen />} />
        <Route path="dash" element={<DashScreen />}>
          <Route index element={<Navigate to="countries" />} />
          <Route path="countries" element={<CountriesScreen />} />
          <Route path="countries/:id" element={<CountryScreen />} />
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Router>
  )
}
