import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './General.css'
import HomePage from './components/pages/HomePage';
import Questions from './components/pages/Questions';
import Register from './components/pages/Register';

function App() {

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" exact element={<HomePage/>} />
            <Route path="/questions" exact element={<Questions/>} />
            <Route path="/register" exact element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
