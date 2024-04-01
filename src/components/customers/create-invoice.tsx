import { Stack } from "@mui/material";
import {
//   AutoComplete,
  Cascader,
  DatePicker,
  Divider,
  Input,
  Modal,
  TimePicker,
  Typography,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { hostname } from "../../endpoint";
import moment from "moment";
import dayjs from "dayjs";

type Props = {
  open: boolean;
  setOpen: any;
  customerID: string;
  setCustomerID: any;
  adsList: any;
  callback: any;
};

export default function CreateInvoiceModal({
  open,
  setOpen,
  customerID,
  setCustomerID,
  adsList,
  callback,
}: Props) {
  const [ads, _] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(
    dayjs(moment().format("DD-MM-YYYY"), "DD-MM-YYYY")
  );
  const [time, setTime] = useState(dayjs(moment().format("HH:mm"), "HH:mm"));

  const handleSave = async () => {
    const adsData = await adsList.find((item: any) => item.value == ads);
    const formData = {
      customer_id: customerID,
      ads_id: adsData.key,
      price: amount,
      invoice_date: `${date} ${time} น.`,
    };
    try {
      const { data } = await axios.post(
        `${hostname}/api/customer/create-invoice`,
        formData
      );
      if (data.status === "succes") {
        callback();
        setOpen(false);
        setCustomerID("");
        setDate(dayjs(moment().format("DD-MM-YYYY"), "DD-MM-YYYY"));
        setTime(dayjs(moment().format("HH:mm"), "HH:mm"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = async () => {
    setOpen(false);
    setCustomerID("");
  };
  return (
    <>
      <Modal
        title="สร้างใบจอง"
        open={open}
        onOk={handleSave}
        onCancel={handleClose}
      >
        <Typography.Text style={{ fontSize: "11px" }}>
          จองเป็นจำนวนเงิน
        </Typography.Text>
        <Input
          type="number"
          size="large"
          addonAfter="บาท"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Stack direction="column">
          <Typography.Text style={{ fontSize: "11px" }}>ads</Typography.Text>
          {/* <Sele/ct options={adsList} /> */}
          {adsList.length !== 0 && (
            <Cascader
              //   value={ads}
              style={{ width: "100%" }}
              options={adsList}
              multiple
              maxTagCount="responsive"
              size="large"
              dropdownRender={dropdownRender}
            />
          )}
        </Stack>
        <Stack direction="row" sx={{ width: "100%" }} spacing={1.5}>
          <Stack direction="column">
            <Typography.Text style={{ fontSize: "11px" }}>เวลา</Typography.Text>
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              value={date}
              onChange={(e: any) =>
                setDate(dayjs(moment(e.$d).format("DD-MM-YYYY"), "DD-MM-YYYY"))
              }
              format={"DD/MM/YYYY"}
            />
          </Stack>
          <Stack direction="column">
            <Typography.Text style={{ fontSize: "11px" }}>เวลา</Typography.Text>
            <TimePicker
              size="large"
              style={{ width: "100%" }}
              value={time}
              onChange={(e: any) => setTime(dayjs(`${e.$H}:${e.$m}`, "HH:mm"))}
              format={"HH:mm"}
            />
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}

const dropdownRender = (menus: React.ReactNode) => (
  <div style={{ textOverflow: "ellipsis" }}>
    {menus}
    <Divider style={{ margin: 0 }} />
    <div style={{ padding: 8 }}>The footer is not very short.</div>
  </div>
);
