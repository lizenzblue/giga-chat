import React, { useState, useEffect, useRef } from "react";
import { auth, firestore } from "@/firebase/config";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

const ChatRoom = () => {
  const messageRef = collection(firestore, "messages");
  const q = query(messageRef, orderBy("createdAt"), limit(25));
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    try {
      // Add a message to Firestore
      await addDoc(messageRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });
    } catch (error) {
      console.error("Error adding message:", error);
    }

    setFormValue("");
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMessages(data);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    });

    return () => unsubscribe();
  }, [q]);

  return (
    <div className="flex-grow bg-gray-100 flex flex-col">
      <div className="flex-grow overflow-y-auto px-4 py-2">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage} className="flex p-2">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          className="flex-grow border p-2 rounded-l-lg focus:outline-none text-black"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
};

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const currentUser = auth.currentUser;
  const isSentMessage = uid === currentUser.uid;

  return (
    <div
      className={`message flex items-center p-2 ${
        isSentMessage ? "justify-end" : ""
      }`}
    >
      {!isSentMessage && (
        <img src={photoURL} alt="User" className="w-8 h-8 rounded-full mr-2" />
      )}
      <div
        className={`message-content bg-white rounded-lg p-2 ${
          isSentMessage ? "bg-blue-300 text-white" : "bg-gray-200 text-black"
        }`}
      >
        <p className={`text-sm ${isSentMessage ? "text-white" : "text-black"}`}>
          {text}
        </p>
      </div>
      {isSentMessage && (
        <img
          src={currentUser.photoURL}
          alt="Your Photo"
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </div>
  );
}

export default ChatRoom;
