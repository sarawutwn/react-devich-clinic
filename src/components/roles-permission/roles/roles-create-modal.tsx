import { Input, Modal, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { CREATE_ROLES } from "../../../endpoint";

type Props = {
  open: boolean;
  setOpen: any;
  callback: any;
};

const RolesCreateModal = (props: Props) => {
  const [roles, setRoles] = useState({
    role_name: "",
    role_display_name: "",
    role_description: "",
  });

  const handleRoles = (key: string, value: string) => {
    setRoles({ ...roles, [key]: value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.post(CREATE_ROLES, roles);
      if (data.status === "success") {
        props.callback();
        toast.success("สร้างสิทธ์ใหม่สำเร็จ");
        setRoles({
          role_name: "",
          role_display_name: "",
          role_description: "",
        });
        props.setOpen(false);
      }
    } catch (err) {
      toast.error("มีบางอย่างผิดพลาด");
    }
  };

  const handleClose = async () => {
    setRoles({
      role_name: "",
      role_display_name: "",
      role_description: "",
    });
    props.setOpen(false);
  };

  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "24px" }}>
          สร้างบทบาทใหม่
        </Typography.Text>
      }
      open={props.open}
      onOk={handleSave}
      onCancel={handleClose}
    >
      <Input
        addonBefore="ชื่อย่อบทบาท"
        style={{ marginBottom: "10px" }}
        value={roles.role_name}
        onChange={(e) => handleRoles("role_name", e.target.value)}
      />
      <Input
        addonBefore="ชื่อที่ใช้แสดงผล"
        style={{ marginBottom: "10px" }}
        value={roles.role_display_name}
        onChange={(e) => handleRoles("role_display_name", e.target.value)}
      />
      <Typography.Text>รายละเอียด</Typography.Text>
      <Input.TextArea
        value={roles.role_description}
        onChange={(e) => handleRoles("role_description", e.target.value)}
      />
    </Modal>
  );
};

export default RolesCreateModal;
