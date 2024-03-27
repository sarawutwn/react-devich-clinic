import { Input, Modal, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { CREATE_PERMISSION } from "../../../endpoint";

type Props = {
  open: boolean;
  setOpen: any;
  callback: any;
};

const PermissionCreateModal = (props: Props) => {
  const [permission, setPermission] = useState({
    permission_name: "",
    permission_display_name: "",
    permission_description: "",
  });

  const handlePermission = (key: string, value: string) => {
    setPermission({ ...permission, [key]: value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.post(CREATE_PERMISSION, permission);
      if (data.status === "success") {
        props.callback();
        toast.success("สร้างบทบาทใหม่สำเร็จ");
        setPermission({
          permission_name: "",
          permission_display_name: "",
          permission_description: "",
        });
        props.setOpen(false);
      }
    } catch (err) {
      console.log(err);

      toast.error("มีบางอย่างผิดพลาด");
    }
  };

  const handleClose = async () => {
    setPermission({
      permission_name: "",
      permission_display_name: "",
      permission_description: "",
    });
    props.setOpen(false);
  };

  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "24px" }}>
          สร้างสิทธ์
        </Typography.Text>
      }
      open={props.open}
      onOk={handleSave}
      onCancel={handleClose}
    >
      <Input
        addonBefore="ชื่อสิทธ์"
        style={{ marginBottom: "10px" }}
        value={permission.permission_name}
        onChange={(e) => handlePermission("permission_name", e.target.value)}
      />
      <Input
        addonBefore="ชื่อแสดงผล"
        style={{ marginBottom: "10px" }}
        value={permission.permission_display_name}
        onChange={(e) =>
          handlePermission("permission_display_name", e.target.value)
        }
      />
      <Typography.Text>รายละเอียด</Typography.Text>
      <Input.TextArea
        value={permission.permission_description}
        onChange={(e) =>
          handlePermission("permission_description", e.target.value)
        }
      />
    </Modal>
  );
};

export default PermissionCreateModal;
