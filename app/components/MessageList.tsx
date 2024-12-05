import { type Message } from '../types/chat'

type MessageListProps = {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-black'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  )
}

