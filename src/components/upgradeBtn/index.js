import React from "react";
import { Link } from "react-router-dom";

export default function UpgradeBtn(props) {
  const { handleUpgrade } = props;
  const { id } = props;

  return (
    <Link to={"/upgradeTags/" + id}>
      <button
        className={"btn btn-success btn-sm px-1 py-0 mx-1"}
        onClick={() => {
          handleUpgrade(id);
        }}
      >
        {"Upgrade"}
      </button>
    </Link>
  );
}
