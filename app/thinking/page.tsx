import Shimmer from "@/components/wave";

export default function Page() {
  return (
    <div>
      <h1>Thinking Wave Animations</h1>
      <p>This is the implementation of thinking wave animation purely in CSS that is used in almost all ai apps.</p>
      <hr />
      <Shimmer text="Your text here ...." />
      <hr />
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto font-mono text-sm border">
{`"use client";

export default function Shimmer({ text = "thinking ...", className = "" }) {
  return (
    <div className={\`inline-block \${className} select-none\`}>
      <div className="relative overflow-hidden">
        {/* Base text */}
        <span className="text-primary/30">{text}</span>

        {/* Shimmering overlay */}
        <div
          className="absolute bg-clip-text text-transparent bg-gradient-to-r from-transparent via-black to-transparent z-10 top-0 left-0 right-0 [background-size:50%_100%] [background-repeat:no-repeat]"
          style={{
            animation: "wave 1s linear infinite",
          }}>
          <style jsx>{\`
            @keyframes wave {
              0% {
                background-position: -150% 0;
              }
              100% {
                background-position: 200% 0;
              }
            }
          \`}</style>
          {text}
        </div>
      </div>
    </div>
  );
}`}
      </pre>
    </div>
  )
}