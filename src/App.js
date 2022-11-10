import { BrowserRouter as Router, redirect, Route, Routes } from 'react-router-dom'
import Login from './components/authentificate/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import UsersList from './components/admin/UsersList';
import Navigation from './components/common/Navigation';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import DevicesList from './components/common/DevicesList';
import Settings from './components/common/Settings';
import ClientDashboard from './components/client/ClientDashboard';

function App() {
  const [userType, setUserType] = useState("")
  const [tokens, setTokens] = useState("")
  const [loggedUser, setLoggedUser] = useState("")

  useEffect(() => {
  }, [userType])

  useEffect(() => {
  }, [loggedUser])

  useEffect(() => {
    if (tokens !== "") {
      const access_token = tokens[0]
      const decoded = jwt_decode(access_token)
      const roles = decoded.roles
      const role = roles[0]
      setUserType(role)
      localStorage.setItem("access_token", tokens[0])
      localStorage.setItem("refresh_token", tokens[1])
    } else {
      localStorage.setItem("access_token", "")
      localStorage.setItem("refresh_token", "")
    }
  }, [tokens])

  return (
    <div className="App">
      <Router>
        <Navigation userType={userType} setUserType={setUserType} />
        <Routes>
          <Route path="/admin" element={<AdminDashboard loggedUser={loggedUser} />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/devices" element={<DevicesList role="admin" />} />

          <Route path="/user/settings" element={<Settings loggedUser={loggedUser} setLoggedUser={setLoggedUser} />} />

          <Route path="/client" element={<ClientDashboard loggedUser={loggedUser} />} />
          <Route path="/client/devices" element={<DevicesList role="client" loggedUser={loggedUser} />} />

          <Route path="/login" element={<Login setTokens={setTokens} setUserType={setUserType} setLoggedUser={setLoggedUser} />} />
          <Route path="/" element={<Login setTokens={setTokens} setUserType={setUserType} setLoggedUser={setLoggedUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
