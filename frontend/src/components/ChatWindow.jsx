import { useEffect, useState, useRef } from "react";
import { Sparkles, Send, Mic } from "lucide-react";
import api from "../api/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "./Navbar";

function ChatWindow({ selectedBrand }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!selectedBrand) {
      setMessages([]);
      return;
    }

    loadMessages();
  }, [selectedBrand]);
  useEffect(() => {
  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

  const loadMessages = async () => {
    try {
      const res = await api.get(`/brands/${selectedBrand}`);

    

      setMessages(res.data.messages || []);
    } catch (err) {
      console.log(err);
      setMessages([]);
    }
  };
   const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  setListening(true);

  recognition.start();
recognition.onresult = async (event) => {
  const transcript = event.results[0][0].transcript;

  setInput(transcript);

  try {
    setLoading(true);

    await api.post("/chat", {
      brand_id: selectedBrand,
      message: transcript,
    });

    setInput("");

    loadMessages();
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  recognition.onend = () => {
    setListening(false);
  };

  recognition.onerror = () => {
    setListening(false);
  };
};

const handleSend = async () => {
  if (!input.trim() || !selectedBrand) return;

  try {
        setLoading(true);
    const res = await api.post("/chat", {
      brand_id: selectedBrand,
      message: input,
    });
   
    setInput("");

    // Message bhejne ke baad chat dobara load karo
    loadMessages();
  } catch (err) {
    console.log(err);
  }
  finally {

    setLoading(false);

  }
};
  
if (!selectedBrand) {
  return (
    <div className="flex-1 bg-[#020617] flex flex-col">

      <Navbar />

      <div className="flex-1 flex items-center justify-center px-8">

        <div className="max-w-6xl w-full">

          {/* Heading */}
          <div className="text-center">

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 shadow-2xl shadow-blue-500/30">
              ✨
            </div>

            <h1 className="mt-6 text-5xl font-bold text-white">
              AI Brand Studio
            </h1>

            <p className="mt-4 text-slate-400 text-lg">
              Select a brand from the sidebar or create a new workspace.
            </p>

          </div>

          {/* Cards */}

          <div className="grid grid-cols-2 gap-6 mt-14">

            <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6">
              <div className="text-4xl">🚀</div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Startup Branding
              </h2>
              <p className="mt-2 text-slate-400">
                Brand Name • Tagline • Identity • Mission
              </p>
            </div>

            <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6">
              <div className="text-4xl">📱</div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Social Media
              </h2>
              <p className="mt-2 text-slate-400">
                Instagram • LinkedIn • Twitter Content
              </p>
            </div>

            <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6">
              <div className="text-4xl">🎯</div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Marketing Strategy
              </h2>
              <p className="mt-2 text-slate-400">
                Audience • SEO • Ads • Growth Plan
              </p>
            </div>

            <div className="bg-[#111827] border border-slate-700 rounded-2xl p-6">
              <div className="text-4xl">💻</div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                Website Content
              </h2>
              <p className="mt-2 text-slate-400">
                Landing Page • About Us • FAQs
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

  return (
    <div className="flex-1 bg-[#020617] flex flex-col h-screen">
 <Navbar />
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-8 py-8">

        {messages.length === 0 ? (

          <div className="h-full flex items-center justify-center">

            <div className="max-w-2xl text-center">

              <div className="w-20 h-20 rounded-full bg-blue-600 mx-auto flex items-center justify-center">
                <Sparkles size={36} className="text-white" />
              </div>

              <h1 className="mt-8 text-5xl font-bold text-white">
                Welcome to AI Brand Studio
              </h1>

              <p className="mt-5 text-lg text-slate-400 leading-8">
                Describe your startup, business, or product idea and let AI
                generate premium brand names, taglines, descriptions,
                marketing strategies and more.
              </p>

            </div>

          </div>

        ) : (

          <div className="max-w-4xl mx-auto space-y-6">

            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
<div
  className={`max-w-[75%] rounded-2xl px-5 py-4 overflow-x-auto ${
    msg.role === "user"
      ? "bg-blue-600 text-white"
      : "bg-slate-800 text-white"
  }`}
>
  <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-200 prose-strong:text-white prose-code:text-yellow-300 prose-pre:bg-slate-900 prose-table:border prose-th:border prose-td:border">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {msg.content}
    </ReactMarkdown>
  </div>
</div>
              </div>
            ))}
<div ref={bottomRef}></div>
          </div>

        )}

      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-6">

        <div className="max-w-4xl mx-auto flex items-center bg-[#111827] rounded-2xl border border-slate-700 px-5 py-3">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
  if (e.key === "Enter") {
    handleSend();
  }
}}
            placeholder="Describe your business idea..."
            className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500"
          />
          <button
  onClick={startListening}
  className={`ml-3 h-12 w-12 rounded-xl flex items-center justify-center transition ${
    listening
      ? "bg-red-600 animate-pulse"
      : "bg-slate-700 hover:bg-slate-600"
  }`}
>
  <Mic className="text-white" size={20} />
</button>

       <button
  onClick={handleSend}
  disabled={loading}
  className="ml-4 px-5 h-12 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-700 disabled:opacity-50"
>
  {loading ? (
    <span className="text-white text-sm">Generating...</span>
  ) : (
    <Send className="text-white" size={20} />
  )}
</button>

        </div>

      </div>

    </div>
  );
}

export default ChatWindow;