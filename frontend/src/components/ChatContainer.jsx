import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageDay, formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const messageKey =
            message._id ||
            message.tempId ||
            `${message.senderId || "unknown"}-${message.createdAt || index}`;
          const timestamp = message.createdAt || message.updatedAt;
          const isOwnMessage = message.senderId === authUser._id;
          const displayTime = formatMessageTime(timestamp);
          const displayDate = formatMessageDay(timestamp);
          const previousTimestamp = messages[index - 1]
            ? messages[index - 1].createdAt || messages[index - 1].updatedAt
            : null;
          const previousDate = previousTimestamp ? formatMessageDay(previousTimestamp) : null;
          const shouldRenderDateDivider = !previousDate || previousDate !== displayDate;

          return (
            <div key={`wrapper-${messageKey}`} className="space-y-2">
              {shouldRenderDateDivider && (
                <div className="flex items-center gap-2 text-xs text-base-content/60">
                  <span className="flex-1 border-t border-base-300" />
                  <span className="px-3 py-1 rounded-full bg-base-200 uppercase tracking-wide">
                    {displayDate}
                  </span>
                  <span className="flex-1 border-t border-base-300" />
                </div>
              )}

              <div className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}>
                <div className=" chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        isOwnMessage
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser?.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">{displayTime}</time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
