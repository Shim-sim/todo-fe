import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

import { Link } from "react-router-dom";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChangeUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    console.log("실행");
    e.preventDefault();
    try {
      const res = await api.post("/user/login", {
        email: userInfo.email,
        password: userInfo.password,
      });

      if (res.status === 200) {
        setUser(res.data.user);
        sessionStorage.setItem("token", res.data.token);
        api.defaults.headers["auth"] = "Bearer " + res.data.token;
        navigate("/");
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="display-center">
      {error && <div>{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) => onChangeUserInfo(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => onChangeUserInfo(e)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
