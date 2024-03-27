export const SEAT_SIZE = 20;
export const SEATS_DISTANCE = 25;
export const SUBSECTION_PADDING = 30;

export const SECTIONS_MARGIN = 10;
export const SECTION_TOP_PADDING = 40;

export const getSubsectionWidth = (subsection: any) => {
  const rows = Object.keys(subsection.seats_by_rows);
  const maxRows = Math.max(
    ...rows.map((r) => Object.keys(subsection.seats_by_rows[r]).length)
  );
  return SEATS_DISTANCE * maxRows + SUBSECTION_PADDING * 2;
};

export const getSubsectionHeight = (subsection: any) => {
  const rows = Object.keys(subsection.seats_by_rows);
  return SEATS_DISTANCE * rows.length + SUBSECTION_PADDING * 2;
};

export const getSectionWidth = (section: any) => {
  const width = section.subsections.reduce((sum: any, subsection: any) => {
    return sum + getSubsectionWidth(subsection);
  }, 0);
  return width;
};

export const getSectionHeight = (section: any) => {
  return (
    Math.max(...section.subsections.map(getSubsectionHeight)) +
    SECTION_TOP_PADDING
  );
};

export const getMaximimSectionWidth = (sections: any) => {
  return Math.max(...sections.map(getSectionWidth));
};
