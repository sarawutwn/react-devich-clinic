import { Drawer, Menu, Row } from "antd";
import { PieChartOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
          <Menu.Item key="/">
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

          <Menu.Item key="/customer">
            <Row className="pointer">
              <PieChartOutlined
                style={{
                  fontSize: "18px",
                  marginTop: "-1px",
                  marginRight: "5px",
                }}
              />
              <span style={{ fontSize: "16px" }}>จัดการลูกค้า</span>
            </Row>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default DrawerSidebar;
