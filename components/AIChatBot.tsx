import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Volume2, Loader2, Search } from 'lucide-react';
import { GeminiService } from '../services/gemini';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Namaste! I am Bhagwan AI. How can I guide your career path today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');
    
    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Stream Response
      const stream = GeminiService.chatStream(history, userText);
      
      let fullText = "";
      const botMsgId = (Date.now() + 1).toString();
      
      // Add placeholder bot message
      setMessages(prev => [...prev, {
        id: botMsgId,
        role: 'model',
        text: "",
        timestamp: new Date()
      }]);

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => prev.map(m => 
            m.id === botMsgId ? { ...m, text: fullText } : m
          ));
        }
      }

      // Automatically generate TTS for short responses for "wow" factor
      if (fullText.length < 200) {
        const audioData = await GeminiService.speak(fullText);
        if (audioData) {
            setMessages(prev => prev.map(m => 
                m.id === botMsgId ? { ...m, audioData } : m
            ));
        }
      }

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I'm having trouble connecting to the career database right now. Please try again.",
        isError: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const playAudio = async (base64Data: string, msgId: string) => {
    try {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)