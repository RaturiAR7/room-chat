import { WebSocketServer, WebSocket } from "ws";

////Intialize server
const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}
let allSockets: User[] = [];

wss.on("connection", (socket: WebSocket) => {
  ///Connected to socket
  const data = JSON.stringify({
    username: "System",
    message: "Connected",
  });
  socket.send(data);
  socket.on("message", (e) => {
    ////Convert String to JSON obj
    const parsedMessage = JSON.parse(e.toString());
    console.log(parsedMessage);

    ////If message type is join a room
    if (parsedMessage.type === "join") {
      ////removed if already connected to a room
      console.log("Joined");
      allSockets = allSockets.filter((x) => x.socket !== socket);
      allSockets.push({
        socket,
        room: parsedMessage?.payload?.roomId,
      });
      const data = JSON.stringify({
        username: "System",
        message: `You joined room ${parsedMessage?.payload?.roomId}`,
      });
      socket.send(data);
    }
    ////If message type is chat in a room
    if (parsedMessage.type === "chat") {
      ///Find room of the person who want to send message
      const roomOfSender = allSockets.find((x) => x.socket === socket)?.room;
      ////Send message to all users connected to the same room
      allSockets.forEach((user) => {
        if (user.room === roomOfSender) {
          const data = JSON.stringify({
            username: parsedMessage.payload.username,
            message: parsedMessage.payload.message,
          });
          user.socket.send(data);
        }
      });
    }
  });
});
