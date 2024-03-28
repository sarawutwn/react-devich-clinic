import { Space } from "antd";
import { connect } from "react-redux";

const DropdownHeader = () => {
  return (
    <Space>
      <img
        src={"/images/310331021_464751455676954_6742359841360873997_n.jpg"}
        style={{
          borderRadius: "50px",
          marginRight: "15px",
          marginTop: "10px",
          width: "40px",
        }}
      />
    </Space>
  );
};

const mapStateToProps = (state: any) => {
  return {
    profile: state.profile,
  };
};
export default connect(mapStateToProps)(DropdownHeader);
