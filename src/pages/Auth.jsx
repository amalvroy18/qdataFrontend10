import React, { useContext } from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from '../services/allApi';
import { isLoginAuthContext } from '../context/Contextshare';

function Auth({ register }) {
  const navigate = useNavigate();
  const { setIsloginStatus } = useContext(isLoginAuthContext);

  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      alert('Please fill the fields completely');
    } else {
      const result = await registerApi(userDetails);
      console.log(result);
      if (result.status === 200) {
        alert('Registration successful');
        setUserDetails({
          username: '',
          email: '',
          password: '',
        });
        navigate('/login');
      } else {
        alert('Something went wrong');
        setUserDetails({
          username: '',
          email: '',
          password: '',
        });
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;

    if (!email || !password) {
      alert('Please fill the form completely');
    } else {
      const result = await loginApi({ email, password });
      console.log(result);
      if (result.status === 200) {
        alert('Login Successful');
        setUserDetails({
          username: '',
          email: '',
          password: '',
        });
        sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser));
        sessionStorage.setItem('token', result.data.token);
        navigate('/dashboard');
      } else {
        alert('Something went wrong');
        setUserDetails({
          username: '',
          email: '',
          password: '',
        });
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ marginBottom: '60px' }}>
      <div className="container">
        <h4 className="text-warning">
          <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
        </h4>
        <div className="bg-info p-3 rounded">
          <Row>
            <Col md={6} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
              <img
                src="https://media.tenor.com/p0G_bmA2vSYAAAAd/login.gif"
                alt="Login"
                className="img-fluid"
                style={{ maxHeight: '380px' }}
              />
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center">
              <form className="w-100">
                <h2 className="text-light text-center">Q Data</h2>
                {register ? (
                  <h5 className="text-light text-center">Sign In to your Account</h5>
                ) : (
                  <h5 className="text-light text-center">Login to your Account</h5>
                )}
                {register && (
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Username"
                      className="form-control rounded"
                      value={userDetails.username}
                      onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                    />
                  </div>
                )}
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email ID"
                    className="form-control rounded"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control rounded"
                    value={userDetails.password}
                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  {register ? (
                    <div>
                      <button
                        type="button"
                        className="btn btn-success w-100"
                        onClick={handleRegister}
                      >
                        Register
                      </button>
                      <p className="text-center">
                        Already a user? Click here to{' '}
                        <Link to="/login" className="text-warning">Login</Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <button
                        type="button"
                        className="btn btn-success w-100"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                      <p className="text-center">
                        New user? Click here to{' '}
                        <Link to="/register" className="text-warning">Register</Link>
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Auth;
