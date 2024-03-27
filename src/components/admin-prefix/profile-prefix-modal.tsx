import { Grid, Stack } from "@mui/material";
import { Button, Input, Modal, QRCode, Space, Typography } from "antd";
import { CopyOutlined, ExportOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const ProfilePrefixModal = ({ detail, open, setOpen }: any) => {
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
    toast.success(`บันทึกไปที่คลิปบอร์ด`);
  };

  const copyToClipboardMonitor = async () => {
    navigator.clipboard.writeText(
      `https://netcastview.esikk.com/${detail.prefix_id}/monitor`
    );
    toast.success(`บันทึกไปที่คลิปบอร์ด`);
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

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      cancelText="ปิด"
      closable={false}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Stack direction="row" sx={{ justifyContent: "center" }}>
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
      <Stack direction="column" spacing={1} sx={{ maxWidth: "1000px", mt: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <Stack sx={{ mt: { xs: 0, md: 1 } }}>
              <Typography.Text>ชื่อ</Typography.Text>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Input size="large" value={detail.prefix_name}>
            </Input>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Stack sx={{ mt: { xs: 0, md: 1 } }}>
              <Typography.Text>ลิ้งค์มอนิเตอร์ร้าน</Typography.Text>
            </Stack>
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <Stack sx={{ mt: { xs: 0, md: 1 } }}>
              <Typography.Text>ลิงก์สำหรับลูกค้า</Typography.Text>
            </Stack>
          </Grid>
          <Grid item xs={12}>
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
    </Modal>
  );
};

export default ProfilePrefixModal;
