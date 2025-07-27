import { useState } from "react";

interface CopyBoxProps {
  roomId: string;
}

const CopyBox = ({ roomId }: CopyBoxProps) => {
  const [isCopied, setIsCopied] = useState(false);

  // Function to copy the Room ID to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(roomId).then(
      () => {
        // On success, update state to show feedback
        setIsCopied(true);
        // Reset the feedback message after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      },
      (err) => {
        // Log an error if copying fails
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className='max-w-sm rounded-lg border text-white'>
      <label className='text-sm font-medium text-gray-400'>
        Share this Room ID
      </label>
      <div className='mt-2 flex items-center gap-2'>
        <input
          type='text'
          value={roomId}
          readOnly
          className='w-full truncate rounded-md border-gray-600 bg-gray-950 p-2 font-mono text-gray-300 focus:outline-none'
        />
        <button
          onClick={handleCopy}
          className={`w-24 rounded-md px-4 py-2 font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            isCopied
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
};

export default CopyBox;
