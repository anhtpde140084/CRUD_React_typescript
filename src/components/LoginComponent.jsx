import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Redirect, useHistory } from "react-router-dom";
import AuthService from "../services/AdminService/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import "../styles/style.css";
import { input_error } from "../constant/MessageValid";

/**
 * LoginComponent
 *
 * Version 1.0
 *
 * Date: 06-07-2021
 *
 * Copyright
 *
 * Modification Logs:
 * DATE                 AUTHOR          DESCRIPTION
 * -----------------------------------------------------------------------
 * 06-07-2021          Anhtp8           Login page common 
 */
const LoginComponent = (props) => {
  /**
   * selector state
   */
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [mess, setMess]  = useState('')
  // get dispatch
  const dispatch = useDispatch();

  // css
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  //=========================

  
/**
 * 
 * @param {*} values 
 * submit event
 */
  const onFinish = (values) => {
    dispatch(login(values))
      .then(() => {
        console.log("ok");
        props.history.push("/admin/");
      })
      .catch((err) => {
        setMess("Username or password is incorrect!")
      });
  };

  // check login
  if (isLoggedIn) {
    return <Redirect to="/admin/" />;
  }

  // return
  return (
    <div>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img
                src="https://i.pinimg.com/736x/ab/f8/94/abf894fa4163e4507f85e8e831d4ae0e.jpg"
                alt="Image"
                className="img-fluid"
                style={{ height: "600px", width: "400px" }}
              />
            </div>
            <div className="col-md-6 contents">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Sign In</h3>
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                      consectetur adipisicing.
                    </p>
                  </div>
                  <Form onFinish={onFinish.bind(this)}>
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: input_error,
                        },
                      ]}
                      className="form-group last"
                    >
                      <Input
                        className="form-control"
                        maxLength={35}
                        placeholder={"Username"}
                      />
                    </Form.Item>
                    <Form.Item
                      style={{ marginTop: "10px" }}
                      label="Password"
                      name="password"
                      type="password"
                      rules={[
                        {
                          required: true,
                          message: input_error,
                        },
                      ]}
                      className="form-group last mb-4"
                    >
                      <Input
                        type="password"
                        className="form-control"
                        placeholder={"Password"}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn btn-block btn-primary"
                      >
                        Submit
                      </Button>
                    </Form.Item>

                    <div
                      style={{
                        fontSize: "15px",
                        textAlign: "center",
                        color: "red",
                      }}
                    >
                      {mess}
                    </div>

                    <span className="d-block text-left my-4 text-muted">
                      &mdash; or login with &mdash;
                    </span>

                    <div className="social-login">
                      <a href="#" className="facebook">
                        <span className="icon-facebook mr-3"></span>
                      </a>
                      <a href="#" className="twitter">
                        <span className="icon-twitter mr-3"></span>
                      </a>
                      <a href="#" className="google">
                        <span className="icon-google mr-3"></span>
                      </a>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
