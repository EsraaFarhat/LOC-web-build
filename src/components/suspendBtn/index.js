import React, { useEffect, useState } from "react";

export default function SuspendBtn(props) {
  const [btnColor, setBtnColor] = useState(
    "btn btn-primary btn-sm px-1 py-0 mx-1"
  );
  const [btnText, setBtnText] = useState("Suspend");
  const [flag, setFlag] = useState(false);

  const { handleSuspend } = props;
  const { suspend } = props;

  const { id } = props;

  useEffect(() => {
    if (suspend) {
      setBtnColor("btn btn-danger btn-sm px-1 py-0 mx-1");
      setBtnText("Unsuspend");
      setFlag(false);
    } else {
      setBtnColor("btn btn-primary btn-sm px-1 py-0 mx-1");
      setBtnText("Suspend");
      setFlag(true);
    }
  }, []);

  const handleTheSuspend = async () => {
    const result = await handleSuspend(id);

    if (result == "success") {
      if (flag === false) {
        setBtnColor("btn btn-primary btn-sm px-1 py-0 mx-1");
        setBtnText("suspend");
        setFlag(true);
      } else {
        setBtnColor("btn btn-danger btn-sm px-1 py-0 mx-1");
        setBtnText("unsuspend");
        setFlag(false);
      }
    }
  };
  //   const handleBtnColorAndText = () => {

  //   };

  return (
    <span style={{ marginLeft: 10 }}>
      <button
        className={btnColor}
        onClick={() => {
          // handleBtnColorAndText();
          handleTheSuspend();
        }}
      >
        {btnText}
      </button>
    </span>
  );
}
