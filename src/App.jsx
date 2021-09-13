import React, { useState } from 'react'
import NavBar from './Components/NavBar/NavBar'
import { Route, Switch } from 'react-router-dom'
import AdminLoginForm from "./Components/Shared/AdminLoginForm"
import AdminSignUpForm from "./Components/Shared/AdminSignUpForm"
import UserSignUpForm from "./Components/Shared/UserSignUpForm"
import UserLoginForm from "./Components/Shared/UserLoginForm"
import Alert from './Components/Alert'

const App = () => {

  const [mode, setMode] = useState("light")
  const [alert, setAlert] = useState(null);
  const [visible, setVisible] = useState("password");

  const handleVisiblity = () => {
    if (visible === "password") {
      setVisible("text");
    } else {
      setVisible("password");
    }
  }

  const ToggleMode = () => {
    if (mode === "light") {
      document.body.style.backgroundColor = "black";
      setMode("dark")
    } else {
      document.body.style.backgroundColor = "white"
      setMode("light")
    }
  }

  const showAlert = (message, type) => {
    setAlert({
      message,
      type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NavBar mode={mode} ToggleMode={ToggleMode} />
      <Alert alert={alert} />
      <Switch>
        <Route exact path="/admin/login" >
          <AdminLoginForm mode={mode} showAlert={showAlert} visible={visible} handleVisiblity={handleVisiblity} />
        </Route>
        <Route exact path="/admin/signup" >
          <AdminSignUpForm mode={mode} showAlert={showAlert} visible={visible} handleVisiblity={handleVisiblity} />
        </Route>
        <Route exact path="/user/login">
          <UserLoginForm mode={mode} showAlert={showAlert} visible={visible} handleVisiblity={handleVisiblity} />
        </Route>
        <Route exact path="/user/signup" >
          <UserSignUpForm mode={mode} showAlert={showAlert} visible={visible} handleVisiblity={handleVisiblity} />
        </Route>
      </Switch>
    </>
  )
}

export default App;
