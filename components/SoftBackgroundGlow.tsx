export default function SoftBackgroundGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute"
        style={{
          width: 520,
          height: 520,
          top: -160,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: 9999,
          filter: "blur(120px)",
          opacity: 0.55,
          background:
            "radial-gradient(closest-side, rgba(212,165,116,0.22), transparent)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(245,239,228,0.03), transparent 60%)",
        }}
      />
      <div className="noise" />
    </div>
  );
}
