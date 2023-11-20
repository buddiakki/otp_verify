import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Select, Image } from "antd";
import Imageloader from "./assets/images/signup1.png";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase"; // Assuming your firebase.js file is in the same directory

import { Link, useNavigate } from "react-router-dom";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      // Save user data to Firestore
      const docRef = await addDoc(collection(db, "users"), {
        username: values.username,
        email: values.email,
        gender: values.gender,
      });

      console.log("Document written with ID: ", docRef);

      // Store user info in local storage
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("userEmail", user.email);
      //   localStorage.setItem("username", values.username);
      navigate("/");
      // Redirect to another page or perform any other actions after successful registration
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          margin: "auto",
          padding: "10px 40px 10px 40px",
          borderRadius: "20px",
          background: "#f8f8f8", // Corrected typo here
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", // Added valid boxShadow value
          border: "1px solid #ff615a",
        }}
      >
        <center>
          <h1>Sign-Up</h1>
        </center>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter your User Name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="confirm pswd"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("New password Doesnt Match"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Sign-Up
            </Button>
          </Form.Item>
          <center>
            <p>
              Already have an Account <Link to={"/login"}>Log-In</Link>
            </p>
          </center>
        </Form>
      </div>
      <div style={{ margin: "auto" }}>
        <Image
          src={Imageloader}
          alt=""
          preview={false}
          style={{ height: "550px", width: "550px" }}
        ></Image>
      </div>
    </div>
  );
};
export default Signup;
