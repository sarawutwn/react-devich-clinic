import { Grid, Stack } from "@mui/material";
import Warper from "../utils/warpper-page";
import { Button, Input, QRCode, Space, Typography } from "antd";
import { CopyOutlined, ExportOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { PREFIX_DETAIL } from "../endpoint";
import { toast } from "react-toastify";

const PrefixDetail = () => {
  const [detail, setDetail] = useState({
    prefix_id: "",
    prefix_name: "",
  });
  const downloadQRCode = () => {
    const canvas = document
      .getElementById("myqrcode")
      ?.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const copyToClipboard = async () => {
    navigator.clipboard.writeText(
      `https://netcastview.esikk.com/${detail.prefix_id}/menu`
    );
    toast.success(`บันทึกไปที่คลิปบอร์ด`)
  };
  const copyToClipboardMonitor = async () => {
    navigator.clipboard.writeText(
      `https://netcastview.esikk.com/${detail.prefix_id}/monitor`
    );
    toast.success(`บันทึกไปที่คลิปบอร์ด`)
  };

  const toHyperLink = async () => {
    window.open(
      `https://netcastview.esikk.com/${detail.prefix_id}/menu`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const toHyperLinkMonitor = async () => {
    window.open(
      `https://netcastview.esikk.com/${detail.prefix_id}/monitor`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(PREFIX_DETAIL);
        if (data.status === "success") {
          setDetail(data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Warper pointer={["หน้าหลัก", "รายละเอียดร้าน"]}>
        <Stack
          direction="row"
          sx={{ justifyContent: { xs: "center", md: "start" } }}
        >
          <img src="/images/store.png" width={70} height={70} />
          <Stack direction="column" style={{ marginTop: "-16px" }}>
            <Typography.Title
              style={{ marginBottom: "0", marginLeft: "12px" }}
              level={2}
            >
              โปรไฟล์ร้าน
            </Typography.Title>
            <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
              รวมลิ้งค์และรายละเอียดร้าน
            </Typography.Text>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          sx={{ maxWidth: "1000px", mt: 3 }}
        >
          <Grid container>
            <Grid item xs={12} md={2}>
              <Stack sx={{ mt: { xs: 0, md: 1 } }}>
                <Typography.Text>ชื่อ</Typography.Text>
              </Stack>
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography.Text style={{ fontSize: "20px" }}>
                {detail.prefix_name}
              </Typography.Text>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Stack sx={{ mt: { xs: 0, md: 1 } }}>
                <Typography.Text>ลิ้งค์มอนิเตอร์ร้าน</Typography.Text>
              </Stack>
            </Grid>
            <Grid item xs={12} md={10}>
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  size="large"
                  value={`https://netcastview.esikk.com/${detail.prefix_id}/monitor`}
                />
                <Button size="large" onClick={copyToClipboardMonitor}>
                  <CopyOutlined />
                </Button>
                <Button size="large" onClick={toHyperLinkMonitor}>
                  <ExportOutlined />
                </Button>
              </Space.Compact>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Stack sx={{ mt: { xs: 0, md: 1 } }}>
                <Typography.Text>ลิงก์สำหรับลูกค้า</Typography.Text>
              </Stack>
            </Grid>
            <Grid item xs={12} md={10}>
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  size="large"
                  value={`https://netcastview.esikk.com/${detail.prefix_id}/menu`}
                />
                <Button size="large" onClick={copyToClipboard}>
                  <CopyOutlined />
                </Button>
                <Button size="large" onClick={toHyperLink}>
                  <ExportOutlined />
                </Button>
              </Space.Compact>
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="center" id="myqrcode">
            {detail.prefix_id !== "" && (
              <QRCode
                value={`https://netcastview.esikk.com/${detail.prefix_id}/menu`}
                size={300}
                iconSize={300 / 4}
              />
            )}
          </Stack>
          <Stack direction="row" justifyContent="center">
            <Button
              size="large"
              type="primary"
              onClick={downloadQRCode}
              style={{ width: "100%", maxWidth: "300px" }}
            >
              {" "}
              DOWNLOAD QR CODE
            </Button>
          </Stack>
        </Stack>
      </Warper>
    </>
  );
};

export default PrefixDetail;
