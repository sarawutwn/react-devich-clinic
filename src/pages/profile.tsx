import { Col, Row, Tabs, TabsProps, Typography } from "antd";
import Warper from "../utils/warpper-page";
import MyAccount from "../components/profile/my-account";
import Password from "../components/profile/password";

const items: TabsProps["items"] = [
  {
    key: "my-account",
    label: (
      <Typography.Text style={{ fontSize: "22px" }}>
        ข้อมูลของฉัน
      </Typography.Text>
    ),
    children: <MyAccount />,
  },
  {
    key: "password",
    label: (
      <Typography.Text style={{ fontSize: "22px" }}>เปลี่ยนรหัสผ่าน</Typography.Text>
    ),
    children: <Password />,
  },
];

const Profile = () => {
  return (
    <Warper pointer={["หน้าหลัก", "โปรไฟล์"]}>
      <Row>
        <img src="/images/profile/human.png" width={70} height={70} />
        <Col style={{ marginTop: "-16px" }}>
          <Typography.Title
            style={{ marginBottom: "0", marginLeft: "12px" }}
            level={2}
          >
            โปรไฟล์ของฉัน
          </Typography.Title>
          <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
            แก้ไขข้อมูลต่างๆ ของคุณ
          </Typography.Text>
        </Col>
      </Row>
      <Tabs defaultActiveKey="my-account" items={items} size="large" />
    </Warper>
  );
};

export default Profile;
