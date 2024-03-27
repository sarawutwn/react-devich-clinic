import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Grid, Stack } from "@mui/material";
import { Card, Divider, Input, Modal, Space, Typography, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { ADD_NEW_PREFIX, UPLOAD_IMG } from "../../endpoint";

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

type Props = {
  open: boolean;
  setOpen: any;
  callback: any;
};

const CreatePrefixModal = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [files, setFiles] = useState<any>(null);
  const [formData, setFormData] = useState({
    prefix_name: "",
    prefix_free_tax: "",
    prefix_ai_amount: "",
    username: "",
    password: "",
    email: "",
    telephone: "",
  });

  const handleClose = async () => {
    props.setOpen(false);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8, fontSize: "16px" }}>เลือกรูปภาพ</div>
      <div style={{ fontSize: "12px" }}>แนะนำเป็นรูปขนาดด้านเท่า</div>
    </div>
  );

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      toast.error("Image must smaller than 2MB!");
    }
    setFiles(file);
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info: any) => {
    getBase64(info.file.originFileObj, (url: any) => {
      setLoading(false);
      setImageUrl(url);
    });
  };

  const handleSave = async () => {
    try {
      let form = new FormData();
      form.append("file", files);
      try {
        const { data } = await axios.post(UPLOAD_IMG, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (data.status === "success") {
          let request = {
            prefix_name: formData.prefix_name,
            prefix_free_tax: Number(formData.prefix_free_tax),
            prefix_ai_amount: Number(formData.prefix_ai_amount),
            prefix_img: data.result,
            user_username: formData.username,
            user_password: formData.password,
            user_email: formData.email,
            user_telephone: formData.telephone,
            user_img: data.result,
          };
          const resp = await axios.post(ADD_NEW_PREFIX, request);
          if (resp.data.status === "success") {
            props.callback();
            setFormData({
              prefix_name: "",
              prefix_free_tax: "",
              prefix_ai_amount: "",
              username: "",
              password: "",
              email: "",
              telephone: "",
            });
            props.setOpen(false);
            toast.success("เพิ่มร้านค้าสำเร็จ");
          }
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={props.open}
      okText="สร้าง"
      cancelText="ยกเลิก"
      onOk={handleSave}
      onCancel={handleClose}
      closable={false}
      style={{ top: 20 }}
    >
      <Divider>รายละเอียดร้านค้า</Divider>
      <Stack direction="column" spacing={1.5}>
        <Space
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Upload
            name="avatar"
            accept=".png,.jpeg,.webp"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            style={{ border: 0 }}
          >
            <Card
              style={{
                textAlign: "center",
                width: "140px",
                height: "140px",
                borderRadius: "100px",
                border: "1px dotted #dcdccd",
                cursor: "pointer",
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: "100px",
                    marginLeft: "-25px",
                    marginTop: "-25px",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Card>
          </Upload>
        </Space>
        <Stack direction="column">
          <Typography.Text>ชื่อร้านค้า</Typography.Text>
          <Input
            size="large"
            style={{ width: "100%" }}
            value={formData.prefix_name}
            onChange={(e) =>
              setFormData({ ...formData, prefix_name: e.target.value })
            }
          />
        </Stack>
        <Stack direction="column">
          <Typography.Text>ค่าคอมมิชชั่นที่ร้านได้รับ</Typography.Text>
          <Input
            size="large"
            style={{ width: "100%" }}
            type="number"
            addonAfter="%"
            value={formData.prefix_free_tax}
            onChange={(e) =>
              setFormData({ ...formData, prefix_free_tax: e.target.value })
            }
          />
        </Stack>
        <Stack direction="column">
          <Typography.Text>ค่าใช้บริการ AI ตรวจสอบรูปภาพ</Typography.Text>
          <Input
            size="large"
            style={{ width: "100%" }}
            type="number"
            addonAfter="บาท / รายการ"
            value={formData.prefix_ai_amount}
            onChange={(e) =>
              setFormData({ ...formData, prefix_ai_amount: e.target.value })
            }
          />
        </Stack>
        <Divider>รายละเอียดเจ้าของร้าน</Divider>
        <Grid container>
          <Grid item xs={6}>
            <Stack direction="column">
              <Typography.Text>username</Typography.Text>
              <Input
                size="large"
                style={{ width: "97%" }}
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="column">
              <Typography.Text>password</Typography.Text>
              <Input
                size="large"
                style={{ width: "100%" }}
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="column">
              <Typography.Text>email</Typography.Text>
              <Input
                size="large"
                style={{ width: "97%" }}
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="column">
              <Typography.Text>telephone</Typography.Text>
              <Input
                size="large"
                style={{ width: "100%" }}
                type="telephone"
                value={formData.telephone}
                onChange={(e) =>
                  setFormData({ ...formData, telephone: e.target.value })
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};

export default CreatePrefixModal;
