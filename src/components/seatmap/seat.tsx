import { Circle } from "./reacts-konva";
import { SEAT_SIZE } from "./layout";

function getColor(isBooked: any, isSelected: any) {
  if (isSelected) {
    return "red";
  } else if (isBooked) {
    return "lightgrey";
  } else {
    return "green";
  }
}

const Seat = (props: any) => {
  const isBooked = props.data.status === "booked";

  return (
    <Circle
      x={props.x}
      y={props.y}
      radius={SEAT_SIZE / 2}
      fill={getColor(isBooked, props.isSelected)}
      strokeWidth={1}
      onMouseEnter={(e: any) => {
        e.target._clearCache();
        props.onHover(props.data.name, e.target.getAbsolutePosition());
        const container = e.target.getStage().container();
        if (isBooked) {
          container.style.cursor = "not-allowed";
        } else {
          container.style.cursor = "pointer";
        }
      }}
      onMouseLeave={(e: any) => {
        props.onHover(null);
        const container = e.target.getStage().container();
        container.style.cursor = "";
      }}
      onClick={(_: any) => {
        if (isBooked) {
          return;
        }
        if (props.isSelected) {
          props.onDeselect(props.data.name);
        } else {
          props.onSelect(props.data.name);
        }
      }}
      onTap={(_: any) => {
        if (isBooked) {
          return;
        }
        if (props.isSelected) {
          props.onDeselect(props.data.name);
        } else {
          props.onSelect(props.data.name);
        }
      }}
    />
  );
};

export default Seat;
