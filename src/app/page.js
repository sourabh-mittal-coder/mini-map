"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

export default function Home() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-4">Mini Map</h1>

        <div className="mb-6 text-sm text-gray-600 space-y-1">
          <p>
            Made by{" "}
            <a
              href="https://sourabhmittal.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline font-medium"
              title="Visit Sourabh Mittal's Portfolio"
            >
              Sourabh Mittal
            </a>
          </p>
          <p>
            View source on{" "}
            <a
              href="https://github.com/sourabh-mittal-coder/mini-map"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline font-medium"
              title="View GitHub Repository"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
      <MapView />
    </div>
  );
}