import React, { useState } from "react";
import mobileImg from "../images/login-mobile.png";
import logo from "../images/logo.png";

const Auth = ({ setEmail, setPassword, setUserName, handleAuth }) => {
  const [auth, setAuth] = useState("login");
  return (
    <div>
      <div className="auth_form">
        <div className="columns is-centered is-align-items-center is-multiline">
          <div className="column is-hidden-mobile is-half-tablet is-narrow-desktop">
            <div className="image" style={{ width: "400px", margin: "auto" }}>
              <img src={mobileImg} alt="" />
            </div>
          </div>
          {auth === "login" && (
            <div className="column is-full-mobile is-half-tablet is-4-desktop">
              <div className="card">
                <div className="card-image">
                  <img src={logo} alt="" style={{ width: "200px" }} />
                </div>
                <div className="card-content">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAuth(auth);
                    }}
                  >
                    <div className="field">
                      <input
                        type="email"
                        className="input"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="field has-margin-top-30">
                      <button
                        className="button is-fullwidth is-info"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAuth("login");
                        }}
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="field">
                      <a
                        className="link has-text-centered"
                        onClick={(e) => {
                          e.preventDefault();
                          setAuth("signup");
                        }}
                      >
                        <small>Don't have an Account!</small> Sign Up Now
                      </a>
                    </div>
                    <div className="is-divider" data-content="OR"></div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {auth === "signup" && (
            <div className="column is-full-mobile is-half-tablet is-4-desktop">
              <div className="card">
                <div className="card-image">
                  <img src={logo} alt="" style={{ width: "200px" }} />
                </div>
                <div className="card-content">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAuth(auth);
                    }}
                  >
                    <div className="field">
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter Username"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <input
                        type="email"
                        className="input"
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="field has-margin-top-30">
                      <button className="button is-fullwidth is-info">
                        Sign Up
                      </button>
                    </div>
                    <div className="field">
                      <a
                        className="link has-text-centered"
                        onClick={() => {
                          setAuth("login");
                        }}
                      >
                        <small>Already have an Account!</small> SignIn
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
