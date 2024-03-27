import { SafetyOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Middleware from "../../../middleware/middleware";
import { MiddlewareFunc } from "../../../middleware/function";

const RolePermissionItems = () => {
  const navigate = useNavigate();
  return (
    <Dropdown
      overlay={
        <Menu selectedKeys={[location.pathname]}>
          <Middleware component_key="7edcd290-f5cf-48ed-b4c2-2caedfda5c66">
            <Menu.Item
              className={
                location.pathname === "/roles"
                  ? "_header_menu_items_active"
                  : "_header_menu_items"
              }
              onClick={() => navigate("/roles")}
            >
              <Row className="pointer">
                <SafetyOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>ตั้งค่าบทบาท</span>
              </Row>
            </Menu.Item>
          </Middleware>
          <Middleware component_key="389979da-7cc9-44c3-adc3-3165186af98b">
            <Menu.Item
              className={
                location.pathname === "/permission"
                  ? "_header_menu_items_active"
                  : "_header_menu_items"
              }
              onClick={() => navigate("/permission")}
            >
              <Row className="pointer">
                <SmileOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>จัดการสิทธ์</span>
              </Row>
            </Menu.Item>
          </Middleware>
        </Menu>
      }
      trigger={["click"]}
    >
      {MiddlewareFunc("7edcd290-f5cf-48ed-b4c2-2caedfda5c66") ||
      MiddlewareFunc("389979da-7cc9-44c3-adc3-3165186af98b") ? (
        <Button
          type="link"
          size="large"
          className={
            location.pathname.split("/")[1] === "roles" ||
            location.pathname === "/permission"
              ? "topbar-menu-active"
              : "topbar-menu"
          }
          icon={<SafetyOutlined />}
        >
          บทบาทและสิทธ์
        </Button>
      ) : (
        <></>
      )}
    </Dropdown>
  );
};

export default RolePermissionItems;
