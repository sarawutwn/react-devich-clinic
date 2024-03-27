import { Modal, Typography } from "antd";

type Props = {
  open: boolean;
  setOpen: any;
  callback: any;
};

const RolesDeleteModal = (props: Props) => {
  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "24px" }}>ลบข้อมูล</Typography.Text>
      }
      open={props.open}
      onOk={props.callback}
      onCancel={() => props.setOpen(false)}
    >
      <Typography.Text>กรุณาตรวจสอบข้อมูลก่อนบันทึก</Typography.Text>
    </Modal>
  );
};

export default RolesDeleteModal;
