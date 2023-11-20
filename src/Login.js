import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Image } from "antd";
import { Link } from "react-router-dom";
import previewurl from "./assets/images/login2.png";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.username,
        values.password
      );
      const user = userCredential.user;

      // Save user data to Firestore

      // Store user info in local storage
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("username", user.username);
      navigate("/");
      // Redirect to another page or perform any other actions after successful registration
    } catch (error) {
      console.error("Error login with the username password:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        // background: "linear-gradient(to right, #4568dc, #b06ab3)",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover", // Use "cover" instead of "100% 100%"
        overflow: "hidden", // Add this line
      }}
    >
      <div
        style={{
          heignt: "100px",
          width: "300px",
          borderRadius: "20px",
          padding: "20px",
          margin: "auto",
          background: "#f8f8f8", // Corrected typo here
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)", // Added valid boxShadow value
          border: "1px solid #ffc3a0",
        }}
      >
        <center>
          <h1>Log-In</h1>
        </center>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Log in
            </Button>
            <center>
              <p style={{ margin: "20px " }}>
                <span>Dont have an Account</span>
                <Link to="/signup"> Sign-Up!</Link>
              </p>
            </center>
          </Form.Item>
        </Form>
      </div>
      <div style={{ margin: "auto" }}>
        <Image
          src={previewurl}
          alt=""
          preview={false}
          style={{ height: "500px", width: "500px" }}
        />
      </div>
    </div>
  );
};
export default Login;
