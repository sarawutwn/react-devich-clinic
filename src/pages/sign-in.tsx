import { Button, Card, Col, Form, Input, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { SIGN_IN } from "../endpoint";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

interface MyToken {
  role_id: string;
  exp: number;
}

const Login = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(SIGN_IN, {
        user_username: username,
        user_password: password,
      });
      if(data.status === "User Not Found") {
        toast.error("ไม่มีผู้ใช้นี้อยู่ในระบบ!");
      }
      if(data.status === "Password not compare") {
        toast.error("รหัสผ่านไม่ถูกต้อง!");
      }
      if (data.status === "success") {
        const dataToken = jwtDecode<MyToken>(String(data.token));
        if (dataToken.role_id === "7fde5ae9-1c38-4bb1-88b7-4fd06d7eef7a") {
          localStorage.setItem("TOKEN", data.token);
          if (searchParams.get("transaction_detail") !== null) {
            window.location.href = `/detail/${searchParams.get(
              "transaction_detail"
            )}`;
            return;
          }
          window.location.href = "/admin-dashboard";
        } else {
          localStorage.setItem("TOKEN", data.token);
          if (searchParams.get("transaction_detail") !== null) {
            window.location.href = `/detail/${searchParams.get(
              "transaction_detail"
            )}`;
            return;
          }
          window.location.href = "/dashboard";
        }
      }
    } catch (err: any) {
      if (err.response.data.message === "Not have this users!") {
        toast.error("ไม่มีผู้ใช้นี้อยู่ในระบบ!");
      }
      if (err.response.data.message === "Password is not compare!") {
        toast.error("รหัสผ่านไม่ถูกต้อง!");
      }
      if (err.response.data.message === "This user is close to sign-in!") {
        toast.error("ผู้ใช้งานนี้ ถูกปิดการใช้งาน!");
      }
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <Card
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "0px",
          }}
        >
          <Form onFinish={handleSubmit}>
            <Col>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
              >
                <Typography.Text
                  style={{ fontSize: "28px", fontWeight: "bold" }}
                >
                  Welcome to ShowWarp
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: "18px", color: "rgba(76, 78, 100, 0.6)" }}
                >
                  กรุณาเข้าสู่ระบบเพื่อเข้าใช้งาน
                </Typography.Text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <Typography.Text>บัญชีผู้ใช้งาน</Typography.Text>
                <Form.Item>
                  <Input
                    value={username}
                    size="large"
                    style={{ width: "310px" }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: "-20px",
                }}
              >
                <Typography.Text>รหัสผ่านเข้าใช้งาน</Typography.Text>
                <Form.Item>
                  <Input
                    value={password}
                    type="password"
                    size="large"
                    style={{ width: "310px" }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%" }}
                >
                  SIGN IN
                </Button>
              </div>
            </Col>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
