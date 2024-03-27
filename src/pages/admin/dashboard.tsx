import { Button, Card, Modal, Select, Typography } from "antd";
import DashboardCardSuper from "../../components/dashboard/card-super";
import { useEffect, useState } from "react";
import { Container, Stack } from "@mui/material";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import axios from "axios";
import { SUPER_HOME_REPORT } from "../../endpoint";
import dayjs from "dayjs";

const driverObj = driver({
  showProgress: true,
  overlayOpacity: 0.2,
  showButtons: ["next", "previous", "close"],
  steps: [
    {
      element: "#driver-dashboard-account",
      popover: {
        title: "ข้อมูลของคุณ",
        description: "แสดงผลข้อมูลต่างๆ ของ account ที่คุณเข้าสู่ระบบอยู่.",
      },
    },
    {
      element: "#driver-dashboard-filter",
      popover: {
        title: "กรองข้อมูล",
        description: "เลือกข้อมูลของคุณที่ต้องการกรอง.",
      },
    },
    {
      element: "#driver-dashboard-total-amount",
      popover: {
        title: "รายงานข้อมูล",
        description: "จะแปลผันตามที่คุณกรองข้อมูล",
      },
    },
  ],
});

const AdminDashboard = () => {
  const [type, setType] = useState("today");
  const [data, setData] = useState<any>(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [guide, setGuide] = useState(false);

  const playGuide = () => {
    setGuide(false);
    driverObj.drive();
    localStorage.setItem("guide-state", "true");
  };

  // useEffect(() => {
  //   if (localStorage.getItem("guide-state") === null) {
  //     setGuide(true);
  //     localStorage.setItem("guide-state", "false");
  //   }
  // }, []);

  const fetchData = async (
    value: string,
    monthValue: string,
    yearValue: string
  ) => {
    try {
      setType(value);
      setMonth(monthValue);
      setYear(yearValue);
      const { data } = await axios.post(SUPER_HOME_REPORT, {
        type: value,
        month: monthValue,
        year: yearValue,
      });
      if (data.status === "success") {
        setData(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData("today", dayjs().format("MM"), dayjs().format("YYYY"));
  }, []);

  return (
    <Container maxWidth="lg">
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
      >
        <Card
          style={{
            backgroundColor: "#FFF",
            borderRadius: "10px",
            border: "0",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "space-between" },
            }}
            spacing={1}
          >
            <Stack
              id="driver-dashboard-account"
              direction="row"
              sx={{ justifyContent: { xs: "center", md: "start" } }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "5px",
                }}
              >
                <Typography.Text
                  style={{
                    fontSize: "20px",
                    marginLeft: "10px",
                    fontWeight: "bold",
                  }}
                >
                  SUPER ADMIN
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: "12px", marginLeft: "10px" }}
                >
                  ระบบหลังบ้าน ShowWarp
                </Typography.Text>
              </div>
            </Stack>

            <Stack
              id="driver-dashboard-filter"
              direction="row"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { xs: "center", md: "end" },
                width: {
                  xs: "100%",
                  md: type === "custom" ? "500px" : "250px",
                },
              }}
            >
              <Select
                value={type}
                onChange={(value) => {
                  setType(value);
                  fetchData(value, month, year);
                }}
                style={{ width: "100%", height: "40px" }}
                size="large"
                options={[
                  {
                    label: "วันนี้",
                    value: "today",
                  },
                  {
                    label: "7 วันล่าสุด",
                    value: "7Days",
                  },
                  {
                    label: "30 วันล่าสุด",
                    value: "30Days",
                  },
                  {
                    label: "เลือกเดือน",
                    value: "custom-month",
                  },
                  {
                    label: "เลือกปี",
                    value: "custom-year",
                  },
                ]}
              />
              {type === "custom-month" && (
                <Stack
                  sx={{
                    width: "100%",
                    mt: { xs: 1, md: 0 },
                    ml: { xs: 0, md: 1 },
                  }}
                >
                  <Select
                    value={month}
                    onChange={(value) => fetchData(type, value, year)}
                    size="large"
                    options={[
                      {
                        label: "January",
                        value: "1",
                      },
                      {
                        label: "February",
                        value: "2",
                      },
                      {
                        label: "March",
                        value: "3",
                      },
                      {
                        label: "April",
                        value: "4",
                      },
                      {
                        label: "May",
                        value: "5",
                      },
                      {
                        label: "June",
                        value: "6",
                      },
                      {
                        label: "July",
                        value: "7",
                      },
                      {
                        label: "August",
                        value: "8",
                      },
                      {
                        label: "September",
                        value: "9",
                      },
                      {
                        label: "October",
                        value: "10",
                      },
                      {
                        label: "November",
                        value: "11",
                      },
                      {
                        label: "December",
                        value: "12",
                      },
                    ]}
                  />
                </Stack>
              )}
              {type === "custom-year" && (
                <Stack
                  sx={{
                    width: "100%",
                    mt: { xs: 1, md: 0 },
                    ml: { xs: 0, md: 1 },
                  }}
                >
                  <Select
                    value={year}
                    onChange={(value) => fetchData(type, month, value)}
                    size="large"
                    options={[
                      {
                        label: dayjs().format("YYYY"),
                        value: dayjs().format("YYYY"),
                      },
                      {
                        label: dayjs().subtract(1, "years").format("YYYY"),
                        value: dayjs().subtract(1, "years").format("YYYY"),
                      },
                      {
                        label: dayjs().subtract(2, "years").format("YYYY"),
                        value: dayjs().subtract(2, "years").format("YYYY"),
                      },
                    ]}
                  />
                </Stack>
              )}
            </Stack>
          </Stack>
        </Card>
        <DashboardCardSuper data={data} type={type} />
      </div>
      <Modal
        open={guide}
        onCancel={() => setGuide(false)}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        footer={[
          <Stack direction="row" sx={{ width: "100%" }} spacing={1.5}>
            <Button
              onClick={() => playGuide()}
              type="primary"
              style={{ width: "50%" }}
            >
              สนใจ
            </Button>
            <Button onClick={() => setGuide(false)} style={{ width: "50%" }}>
              ไม่สนใจ
            </Button>
          </Stack>,
        ]}
        closable={false}
      >
        <Stack sx={{ width: "100%" }}>
          <Stack direction="row" justifyContent="center">
            <img
              src="/images/7038058.jpg"
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Stack>
          <Typography.Text
            style={{
              textAlign: "center",
              fontSize: "22px",
              marginBottom: "10px",
            }}
          >
            ยินดีต้องรับสู่ระบบ ShowWarp+
          </Typography.Text>
          <Typography.Text
            style={{
              textAlign: "center",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            คุณต้องการให้ฉันแนะนำการใช้งานระบบหรือไม่?
          </Typography.Text>
        </Stack>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
