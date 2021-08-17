import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { signIn } from "../../actions/auth";

import "./LoginScreen.scss";

const LoginScreen = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const userData = useSelector((state) => state.auth);
  const { authData } = userData;
  const { addToast } = useToasts();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signIn(formData));
  };

  useEffect(() => {
    if (authData) {
      history.push(redirect);
      addToast("Logged In Successfully", {
        appearance: "success",
        autoDismiss: "true",
      });
    }
  }, [userData, history, redirect, authData]);

  return (
    <div className="auth">
      <h1 className="auth__header">Account Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__control">
          <label className="form__label">Email</label>
          <input
            name="email"
            className="form__input"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          ></input>
        </div>
        <div className="form__control">
          <label className="form__label">Password</label>
          <input
            name="password"
            className="form__input"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          ></input>
        </div>

        <button className="form__button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
