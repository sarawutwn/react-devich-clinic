import { Input, Modal, Typography } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_ROLES } from "../../../endpoint";

type Props = {
  roles: any;
  setRoles: any;
  open: boolean;
  setOpen: any;
  callback: any;
};

const RolesUpdateModal = (props: Props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleRoles = (key: string, value: string) => {
    props.setRoles({ ...props.roles, [key]: value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put(UPDATE_ROLES + props.roles.role_id, {
        role_name: props.roles.role_name,
        role_display_name: props.roles.role_display_name,
        role_description: props.roles.role_description,
      });
      if (data.status === "success") {
        props.callback();
        toast.success("บันทึกข้อมูลสำเร็จ");
        props.setOpen(false);
      }
    } catch (err) {
      toast.error("มีบางอย่างผิดพลาด");
    }
  };

  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "24px" }}>
          แก้ไขข้อมูล
        </Typography.Text>
      }
      open={props.open}
      onOk={handleSave}
      onCancel={handleClose}
    >
      <Input
        addonBefore="ชื่อย่อบทบาท"
        style={{ marginBottom: "10px" }}
        value={props.roles.role_name}
        onChange={(e) => handleRoles("role_name", e.target.value)}
      />
      <Input
        addonBefore="ชื่อที่ใช้แสดงผล"
        style={{ marginBottom: "10px" }}
        value={props.roles.role_display_name}
        onChange={(e) => handleRoles("role_display_name", e.target.value)}
      />
      <Typography.Text>รายละเอียด</Typography.Text>
      <Input.TextArea
        value={props.roles.role_description}
        onChange={(e) => handleRoles("role_description", e.target.value)}
      />
    </Modal>
  );
};

export default RolesUpdateModal;
