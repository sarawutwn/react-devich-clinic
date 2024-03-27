import { Stack } from "@mui/material";
import { Divider, Input, Modal, Typography } from "antd";
import axios from "axios";
import { UPDATE_PREFIX } from "../../endpoint";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: any;
  callback: any;
  data: any;
  setData: any;
};

const UpdatePrefixModal = (props: Props) => {
  const handleClose = async () => {
    props.setOpen(false);
  };

  const handleSave = async () => {
    try {
      let formData = {
        prefix_name: props.data.prefix_name,
        prefix_free_tax: Number(props.data.prefix_free_tax),
        prefix_ai_amount: Number(props.data.prefix_ai_amount),
      };
      const { data } = await axios.put(
        UPDATE_PREFIX + props.data.prefix_id,
        formData
      );
      if (data.status === "success") {
        props.callback();
        toast.success("แก้ไขข้อมูลสำเร็จ");
        props.setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={props.open}
      okText="แก้ไข"
      cancelText="ยกเลิก"
      onOk={handleSave}
      onCancel={handleClose}
      closable={false}
    >
      <Divider>รายละเอียดร้านค้า</Divider>
      <Stack direction="column" spacing={1.5}>
        <Stack direction="column">
          <Typography.Text>ชื่อร้านค้า</Typography.Text>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={props.data?.prefix_name}
            onChange={(e) =>
              props.setData({ ...props.data, prefix_name: e.target.value })
            }
          />
        </Stack>
        <Stack direction="column">
          <Typography.Text>ค่าคอมมิชชั่นที่ร้านได้รับ</Typography.Text>
          <Input
            size="large"
            style={{ width: "100%" }}
            type="number"
            addonAfter="%"
            value={props.data?.prefix_free_tax}
            onChange={(e) =>
              props.setData({ ...props.data, prefix_free_tax: e.target.value })
            }
          />
        </Stack>
        <Stack direction="column">
          <Typography.Text>ค่าใช้บริการ AI ตรวจสอบรูปภาพ</Typography.Text>
          <Input
            size="large"
            style={{ width: "100%" }}
            type="number"
            addonAfter="บาท / รายการ"
            value={props.data?.prefix_ai_amount}
            onChange={(e) =>
              props.setData({ ...props.data, prefix_ai_amount: e.target.value })
            }
          />
        </Stack>
      </Stack>
    </Modal>
  );
};

export default UpdatePrefixModal;
