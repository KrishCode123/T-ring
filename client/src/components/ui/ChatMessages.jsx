import { useState } from "react";
import apiClient from "@/lib/api-client";
import { DELETE_MESSAGE_FOR_ME, DELETE_MESSAGE_FOR_EVERYONE } from "@/lib/constants";

const MessageList = ({ messages, setMessages }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Right click event to open context menu
  const handleRightClickOnMessage = (event, message) => {
    event.preventDefault();
    setSelectedMessage(message);
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
  };

  // Delete message for current user
  const handleDeleteMessageForMe = async () => {
    if (!selectedMessage) return;
    await apiClient.delete(`${DELETE_MESSAGE_FOR_ME}/${selectedMessage._id}`, {
      withCredentials: true,
    });
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg._id !== selectedMessage._id)
    );
    setContextMenu(null);
  };

  // Delete message for everyone
  const handleDeleteMessageForEveryone = async () => {
    if (!selectedMessage) return;
    await apiClient.delete(`${DELETE_MESSAGE_FOR_EVERYONE}/${selectedMessage._id}`, {
      withCredentials: true,
    });
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg._id !== selectedMessage._id)
    );
    setContextMenu(null);
  };

  // Close context menu
  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div className="p-4" onClick={handleCloseContextMenu}>
      {messages.map((message) => (
        <div
          key={message._id}
          onContextMenu={(e) => handleRightClickOnMessage(e, message)}
          className="p-2 mb-2 bg-gray-800 text-white rounded-lg cursor-pointer hover:bg-gray-700"
        >
          {message.text}
        </div>
      ))}

      {contextMenu && (
        <div
          className="absolute bg-gray-900 p-2 rounded-md w-40 text-white shadow-lg"
          style={{
            top: contextMenu.mouseY,
            left: contextMenu.mouseX,
          }}
        >
          <ul>
            <li
              className="py-1 px-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleDeleteMessageForMe}
            >
              Delete for Me
            </li>
            <li
              className="py-1 px-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleDeleteMessageForEveryone}
            >
              Delete for Everyone
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MessageList;
