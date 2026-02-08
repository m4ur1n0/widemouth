"use client";

import React, { useState } from "react";



const SubscribeToSubstack = ({substackLink} : {substackLink: string}) => {
    

    const [controlEmail, setControlEmail] = useState("");

    function handleSubstackSubmit(e: React.FormEvent) {
        e.preventDefault();
        window.open(
            `https://widemouthband.substack.com/subscribe?email=${encodeURIComponent(controlEmail)}`,
            "_blank",
        );
    }

    return (
        <div className="w-full space-y-6 max-w-2xl my-16">
            <h2 className="text-2xl font-medium text-zinc-900 tracking-tight">
                Witness Our Motion
            </h2>
            <form className="flex gap-3" onSubmit={handleSubstackSubmit}>
                <input
                    type="email"
                    placeholder="your@email.com"
                    value={controlEmail}
                    onChange={(e) => setControlEmail(e.target.value)}
                    className="flex-1 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded text-sm focus:outline-none focus:border-zinc-400"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-zinc-800 text-zinc-50 rounded text-sm hover:bg-zinc-700"
                >
                    Submit
                </button>
            </form>
            <div className="text-sm text-zinc-500">
                <a
                    href={substackLink || "https://substack.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-zinc-300 hover:text-zinc-900"
                >
                    visit the substack
                </a>
            </div>
        </div>
    );
};

export default SubscribeToSubstack;
