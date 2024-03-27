import { useEffect, useState } from "react";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Layout, Row, Typography, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import DropdownHeader from "../components/layouts/dropdown-headers";
import MenuHeaders from "../components/layouts/menu-headers";
import DrawerSidebar from "../components/layouts/drawer-sidebar";
import moment from "moment";
const { Header, Content, Footer } = Layout;

export const Layouts = () => {
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return location.pathname.split("/")[1] === "detail" ? (
    <Outlet />
  ) : (
    <Layout style={{ minHeight: "100vh" }} className="context">
      {windowWidth < 1100 && (
        <>
          <DrawerSidebar
            open={openDrawer}
            handleClose={() => setOpenDrawer(false)}
          />
        </>
      )}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            width: "100%",
            position: "fixed",
            zIndex: "200",
            boxShadow: "rgba(76, 78, 100, 0.42) 0px 4px 8px -4px",
          }}
        >
          <Row justify="space-between">
            {windowWidth >= 1100 ? (
              <div style={{ marginTop: "-14px", marginLeft: "10px" }}></div>
            ) : (
              <MenuUnfoldOutlined
                style={{
                  marginTop: "18px",
                  marginLeft: "15px",
                  fontSize: "25px",
                  display: windowWidth >= 1100 ? "none" : "block",
                }}
                onClick={() => setOpenDrawer(true)}
              />
            )}

            {windowWidth >= 1100 && <MenuHeaders />}
            <Col>
              <DropdownHeader />
            </Col>
          </Row>
        </Header>

        <Content style={{ margin: "0 16px", marginTop: "60px", zIndex: 1 }}>
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            zIndex: 1,
            marginTop: "20px",
            background: "#FFF",
          }}
        >
          {" "}
          Devich Clinic ©{moment().format("YYYY")} Create by iam-party{" "}
        </Footer>
      </Layout>
    </Layout>
  );
};
