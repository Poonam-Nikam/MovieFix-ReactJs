import Home from "./components/Home"
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
function App() {

  return (
    <div>
      <Router>
      {/* <Navbar onGenreSelect={handleGenreSelect} onSearch={handleSearch}/> */}
   
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
     
    </Router>

    </div>
  );
}

export default App;