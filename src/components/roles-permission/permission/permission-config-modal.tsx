import { Button, Divider, Input, Modal, Table, Typography } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  CREATE_COMPONENT,
  DELETE_COMPONENT_BY_ID,
  GET_COMPONENT_BY_ID,
} from "../../../endpoint";

type Props = {
  open: boolean;
  setOpen: any;
  permission: any;
  configData: any;
  setConfigData: any;
  callback: any;
};

const PermissionConfigModal = (props: Props) => {
  const [component, setComponent] = useState({
    permission_component_name: "",
    permission_component_display_name: "",
    permission_component_description: "",
  });
  const handleClose = () => {
    setComponent({
      permission_component_name: "",
      permission_component_display_name: "",
      permission_component_description: "",
    });
    props.setOpen(false);
  };
  const handleComponent = (key: string, value: string) => {
    setComponent({ ...component, [key]: value });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.post(
        CREATE_COMPONENT + props.permission.permission_id,
        component
      );
      if (data.status === "success") {
        setComponent({
          permission_component_name: "",
          permission_component_display_name: "",
          permission_component_description: "",
        });
      }
      fetchComponent();
    } catch (err) {
      toast.error("มีบางอย่างผิดพลาด");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { data } = await axios.delete(DELETE_COMPONENT_BY_ID + id);
      if (data.status === "success") {
        fetchComponent();
      }
    } catch (err) {
      toast.error("มีบางอย่างผิดพลาด");
    }
  };

  const fetchComponent = async () => {
    try {
      const { data } = await axios.get(
        GET_COMPONENT_BY_ID + props.permission.permission_id
      );
      if (data.status === "success") {
        props.setConfigData(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "24px" }}>
          ส่วนประกอบของ
          <span style={{ color: "#FF5757" }}>
            หน้า{props.permission.permission_display_name}
          </span>
        </Typography.Text>
      }
      open={props.open}
      onOk={handleClose}
      onCancel={handleClose}
      width={700}
    >
      <Divider />
      <Typography.Text style={{ fontSize: "18px" }}>
        เพิ่มส่วนประกอบ
      </Typography.Text>
      <Input
        addonBefore="ชื่อส่วนประกอบ"
        style={{ marginBottom: "10px" }}
        value={component.permission_component_name}
        onChange={(e) =>
          handleComponent("permission_component_name", e.target.value)
        }
      />
      <Input
        addonBefore="ชื่อแสดงผล"
        style={{ marginBottom: "10px" }}
        value={component.permission_component_display_name}
        onChange={(e) =>
          handleComponent("permission_component_display_name", e.target.value)
        }
      />
      <Typography.Text>รายละเอียด</Typography.Text>
      <Input.TextArea
        value={component.permission_component_description}
        onChange={(e) =>
          handleComponent("permission_component_description", e.target.value)
        }
      />
      <Button
        type="primary"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={handleSave}
      >
        บันทึก
      </Button>
      <Divider />
      <Table
        dataSource={props.configData}
        columns={[
          {
            title: "ชื่อ",
            dataIndex: "permission_component_name",
            key: "permission_component_name",
          },
          {
            title: "ชื่อแสดงผล",
            dataIndex: "permission_component_display_name",
            key: "permission_component_display_name",
          },
          {
            title: "รายละเอียด",
            dataIndex: "permission_component_description",
            key: "permission_component_description",
          },
          {
            title: "ตั้งค่า",
            key: "action",
            render: (_, record) => (
              <Button
                type="primary"
                style={{ width: "50px", background: "red" }}
                onClick={() => handleDelete(record.permission_component_id)}
              >
                ลบ
              </Button>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default PermissionConfigModal;
