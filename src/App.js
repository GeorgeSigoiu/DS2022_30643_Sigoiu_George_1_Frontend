import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/authentificate/Login';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
