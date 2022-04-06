import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import { ThemeProvider } from "@mui/material";
import darkTheme from "./components/MuiTheme";
import AlertBar from "./components/AlertBar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.clear();
      }
    });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="app">
        <Routes>
          <Route
            path="/*"
            element={<Home alert={alert} setAlert={setAlert} />}
          />
          <Route
            path="/auth"
            element={<Auth alert={alert} setAlert={setAlert} />}
          />
        </Routes>
      </div>

      <AlertBar alert={alert} setAlert={setAlert} />
    </ThemeProvider>
  );
}

export default App;
