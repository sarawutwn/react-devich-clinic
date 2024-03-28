import { Stack } from "@mui/material";
import { Input, Modal, Select, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { hostname } from "../../endpoint";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: any;
  adsList: any;
  callback: any;
};

export default function CreateModal({
  open,
  setOpen,
  adsList,
  callback,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [ads, setAds] = useState("");

  const handleSave = async () => {
    try {
      const { data } = await axios.post(`${hostname}/api/customer/create`, {
        customer_name: customerName,
        ads_id: ads,
      });
      if (data.status === "success") {
        toast.success('เพิ่มลูกค้าสำเร็จ')
        callback();
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = async () => {
    setOpen(false);
    setCustomerName("");
    setAds("");
  };

  return (
    <Modal
      title="เพิ่มลูกค้า"
      open={open}
      onOk={handleSave}
      onCancel={handleClose}
    >
      <Typography.Text style={{ fontSize: "11px" }}>
        ชื่อผู้ใช้งาน
      </Typography.Text>
      <Input
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <Stack direction="column">
        <Typography.Text style={{ fontSize: "11px" }}>ads</Typography.Text>
        <Select
          options={adsList}
          value={ads}
          onChange={(value) => setAds(value)}
        />
      </Stack>
    </Modal>
  );
}
