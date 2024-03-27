import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  Switch,
  TimePicker,
  Timeline,
  Typography,
} from "antd";
import Warper from "../utils/warpper-page";
import { Grid, Stack } from "@mui/material";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import { DeleteFilled, SettingFilled } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import SeatMap from "../components/seatmap";

dayjs.extend(weekday);
dayjs.extend(localeData);

export const { format: formatPrice } = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const table = [
  {
    table_name: "VIP",
    table_price: 159,
    table_chair_count: 6,
    table_count: [
      {
        name: 1,
        status: true,
      },
      {
        name: 2,
        status: false,
      },
      {
        name: 3,
        status: false,
      },
      {
        name: 4,
        status: false,
      },
      {
        name: 5,
        status: false,
      },
      {
        name: 6,
        status: false,
      },
      {
        name: 7,
        status: false,
      },
      {
        name: 8,
        status: false,
      },
      {
        name: 9,
        status: false,
      },
      {
        name: 10,
        status: false,
      },
      {
        name: 11,
        status: true,
      },
      {
        name: 12,
        status: false,
      },
      {
        name: 13,
        status: false,
      },
      {
        name: 14,
        status: false,
      },
      {
        name: 15,
        status: false,
      },
      {
        name: 16,
        status: false,
      },
      {
        name: 17,
        status: false,
      },
      {
        name: 18,
        status: false,
      },
      {
        name: 19,
        status: false,
      },
      {
        name: 20,
        status: false,
      },
    ],
    status: true,
  },
  {
    table_name: "VVIP",
    table_price: 219,
    table_chair_count: 6,
    table_count: [
      {
        name: 1,
        status: false,
      },
      {
        name: 2,
        status: false,
      },
      {
        name: 3,
        status: false,
      },
      {
        name: 4,
        status: false,
      },
      {
        name: 5,
        status: false,
      },
      {
        name: 6,
        status: false,
      },
      {
        name: 7,
        status: false,
      },
      {
        name: 8,
        status: false,
      },
    ],
    status: true,
  },
  {
    table_name: "ปกติ 1",
    table_price: 119,
    table_chair_count: 6,
    table_count: [
      {
        name: 1,
        status: false,
      },
      {
        name: 2,
        status: false,
      },
      {
        name: 3,
        status: false,
      },
      {
        name: 4,
        status: false,
      },
      {
        name: 5,
        status: false,
      },
      {
        name: 6,
        status: false,
      },
      {
        name: 7,
        status: false,
      },
      {
        name: 8,
        status: false,
      },
    ],
    status: false,
  },
  {
    table_name: "ปกติ 2",
    table_price: 119,
    table_chair_count: 6,
    table_count: [
      {
        name: 1,
        status: false,
      },
      {
        name: 2,
        status: false,
      },
      {
        name: 3,
        status: false,
      },
      {
        name: 4,
        status: false,
      },
      {
        name: 5,
        status: false,
      },
      {
        name: 6,
        status: false,
      },
      {
        name: 7,
        status: false,
      },
      {
        name: 8,
        status: false,
      },
    ],
    status: true,
  },
];

const Reservation = () => {
  const [openZoneType, setOpenZoneType] = useState(false);
  return (
    <>
      <Warper pointer={["หน้าหลัก", "ตั้งค่าการจองโต๊ะ"]}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            mb: 2,
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: { xs: "center", md: "start" } }}
          >
            <img src="/images/booking.png" width={70} height={70} />
            <Stack direction="column" sx={{ mt: -2 }}>
              <Typography.Title
                style={{ marginBottom: "0", marginLeft: "12px" }}
                level={2}
              >
                ตั้งค่าการจองโต๊ะ
              </Typography.Title>
              <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
                ระบบจองโต๊ะของร้านคุณ
              </Typography.Text>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            sx={{ justifyContent: { xs: "center", md: "row" } }}
            spacing={1}
          >
            {/* <Button size="large" type="primary">
            เพิ่มโซน
          </Button> */}
          </Stack>
        </Stack>
        <Grid container spacing={1.5}>
          <Grid item xs={12} md={6}>
            <Stack
              direction="column"
              sx={{
                border: "1px solid rgba(5, 5, 5, 0.06)",
                borderRadius: "20px",
                height: "100%",
                p: 2,
              }}
            >
              <Divider>ตั้งค่าการจองโต๊ะ</Divider>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  p: 3,
                }}
              >
                <Stack
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Switch
                    defaultChecked
                    size="default"
                    style={{ maxWidth: "20px", marginRight: "5px" }}
                  />
                  <Typography.Text>เปิดใช้งานระบบ</Typography.Text>
                </Stack>
              </Stack>
              <Divider>รายละเอียดการจอง</Divider>
              <Grid container spacing={1.5}>
                <Grid item xs={12} md={6} sx={{ direction: "column" }}>
                  <Typography.Text style={{ fontSize: "14px" }}>
                    เวลาปิดรับจองโต๊ะ
                  </Typography.Text>
                  <br />
                  <TimePicker
                    style={{ width: "100%" }}
                    format={"HH:mm"}
                    size="large"
                  />
                </Grid>
                <Grid item xs={12} md={6} sx={{ direction: "column" }}>
                  <Typography.Text style={{ fontSize: "14px" }}>
                    เปิดจองล่วงหน้าได้สูงสุด
                  </Typography.Text>
                  <Input size="large" addonAfter="วัน" />
                </Grid>
                <Grid item xs={12} sx={{ direction: "column" }}>
                  <Typography.Text style={{ fontSize: "14px" }}>
                    หมายเหตุการจอง
                  </Typography.Text>
                  <Input.TextArea size="large" />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography.Text style={{ fontSize: "16px" }}>
                รายการวันหยุดของคุณ
              </Typography.Text>
              <Button>เพิ่มวันหยุด</Button>
            </Stack>
            <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
              <Timeline
                items={[
                  {
                    children: (
                      <Typography.Text style={{ fontSize: "14px" }}>
                        วันที่ 31 ตุลาคม 2566{" "}
                        <span style={{ color: "#888888" }}>(วันออกพรรษา)</span>
                      </Typography.Text>
                    ),
                  },
                  {
                    children: (
                      <Typography.Text style={{ fontSize: "14px" }}>
                        วันที่ 25 ธันวาคม 2566{" "}
                        <span style={{ color: "#888888" }}>(วันคริสมาส)</span>
                      </Typography.Text>
                    ),
                  },
                  {
                    children: (
                      <Typography.Text style={{ fontSize: "14px" }}>
                        วันที่ 2 มกราคม 2567{" "}
                        <span style={{ color: "#888888" }}>
                          (หยุดชดเชยวันปีใหม่)
                        </span>
                      </Typography.Text>
                    ),
                  },
                  {
                    children: (
                      <Typography.Text style={{ fontSize: "14px" }}>
                        วันที่ 14 กุมพาพันธ์ 2567{" "}
                        <span style={{ color: "#888888" }}>(วันวาเลนไทน์)</span>
                      </Typography.Text>
                    ),
                  },
                ]}
              />
            </Stack>
          </Grid>
        </Grid>
        <Divider>โซนการจอง</Divider>
        <Stack sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Stack direction="row" justifyContent="space-between">
                <Typography.Text style={{ fontSize: "24px" }}>
                  การแสดงผล
                </Typography.Text>
              </Stack>
              <Stack direction="row" sx={{ width: "100%" }}>
                <SeatMap />
              </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "center", md: "space-between" },
                }}
              >
                <Typography.Text style={{ fontSize: "24px" }}>
                  ตั้งค่าโซน
                </Typography.Text>
                <Button type="primary">เพิ่มโต๊ะ</Button>
              </Stack>
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {table.length !== 0 &&
                  table.map((item, index) => {
                    return (
                      <Grid key={index} item xs={12} md={6}>
                        <Card
                          actions={[
                            <SettingFilled key="setting" />,
                            <DeleteFilled key="edit" />,
                          ]}
                        >
                          <Meta
                            title={
                              <Stack direction="column">
                                <Typography.Text
                                  style={{
                                    fontSize: "18px",
                                    textAlign: "center",
                                  }}
                                >
                                  โซน {item.table_name}
                                </Typography.Text>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography.Text
                                    style={{
                                      fontSize: "14px",
                                      color: "#999999",
                                    }}
                                  >
                                    ราคาจอง
                                  </Typography.Text>
                                  <Typography.Text
                                    style={{
                                      fontSize: "14px",
                                      color: "#999999",
                                    }}
                                  >
                                    {item.table_price} บาท
                                  </Typography.Text>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography.Text
                                    style={{
                                      fontSize: "14px",
                                      color: "#999999",
                                    }}
                                  >
                                    รองรับลูกค้าได้
                                  </Typography.Text>
                                  <Typography.Text
                                    style={{
                                      fontSize: "14px",
                                      color: "#999999",
                                    }}
                                  >
                                    {item.table_chair_count} คน
                                  </Typography.Text>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography.Text
                                    style={{
                                      fontSize: "14px",
                                      color: "#999999",
                                    }}
                                  >
                                    สถานะการใช้งาน
                                  </Typography.Text>
                                  <Typography.Text
                                    style={{
                                      fontSize: "14px",
                                      color: item.status ? "green" : "red",
                                    }}
                                  >
                                    เปิดจอง
                                  </Typography.Text>
                                </Stack>
                              </Stack>
                            }
                          />
                        </Card>
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Warper>
      <Modal
        open={openZoneType}
        onCancel={() => setOpenZoneType(false)}
        style={{ width: "100%", padding: "20px" }}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card title={"รูปแบบที่ 1"}></Card>
          </Grid>
          <Grid item xs={12}>
            <Card title={"รูปแบบที่ 2"}></Card>
          </Grid>
          <Grid item xs={12}>
            <Card title={"รูปแบบที่ 3"}></Card>
          </Grid>
          <Grid item xs={12}>
            <Card title={"รูปแบบที่ 4"}></Card>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default Reservation;
