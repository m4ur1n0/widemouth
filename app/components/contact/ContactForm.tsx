"use client";

import { useState } from "react";
import { uiIndie as ui } from "@/app/ui/classes";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          company: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl">
      {status === "success" ? (
        <div className="border border-zinc-950/20 bg-white/35 p-8 space-y-4">
          <div className="text-2xl font-semibold text-zinc-950">Message sent!</div>
          <p className={`${ui.body} text-zinc-700`}>
            Thanks for reaching out. We&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className={`${ui.btn} mt-4`}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="absolute opacity-0 pointer-events-none"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Name (optional) */}
          <div>
            <label htmlFor="name" className={`${ui.label} block mb-2`}>
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-950/25 bg-white/50 text-zinc-950 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25 transition-shadow"
              disabled={status === "loading"}
            />
          </div>

          {/* Email (required) */}
          <div>
            <label htmlFor="email" className={`${ui.label} block mb-2`}>
              Email <span className="text-zinc-950">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-950/25 bg-white/50 text-zinc-950 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25 transition-shadow"
              disabled={status === "loading"}
            />
          </div>

          {/* Subject (required) */}
          <div>
            <label htmlFor="subject" className={`${ui.label} block mb-2`}>
              Subject <span className="text-zinc-950">*</span>
            </label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-950/25 bg-white/50 text-zinc-950 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25 transition-shadow"
              disabled={status === "loading"}
            />
          </div>

          {/* Message (required) */}
          <div>
            <label htmlFor="message" className={`${ui.label} block mb-2`}>
              Message <span className="text-zinc-950">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-950/25 bg-white/50 text-zinc-950 text-[15px] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950/25 transition-shadow resize-y"
              disabled={status === "loading"}
            />
          </div>

          {/* Error message */}
          {status === "error" && errorMessage && (
            <div className="border border-red-600/30 bg-red-50/50 px-4 py-3 text-[14px] text-red-800">
              {errorMessage}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className={`${ui.btnInk} w-full py-3 uppercase tracking-[0.18em] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
