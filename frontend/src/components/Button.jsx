import React, { useState } from "react";

export default function Button(props) {
  const { action } = props;

  return (
    <div className="py-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={action}
      >
        {props.children}
      </button>
    </div>
  );
}
