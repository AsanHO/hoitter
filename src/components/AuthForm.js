import { useState } from "react";
import { authService } from "../fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccout] = useState(true);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, pw);
      } else {
        data = await authService.signInWithEmailAndPassword(email, pw);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "pw") {
      setPw(value);
    }
  };
  const toggleAccount = () => setNewAccout((cur) => !cur);
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="email"
          required
          className="authInput"
        />
        <input
          onChange={onChange}
          name="pw"
          type="password"
          placeholder="PW"
          required
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "SignIn" : "Create Account"}
      </span>
    </>
  );
};
export default AuthForm;
