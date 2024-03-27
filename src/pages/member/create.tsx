import { Button, Col, Input, Row, Select, Typography } from "antd";
import Warper from "../../utils/warpper-page";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADD_PREFIX_USERS, GET_ROLES } from "../../endpoint";
import { connect } from "react-redux";
import store from "../../redux/store";
import { toast } from "react-toastify";

const MemberCreate = (props: any) => {
  const [user, setUser] = useState({
    username: "",
    telephone: "",
    role_id: "",
  });
  const [password, setPassword] = useState({
    password: "",
    submit_password: "",
  });

  const handleSubmit = async () => {
    try {
      if (password.password !== password.submit_password) {
        toast.error("รหัสผ่านไม่ตรงกัน!");
        return;
      }
      let formData = {
        user_username: user.username,
        user_telephone: user.telephone,
        user_password: password.password,
        role_id: user.role_id,
      };
      const { data } = await axios.post(ADD_PREFIX_USERS, formData);
      if (data.status === "success") {
        toast.success("เพิ่มผู้ใช้งานสำเร็จ");
        setUser({
          username: "",
          telephone: "",
          role_id: "",
        });
        setPassword({
          password: "",
          submit_password: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRoles = async () => {
    try {
      const { data } = await axios.get(GET_ROLES);
      if (data.status === "success") {
        store.dispatch({ type: "SET_ROLES", payload: data.result });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.Roles.length === 0) {
      fetchRoles();
    }
  }, []);
  return (
    <Warper pointer={["หน้าหลัก", "ผู้ใช้งานระบบ", "สร้างผู้ใช้งานระบบ"]}>
      <Row style={{ marginBottom: "20px" }}>
        <img src="/images/member/employee.png" width={70} height={70} />
        <Col style={{ marginTop: "-16px" }}>
          <Typography.Title
            style={{ marginBottom: "0", marginLeft: "12px" }}
            level={2}
          >
            เพิ่มผู้ใช้งานใหม่
          </Typography.Title>
          <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
            เพิ่มรายชื่อผู้ใช้งานในระบบของคุณ
          </Typography.Text>
        </Col>
      </Row>
      <Typography.Text style={{ fontSize: "20px" }}>
        ข้อมูลเบื้องต้น
      </Typography.Text>
      <Row gutter={[16, 10]} style={{ marginBottom: "16px" }}>
        <Col xs={24} sm={12} lg={9}>
          <Typography.Text style={{ color: "#888888" }}>
            บัญชีผู้ใช้งาน
          </Typography.Text>
          <Input
            size="large"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Col>
        <Col xs={24} sm={12} lg={9}>
          <Typography.Text style={{ color: "#888888" }}>
            เบอร์โทรศัพท์
          </Typography.Text>
          <Input
            value={user.telephone}
            size="large"
            type="phone"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onChange={(e) => setUser({ ...user, telephone: e.target.value })}
          />
        </Col>
        <Col xs={24} sm={12} lg={9}>
          <Typography.Text style={{ color: "#888888" }}>
            รหัสผ่าน
          </Typography.Text>
          <Input
            value={password.password}
            size="large"
            type="password"
            onChange={(e) =>
              setPassword({ ...password, password: e.target.value })
            }
          />
        </Col>
        <Col xs={24} sm={12} lg={9}>
          <Typography.Text style={{ color: "#888888" }}>
            ยืนยันสหัสผ่าน
          </Typography.Text>
          <Input
            value={password.submit_password}
            size="large"
            type="password"
            onChange={(e) =>
              setPassword({ ...password, submit_password: e.target.value })
            }
          />
        </Col>
      </Row>
      <Typography.Text style={{ fontSize: "20px" }}>
        สิทธ์การใช้งาน
      </Typography.Text>
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col xs={24} sm={24} lg={18}>
          <Typography.Text style={{ color: "#888888" }}>บทบาท</Typography.Text>
          <Select
            value={user.role_id}
            style={{ width: "100%" }}
            size="large"
            onChange={(value) => setUser({ ...user, role_id: value })}
            options={
              props.Roles.length !== 0 &&
              props.Roles.map((item: any) => {
                return {
                  value: item.role_id,
                  label: `${item.role_name} | ${item.role_description}`,
                };
              })
            }
          />
        </Col>
      </Row>
      <Button
        size="large"
        type="primary"
        style={{ width: "120px" }}
        onClick={handleSubmit}
      >
        บันทึก
      </Button>
    </Warper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    Roles: state.roles,
  };
};
export default connect(mapStateToProps)(MemberCreate);
