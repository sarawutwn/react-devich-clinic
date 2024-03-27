import { Checkbox, Modal, Row, Table, Typography } from "antd";
import axios from "axios";
import { UPDATE_ROLES_GROUP } from "../../../endpoint";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: any;
  role_id: any;
  permission: any;
  setPermission: any;
};

const RolePermissionModal = (props: Props) => {
  const handleClose = () => {
    props.setPermission([]);
    props.setOpen(false);
  };

  const handleCheck = async (id: any, value: any) => {
    let result = [];
    for (let i = 0; i < props.permission.length; i++) {
      let item = props.permission[i];
      let permission = { ...item };
      let index = await item.permission_components.findIndex(
        (items: any) => items.permission_component_id === id
      );
      if (index !== -1) {
        permission.permission_components[index].have_permission = value;
      }
      await result.push(permission);
    }
    props.setPermission([...result]);
  };

  const handleSave = async () => {
    let request = [];
    for (let item of props.permission) {
      let filter = await item.permission_components.filter(
        (items: any) => items.have_permission === true
      );
      if (filter.length !== 0) {
        for (let value of filter) {
          await request.push({
            role_id: props.role_id,
            permission_id: item.permission_id,
            permission_component_id: value.permission_component_id,
          });
        }
      }
    }
    try {
      const { data } = await axios.post(UPDATE_ROLES_GROUP + props.role_id, {
        component_groups: request,
      });
      if (data.status === "success") {
        toast.success("บันทึกสำเร็จ");
        props.setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {props.permission.length !== 0 && (
        <Modal
          title={
            <Typography.Text style={{ fontSize: "24px" }}>
              จัดการสิทธ์
            </Typography.Text>
          }
          open={props.open}
          onOk={handleSave}
          onCancel={handleClose}
          width={700}
        >
          <Table
            dataSource={props.permission}
            size="small"
            columns={[
              {
                title: "หน้าต่าง",
                dataIndex: "permission_display_name",
                key: "permission_display_name",
              },
              {
                title: "สิทธ์การใช้งาน",
                dataIndex: "permission_components",
                key: "permission_components",
                align: "left" as const,
                render: (_, record) => (
                  <>
                    {record.permission_components.length !== 0 &&
                      record.permission_components.map((item: any) => {
                        return (
                          <Row
                            key={item.permission_component_name}
                            style={{ width: "100%", justifyContent: "start" }}
                          >
                            <Checkbox
                              checked={item.have_permission}
                              onChange={(e) =>
                                handleCheck(
                                  item.permission_component_id,
                                  e.target.checked
                                )
                              }
                            >
                              {item.permission_component_description}
                            </Checkbox>
                          </Row>
                        );
                      })}
                  </>
                ),
              },
            ]}
            pagination={false}
          />
        </Modal>
      )}
    </>
  );
};

export default RolePermissionModal;
