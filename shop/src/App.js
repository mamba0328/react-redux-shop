import store from './redux/store'
import { Provider } from 'react-redux'
import Main from './pages/Main'

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

export default App