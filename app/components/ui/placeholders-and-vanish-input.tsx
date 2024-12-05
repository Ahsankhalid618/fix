"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";

export const PlaceholdersAndVanishInput = ({
  placeholders,
  onChange,
  onSubmit,
  isLoading,
  loadingText = "Sending...",
}: {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  loadingText?: string;
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFocused) {
        setCurrentPlaceholder((prevPlaceholder) =>
          prevPlaceholder === placeholders.length - 1 ? 0 : prevPlaceholder + 1
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isFocused, placeholders.length]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading && inputValue.trim()) {
      setIsSubmitted(true);
      onSubmit(e);
      setInputValue("");
      setTimeout(() => setIsSubmitted(false), 1500);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          name="input"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full bg-gray-800 text-white rounded-lg px-4 py-2 text-sm outline-none border border-gray-700",
            isFocused && "border-blue-500",
            (isSubmitted || isLoading) && "opacity-50"
          )}
          disabled={isLoading}
        />
        
        <AnimatePresence>
          {!isFocused && !inputValue && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-sm"
            >
              {placeholders[currentPlaceholder]}
            </motion.span>
          )}
        </AnimatePresence>
        <button
          type="submit"
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 text-white rounded-md p-2",
            isLoading && "opacity-50 cursor-not-allowed"
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="text-sm">{loadingText}</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          )}
        </button>
      </form>
      {isSubmitted && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            duration: 0.15,
            ease: "easeInOut",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-sm text-neutral-400">Sent!</span>
        </motion.div>
      )}
    </div>
  );
};

