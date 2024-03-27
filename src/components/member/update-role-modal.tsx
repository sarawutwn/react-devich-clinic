import { Modal, Select, Typography } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { UPDATE_ROLE_BY_USER_ID } from "../../endpoint";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: any;
  data: any;
  setData: any;
  callback: any;
  Roles: any;
};

const UpdateRoleModal = (props: Props) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChange = (value: any) => {
    props.setData({ ...props.data, role_id: value });
  };

  const handleSave = async () => {
    try {
      let formData = {
        user_id: props.data.user_id,
        role_id: props.data.role_id,
      }
      const { data } = await axios.put(UPDATE_ROLE_BY_USER_ID, formData);
      if(data.status === "success") {
        toast.success("บันทึกสำเร็จ");
        props.callback();
        props.setOpen(false);
      }
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <Modal
      title={
        <Typography.Text style={{ fontSize: "24px" }}>
          แก้ไขสิทธ์
        </Typography.Text>
      }
      open={props.open}
      onOk={handleSave}
      onCancel={handleClose}
    >
      <Select
        value={props.data.role_id}
        style={{ width: "100%" }}
        options={
          props.Roles.length !== 0 &&
          props.Roles.map((item: any) => {
            return {
              value: item.role_id,
              label: `${item.role_name} | ${item.role_description}`,
            };
          })
        }
        onChange={(value: any) => handleChange(value)}
      />
    </Modal>
  );
};

const mapStateToProps = (state: any) => {
  return {
    Roles: state.roles,
  };
};
export default connect(mapStateToProps)(UpdateRoleModal);
