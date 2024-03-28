import { Stack } from "@mui/material";
import { AutoComplete, Input, Modal, Typography } from "antd";
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
      const adsData = await adsList.find((item: any) => item.value == ads);
      const { data } = await axios.post(`${hostname}/api/customer/create`, {
        customer_name: customerName,
        ads_id: adsData.key,
      });
      if (data.status === "success") {
        toast.success("เพิ่มลูกค้าสำเร็จ");
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
        size="large"
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <Stack direction="column">
        <Typography.Text style={{ fontSize: "11px" }}>ads</Typography.Text>
        {/* <Sele/ct options={adsList} /> */}
        {adsList.length !== 0 && (
          <AutoComplete
            value={ads}
            options={adsList}
            size="large"
            onChange={(value) => setAds(value)}
            filterOption={(inputValue, option: any) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        )}
      </Stack>
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <img
          src="/images/310331021_464751455676954_6742359841360873997_n.jpg"
          style={{ width: "50%", borderRadius: "100%" }}
        />
      </Stack>
      <Stack>
        <Typography.Text style={{ textAlign: "center" }}>
          De Vich Clinic
        </Typography.Text>
      </Stack>
    </Modal>
  );
}
