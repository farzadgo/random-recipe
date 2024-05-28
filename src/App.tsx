import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Favorites from './routes/Favorites';
import Notfound from './routes/Notfound';


function App() {
  
  return (
    <Router>
      <div id="app" className='h-screen'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/*' element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
