import Home from "./components/Home"
import Navbar from './components/Navbar'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div>
      <Router>
      <Navbar />
      <div style={{ marginTop: '100px' }}> {/* Adjust to the height of the navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>

    </div>
  );
}

export default App;