const Room = () => {
  return (
    <div>
      <div>
        <h1 className='text-center font-extrabold'>Create Room</h1>
      </div>
      <form
        className='border-2 border-white rounded-lg p-4 m-4'
        // onSubmit={sendMessage}
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
            // onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='message' className='block mb-2'>
            {/* {type === "join" ? "Room Id:" : "Message:"} */}
          </label>
          <textarea
            id='message'
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Type your message here...'
            // onChange={(e) => setMessage(e.target.value)}
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

export default Room;
