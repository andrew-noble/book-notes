import React, { useState } from "react";

export default function ConfirmButton(props) {
  const [confirm, setConfirm] = useState(false);
  const { confirmAction, confirmText, initialText } = props;

  return (
    <div>
      {!confirm ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setConfirm(true)}
        >
          {initialText}
        </button>
      ) : (
        <div variant="outlined">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={confirmAction}
          >
            {confirmText}
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setConfirm(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
