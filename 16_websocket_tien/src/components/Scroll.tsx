import { useState, useEffect } from "react";
// import { ButtonNormal } from "../../../components/ButtonStyled";

export default function Scroll(){
const [scroll, setHandleScroll] = useState<boolean>();
useEffect(() => {
  const handleScroll = () => {
    setHandleScroll(window.scrollY >= 150);
  };
  window.addEventListener("scroll", handleScroll);
  //clearup function
  return () => {
    // console.log("unmounting...");
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
return (
    <div>
    {scroll && (
        <div
        onClick={scrollToTop}
        style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            width: "12%",
            height: "3%",
        }}
        >
        <button>gototop</button>
      </div>
    )}
  </div>
);
}