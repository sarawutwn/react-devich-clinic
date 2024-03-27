import { Typography } from "antd";

export default function LoginLayout(props: any) {
  return (
    <div className="login-layout-main" style={{ background: "#FFF" }}>
      <div className="login-layout-section">
        <Typography.Text style={{ fontSize: "30px", fontWeight: "bold" }}>
          {"ShowWarp BackOffice"}
        </Typography.Text>
        <Typography.Text
          style={{ fontSize: "18px", color: "rgba(76, 78, 100, 0.6)" }}
        >
          ตั้งค่าระบบ, ดูรายงาน, ติดตามการใช้งานของผู้คน
        </Typography.Text>
        <img src="/images/7038058.jpg" width={800} />
      </div>
      <div className="login-layout-content">{props.children}</div>
    </div>
  );
}
