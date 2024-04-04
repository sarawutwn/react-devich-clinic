import { Stack } from "@mui/material";
import {
  AutoComplete,
  Button,
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
import { toast } from "react-toastify";

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
  const [ads, setAds] = useState<any>([]);
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(
    dayjs(moment().format("DD-MM-YYYY"), "DD-MM-YYYY")
  );
  const [time, setTime] = useState(dayjs(moment().format("HH:mm"), "HH:mm"));

  const handleSave = async () => {
    const adsData = [];
    for (let item of ads) {
      let data = await adsList.find((items: any) => items.value == item);
      adsData.push(data.key);
    }
    const formData = {
      customer_id: customerID,
      ads_id: adsData,
      price: amount,
      invoice_date: `${date} ${time} น.`,
    };
    try {
      const { data } = await axios.post(
        `${hostname}/api/customer/create-invoice`,
        formData
      );
      if (data.status === "success") {
        toast.success("บันทึกสำเร็จ");
        callback();
        setOpen(false);
        setCustomerID("");
        setAds([]);
        setAmount(0);
        setDate(dayjs(moment().format("DD-MM-YYYY"), "DD-MM-YYYY"));
        setTime(dayjs(moment().format("HH:mm"), "HH:mm"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    if (value !== "") {
      let ads_list = ads;
      ads_list.push(value);
      setValue("");
      setAds(ads_list);
    }
  };

  const handleDelete = async (index: number) => {
    let ads_list = [];
    for (let i = 0; i < ads.length; i++) {
      if (i !== index) {
        ads_list.push(ads[i]);
      }
    }
    setAds(ads_list);
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
        <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography.Text>รายการจอง</Typography.Text>
            <Button
              type="primary"
              size="small"
              style={{ width: "100px" }}
              className="btn-success"
              onClick={handleAdd}
            >
              เพิ่ม
            </Button>
          </Stack>

          <Stack direction="row">
            <AutoComplete
              value={value}
              onChange={(val: any) => setValue(val)}
              style={{ width: "100%" }}
              options={adsList}
              size="large"
              filterOption={(inputValue, option: any) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </Stack>
          {ads.length !== 0 &&
            ads.map((item: any, index: number) => {
              return (
                <>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography.Text
                      style={{ fontSize: "12px", marginTop: "5px" }}
                    >
                      {item}
                    </Typography.Text>
                    <Button
                      type="primary"
                      size="small"
                      style={{ width: "50px" }}
                      className="btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      ลบ
                    </Button>
                  </Stack>
                  <Divider />
                </>
              );
            })}
        </Stack>
      </Modal>
    </>
  );
}
