import { useEffect, useRef } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, loginAccount, error, loading } = useAuth();

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(loginForm.current.email.va);
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    loginAccount(email, password);
  };

  {
    loading && <LoadingPage />;
  }

  return (
    <div className="container login-form p-3 rounded">
      <h1 className="fs-1 fw-bolder text-dark text-center my-3">Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <form ref={loginForm} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-dark w-50 mt-3 ">Login </button>
        </div>
        <p className="text-center mt-3">
          If you don't have an account?{" "}
          <span className="text-primary pe-auto">Create Now</span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
