"use client";

import Shimmer from "@/components/wave";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button/copy-button";
import Claude from "./claude";

const codeString = `"use client";

export default function Shimmer({ text = "thinking ...", className = "" }) {
  return (
    <div className={\`inline-block \${className} select-none\`}>
      <div className="relative overflow-hidden">
        {/* Base text */}
        <span className="text-primary/30">{text}</span>

        {/* Shimmering overlay */}
        <div
          className="absolute bg-clip-text text-transparent bg-linear-to-r from-transparent via-black to-transparent z-10 top-0 left-0 right-0 bg-size-[50%_100%] bg-no-repeat"
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
}`;

const claudeCodeString = `"use client";

export default function Claude() {
  return (
    <>
      <img
        src={"/claude.svg"}
        className="w-8 h-8 object-cover"
        alt="Claude thinking sprite sheet."
        style={{
          animation: "claude 2.5s steps(15, jump-none) infinite",
        }}
      />
      <style jsx>{\`
        @keyframes claude {
          from {
            object-position: 0% 0%;
          }
          to {
            object-position: 0% 100%;
          }
        }
      \`}</style>
    </>
  );
}`;

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold">Thinking Wave Animations</h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            This is the implementation of thinking wave animation purely in CSS
            that is used in almost all ai apps.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-none border-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Live Demo
                  <Badge variant="secondary">CSS Animation</Badge>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Shimmer text="Your text here ...." />
            </CardContent>
          </Card>

          <Card className="shadow-none border-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Source Code
                <CopyButton size="sm" variant="outline" text={codeString} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto font-mono text-sm border max-h-[200px] overflow-y-auto">
                {codeString}
              </pre>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="shadow-none border-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Claude Sprite
                  <Badge variant="secondary">Sprite Animation</Badge>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <Claude />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Source Code
                <CopyButton size="sm" variant="outline" text={claudeCodeString} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto font-mono text-sm border max-h-[200px] overflow-y-auto">
                {claudeCodeString}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
