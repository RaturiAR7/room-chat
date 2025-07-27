import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import ChatRoom from "./components/ChatRoom.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/room/:roomId' element={<ChatRoom />} />
    </Routes>
  </BrowserRouter>
);
