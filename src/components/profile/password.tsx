import { Button, Col, Form, Input, Typography } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { RESET_PASSWORD } from "../../endpoint";

const Password = () => {
  const [formData, setFormData] = useState({
    password: "",
    reset_password: "",
    accept_password: "",
  });

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    if (formData.reset_password !== formData.accept_password) {
      toast.error("รหัสผ่านใหม่กับรหัสยืนยันไม่ตรงกัน");
      return;
    }
    try {
      const { data } = await axios.post(RESET_PASSWORD, formData);
      if (data.status === "success") {
        toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
        setFormData({
          password: "",
          reset_password: "",
          accept_password: "",
        });
        return;
      }
    } catch (err) {
      toast.error("มีบางอย่างผิดพลาด");
    }
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Col xs={24} lg={10} style={{ marginTop: "20px" }}>
          <Typography.Text style={{ fontSize: "16px" }}>
            รหัสผ่านปัจจุบัน
          </Typography.Text>
          <Input
            size="large"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </Col>
        <Col xs={24} lg={10} style={{ marginTop: "10px" }}>
          <Typography.Text style={{ fontSize: "16px" }}>
            รหัสผ่านใหม่
          </Typography.Text>
          <Input
            size="large"
            type="password"
            value={formData.reset_password}
            onChange={(e) => handleChange("reset_password", e.target.value)}
          />
        </Col>
        <Col xs={24} lg={10} style={{ marginTop: "10px" }}>
          <Typography.Text style={{ fontSize: "16px" }}>
            ยืนยันรหัสผ่านใหม่
          </Typography.Text>
          <Input
            size="large"
            type="password"
            value={formData.accept_password}
            onChange={(e) => handleChange("accept_password", e.target.value)}
          />
        </Col>
        <Button
          htmlType="submit"
          style={{ marginTop: "20px", width: "100px" }}
          type="primary"
          disabled={
            formData.password === "" ||
            formData.reset_password === "" ||
            formData.accept_password === ""
          }
        >
          บันทึก
        </Button>
      </Form>
    </>
  );
};

export default Password;
