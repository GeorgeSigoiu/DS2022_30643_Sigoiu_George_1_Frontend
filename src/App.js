import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/authentificate/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import UsersList from './components/admin/UsersList';
import Navigation from './components/common/Navigation';
import { useState, useEffect } from 'react';

function App() {

  const [userType, setUserType] = useState("")

  useEffect(() => {
    console.log(userType)
  }, [userType])


  return (
    <div className="App">
      <Router>
        <Navigation userType={userType} setUserType={setUserType} />
        <Routes>
          <Route path="/admin" element={<AdminDashboard setUserType={setUserType} />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/devices" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
