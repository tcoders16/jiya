import SoftBackgroundGlow from "./SoftBackgroundGlow";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] w-full">
      <SoftBackgroundGlow />
      <main
        className="mx-auto w-full max-w-[420px] px-5"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 14px)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 28px)",
        }}
      >
        {children}
      </main>
    </div>
  );
}
