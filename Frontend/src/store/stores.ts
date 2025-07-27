import { create } from "zustand";

interface SocketStore {
  socket: WebSocket | null;
  setSocket: (socket: WebSocket) => void;
  clearSocket: () => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket) => set({ socket }),
  clearSocket: () => set({ socket: null }),
}));
