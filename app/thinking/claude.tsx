"use client";

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
      <style jsx>{`
        @keyframes claude {
          from {
            object-position: 0% 0%;
          }
          to {
            object-position: 0% 100%;
          }
        }
      `}</style>
    </>
  );
}
