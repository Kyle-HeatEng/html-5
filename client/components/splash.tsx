"use client";
import { useSocket } from "@/hooks/useSocket";

export default function Splash() {
  const socket = useSocket() 
  if (!socket) {
    return <div>Error</div>;
  }
  const { messages, message, setMessage, sendMessage } = socket

  const handleChange = (event: any) => {
    console.log(event);
    setMessage(event);
  };

  return (
    <main className="flex flex-col justify-center items-center gap-4 p-12">
      <h1 className="text-4xl font-bold"> GEOWARS </h1>
      <div>
        {messages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
      <input onChange={handleChange} value={message} />
      <button onClick={sendMessage} className="px-4 py-2 bg-green-700 text-amber-900 text-2xl">
        send
      </button>
    </main>
  );
}
