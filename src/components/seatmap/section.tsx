import React from 'react';
import { Rect, Group, Text } from './reacts-konva';
import SubSection from './sub-section';

import {
  SECTION_TOP_PADDING,
  getSectionWidth,
  getSubsectionWidth,
} from './layout';

export default React.memo(
  ({
    section,
    height,
    x,
    y,
    onHoverSeat,
    onSelectSeat,
    onDeselectSeat,
    selectedSeatsIds,
  }: any) => {
    const containerRef = React.useRef<any>();

    // caching will boost rendering
    // we just need to recache on some changes
    React.useEffect(() => {
      containerRef.current.cache();
    }, [section, selectedSeatsIds]);
    const width = getSectionWidth(section);
    let lastSubsectionX = 0;
    return (
      <Group y={y} x={x} ref={containerRef}>
        <Rect
          width={width}
          height={height}
          fill="white"
          strokeWidth={1}
          stroke="lightgrey"
          cornerRadius={5}
        />
        {section.subsections.map((subsection: any) => {
          const subWidth = getSubsectionWidth(subsection);
          const pos = lastSubsectionX;
          lastSubsectionX += subWidth;

          return (
            <SubSection
              x={pos}
              y={SECTION_TOP_PADDING}
              key={subsection.name}
              data={subsection}
              width={subWidth}
              height={height}
              onHoverSeat={onHoverSeat}
              onSelectSeat={onSelectSeat}
              onDeselectSeat={onDeselectSeat}
              selectedSeatsIds={selectedSeatsIds}
            />
          );
        })}
        <Text
          text={section.name}
          fontFamily='Noto Sans Thai'
          height={SECTION_TOP_PADDING}
          width={width}
          align="center"
          verticalAlign="middle"
          fontSize={24}
        />
      </Group>
    );
  }
);
