import LentaDemonstration from './pages/LentaDemonstration'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import './index.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/lenta">
            <LentaDemonstration />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
