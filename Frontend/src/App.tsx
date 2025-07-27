import { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [username, setUsername] = useState("");
  const [type, setType] = useState("join");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([
    {
      text: "Hello",
      sender: "System",
    },
  ]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      const data = JSON.parse(event.data);
      setData((prevData) => [
        ...prevData,
        { text: data.message, sender: data.username },
      ]);
    };
  }, []);
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket) {
      const instruction = {
        type,
        payload: {
          username: username,
          roomId: type === "join" ? message : "",
          message: type === "chat" ? message : "",
        },
      };
      socket.send(JSON.stringify(instruction));
    } else {
      console.error("WebSocket is not connected");
    }
  };

  return (
    <div className='h-screen bg-black text-white flex flex-col justify-center'>
      <h1 className='text-2xl font-bold mb-4'>Chat Application</h1>
      <div className='bg-black'>
        {data.map((item, index) => {
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
        <div className='mb-10 flex gap-7'>
          <label htmlFor='username' className=''>
            User Name:
          </label>
          <input
            type='text'
            id='username'
            className='p-2 border border-gray-300 rounded'
            placeholder='Enter your name'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-10 flex gap-7'>
          <label htmlFor='type' className=''>
            Type:
          </label>
          <select
            name='type'
            id=''
            onChange={(e) => setType(e.target.value)}
            className='p-2 border border-gray-300 rounded'
          >
            <option value='join' className='bg-black'>
              Join
            </option>
            <option value='chat' className='bg-black'>
              Chat
            </option>
          </select>
        </div>
        <div className='mb-4'>
          <label htmlFor='message' className='block mb-2'>
            {type === "join" ? "Room Id:" : "Message:"}
          </label>
          <textarea
            id='message'
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Type your message here...'
            onChange={(e) => setMessage(e.target.value)}
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

export default App;
