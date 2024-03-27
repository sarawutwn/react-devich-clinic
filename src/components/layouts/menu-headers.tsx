import { Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";

const MenuHeaders = () => {
  const navigate = useNavigate();

  return (
    <Row style={{ marginTop: "12px" }}>
      <Button
        type="link"
        size="large"
        className={
          location.pathname === "/" ? "topbar-menu-active" : "topbar-menu"
        }
        icon={<AppstoreOutlined />}
        onClick={() => navigate("/admin-dashboard")}
      >
        หน้าหลัก
      </Button>

      <Button
        type="link"
        size="large"
        className={
          location.pathname === "/customer"
            ? "topbar-menu-active"
            : "topbar-menu"
        }
        onClick={() => navigate("/customer")}
        icon={<UserOutlined />}
      >
        จัดการลูกค้า
      </Button>
    </Row>
  );
};

export default MenuHeaders;
