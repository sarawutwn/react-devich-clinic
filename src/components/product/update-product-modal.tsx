import { Grid, Stack } from "@mui/material";
import { Divider, Input, Modal, Select, Typography } from "antd";

type Props = {
  open: boolean;
  setOpen: any;
  items: any;
  setItems: any;
  callback: any;
};

const UpdateProductModal = (props: Props) => {
  const handleClose = async () => {
    props.setOpen(false);
  };

  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "22px" }}>
          แก้ไขบริการ
        </Typography.Text>
      }
      open={props.open}
      okText="บันทึก"
      cancelText="ยกเลิก"
      onCancel={handleClose}
      onOk={() => props.callback()}
    >
      <Divider />
      <Stack direction="column" spacing={1.5} sx={{ mt: -2 }}>
        <Stack direction="column">
          <Typography.Text>ประเภท</Typography.Text>
          <Select
            size="large"
            style={{ width: "100%" }}
            value={props.items.product_type}
            onChange={(value) =>
              props.setItems({ ...props.items, product_type: value })
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
            value={props.items.product_description}
            onChange={(e) =>
              props.setItems({
                ...props.items,
                product_description: e.target.value,
              })
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
              value={props.items.product_amount}
              onChange={(e) =>
                props.setItems({
                  ...props.items,
                  product_amount: +e.target.value,
                })
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
              value={props.items.product_time}
              onChange={(e) =>
                props.setItems({
                  ...props.items,
                  product_time: +e.target.value,
                })
              }
            />
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default UpdateProductModal;
