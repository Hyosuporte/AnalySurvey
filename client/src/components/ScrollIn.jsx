import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { styled } from "@mui/material/styles";
import React from "react";

const ScrollIndicator = styled("div")(({ theme }) => ({
  background: "#191825",
  position: "fixed",
  bottom: "5vw",
  left: "50%",
  transform: "translateX(-50%)",
  textAlign: "center",
  color: "#ffffff",
  fontSize: "14px",
  opacity: 0.9,
  transition: "opacity 0.5s ease",
  "&:hover": {
    opacity: 1,
  },
  "& .arrow": {
    width: "20px",
    height: "20px",
    display: "inline-block",
    marginTop: theme.spacing(1),
    animation: "arrowBounce 1.4s infinite",
  },
  "@keyframes arrowBounce": {
    "0%, 20%, 50%, 80%, 100%": {
      transform: "translateY(0)",
    },
    "40%": {
      transform: "translateY(10px)",
    },
    "60%": {
      transform: "translateY(5px)",
    },
  },
}));

const ScrollIndicatorComponent = () => {
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollIndicator = document.getElementById("scroll-indicator");
      if (window.scrollY > 100) {
        scrollIndicator.style.display = "none";
      } else {
        scrollIndicator.style.display = "block";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollIndicator id="scroll-indicator">
      <span>Desplázate hacia abajo</span>{" "}
      <div className="arrow">
        <ArrowDownwardIcon />
      </div>
    </ScrollIndicator>
  );
};

export default ScrollIndicatorComponent;
