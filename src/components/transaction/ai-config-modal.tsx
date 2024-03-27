import { Divider, Modal, Slider, Typography } from "antd";
import axios from "axios";
import { UPDATE_AI_DETAIL } from "../../endpoint";
import { toast } from "react-toastify";
import { Stack } from "@mui/material";

type Props = {
  aiConfig: any;
  setAiConfig: any;
  cache: any;
  setCache: any;
  open: boolean;
  setOpen: any;
};

const AiConfigModal = ({
  aiConfig,
  setAiConfig,
  cache,
  setCache,
  open,
  setOpen,
}: Props) => {
  const handleClose = async () => {
    setAiConfig({ ...aiConfig, prefix_ai_rate: cache });
    setOpen(false);
  };
  const UpdateData = async () => {
    try {
      const { data } = await axios.put(UPDATE_AI_DETAIL, aiConfig);
      if (data.status === "success") {
        setOpen(false);
        setCache(aiConfig.prefix_ai_rate);
        toast.success(`บันทึกสำเร็จ`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      open={open}
      onOk={UpdateData}
      onCancel={handleClose}
      closable={false}
      cancelText="ยกเลิก"
      okText="บันทึก"
    >
      <Divider style={{ marginTop: "-7px" }}>ตั้งค่าความโป๊ของรูปภาพ</Divider>
      <Slider
        value={aiConfig.prefix_ai_rate}
        onChange={(value) =>
          setAiConfig({ ...aiConfig, prefix_ai_rate: value })
        }
      />
      <Stack direction="row" justifyContent="center">
      <Typography.Text
        style={{
          color: "rgba(76, 78, 100, 0.6)",
          fontSize: "12px",
          textAlign: "center",
          marginTop: -10
        }}
      >
        ยิ่งเข้าใกล้ 100 รูปภาพยิ่งโป๊ได้มาก
      </Typography.Text>
      </Stack>
    </Modal>
  );
};

export default AiConfigModal;
