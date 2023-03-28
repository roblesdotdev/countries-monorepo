import { Provider } from 'react-redux'
import AppRouter from './router'
import { configureStore } from './store'

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <div className="text-base">
        <AppRouter />
      </div>
    </Provider>
  )
}
