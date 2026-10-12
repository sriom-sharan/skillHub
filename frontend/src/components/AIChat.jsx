import { useState } from "react";
import axios from "../utils/axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Keeps wide tables from stretching the bubble
const markdownComponents = {
  table: ({ children }) => (
    <div className="my-2 max-w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
  pre: ({ children }) => (
    <pre className="my-2 max-w-full overflow-x-auto whitespace-pre rounded-lg bg-gray-900 p-3 text-xs text-gray-100">
      {children}
    </pre>
  ),
};

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();

    const question = message.trim();

    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);

    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post("ai/chat", { message: question });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[560px] max-h-[75vh] w-[420px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl">
          {/* Panel top bar */}
          <div className="flex items-center justify-between bg-purple-600 px-4 py-3 text-white">
            <div>
              <h2 className="text-base font-bold">SkillHub AI</h2>
              <p className="text-xs text-purple-100">Your personal tutor.</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-xl leading-none hover:bg-purple-700"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="sidebar-scroll min-w-0 flex-1 space-y-4 overflow-y-auto overflow-x-hidden p-4">
            {messages.length === 0 && !loading && (
              <p className="text-center text-sm text-gray-500">
                Ask me whatever you like.
              </p>
            )}

            {messages.map((item, index) => (
              <div
                key={index}
                className={
                  item.role === "user"
                    ? "ml-auto min-w-0 max-w-[85%] break-words rounded-2xl rounded-br-sm bg-purple-600 px-3 py-2 text-white"
                    : "mr-auto min-w-0 max-w-full overflow-hidden break-words rounded-2xl rounded-bl-sm bg-secondary px-3 py-2 text-foreground"
                }
              >
                <p className="mb-1 text-xs font-semibold opacity-80">
                  {item.role === "user" ? "You" : "SkillHub AI"}
                </p>

                {item.role === "assistant" ? (
                  <div
                    className="prose prose-sm min-w-0 max-w-full break-words
                                     prose-p:my-2
                                     prose-headings:mb-2 prose-headings:mt-3
                                    prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5
                                    [&_pre_code]:whitespace-pre [&_pre_code]:break-normal
                                    [&_pre_code]:bg-transparent [&_pre_code]:p-0
                                    [&_:not(pre)>code]:break-words"
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {item.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap break-words text-sm">
                    {item.text}
                  </p>
                )}
              </div>
            ))}

            {loading && (
              <div className="mr-auto flex w-fit items-center gap-1 rounded-2xl bg-secondary px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="flex gap-2 border-t p-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask SkillHub AI a question..."
              maxLength={2000}
              disabled={loading}
              className="min-w-0 flex-1 rounded-lg border px-4 py-2 text-black"
            />

            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="rounded-lg bg-purple-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
      {/* Floating button */}
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!open && (
          <span className="rounded-l-full  rounded-t-full  animate-pulse bg-purple-300 px-3 py-1 text-sm font-medium text-black shadow-md">
            Ask me anything.
          </span>
        )}

        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close AI chat" : "Open AI chat"}
          className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full  text-2xl text-white shadow-lg transition hover:scale-105 hover:bg-purple-700"
        >
          {!open ? (
            <img
              className="h-full w-full bg-purple-400 rounded-full object-cover"
              src="/ai.png"
              alt="SkillHub AI"
            />
          ) : (
            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#4C1D95] text-2xl font-bold text-white shadow-xl transition group-hover:scale-105">
              ✕
            </span>
          )}
        </button>
  
      </div>
    </>
  );
}
