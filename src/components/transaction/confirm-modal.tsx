import { Modal, Typography } from "antd";
import axios from "axios";
import {
  APPROVE_TRANSACTION,
  CALCEL_TRANSACTION,
  PLAY_TRANSACTION,
} from "../../endpoint";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: any;
  callback: any;
  type: any;
  transaction_id: string;
};

const ConfirmModal = ({
  open,
  setOpen,
  callback,
  type,
  transaction_id,
}: Props) => {
  const handleOptionTransaction = async () => {
    try {
      let endpoint =
        type === "APPROVE"
          ? APPROVE_TRANSACTION
          : type === "CANCEL"
          ? CALCEL_TRANSACTION
          : PLAY_TRANSACTION;
      const { data } = await axios.post(endpoint + transaction_id);
      if (data.status === "success") {
        toast.success(`ทำรายการสำเร็จ`);
        callback();
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "24px" }}>
          คุณแน่ใจหรือไม่ ?
        </Typography.Text>
      }
      open={open}
      onOk={handleOptionTransaction}
      onCancel={() => setOpen(false)}
      closable={false}
      okText="ยืนยัน"
      cancelText="ยกเลิก"
    >
      คุณต้องการดำเนินการรายการต่อไปนี้ใช่หรือไม่ ?
    </Modal>
  );
};

export default ConfirmModal;
