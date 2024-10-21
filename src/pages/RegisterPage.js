import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

const RegisterPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    setPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChangeUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("실행");
    e.preventDefault();
    try {
      if (userInfo.password !== userInfo.setPassword) {
        console.log("안맞냐?");
        throw new Error("패스워드가 일치하지 않습니다");
      }

      const res = await api.post("/user", {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      });

      if (res.status === 200) {
        navigate("/login");
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
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="string"
            placeholder="Name"
            onChange={(e) => onChangeUserInfo(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={(e) => onChangeUserInfo(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => onChangeUserInfo(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            name="setPassword"
            type="password"
            placeholder="re-enter the password"
            onChange={(e) => onChangeUserInfo(e)}
          />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
