import React from "react";
import { Group, Text } from "./reacts-konva";
import Seat from "./seat";

import { SEATS_DISTANCE, SUBSECTION_PADDING, SEAT_SIZE } from "./layout";

export default ({
  width,
  x,
  y,
  data,
  onHoverSeat,
  onSelectSeat,
  onDeselectSeat,
  selectedSeatsIds
}: any) => {
  return (
    <Group x={x} y={y}>
      {Object.keys(data.seats_by_rows).map((rowKey, rowIndex) => {
        const row = data.seats_by_rows[rowKey];
        return (
          <React.Fragment key={rowKey}>
            {row.map((seat: any, seatIndex: any) => {
              return (
                <Seat
                  key={seat.name}
                  x={seatIndex * SEATS_DISTANCE + SUBSECTION_PADDING}
                  y={rowIndex * SEATS_DISTANCE + SUBSECTION_PADDING}
                  data={seat}
                  onHover={onHoverSeat}
                  onSelect={onSelectSeat}
                  onDeselect={onDeselectSeat}
                  isSelected={selectedSeatsIds.indexOf(seat.name) >= 0}
                />
              );
            })}
            <Text
              text={rowKey}
              x={SUBSECTION_PADDING - SEATS_DISTANCE}
              y={rowIndex * SEATS_DISTANCE + SUBSECTION_PADDING - SEAT_SIZE / 2}
              fontSize={SEAT_SIZE}
              key={"label-left" + rowKey}
            />
          </React.Fragment>
        );
      })}
      {data.seats_by_rows[1].map((_: any, seatIndex: any) => {
        return (
          <Text
            text={(seatIndex + 1).toString()}
            x={seatIndex * SEATS_DISTANCE + SUBSECTION_PADDING - 50}
            width={100}
            y={
              Object.keys(data.seats_by_rows).length * SEATS_DISTANCE +
              SUBSECTION_PADDING
            }
            key={"label-bottom" + seatIndex}
            align="center"
          />
        );
      })}
      <Text fontFamily="IBM Plex Sans Thai" text={data.name} fontSize={15} width={width} align="center" y={-10} />
    </Group>
  );
};
