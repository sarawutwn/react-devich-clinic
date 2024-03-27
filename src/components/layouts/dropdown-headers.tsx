import { Col, Dropdown, MenuProps, Row, Space, Typography } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { GET_PROFILE } from "../../endpoint";
import store from "../../redux/store";
import { useEffect } from "react";

const DropdownHeader = (props: any) => {
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(GET_PROFILE);
      if (data.status === "success") {
        store.dispatch({ type: "SET_PROFILE", payload: data.result });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.profile.user_id === "") {
      fetchData();
    }
  }, []);

  const items: MenuProps["items"] = [
    {
      label: (
        <Col>
          <Row justify="center">
            <img
              src={props.profile?.user_img  || "/images/admin.jpg"}
              style={{ borderRadius: "50px", width: "50px" }}
            />
          </Row>
          <Row justify="center">
            <Typography.Text>{props.profile?.user_username}</Typography.Text>
          </Row>
        </Col>
      ),
      key: "บัญชีของฉัน",
      onClick: () => navigate("/profile"),
    },
    {
      type: "divider",
    },
    {
      label: (
        <Row>
          <LogoutOutlined style={{ marginRight: "10px", fontSize: "16px" }} />
          <Typography.Text className="pointer" style={{ fontSize: "16px" }}>
            <span style={{ textAlign: "center" }}>ออกจากระบบ</span>
          </Typography.Text>
        </Row>
      ),
      key: "logout",
      onClick: () => handleLogout(),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      overlayStyle={{ width: "200px" }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <img
            src={props.profile?.user_img  || "/images/admin.jpg"}
            style={{
              borderRadius: "50px",
              marginRight: "15px",
              marginTop: "10px",
              width: "40px",
            }}
          />
        </Space>
      </a>
    </Dropdown>
  );
};

const mapStateToProps = (state: any) => {
  return {
    profile: state.profile,
  };
};
export default connect(mapStateToProps)(DropdownHeader);
