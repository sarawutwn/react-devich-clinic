import { Container, Grid, Stack } from "@mui/material";
import { Button, Card, Input, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { hostname } from "../endpoint";
import moment from "moment";
import { toast } from "react-toastify";

const months_th = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

export default function Home() {
  const [report, setReport] = useState("");
  const [showReport, setShowReport] = useState("");
  const [conReport, setConReport] = useState("");
  const [showConReport, setShowConReport] = useState("");

  const [branchAvg, setBranchAvg] = useState("");
  const [branchDuo, setBranchDuo] = useState(0);
  const [branchID, setBranchID] = useState("");

  const submitData = async () => {
    try {
      const { data } = await axios.put(`${hostname}/api/customer/branches`, {
        branch_avg_today: branchAvg,
        branch_duo_amount: branchDuo,
        branch_id: branchID,
      });
      if (data.status === "success") {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      let ads = [];
      let con = "";
      let show_con = "";
      const response = await axios.get(`${hostname}/api/customer/branches`);
      if (response.data.status === "success") {
        con = `${response.data.result.branch_name} - ${moment().format(
          "DD-MM"
        )}-${String(Number(moment().format("YYYY")) + 543).substring(2)}\n`;
        show_con = `${response.data.result.branch_name} - ${moment().format(
          "DD-MM"
        )}-${String(Number(moment().format("YYYY")) + 543).substring(2)}<br />`;
        setBranchAvg(response.data.result.branch_avg_today);
        setBranchDuo(response.data.result.branch_duo_amount);
        setBranchID(response.data.result.branch_id);
      }
      const res = await axios.get(`${hostname}/api/customer/get-report`);
      if (res.data.status === "success") {
        for (let item of res.data.result) {
          let adsData = await ads.filter(
            (items) => items.name === item.invoice_item_name
          );
          if (adsData.length !== 0) {
            adsData[0].จอง += 1;
          } else {
            ads.push({
              name: item.invoice_item_name,
              อ่าน: 0,
              จอง: 1,
              ไม่อ่าน: 0,
            });
          }
        }
      }
      const { data } = await axios.get(
        `${hostname}/api/customer/get-customer-report`
      );
      if (data.status === "success") {
        let all = 0;
        let invoice = 0;
        let invoice_to = 0;
        let dont_read = 0;
        let total_pay_invoice = 0;
        let total_pay_invoice_count = 0;
        let total_pay_invoice_to = 0;
        for (let item of data.result) {
          if (item.customer_status === "จอง") {
            if (item.customer_pay_amount === 0) {
              invoice_to++;
              total_pay_invoice_to += item.customer_price;
            } else {
              invoice++;
              if (item.customer_price - item.customer_pay_amount === 0) {
                total_pay_invoice += item.customer_price;
              } else {
                total_pay_invoice +=
                  item.customer_price - item.customer_pay_amount;
              }
            }
          }
          if (item.ads_id) {
            if (item.customer_is_active) {
              if (item.customer_status === "ไม่ตอบ") {
                dont_read++;
                con += `FB: ${item.customer_name}/${item.ads_short_name}\n`;
                show_con += `FB: ${item.customer_name}/${item.ads_short_name}<br />`;
                let adsData = await ads.findIndex(
                  (items) => items.name === item.ads_name
                );
                if (adsData !== -1) {
                  ads[adsData].อ่าน += 1;
                  ads[adsData].ไม่อ่าน += 1;
                } else {
                  ads.push({
                    name: item.ads_name,
                    อ่าน: 1,
                    จอง: 0,
                    ไม่อ่าน: 1,
                  });
                }
              } else {
                let adsData = await ads.findIndex(
                  (items) => items.name === item.ads_name
                );
                if (adsData !== -1) {
                  ads[adsData].อ่าน += 1;
                } else {
                  ads.push({
                    name: item.ads_name,
                    อ่าน: 1,
                    จอง: 0,
                    ไม่อ่าน: 0,
                  });
                }
              }

              all++;
            }
          }
        }
        let reportAds = "";
        let reportShow = "";
        for (let item of ads) {
          reportAds += `🌟${item.name}\nถาม ${item.อ่าน} คน จอง ${item.จอง} คน\n\n`;
          reportShow += `🌟${item.name}<br />ถาม ${item.อ่าน} คน จอง ${item.จอง} คน ไม่ตอบ ${item.ไม่อ่าน} คน<br /><br />`;
        }
        let more = `🧚‍♀อื่นๆ/ถาม 0 คน จอง 0 คน`;
        let dayCount = หาจำนวนวันในเดือนปัจจุบัน() + 1;
        con += `---------------------\nรายงานปัญหา\n\n---------------------\n📌อัพเดท ${moment().format(
          "DD/MM/YYYY"
        )}\nเป้า⭐️${response.data.result.branch_amount.toLocaleString()}⭐️⭐️\nวันทำงาน= ${dayCount} วัน\nเฉลี่ยต่อวัน = ${
          response.data.result.branch_avg_today
        } บาท\nยอดอัพเดทออนไลน์ รวม = ${Number(
          response.data.result.branch_me_amount +
            total_pay_invoice +
            response.data.result.branch_duo_amount
        ).toLocaleString()} บาท\nสอง รวมยอด = ${Number(
          response.data.result.branch_me_amount + total_pay_invoice
        ).toLocaleString()} บาท\n${
          response.data.result.branch_duo_name
        } รวมยอด = ${Number(
          response.data.result.branch_duo_amount
        ).toLocaleString()} บาท`;
        show_con += `---------------------<br />รายงานปัญหา<br /><br />---------------------<br />📌อัพเดท ${moment().format(
          "DD/MM/YYYY"
        )}<br />เป้า⭐️${response.data.result.branch_amount.toLocaleString()}⭐️⭐️<br />วันทำงาน= ${dayCount} วัน<br />เฉลี่ยต่อวัน = ${
          response.data.result.branch_avg_today
        } บาท<br />ยอดอัพเดทออนไลน์ รวม = ${Number(
          response.data.result.branch_me_amount +
            total_pay_invoice +
            response.data.result.branch_duo_amount
        ).toLocaleString()} บาท<br />สอง รวมยอด = ${Number(
          response.data.result.branch_me_amount + total_pay_invoice
        ).toLocaleString()} บาท<br />${
          response.data.result.branch_duo_name
        } รวมยอด = ${Number(
          response.data.result.branch_duo_amount
        ).toLocaleString()} บาท`;
        setReport(
          `อัพเดทรีพอตวันที่ ${moment().format("DD")} ${
            months_th[Number(moment().format("MM")) - 1]
          } ${String(
            Number(moment().format("YYYY")) + 543
          )} (FB)\nเพจ Devich clinic สาขา ${
            response.data.result.branch_name
          }\n\nลูกค้าFB = ${all} เฟส\n\nFBจอง = ${invoice} เฟส\n\nเข้าปรึกษาแพทย์ = ${invoice_to} เฟส\n\n\ถามไม่ตอบ = ${dont_read} คน\n\nโอนจอง = ${invoice} คน\nรวมยอดโอนจอง = ${total_pay_invoice} บาท\nยอดค้างชำระ = ${total_pay_invoice_count} บาท\nไม่โอนจอง = ${invoice_to} คน\nยอดค้างไม่โอนจอง = ${total_pay_invoice_to} บาท\n\nโปรที่สอบถามเยอะที่สุด\n……………………………………………\n` +
            reportAds +
            more
        );
        setShowReport(
          `อัพเดทรีพอตวันที่ ${moment().format("DD")} ${
            months_th[Number(moment().format("MM")) - 1]
          } ${String(
            Number(moment().format("YYYY")) + 543
          )} (FB)<br />เพจ Devich clinic สาขา ${
            response.data.result.branch_name
          }<br /><br />ลูกค้าFB = ${all} เฟส<br /><br />FBจอง = ${invoice} เฟส<br /><br />เข้าปรึกษาแพทย์ = ${invoice_to} เฟส<br /><br />\ถามไม่ตอบ = ${dont_read} คน<br /><br />โอนจอง = ${invoice} คน<br />รวมยอดโอนจอง = ${total_pay_invoice} บาท<br />ยอดค้างชำระ = ${total_pay_invoice_count} บาท<br />ไม่โอนจอง = ${invoice_to} คน<br />ยอดค้างไม่โอนจอง = ${total_pay_invoice_to} บาท<br /><br />โปรที่สอบถามเยอะที่สุด<br />……………………………………………<br />` +
            reportShow +
            more
        );
        setConReport(con);
        setShowConReport(show_con);
      }
      console.log(con);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
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
            direction="column"
            sx={{ justifyContent: "center" }}
          >
            <Stack direction="row" justifyContent="center">
              <img
                src={
                  "/images/310331021_464751455676954_6742359841360873997_n.jpg"
                }
                style={{ borderRadius: "50px", width: "55px" }}
              />
            </Stack>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: "20px",
                  marginLeft: "10px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Devich Clinic (สอง)
              </Typography.Text>
              <Typography.Text>ยอดเฉลี่ย</Typography.Text>
              <Input
                value={branchAvg}
                onChange={(e: any) => setBranchAvg(e.target.value)}
              />
              <Typography.Text>ยอดของเพื่อนร่วมงาน</Typography.Text>
              <Input
                value={branchDuo}
                onChange={(e: any) => setBranchDuo(Number(e.target.value))}
              />
              <Stack direction="row" justifyContent="end" sx={{ mt: 1 }}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={submitData}
                >
                  บันทึก
                </Button>
              </Stack>
            </div>
          </Stack>
        </Stack>
      </Card>
      <Grid item md={6} xs={12}>
        <Card
          style={{
            backgroundColor: "#FFF",
            borderRadius: "10px",
            border: "0",
            marginTop: "10px",
          }}
        >
          <Stack direction="column">
            <Stack direction="row" justifyContent="space-between">
              <Typography>Report</Typography>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(report);
                  toast.success("copy to clipboard.");
                }}
              >
                คัดลอก
              </Button>
            </Stack>
            <Typography style={{ marginTop: "20px" }}>
              <div dangerouslySetInnerHTML={{ __html: showReport }} />
            </Typography>
          </Stack>
        </Card>
      </Grid>
      <Grid container>
        <Grid item md={6} xs={12}>
          <Card
            style={{
              backgroundColor: "#FFF",
              borderRadius: "10px",
              border: "0",
              marginTop: "10px",
            }}
          >
            <Stack direction="column">
              <Stack direction="row" justifyContent="space-between">
                <Typography>Report ส่งต่อ</Typography>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    navigator.clipboard.writeText(conReport);
                    toast.success("copy to clipboard.");
                  }}
                >
                  คัดลอก
                </Button>
              </Stack>
              <Typography style={{ marginTop: "20px" }}>
                <div dangerouslySetInnerHTML={{ __html: showConReport }} />
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

function หาจำนวนวันในเดือนปัจจุบัน() {
  const วันปัจจุบัน = new Date();
  const วันที่สิ้นเดือนปัจจุบัน = new Date(
    วันปัจจุบัน.getFullYear(),
    วันปัจจุบัน.getMonth() + 1,
    0
  );
  const จำนวนวันที่เหลือ =
    วันที่สิ้นเดือนปัจจุบัน.getDate() - วันปัจจุบัน.getDate();
  return จำนวนวันที่เหลือ;
}
