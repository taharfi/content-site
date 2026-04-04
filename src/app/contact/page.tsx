"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    window.location.href = `mailto:hello@mangoasis.me?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AReply to: ${encodeURIComponent(email)}`;
    setSubmitted(true);
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have a question, correction, or feedback? Fill out the form below and we will get back to you.
      </p>
      <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-900">Prefer email?</p>
        <p className="mt-1">
          You can also reach us directly at{" "}
          <a href="mailto:hello@mangoasis.me" className="text-blue-600 hover:underline">
            hello@mangoasis.me
          </a>
          .
        </p>
        <p className="mt-2 text-xs text-slate-500">
          If the form button opens your email app, that is expected. It uses your default mail client.
        </p>
      </div>

      {submitted ? (
        <p className="bg-green-50 border border-green-200 text-green-800 rounded p-4">
          Thanks &mdash; your email client should have opened. We will get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name" name="name" type="text" required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email" name="email" type="email" required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message" name="message" rows={5} required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
