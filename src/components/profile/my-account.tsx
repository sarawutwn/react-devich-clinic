import { Button, Col, Input, Row, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { connect } from "react-redux";
import { UPDATE_MY_PROFILE } from "../../endpoint";
import store from "../../redux/store";
import { toast } from "react-toastify";

const MyAccount = (props: any) => {
  const [profile, setProfile] = useState(props.profile);

  const onUpdate = async () => {
    try {
      const formData = {
        user_email: profile.user_email,
        user_telephone: profile.user_telephone,
      };
      const { data } = await axios.put(UPDATE_MY_PROFILE, formData);
      if (data.status === "success") {
        store.dispatch({ type: "SET_PROFILE", payload: data.result });
        toast.success("บันทึกสำเร็จ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Row justify={{ xs: "center", sm: "center", lg: "start" }}>
        <img
          src="/images/admin.jpg"
          width={200}
          height={200}
          style={{ borderRadius: "20px" }}
        />
      </Row>
      <Col style={{ marginTop: "20px" }}>
        <Row
          gutter={[16, 16]}
          justify={{ xs: "center", sm: "center", lg: "start" }}
        >
          <Col xs={24} sm={24} md={20} lg={5} style={{ width: "100%" }}>
            <Typography.Text style={{ fontSize: "16px" }}>
              บัญชีผู้ใช้งาน
            </Typography.Text>
            <Input
              size="large"
              disabled
              defaultValue={profile.user_username}
              onChange={(e) =>
                setProfile({ ...profile, user_username: e.target.value })
              }
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={19} style={{ width: "100%" }}>
          </Col>
          <Col xs={24} sm={12} md={10} lg={5} style={{ width: "100%" }}>
            <Typography.Text style={{ fontSize: "16px" }}>
              หมายเลขโทรศัพท์
            </Typography.Text>
            <Input
              size="large"
              defaultValue={profile.user_telephone}
              onChange={(e) =>
                setProfile({ ...profile, user_telephone: e.target.value })
              }
            />
          </Col>
          <Col xs={24} sm={12} md={10} lg={5} style={{ width: "100%" }}>
            <Typography.Text style={{ fontSize: "16px" }}>
              อีเมล
            </Typography.Text>
            <Input
              size="large"
              defaultValue={profile.user_email}
              onChange={(e) =>
                setProfile({ ...profile, user_email: e.target.value })
              }
            />
          </Col>
        </Row>
      </Col>
      <Col style={{ marginTop: "20px" }}>
        <Row gutter={[16, 16]} justify={{ lg: "end", xs: "center" }}>
          <Col xs={24} style={{ width: "100%" }}>
            <Button
              type="primary"
              size="large"
              disabled={
                props.profile.user_email === profile.user_email &&
                props.profile.user_telephone === profile.user_telephone
              }
              onClick={onUpdate}
            >
              บันทึก
            </Button>
          </Col>
        </Row>
      </Col>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    profile: state.profile,
  };
};
export default connect(mapStateToProps)(MyAccount);
