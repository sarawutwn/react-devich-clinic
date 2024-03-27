import { Drawer, Menu, Row, Typography } from "antd";
import {
  PieChartOutlined,
  AppstoreOutlined,
  SafetyOutlined,
  BankOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  QrcodeOutlined,
  CreditCardOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MiddlewareFunc } from "../../middleware/function";

type Props = {
  open: boolean;
  handleClose: any;
};

const DrawerSidebar = ({ open, handleClose }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        title={
          <img
            src="/images/text-trans.png"
            style={{
              width: "180px",
              padding: "-20px",
              marginTop: "-10px",
              marginBottom: "-10px",
            }}
          />
        }
        placement="left"
        closable={false}
        onClose={handleClose}
        open={open}
        key={"left"}
        width={250}
        bodyStyle={{
          padding: "5px",
        }}
      >
        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          onClick={(e) => {
            handleClose();
            navigate(e.key);
          }}
        >
          {MiddlewareFunc("d2a33a9a-bdb6-4b32-8158-2449adc26eaf") ? (
            <Menu.Item key="/admin-dashboard">
              <Row className="pointer">
                <AppstoreOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>หน้าหลัก</span>
              </Row>
            </Menu.Item>
          ) : null}

          {MiddlewareFunc("3607c526-ab2b-4d40-b65f-a8040cb87c31") ? (
            <Menu.Item key="/admin-prefix">
              <Row className="pointer">
                <BankOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>ร้านค้าทั้งหมด</span>
              </Row>
            </Menu.Item>
          ) : null}

          {MiddlewareFunc("bb1cbff1-074e-4948-a571-135f52bf06a6") ? (
            <Menu.Item key="/admin-payments">
              <Row className="pointer">
                <CreditCardOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>รายการจ่ายเงิน</span>
              </Row>
            </Menu.Item>
          ) : null}

          {MiddlewareFunc("b2e3e6e2-7291-44e5-9be8-6c247f53849c") ? (
            <Menu.Item key="/admin-users">
              <Row className="pointer">
                <UserSwitchOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>ผู้ใช้งานระบบ</span>
              </Row>
            </Menu.Item>
          ) : null}

          {MiddlewareFunc("e412c7ea-68bb-4c79-a247-35938a12b491") ? (
            <Menu.Item key="/dashboard">
              <Row className="pointer">
                <AppstoreOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>หน้าหลัก</span>
              </Row>
            </Menu.Item>
          ) : null}

          {MiddlewareFunc("0c51f3f2-c446-4dfb-9212-139ad1651e52") ? (
            <Menu.Item key="/transaction">
              <Row className="pointer">
                <FileTextOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>รายการ</span>
              </Row>
            </Menu.Item>
          ) : null}

          {MiddlewareFunc("e7f11065-d94d-4c80-b5c2-a8ae10dd2780") ? (
            <Menu.Item key="/prefix-detail">
              <Row className="pointer">
                <QrcodeOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>โปรไฟล์ร้าน</span>
              </Row>
            </Menu.Item>
          ) : null}

          {MiddlewareFunc("b3fb9720-44e3-4eed-a26e-eabb3b7b65e6") ? (
            <Menu.Item key="/product">
              <Row className="pointer">
                <ShoppingCartOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>สินค้า & บริการ</span>
              </Row>
            </Menu.Item>
          ) : null}

          {/* <Menu.Item key="/reservation">
            <Row className="pointer">
              <BookOutlined
                style={{
                  fontSize: "18px",
                  marginTop: "-1px",
                  marginRight: "5px",
                }}
              />
              <span style={{ fontSize: "16px" }}>ตั้งค่าการจองโต๊ะ</span>
            </Row>
          </Menu.Item> */}

          {MiddlewareFunc("a69708c2-25bc-4103-8958-b05295759dbb") ? (
            <Menu.Item key="/application">
              <Row className="pointer">
                <SettingOutlined
                  style={{
                    fontSize: "18px",
                    marginTop: "-1px",
                    marginRight: "5px",
                  }}
                />
                <span style={{ fontSize: "16px" }}>ตั้งค่าธีมเว็บไซต์</span>
              </Row>
            </Menu.Item>
          ) : null}

          {MiddlewareFunc("a2f84c65-d945-4f91-aba2-d129ff96e3e5") ||
          MiddlewareFunc("c43ebd69-ac7d-480e-b808-5c5ff8fffbb4") ? (
            <Menu.SubMenu
              key="/member"
              title={
                <span>
                  <BankOutlined
                    style={{
                      fontSize: "18px",
                      marginTop: "-1px",
                      marginRight: "5px",
                    }}
                  />
                  <span style={{ fontSize: "16px" }}>ร้านค้าของคุณ</span>
                </span>
              }
            >
              {MiddlewareFunc("a2f84c65-d945-4f91-aba2-d129ff96e3e5") ? (
                <Menu.Item key="/member/create">
                  <span>สร้างผู้ใช้งานระบบ</span>
                </Menu.Item>
              ) : null}
              {MiddlewareFunc("c43ebd69-ac7d-480e-b808-5c5ff8fffbb4") ? (
                <Menu.Item key="/member/list">
                  <span>ผู้ใช้งานทั้งหมด</span>
                </Menu.Item>
              ) : null}
            </Menu.SubMenu>
          ) : null}

          {MiddlewareFunc("7edcd290-f5cf-48ed-b4c2-2caedfda5c66") ||
          MiddlewareFunc("389979da-7cc9-44c3-adc3-3165186af98b") ? (
            <Menu.SubMenu
              key="/role-permission"
              title={
                <span>
                  <SafetyOutlined
                    style={{
                      fontSize: "18px",
                      marginTop: "-1px",
                      marginRight: "5px",
                    }}
                  />
                  <span style={{ fontSize: "16px" }}>บทบาทและสิทธ์</span>
                </span>
              }
            >
              {MiddlewareFunc("7edcd290-f5cf-48ed-b4c2-2caedfda5c66") ? (
                <Menu.Item key="/roles">
                  <span>ตั้งค่าบทบาท</span>
                </Menu.Item>
              ) : null}
              {MiddlewareFunc("389979da-7cc9-44c3-adc3-3165186af98b") ? (
                <Menu.Item key="/permission">
                  <span>จัดการสิทธ์</span>
                </Menu.Item>
              ) : null}
            </Menu.SubMenu>
          ) : null}

          <Menu.Item key="/profile">
            <Row className="pointer">
              <PieChartOutlined
                style={{
                  fontSize: "18px",
                  marginTop: "-1px",
                  marginRight: "5px",
                }}
              />
              <span style={{ fontSize: "16px" }}>โปรไฟล์</span>
            </Row>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default DrawerSidebar;
