import { Modal, Typography } from "antd";

type Props = {
  open: boolean;
  setOpen: any;
  callback: any;
};

const SwitchPrefixModal = (props: Props) => {
  return (
    <Modal
      open={props.open}
      okText="ยืนยัน"
      cancelText="ยกเลิก"
      onOk={props.callback}
      onCancel={() => props.setOpen(false)}
      closable={false}
      title={
        <Typography.Text style={{ fontSize: "18px" }}>
          ต้องการทำรายการนี้ใช่หรือไม่?
        </Typography.Text>
      }
    >
        <Typography.Text style={{ fontSize: "14px", color: "#888888" }}>กรุณาตรวจสอบข้อมูลก่อนยืนยัน</Typography.Text>
    </Modal>
  );
};

export default SwitchPrefixModal;
