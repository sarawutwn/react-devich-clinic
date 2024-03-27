import {
  Button,
  Card,
  Col,
  ColorPicker,
  Divider,
  Input,
  Row,
  Typography,
} from "antd";
import Warper from "../utils/warpper-page";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_THEME_SETTING, UPDATE_THEME_SETTING } from "../endpoint";
import { toast } from "react-toastify";
import ContentCastCard from "../components/smartphone/content-cast";
import ContentMainCard from "../components/smartphone/content-main";
import ContentMonitor from "../components/smartphone/content-monitor";

const Theme = () => {
  const [color, setColor] = useState("#FF5757");
  const [mainHeaderColor, setMainColorHeader] = useState("#FF5757");
  const [elementColor, setElementColor] = useState("#FFF");
  const [colorBtn, setColorBtn] = useState("#FFF");
  const [cardColor, setCardColor] = useState("#FFF");
  const [background, setBackground] = useState("#FFF");
  const [monitorBg, setMonitorBg] = useState("");
  const [textColor, setTextColor] = useState("#424242");
  const [monitorTextOne, setMonitorTextOne] = useState("#424242");
  const [monitorTextTwo, setMonitorTextTwo] = useState("#424242");
  const [scanBg, setScanBg] = useState("#FF5757");
  const [scanText, setScanText] = useState("#FFF");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(GET_THEME_SETTING);
      if (data.status === "success") {
        setColor(data.result.color);
        setMainColorHeader(data.result.mainHeaderColor);
        setElementColor(data.result.elementColor);
        setColorBtn(data.result.colorBtn);
        setCardColor(data.result.cardColor);
        setBackground(data.result.background);
        setMonitorBg(data.result.monitorBg);
        setTextColor(data.result.textColor);
        setMonitorTextOne(data.result.monitorTextOne);
        setMonitorTextTwo(data.result.monitorTextTwo);
        setScanBg(data.result.scanBg);
        setScanText(data.result.scanText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      const formData = {
        color,
        mainHeaderColor,
        elementColor,
        colorBtn,
        cardColor,
        background,
        monitorBg,
        textColor,
        monitorTextOne,
        monitorTextTwo,
        scanBg,
        scanText,
      };
      const { data } = await axios.put(UPDATE_THEME_SETTING, {
        ...formData,
      });
      if (data.status === "success") {
        toast.success("บันทึกสำเร็จ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Warper pointer={["หน้าหลัก", "ตั้งค่าธีม"]}>
      <Row justify={"space-between"} style={{ marginBottom: "20px" }}>
        <Row>
          <img src="/images/app-development.png" width={80} />
          <Col style={{ marginTop: "-16px", marginLeft: "-10px" }}>
            <Typography.Title
              style={{ marginBottom: "0", marginLeft: "12px" }}
              level={2}
            >
              ตั้งค่าแอพพลิเคชั่น
            </Typography.Title>
            <Typography.Text style={{ marginLeft: "12px", color: "#888888" }}>
              จัดการธีมของคุณ
            </Typography.Text>
          </Col>
        </Row>
        <Row>
          <Button
            type="primary"
            size="large"
            className="btn-success"
            style={{ marginTop: "10px", width: "100%" }}
            onClick={handleSave}
          >
            บันทึก
          </Button>
        </Row>
      </Row>
      <Divider>ตั้งค่าสี</Divider>
      <Row gutter={[16, 10]}>
        <Col xs={24} lg={13} style={{ padding: "10px" }}>
          <Card>
            <Divider>ตั้งค่าทั่วไป</Divider>
            <Row gutter={[16, 10]}>
              <Col xs={12}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สีของ background
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={background}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setBackground(hex)}
                />
              </Col>
              <Col xs={12}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สีของ Card
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={cardColor}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setCardColor(hex)}
                />
              </Col>
              <Col xs={6}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สีของ Text
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={textColor}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setTextColor(hex)}
                />
              </Col>
              <Col xs={6}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สี element
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={elementColor}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setElementColor(hex)}
                />
              </Col>
              <Col xs={6}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สีของปุ่ม
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={color}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setColor(hex)}
                />
              </Col>
              <Col xs={6}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สี text ปุ่ม
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={colorBtn}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setColorBtn(hex)}
                />
              </Col>
            </Row>
            <Divider style={{ marginTop: "50px" }}>หน้าหลัก</Divider>
            <Row gutter={[16, 10]}>
              <Col xs={12}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สีแถบ main
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={mainHeaderColor}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setMainColorHeader(hex)}
                />
              </Col>
            </Row>
            <Divider style={{ marginTop: "50px" }}>Monitor</Divider>
            <Row gutter={[16, 10]}>
              <Col xs={12}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  background (ใส่เป็นลิ้งค์)
                </Typography.Text>
                <Input
                  style={{ width: "100%" }}
                  value={monitorBg}
                  size="large"
                  onChange={(e) => setMonitorBg(e.target.value)}
                />
              </Col>
              <Col xs={6}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สี "แจกวาร์ปขึ้นจอ"
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={monitorTextOne}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setMonitorTextOne(hex)}
                />
              </Col>
              <Col xs={6}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สี "IG, Face..."
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={monitorTextTwo}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setMonitorTextTwo(hex)}
                />
              </Col>
              <Col xs={6}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สีปุ่มสแกนเลย
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={scanBg}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setScanBg(hex)}
                />
              </Col>
              <Col xs={6}>
                <Typography.Text style={{ fontSize: "16px" }}>
                  สี text สแกนเลย
                </Typography.Text>
                <ColorPicker
                  style={{ width: "100%" }}
                  value={scanText}
                  size="large"
                  showText={(color) => <span>{color.toHexString()}</span>}
                  onChange={(_, hex) => setScanText(hex)}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={11} style={{ padding: "20px" }}>
          <ContentCastCard
            elementColor={elementColor}
            background={background}
            textColor={textColor}
            color={color}
            colorBtn={colorBtn}
            cardColor={cardColor}
          />
        </Col>
      </Row>
      <Row gutter={[16, 10]}>
        <Col xs={24} lg={13} style={{ padding: "10px" }}>
          <ContentMonitor
            monitorBg={monitorBg}
            background={background}
            monitorTextOne={monitorTextOne}
            monitorTextTwo={monitorTextTwo}
            scanBg={scanBg}
            scanText={scanText}
          />
        </Col>
        <Col xs={24} lg={11} style={{ padding: "20px" }}>
          <ContentMainCard
            background={background}
            mainHeader={mainHeaderColor}
            color={color}
            textColor={textColor}
            cardColor={cardColor}
          />
        </Col>
      </Row>
    </Warper>
  );
};

export default Theme;
