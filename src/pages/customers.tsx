import { Stack } from "@mui/material";
import { Button, Card, Divider, Tag, Typography } from "antd";
import axios from "axios";
import { hostname } from "../endpoint";
import { useEffect, useState } from "react";
import CreateModal from "../components/customers/create-modal";

export default function Customers() {
  const [customer, setCustomer] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [ads, setAds] = useState([]);

  const handleCreate = async () => {
    try {
      if (ads.length === 0) {
        const { data } = await axios.get(`${hostname}/api/promotion/get-all`);
        if (data.status === "success") {
          let result: any = [{ key: "", value: "ไม่ได้มาจาก ads" }];
          for (let item of data.result) {
            await result.push({ key: item.ads_id, value: item.ads_name });
          }
          setAds(result);
          setOpenCreate(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReading = async (customer_id: string) => {
    try {
      const { data } = await axios.patch(
        `${hostname}/api/customer/update/status-reading/${customer_id}`
      );
      if (data.status === "success") {
        setCustomer(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleIsActive = async (customer_id: string, is_active: boolean) => {
    try {
      const { data } = await axios.put(
        `${hostname}/api/customer/update/status-is-active`,
        { customer_id, is_active }
      );
      if (data.status === "success") {
        setCustomer(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${hostname}/api/customer/get-all`);
      if (data.status === "success") {
        if (data.result) {
          setCustomer(data.result);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Stack sx={{ mt: 2 }}>
        <Card>
          <Stack
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              justifyContent: { md: "space-between", xs: "start" },
            }}
          >
            <Stack direction="column" sx={{ mb: 1 }}>
              <Typography.Title style={{ fontSize: "20px", marginBottom: 0 }}>
                จัดการผู้ใช้งานระบบ
              </Typography.Title>
              <Typography.Text style={{ fontSize: "12px" }}>
                จัดการผู้ใช้งานเพื่อสร้าง report
              </Typography.Text>
            </Stack>
            <Stack
              sx={{ width: { md: "auto", xs: "100%" }, mt: { md: 2, xs: 0 } }}
            >
              <Button
                style={{ width: "100%" }}
                type="primary"
                onClick={handleCreate}
              >
                เพิ่มผู้ใช้งานวันนี้
              </Button>
            </Stack>
          </Stack>

          <Divider>ผู้ใช้งานวันนี้</Divider>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: { xs: "center", sm: "start" },
              flexWrap: "wrap",
            }}
          >
            {customer.length !== 0 &&
              customer.map((item: any) => {
                return (
                  <Card
                    key={item.customer_id}
                    style={{ width: 300, marginTop: 16, marginRight: 5 }}
                    actions={[
                      <Button
                        size="small"
                        type="primary"
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="btn-success"
                        disabled={item.customer_status !== "ไม่ตอบ"}
                        onClick={() => handleReading(item.customer_id)}
                      >
                        อ่านแล้ว
                      </Button>,
                      <Button
                        size="small"
                        type="primary"
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="btn-info"
                      >
                        จอง
                      </Button>,
                      <Button
                        size="small"
                        type="primary"
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className={
                          item.customer_is_active ? "btn-danger" : "btn-success"
                        }
                        onClick={() =>
                          handleIsActive(
                            item.customer_id,
                            !item.customer_is_active
                          )
                        }
                      >
                        {item.customer_is_active ? "ไม่นับ" : "นับ"}
                      </Button>,
                      <Button
                        size="small"
                        type="primary"
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                        className="btn-warning"
                      >
                        แก้ไข
                      </Button>,
                    ]}
                  >
                    <Stack direction="column" spacing={0.5}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography.Text>ชื่อ</Typography.Text>
                        <Typography.Text>{item.customer_name}</Typography.Text>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography.Text>สถานะ</Typography.Text>
                        <Tag style={{ marginRight: 0 }}>
                          {item.customer_status}
                        </Tag>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography.Text>นับ report</Typography.Text>
                        <Tag
                          style={{ marginRight: 0 }}
                          color={item.customer_is_active ? "green" : "red"}
                        >
                          {item.customer_is_active ? "นับ" : "ไม่นับ"}
                        </Tag>
                      </Stack>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography.Text>สถานะ ads</Typography.Text>
                        <Tag
                          style={{ marginRight: 0 }}
                          color={item.ads_id ? "blue" : "red"}
                        >
                          {item.ads_id ? "มาจาก ads" : "ไม่ได้มาจาก ads"}
                        </Tag>
                      </Stack>
                    </Stack>
                  </Card>
                );
              })}
          </Stack>
        </Card>
      </Stack>
      <CreateModal
        open={openCreate}
        setOpen={setOpenCreate}
        adsList={ads}
        callback={fetchData}
      />
    </>
  );
}
