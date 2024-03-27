import { Button, Dropdown, Menu, Row } from "antd";
import {
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Middleware from "../../../middleware/middleware";
import { MiddlewareFunc } from "../../../middleware/function";
const StoreItemsMenu = () => {
  const navigate = useNavigate();
  return (
    <Dropdown
      overlay={
        <Menu selectedKeys={[location.pathname]}>
          <Middleware component_key="a2f84c65-d945-4f91-aba2-d129ff96e3e5">
            <Menu.Item
              className={
                location.pathname === "/member/create"
                  ? "_header_menu_items_active"
                  : "_header_menu_items"
              }
              onClick={() => navigate("/member/create")}
            >
              <Row>
                <UserAddOutlined
                  style={{ marginRight: "5px", fontSize: "20px" }}
                />
                <span style={{ fontSize: "16px" }}>สร้างผู้ใช้งานระบบ</span>
              </Row>
            </Menu.Item>
          </Middleware>
          <Middleware
            key="/member/list"
            component_key="c43ebd69-ac7d-480e-b808-5c5ff8fffbb4"
          >
            <Menu.Item
              className={
                location.pathname === "/member/list"
                  ? "_header_menu_items_active"
                  : "_header_menu_items"
              }
              onClick={() => navigate("/member/list")}
            >
              <Row>
                <TeamOutlined
                  style={{ marginRight: "5px", fontSize: "20px" }}
                />
                <span style={{ fontSize: "16px" }}>ผู้ใช้งานทั้งหมด</span>
              </Row>
            </Menu.Item>
          </Middleware>
        </Menu>
      }
      trigger={["click"]}
    >
      {MiddlewareFunc("a451ee9b-5d5f-4f89-8427-3646d6b2c816") ||
      MiddlewareFunc("a2f84c65-d945-4f91-aba2-d129ff96e3e5") ||
      MiddlewareFunc("c43ebd69-ac7d-480e-b808-5c5ff8fffbb4") ? (
        <Button
          type="link"
          size="large"
          className={
            location.pathname === "/member/create" ||
            location.pathname === "/member/list" ||
            location.pathname === "/branch"
              ? "topbar-menu-active"
              : "topbar-menu"
          }
          icon={<UserOutlined />}
        >
          ผู้ใช้งานระบบ
        </Button>
      ) : (
        <></>
      )}
    </Dropdown>
  );
};

export default StoreItemsMenu;
