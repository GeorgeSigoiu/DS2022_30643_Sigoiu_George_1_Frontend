import { BrowserRouter as Router, redirect, Route, Routes } from 'react-router-dom'
import Login from './components/authentificate/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import UsersList from './components/admin/UsersList';
import Navigation from './components/common/Navigation';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import DevicesList from './components/admin/DevicesList';

function App() {
  const [userType, setUserType] = useState("")
  const [tokens, setTokens] = useState("")

  useEffect(() => {
    console.log(userType)
  }, [userType])

  useEffect(() => {
    if (tokens !== "") {
      const access_token = tokens[0]
      const refresh_token = tokens[1]
      const decoded = jwt_decode(access_token)
      const roles = decoded.roles
      const role = roles[0]
      console.log(role)
      setUserType(role)
    }

  }, [tokens])

  function noop(element) {

  }

  return (
    <div className="App">
      <Router>
        <Navigation userType={userType} setUserType={setUserType} />
        <Routes>
          <Route path="/admin" element={<AdminDashboard tokens={tokens} setTokens={setTokens} />} />
          <Route path="/admin/users" element={<UsersList tokens={tokens} setTokens={setTokens} />} />
          <Route path="/admin/devices" element={<DevicesList tokens={tokens} setTokens={setTokens} />} />
          <Route path="/admin/settings" element={<div>SETTINGS</div>} />

          <Route path="/login" element={<Login setTokens={setTokens} setUserType={setUserType} />} />
          <Route path="/" element={<Login setTokens={setTokens} setUserType={setUserType} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
