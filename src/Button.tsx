import React from "react";
interface ButtonProps {
  onClick: () => void;
  children: any;
}
export default function Button(props: ButtonProps) {
  const [buttonState, setButtonState] = React.useState("loaded");
  const onClick = async () => {
    setButtonState("loading");
    await props.onClick();
    setButtonState("loaded");
  };
  return (
    <button onClick={onClick} disabled={buttonState === "loading"}>
      {buttonState === "loaded" ? props.children : "Fetching..."}
    </button>
  );
}
