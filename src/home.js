import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Otpverify from "./otpverify";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Verify OTP", "1", <PieChartOutlined />),
  getItem("Movies", "2", <DesktopOutlined />),
  getItem("User", "3", <UserOutlined />),
  getItem("Payments", "4", <TeamOutlined />),
  getItem("Files", "5", <FileOutlined />),
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUsername(doc.data().username);
            setUserEmail(doc.data().email);
          });
        } catch (error) {
          console.error("Error getting document:", error);
        }
      }
    });

    return () => unsubscribe(); // Cleanup the auth state listener on component unmount
  }, []); // Empty dependency array ensures this effect runs only once

  const hanldelogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[selectedMenuItem]}
          mode="inline"
          onClick={(e) => setSelectedMenuItem(e.key)}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 10,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4 style={{ marginTop: "-10px" }}>User Name: {username}</h4>
            {/* <h4>User Email: {userEmail}</h4> */}
            <Button onClick={hanldelogout}>Logout</Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "20px 16px",
          }}
        >
          {selectedMenuItem === "1" && (
            <div
              style={{
                padding: 24,
                minHeight: 460,
                background: colorBgContainer,
              }}
            >
              Content for Team
            </div>
          )}

          {selectedMenuItem === "2" && (
            <div
              style={{
                padding: 24,
                minHeight: 460,
                background: colorBgContainer,
              }}
            >
              Content for Option 2
            </div>
          )}

          {selectedMenuItem === "3" && (
            <div
              style={{
                padding: 24,
                minHeight: 460,
                background: colorBgContainer,
              }}
            >
              Content for User
            </div>
          )}

          {selectedMenuItem === "4" && <Otpverify />}

          {selectedMenuItem === "5" && (
            <div
              style={{
                padding: 24,
                minHeight: 460,
                background: colorBgContainer,
              }}
            >
              Content for Files
            </div>
          )}
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ©All copy Rights were reserved
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;
