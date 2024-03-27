import { Modal, Typography } from "antd";
import axios from "axios";
import { UPDATE_USER_STATUS } from "../../endpoint";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: any;
  formData: any;
  setFormData: any;
  callback: any;
};

const UpdateStatusModal = (props: Props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put(UPDATE_USER_STATUS, props.formData);
      if (data.status === "success") {
        toast.success("บันทึกสำเร็จ");
        props.callback();
        props.setFormData({});
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
          {props.formData.status ? "เปิดการใช้งาน" : "ปิดการใช้งาน"}
        </Typography.Text>
      }
      open={props.open}
      onOk={handleSave}
      onCancel={handleClose}
    >
      <Typography.Text>
        คุณแน่ใจหรือไม่ ว่าต้องการปิดการใช้งานผู้ใช้นี้?
      </Typography.Text>
    </Modal>
  );
};

export default UpdateStatusModal;
