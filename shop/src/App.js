import store from './redux/store'
import { Provider } from 'react-redux'
import Main from './components/Main'

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

export default App