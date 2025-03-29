import React, { useContext } from "react";
import LoginPage from "./Components/LoginPage";
import UserPage from "./Components/UserPage";
import AuthContext from "./Components/AuthContext.jsx";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="h-screen">
      {user ? <UserPage /> : <LoginPage />}
    </div>
  );
};

export default App;
