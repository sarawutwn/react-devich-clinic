import React from "react";

const isClickedInside = (e: any, element: any) => {
  let node = e.target;
  while (node) {
    if (node === element) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

const Popup = ({ position, seatId, onClose }: any) => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const onClick = (e: any) => {
      if (!isClickedInside(e, containerRef.current)) {
        onClose();
      }
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: position.y + 20 + "px",
        left: position.x + 20 + "px",
        padding: "10px",
        borderRadius: "3px",
        boxShadow: "0 0 5px grey",
        zIndex: 10,
        backgroundColor: "white",
      }}
    >
      <div>Seat {seatId}</div>
      <div>Select this seat.</div>
    </div>
  );
};

export default Popup;
