import { Col, Input, Modal, Row, Typography } from "antd";
import axios from "axios";
import { UPDATE_PROFILE_BY_ID } from "../../endpoint";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: any;
  data: any;
  setData: any;
  callback: any;
};

const MemberProfile = (props: Props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChange = (key: string, value: any) => {
    props.setData({ ...props.data, [key]: value });
  };

  const handleSave = async () => {
    try {
      let formData = {
        firstname: props.data.firstname,
        lastname: props.data.lastname,
        email: props.data.email,
        telephone: props.data.telephone,
      };
      const { data } = await axios.put(
        UPDATE_PROFILE_BY_ID + props.data.user_id,
        formData
      );
      if (data.status === "success") {
        props.callback();
        toast.success("บันทึกสำเร็จ");
        props.setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "24px" }}>
          แก้ไขข้อมูลเบื้องต้น
        </Typography.Text>
      }
      open={props.open}
      onOk={handleSave}
      onCancel={handleClose}
    >
      <Row gutter={[16, 10]} style={{ marginBottom: "16px" }}>
        <Col xs={24} sm={10}>
          <Typography.Text style={{ color: "#888888" }}>
            บัญชีผู้ใช้งาน
          </Typography.Text>
          <Input value={props.data.username} disabled />
        </Col>
        <Col xs={24} sm={7}>
          <Typography.Text style={{ color: "#888888" }}>ชื่อ</Typography.Text>
          <Input
            value={props.data.firstname}
            onChange={(e) => handleChange("firstname", e.target.value)}
          />
        </Col>
        <Col xs={24} sm={7}>
          <Typography.Text style={{ color: "#888888" }}>
            นามสกุล
          </Typography.Text>
          <Input
            value={props.data.lastname}
            onChange={(e) => handleChange("lastname", e.target.value)}
          />
        </Col>
        <Col xs={24}>
          <Typography.Text style={{ color: "#888888" }}>อีเมล</Typography.Text>
          <Input
            value={props.data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Col>
        <Col xs={24}>
          <Typography.Text style={{ color: "#888888" }}>
            เบอร์โทรศัพท์
          </Typography.Text>
          <Input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={props.data.telephone}
            onChange={(e) => handleChange("telephone", e.target.value)}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default MemberProfile;
