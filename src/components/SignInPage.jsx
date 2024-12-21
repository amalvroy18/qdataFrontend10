import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          {/* Left Side Image */}
          <div className="col-lg-6 col-md-6 col-sm-12 text-center">
            <img 
              src="https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg" 
              alt="Login Illustration" 
              className="img-fluid mt-4"
              style={{ maxHeight: "450px" }}
            />
          </div>
          {/* Right Side Form */}
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="p-4 shadow rounded">
              <h1 className="text-center text-success">Sign In</h1>
              <form>
                <input 
                  type="email" 
                  className="form-control mt-3 rounded-3" 
                  placeholder="Email Id" 
                />
                <input 
                  type="text" 
                  className="form-control mt-3 rounded-3" 
                  placeholder="User Name" 
                />
                <input 
                  type="text" 
                  className="form-control mt-4 rounded-3" 
                  placeholder="Password" 
                />
                <button 
                  type="submit" 
                  className="btn btn-success mt-4 w-100">
                  Sign In
                </button>
                <p className="mt-3 text-center">
                  Already a user? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
