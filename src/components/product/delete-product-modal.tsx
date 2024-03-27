import { Modal, Typography } from "antd";

type Props = {
  open: boolean;
  setOpen: any;
  callback: any;
};

const DeleteProductModal = (props: Props) => {
  return <Modal
    title={
      <Typography.Text style={{ fontSize: "22px" }}>
        ลบบริการนี้
      </Typography.Text>
    }
    open={props.open}
    okText="บันทึก"
    cancelText="ยกเลิก"
    onCancel={() => props.setOpen(false)}
    onOk={() => props.callback()}
  >
    <Typography.Text style={{ fontSize: "18px" }}>
      ต้องการลบบริการนี้ใช้หรือไม่ ?
    </Typography.Text>
  </Modal>;
};

export default DeleteProductModal;