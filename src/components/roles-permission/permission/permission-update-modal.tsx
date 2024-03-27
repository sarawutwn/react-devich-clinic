import { Input, Modal, Typography } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { UPDATE_PERMISSION } from "../../../endpoint";

type Props = {
  permission: any;
  setPermission: any;
  open: boolean;
  setOpen: any;
  callback: any;
};

const PermissionUpdateModal = (props: Props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handlePermission = (key: string, value: string) => {
    props.setPermission({ ...props.permission, [key]: value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        UPDATE_PERMISSION + props.permission.permission_id,
        {
          permission_name: props.permission.permission_name,
          permission_display_name: props.permission.permission_display_name,
          permission_description: props.permission.permission_description,
        }
      );
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
        value={props.permission.permission_name}
        onChange={(e) => handlePermission("permission_name", e.target.value)}
      />
      <Input
        addonBefore="ชื่อที่ใช้แสดงผล"
        style={{ marginBottom: "10px" }}
        value={props.permission.permission_display_name}
        onChange={(e) =>
          handlePermission("permission_display_name", e.target.value)
        }
      />
      <Typography.Text>รายละเอียด</Typography.Text>
      <Input.TextArea
        value={props.permission.permission_description}
        onChange={(e) =>
          handlePermission("permission_description", e.target.value)
        }
      />
    </Modal>
  );
};

export default PermissionUpdateModal;
