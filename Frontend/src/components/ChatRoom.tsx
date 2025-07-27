import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSocketStore } from "../store/stores";
import CopyBox from "./CopyBox";

interface Data {
  text: string;
  sender: string;
}
const ChatRoom = () => {
  const param = useParams();
  const socket = useSocketStore((state) => state.socket);
  const [username, setUsername] = useState("defaultUser");
  const [message, setMessage] = useState("");
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    if (socket) {
      const name = prompt("Enter your username:") || "defaultUser";
      setUsername(name); // Set state for use in sending messages

      // 1. Send the join instruction with the NEW name directly
      const joinInstruction = {
        type: "join",
        payload: {
          username: name, // Use the name from the prompt, not stale state
          roomId: param?.roomId,
        },
      };
      socket.send(JSON.stringify(joinInstruction));

      // 2. Set up the message listener ONCE
      const handleMessage = (event) => {
        const parsedData = JSON.parse(event.data);
        setData((prev) => [
          ...prev,
          { text: parsedData.message, sender: parsedData.username },
        ]);
      };

      socket.onmessage = handleMessage;

      // 3. Cleanup: remove the listener when the component unmounts
      return () => {
        socket.onmessage = null;
      };
    }
  }, [socket, param?.roomId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket) {
      const instruction = {
        type: "chat",
        payload: {
          username: username,
          message: message,
        },
      };
      socket.send(JSON.stringify(instruction));
      setMessage(""); // Clear message input after sending
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Chat Application</h1>
      <CopyBox roomId={param?.roomId} />
      <div className='bg-black'>
        {data?.map((item, index) => {
          return (
            <div key={index} className='mb-2 flex flex-col text-black '>
              <div className='bg-white rounded-md p-2'>
                <span className='font-bold'>{item.sender}:</span>
                <span>{item.text}</span>
              </div>
            </div>
          );
        })}
      </div>
      <form
        className='border-2 border-white rounded-lg p-4 m-4'
        onSubmit={sendMessage}
      >
        <div className='mb-4'>
          <label htmlFor='message' className='block mb-2'>
            Message
          </label>
          <textarea
            id='message'
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Type your message here...'
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
