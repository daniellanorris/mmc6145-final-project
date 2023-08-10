import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import Button from '../components/button'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session;
    const props = {};
    if (user) {
      props.user = req.session.user;
    }
    props.isLoggedIn = !!user;
    return { props };
  },
  sessionOptions
);

export default function Login(props) {
  const router = useRouter();
  const [{ username, password }, setForm] = useState({
    username: "",
    password: "",
  });


  function handleChange(e) {
    setForm({ username, password, ...{ [e.target.name]: e.target.value } });
  }

  const [error, setError] = useState("")
  
  async function handleLogin(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim())
      return setError('Must include username and password');
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 200) return router.back();
  
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className="card bg-secondary">
        <form onSubmit={handleLogin}>
          <label htmlFor="username" style={{ color: "white" }}>  username  </label>
          <input
            name="username"
            id="username"
            onChange={handleChange}
            value={username}
          />
          <label htmlFor="password" style={{ color: "white" }}>  password  </label>
          <input
            name="password"
            id="password"
            onChange={handleChange}
            value={password}
          />
          <button>Log In</button>
        </form>
        <Link href="/signup">
          <Button> Sign up </Button>
        </Link>
      </div>
    </>
  );
}