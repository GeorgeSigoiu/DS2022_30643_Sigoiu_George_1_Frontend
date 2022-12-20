import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/authentificate/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import UsersList from './components/admin/UsersList';
import Navigation from './components/common/Navigation';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import DevicesList from './components/common/DevicesList';
import Settings from './components/common/Settings';
import ClientDashboard from './components/client/ClientDashboard';
import WebSocket from './components/common/WebSocket';
import WebSocket2 from './components/common/WebSocket2';
import MessagesOperation from './components/admin/MessagesOperation';

function App() {

  const [userType, setUserType] = useState("")
  const [tokens, setTokens] = useState("")
  const [loggedUser, setLoggedUser] = useState("")
  const [message, setMessage] = useState({});
  const [newConsumption, setNewConsumption] = useState({})
  const [username, setUsername] = useState("")

  useEffect(() => {
    setUsername()
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
      localStorage.setItem("username", "")
      localStorage.setItem("role", "")
      setUsername("")
    }
  }, [tokens])


  const [messageFromWebSocket, setMessageFromWebsocket] = useState("")
  useEffect(() => {
    if (messageFromWebSocket === "is typing" ||
      messageFromWebSocket === "not typig") {

    } else {
      setMessageFromWebsocket("")

    }
  }, [messageFromWebSocket])

  return (
    <div className="App">
      <Router>
        <Navigation setUserType={setUserType} message={message} />
        <Routes>
          <Route path="/admin" element={<AdminDashboard loggedUser={loggedUser} />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/devices" element={<DevicesList role="admin" />} />
          <Route path="/admin/messages" element={<MessagesOperation messageFromWebSocket={messageFromWebSocket} />} />

          <Route path="/user/settings" element={<Settings loggedUser={loggedUser} setLoggedUser={setLoggedUser} />} />

          <Route path="/client" element={<ClientDashboard loggedUser={loggedUser} messageFromWebSocket={messageFromWebSocket} />} />
          <Route path="/client/devices" element={<DevicesList role="client" loggedUser={loggedUser} newConsumption={newConsumption} />} />

          <Route path="/login" element={<Login setTokens={setTokens} setUserType={setUserType} setLoggedUser={setLoggedUser} setUsername={setUsername} />} />
          <Route path="/" element={<Login setTokens={setTokens} setUserType={setUserType} setLoggedUser={setLoggedUser} setUsername={setUsername} />} />
        </Routes>
        <WebSocket setMessage={setMessage} setNewConsumption={setNewConsumption} username={username} />
        {
          username !== "" && (
            <WebSocket2 userType={userType} setMessageFromWebsocket={setMessageFromWebsocket} />
          )
        }
      </Router>
    </div>
  );
}

export default App;
