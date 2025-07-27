import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";
import { useSocketStore } from "../store/stores";

const Hero = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const { setSocket } = useSocketStore();

  const handleJoin = () => {
    if (roomId.trim()) {
      navigate(`/room/${roomId}`);
    }
  };

  const handleCreateRoom = () => {
    const newRoomId = uuidv4();
    navigate(`/room/${newRoomId}`);
  };
  useEffect(() => {
    const wss = new WebSocket("ws://localhost:8080");
    setSocket(wss);
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6'>
      <h1 className='text-4xl font-bold mb-4'>💬 Room Chat App</h1>
      <p className='mb-8 text-lg text-center max-w-md'>
        Chat with friends in private or public rooms. Enter a room ID or create
        a new one to start chatting!
      </p>

      <div className='flex flex-col items-center space-y-4 w-full max-w-xs'>
        <input
          type='text'
          placeholder='Enter Room ID'
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className='w-full px-4 py-2 rounded-lg text-black focus:outline-none'
        />
        <button
          onClick={handleJoin}
          className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl w-full'
        >
          Join Room
        </button>
        <button
          onClick={handleCreateRoom}
          className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl w-full'
        >
          ➕ Create New Room
        </button>
      </div>
    </div>
  );
};

export default Hero;
