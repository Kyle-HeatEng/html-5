"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Socket, io } from "socket.io-client";

export type SocketContext = {
  messages: string[];
  message: string;
  setMessage: (e: React.FormEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
};

const SocketContext = createContext<SocketContext | null>(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  const ws = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("https://websocket.ai-ticulate.uk");
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
    ws.current = socket;
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    ws.current?.emit("message", message);
    setMessage("");
  };

  return (
    <SocketContext.Provider
      value={
        {
          messages,
          message,
          setMessage: (e: React.FormEvent<HTMLInputElement>) =>
            setMessage(e.currentTarget.value),
          sendMessage,
        } as SocketContext
      }
    >
      {children}
    </SocketContext.Provider>
  );
};
