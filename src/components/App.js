import { useState } from "react";
import { authService } from "../fbase";
import AppRouter from "./Router";

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
