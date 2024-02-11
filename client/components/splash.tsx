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
    <main className="flex flex-col bg-lime-300 justify-center items-center gap-4 p-12">
      <h1 className="text-4xl font-bold"> GEOWARS </h1>
      <div className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {messages.map((message, i) => (
          <div key={i}>{message}</div>
        ))}
      </div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={handleChange}
        value={message}
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-green-700 text-amber-900 text-2xl"
      >
        send
      </button>
    </main>
  );
}
