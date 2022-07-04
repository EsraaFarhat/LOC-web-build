import React from "react";

export default function UpgradeBtn(props) {
  const { handleUpgrade } = props;
  const { id } = props;

  return (
    <button
      className={"btn btn-info btn-sm px-1 py-0 mx-1"}
      onClick={() => {
        handleUpgrade();
      }}
    >
      {"Upgrade"}
    </button>
  );
}
