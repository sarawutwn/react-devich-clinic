import React from "react";
import { Stage, Layer } from "./reacts-konva";
import Section from "./section";
import SeatPopup from "./seat-popup";
import * as layout from "./layout";

const jsonData = {
  seats: {
    sections: [
      {
        event_id: 2,
        name: "หน้าเวที",
        color: null,
        subsections: [
          {
            id: 18,
            section_id: 6,
            name: "โซน VVIP",
            seats_by_rows: {
              "1": [
                {
                  name: "VVIP-1-1",
                  status: "free",
                },
                {
                  name: "VVIP-1-2",
                  status: "free",
                },
                {
                  name: "VVIP-1-3",
                  status: "free",
                },
              ],
              "2": [
                {
                  name: "VVIP-2-1",
                  status: "free",
                },
                {
                  name: "VVIP-2-2",
                  status: "free",
                },
              ],
              "3": [
                {
                  name: "VVIP-3-1",
                  status: "free",
                },
                {
                  name: "VVIP-3-2",
                  status: "free",
                },
                {
                  name: "VVIP-3-3",
                  status: "free",
                },
                {
                  name: "VVIP-3-4",
                  status: "free",
                },
                {
                  name: "VVIP-3-5",
                  status: "free",
                },
              ],
              "4": [
                {
                  name: "VVIP-4-1",
                  status: "free",
                },
              ],
            },
          },
          {
            id: 19,
            section_id: 6,
            name: "โซน VIP",
            seats_by_rows: {
              "1": [
                {
                  name: "VIP-1-1",
                  status: "free",
                },
                {
                  name: "VIP-1-2",
                  status: "free",
                },
                {
                  name: "VIP-1-3",
                  status: "free",
                },
                {
                  name: "VIP-1-4",
                  status: "free",
                },
                {
                  name: "VIP-1-5",
                  status: "free",
                },
                {
                  name: "VIP-1-6",
                  status: "free",
                },
                {
                  name: "VIP-1-7",
                  status: "free",
                },
                {
                  name: "VIP-1-8",
                  status: "free",
                },
                {
                  name: "VIP-1-9",
                  status: "free",
                },
                {
                  name: "VIP-1-10",
                  status: "free",
                },
                {
                  name: "VIP-1-11",
                  status: "free",
                },
                {
                  name: "VIP-1-12",
                  status: "free",
                },
                {
                  name: "VIP-1-13",
                  status: "free",
                },
                {
                  name: "VIP-1-14",
                  status: "free",
                },
              ],
              "2": [
                {
                  name: "VIP-2-1",
                  status: "free",
                },
                {
                  name: "VIP-2-2",
                  status: "free",
                },
                {
                  name: "VIP-2-3",
                  status: "free",
                },
                {
                  name: "VIP-2-4",
                  status: "free",
                },
                {
                  name: "VIP-2-5",
                  status: "free",
                },
                {
                  name: "VIP-2-6",
                  status: "free",
                },
                {
                  name: "VIP-2-7",
                  status: "free",
                },
                {
                  name: "VIP-2-8",
                  status: "free",
                },
                {
                  name: "VIP-2-9",
                  status: "free",
                },
                {
                  name: "VIP-2-10",
                  status: "free",
                },
                {
                  name: "VIP-2-11",
                  status: "free",
                },
                {
                  name: "VIP-2-12",
                  status: "free",
                },
                {
                  name: "VIP-2-13",
                  status: "free",
                },
                {
                  name: "VIP-2-14",
                  status: "free",
                },
              ],
              "3": [
                {
                  name: "VIP-3-1",
                  status: "free",
                },
                {
                  name: "VIP-3-2",
                  status: "free",
                },
                {
                  name: "VIP-3-3",
                  status: "free",
                },
                {
                  name: "VIP-3-4",
                  status: "free",
                },
                {
                  name: "VIP-3-5",
                  status: "free",
                },
                {
                  name: "VIP-3-6",
                  status: "free",
                },
                {
                  name: "VIP-3-7",
                  status: "free",
                },
                {
                  name: "VIP-3-8",
                  status: "free",
                },
                {
                  name: "VIP-3-9",
                  status: "free",
                },
                {
                  name: "VIP-3-10",
                  status: "free",
                },
                {
                  name: "VIP-3-11",
                  status: "free",
                },
                {
                  name: "VIP-3-12",
                  status: "free",
                },
                {
                  name: "VIP-3-13",
                  status: "free",
                },
                {
                  name: "VIP-3-14",
                  status: "free",
                },
              ],
              "4": [
                {
                  name: "VIP-4-1",
                  status: "free",
                },
                {
                  name: "VIP-4-2",
                  status: "free",
                },
                {
                  name: "VIP-4-3",
                  status: "free",
                },
                {
                  name: "VIP-4-4",
                  status: "free",
                },
                {
                  name: "VIP-4-5",
                  status: "free",
                },
                {
                  name: "VIP-4-6",
                  status: "free",
                },
                {
                  name: "VIP-4-7",
                  status: "free",
                },
                {
                  name: "VIP-4-8",
                  status: "free",
                },
                {
                  name: "VIP-4-9",
                  status: "free",
                },
                {
                  name: "VIP-4-10",
                  status: "free",
                },
                {
                  name: "VIP-4-11",
                  status: "free",
                },
                {
                  name: "VIP-4-12",
                  status: "free",
                },
                {
                  name: "VIP-4-13",
                  status: "free",
                },
                {
                  name: "VIP-4-14",
                  status: "free",
                },
              ],
            },
          },
        ],
      },
      {
        event_id: 2,
        name: "",
        color: null,
        subsections: [
          {
            id: 18,
            section_id: 6,
            name: "โซนปกติ 1",
            seats_by_rows: {
              "1": [
                {
                  name: "Bronze-B1-1-1",
                  status: "free",
                },
                {
                  name: "Bronze-B1-1-2",
                  status: "free",
                },
                {
                  name: "Bronze-B1-1-3",
                  status: "free",
                },
              ],
              "2": [
                {
                  name: "Bronze-B1-2-1",
                  status: "free",
                },
                {
                  name: "Bronze-B1-2-2",
                  status: "free",
                },
              ],
              "3": [
                {
                  name: "Bronze-B1-3-1",
                  status: "free",
                },
                {
                  name: "Bronze-B1-3-2",
                  status: "free",
                },
                {
                  name: "Bronze-B1-3-3",
                  status: "free",
                },
                {
                  name: "Bronze-B1-3-4",
                  status: "free",
                },
                {
                  name: "Bronze-B1-3-5",
                  status: "free",
                },
              ],
              "4": [
                {
                  name: "Bronze-B1-4-1",
                  status: "free",
                },
              ],
            },
          },
          {
            id: 19,
            section_id: 6,
            name: "โซนปกติ 2",
            seats_by_rows: {
              "1": [
                {
                  name: "Bronze-B2-1-1",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-2",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-3",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-4",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-5",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-6",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-7",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-8",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-9",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-10",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-11",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-12",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-13",
                  status: "free",
                },
                {
                  name: "Bronze-B2-1-14",
                  status: "free",
                },
              ],
              "2": [
                {
                  name: "Bronze-B2-2-1",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-2",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-3",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-4",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-5",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-6",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-7",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-8",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-9",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-10",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-11",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-12",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-13",
                  status: "free",
                },
                {
                  name: "Bronze-B2-2-14",
                  status: "free",
                },
              ],
              "3": [
                {
                  name: "Bronze-B2-3-1",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-2",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-3",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-4",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-5",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-6",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-7",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-8",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-9",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-10",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-11",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-12",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-13",
                  status: "free",
                },
                {
                  name: "Bronze-B2-3-14",
                  status: "free",
                },
              ],
              "4": [
                {
                  name: "Bronze-B2-4-1",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-2",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-3",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-4",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-5",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-6",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-7",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-8",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-9",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-10",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-11",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-12",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-13",
                  status: "free",
                },
                {
                  name: "Bronze-B2-4-14",
                  status: "free",
                },
              ],
            },
          },
        ],
      },
    ],
  },
};

const MainStage = () => {
  const containerRef = React.useRef<any>(null);
  const stageRef = React.useRef<any>(null);

  const [scale, setScale] = React.useState(1);
  const [_, setScaleToFit] = React.useState(1);
  const [size, setSize] = React.useState({
    width: 1000,
    height: 1000,
    virtualWidth: 1000,
  });
  const [virtualWidth, setVirtualWidth] = React.useState(1000);

  const [selectedSeatsIds, setSelectedSeatsIds] = React.useState<any>([]);

  const [popup, setPopup] = React.useState({ seat: null, position: null });

  // calculate available space for drawing
  React.useEffect(() => {
    const newSize: any = {
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    };
    if (newSize.width !== size.width || newSize.height !== size.height) {
      setSize(newSize);
    }
  });

  // calculate initial scale
  React.useEffect(() => {
    if (!stageRef.current) {
      return;
    }
    const stage = stageRef.current;
    const clientRect = stage.getClientRect({ skipTransform: true });

    const scaleToFit = size.width / clientRect.width;
    setScale(scaleToFit);
    setScaleToFit(scaleToFit);
    setVirtualWidth(clientRect.width);
  }, [jsonData, size]);

  // togle scale on double clicks or taps
  // const toggleScale = React.useCallback(() => {
  //   if (scale === 1) {
  //     setScale(scaleToFit);
  //   } else {
  //     setScale(1);
  //   }
  // }, [scale, scaleToFit]);

  let lastSectionPosition = 0;

  const handleHover = React.useCallback((seat: any, pos: any) => {
    setPopup({
      seat: seat,
      position: pos,
    });
  }, []);

  const handleSelect = React.useCallback(
    (seatId: any) => {
      const newIds = selectedSeatsIds.concat([seatId]);
      setSelectedSeatsIds(newIds);
    },
    [selectedSeatsIds]
  );

  const handleDeselect = React.useCallback(
    (seatId: any) => {
      const ids = selectedSeatsIds.slice();
      ids.splice(ids.indexOf(seatId), 1);
      setSelectedSeatsIds(ids);
    },
    [selectedSeatsIds]
  );

  if (jsonData === null) {
    return <div ref={containerRef}>Loading...</div>;
  }

  const maxSectionWidth = layout.getMaximimSectionWidth(
    jsonData.seats.sections
  );

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#FFF",
        width: "100%",
        height: "100vh",
        background: "#FFF"
      }}
      ref={containerRef}
    >
      <Stage
        ref={stageRef}
        width={size.width}
        height={size.height}
        dragBoundFunc={(pos) => {
          pos.x = Math.min(
            size.width / 2,
            Math.max(pos.x, -virtualWidth * scale + size.width / 2)
          );
          pos.y = Math.min(size.height / 2, Math.max(pos.y, -size.height / 2));
          return pos;
        }}
        // onDblTap={toggleScale}
        // onDblClick={toggleScale}
        // scaleX={scale * 0.8}
        // scaleY={scale * 0.8}
      >
        <Layer>
          {jsonData.seats.sections.map((section: any, index: any) => {
            const height = layout.getSectionHeight(section);
            const position = lastSectionPosition + layout.SECTIONS_MARGIN;
            lastSectionPosition = position + height;
            const width = layout.getSectionWidth(section);

            const offset = (maxSectionWidth - width) / 2;

            return (
              <Section
                x={offset}
                y={position}
                height={height}
                key={index}
                section={section}
                selectedSeatsIds={selectedSeatsIds}
                onHoverSeat={handleHover}
                onSelectSeat={handleSelect}
                onDeselectSeat={handleDeselect}
              />
            );
          })}
        </Layer>
      </Stage>
      {/* draw popup as html */}
      {popup.seat && (
        <SeatPopup
          position={popup.position}
          seatId={popup.seat}
          onClose={() => {
            setPopup({ seat: null, position: null });
          }}
        />
      )}
    </div>
  );
};

export default MainStage;
