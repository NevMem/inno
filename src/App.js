import './index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LentaDemonstration from './pages/LentaDemonstration'
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage'
import UserDataPage from './pages/UserDataPage'

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
          <Route path="/userData">
            <UserDataPage />
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
