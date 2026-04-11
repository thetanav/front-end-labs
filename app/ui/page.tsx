"use client";

import { useEffect } from "react";

export default function UIPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://ui.sh/ui-picker.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">UI Picker Demo</h1>
      
      <div className="max-w-2xl space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-400">Color Variants</h2>
          <div 
            data-uidotsh-pick="Choose a color"
            className="flex gap-4"
          >
            {["Slate", "Zinc", "Stone", "Neutral", "Gray"].map((color) => (
              <button
                key={color}
                data-uidotsh-option={color}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                {color}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-400">Size Options</h2>
          <div 
            data-uidotsh-pick="Select size"
            className="flex gap-4"
          >
            {["XS", "S", "M", "L", "XL", "2XL"].map((size) => (
              <button
                key={size}
                data-uidotsh-option={size}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                {size}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-400">Framework Choice</h2>
          <div 
            data-uidotsh-pick="Pick your framework"
            className="flex gap-4"
          >
            {["React", "Vue", "Svelte", "Angular", "Solid"].map((fw) => (
              <button
                key={fw}
                data-uidotsh-option={fw}
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                {fw}
              </button>
            ))}
          </div>
        </section>
      </div>

      <p className="mt-12 text-zinc-500 text-sm">
        Click anywhere to reveal the picker UI at the bottom of the screen.
      </p>
    </div>
  );
}