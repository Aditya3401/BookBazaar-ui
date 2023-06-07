import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../CSS/Crousal.css";

const Crousal = () => {
  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <img
      src="/assets/crousal/banner1.jpg"
      onDragStart={handleDragStart}
      role="presentation"
      style={{ height: "70vh", width: "100%", objectFit: "cover" }}
    />,
    <img
      src="/assets/crousal/banner2.jpg"
      onDragStart={handleDragStart}
      role="presentation"
      style={{ height: "70vh", width: "100%", objectFit: "cover" }}
    />,
    <img
      src="/assets/crousal/banner3.jpg"
      onDragStart={handleDragStart}
      role="presentation"
      style={{ height: "70vh", width: "100%", objectFit: "cover" }}
    />,
    <img
      src="/assets/crousal/banner4.jpg"
      onDragStart={handleDragStart}
      role="presentation"
      style={{ height: "70vh", width: "100%", objectFit: "cover" }}
    />,
  ];
  return (
    <div style={{ backgroundColor: "#F9F9F9" }}>
      <AliceCarousel
        mouseTracking
        items={items}
        disableDotsControls
        disableButtonsControls
        autoPlay
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
      />
    </div>
  );
};

export default Crousal;
