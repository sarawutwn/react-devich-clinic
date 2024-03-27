import { Grid, Stack } from "@mui/material";
import { Divider, Input, Modal, Select, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { CREATE_PRODUCT } from "../../endpoint";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: any;
  callback: any;
};

const CreateProductModal = (props: Props) => {
  const [product, setProduct] = useState({
    product_type: "",
    product_description: "",
    product_amount: 0,
    product_time: 0,
  });
  const handleClose = async () => {
    props.setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (product.product_amount === 0) {
        toast.error("กรุณากรอกราคา");
        return;
      }
      if (product.product_description === "") {
        toast.error("กรุณากรอกรายละเอียด");
        return;
      }
      if (product.product_time === 0) {
        toast.error("กรุณากรอกเวลาที่แสดงผล");
        return;
      }
      if (product.product_type === "") {
        toast.error("กรุณาเลือกประเภทบริการ");
        return;
      }
      const { data } = await axios.post(CREATE_PRODUCT, product);
      if (data.status === "success") {
        toast.success("บันทึกสำเร็จ");
        props.callback();
        props.setOpen(false);
        setProduct({
          product_type: "",
          product_description: "",
          product_amount: 0,
          product_time: 0,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "22px" }}>
          สร้างบริการ
        </Typography.Text>
      }
      open={props.open}
      okText="บันทึก"
      cancelText="ยกเลิก"
      onCancel={handleClose}
      onOk={handleSave}
    >
      <Divider />
      <Stack direction="column" spacing={1.5} sx={{ mt: -2 }}>
        <Stack direction="column">
          <Typography.Text>ประเภท</Typography.Text>
          <Select
            size="large"
            style={{ width: "100%" }}
            value={product.product_type}
            onChange={(value) =>
              setProduct({ ...product, product_type: value })
            }
            options={[
              {
                label: "อัพโหลดรูปขึ้นจอ",
                value: "อัพโหลดรูปขึ้นจอ",
              },
              {
                label: "อัพโหลดวิดีโอขึ้นจอ",
                value: "อัพโหลดวิดีโอขึ้นจอ",
              },
            ]}
          />
        </Stack>
        <Stack direction="column">
          <Typography.Text>รายละเอียด</Typography.Text>
          <Input.TextArea
            value={product.product_description}
            onChange={(e) =>
              setProduct({ ...product, product_description: e.target.value })
            }
            style={{ width: "100%" }}
          />
        </Stack>
      </Stack>
      <Grid container spacing={1} sx={{ mt: 1, mb: 2 }}>
        <Grid item xs={6}>
          <Stack direction="column">
            <Typography.Text>ราคา</Typography.Text>
            <Input
              style={{ width: "100%" }}
              size="large"
              addonAfter="BAHT"
              type="number"
              value={product.product_amount}
              onChange={(e) =>
                setProduct({ ...product, product_amount: +e.target.value })
              }
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack direction="column">
            <Typography.Text>แสดงผล</Typography.Text>
            <Input
              style={{ width: "100%" }}
              size="large"
              addonAfter="วินาที"
              type="number"
              value={product.product_time}
              onChange={(e) =>
                setProduct({ ...product, product_time: +e.target.value })
              }
            />
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default CreateProductModal;
