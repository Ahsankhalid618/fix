'use client'

import { useState } from 'react'
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TextGenerateEffect } from "@/app/components/ui/text-generate-effect";
import { PlaceholdersAndVanishInput } from "@/app/components/ui/placeholders-and-vanish-input";
import { ButtonsCard } from "@/app/components/ui/tailwindcss-buttons";
import { HeroHighlight, Highlight} from "@/app/components/ui/hero-highlight";

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I assist you today?", sender: 'bot' }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const placeholders = [
    "Ask Question...",
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    setIsLoading(true)
    const userMessage: Message = { id: messages.length + 1, text, sender: 'user' }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (!data.result) {
        throw new Error('No result in API response')
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: data.result,
        sender: 'bot'
      }
      setMessages(prevMessages => [...prevMessages, botMessage])
    } catch (error) {
      console.error('Error in handleSendMessage:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This function is not used in the current implementation,
    // but we keep it for potential future use or logging
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputText = formData.get('input') as string;
    handleSendMessage(inputText);
  };

  return (
    <main className="flex w-screen h-screen flex-col items-center justify-between ">
      <HeroHighlight>        
      <div className="z-20 w-full max-w-5xl mx-auto px-4 py-10 mt-[40px] h-full">
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">

        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
        <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">GOOGLE ASSISTANT</span>
        </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">GOOGLE ASSISTANT</span>
          </div>
        </div>
        </h2>

        <div className="bg-white/5 backdrop-blur-lg shadow-md rounded-lg max-w-lg w-full mx-auto sm:mt-[20px] md:mt-[30px] lg:mt-[40px]">
          <div className="h-[400px] max-[350px]:h-[240px] overflow-y-auto p-2 text-center space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg p-2 ml-6 ${
                    message.sender === 'user'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <TextGenerateEffect words={message.text} />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
          </div>
          {error && (
            <div className="p-4 bg-red-500 text-white text-center">
              {error}
            </div>
          )}
          <div className="p-4 border-t border-gray-700">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
              isLoading={isLoading}
              loadingText="Sending..."
            />
          </div>
      <div className="flex flex-row items-center gap-4 p-4">
        <ButtonsCard label="Help me write" />
        <ButtonsCard label="Summarize Text" />
        <ButtonsCard label="Get Advice" />
        <ButtonsCard label="Code" />
      </div>
        </div>
        </div>
    </HeroHighlight>
    </main>
  )
}




