import React from "react";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, contributorName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Remove Contributor</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove <span className="font-bold">{contributorName}</span> from the contributors list?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
