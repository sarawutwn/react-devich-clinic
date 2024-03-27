import { Breadcrumb } from "antd";

type Props = {
  pointer: string[];
  children: string | JSX.Element | JSX.Element[];
};

const Warper = (props: Props) => {
  return (
    <>
      {props.pointer.length !== 0 && (
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={props.pointer.map((item, index) => {
            return { key: `${index+1}-${item}`, title: item };
          })}
        />
      )}
      <div
        style={{
          padding: 24,
          minHeight: 360,
          backgroundColor: "#FFF",
          borderRadius: "20px",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Warper;
