"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { isStandalone, isIOS } from "@/lib/pwa";

export default function AddToHomeScreen() {
  const [mounted, setMounted] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    setInstalled(isStandalone());
    setIos(isIOS());

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!mounted || installed || done) return null;

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDone(true);
    setDeferredPrompt(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-accent/30 bg-surface p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px]"
          style={{ background: "rgba(212,165,116,0.12)" }}
        >
          📲
        </div>
        <div>
          <p className="text-[14px] font-medium text-ink">Add to Home Screen</p>
          <p className="text-[11px] text-inkSoft">Install Ehsaas on your phone</p>
        </div>
      </div>

      {ios ? (
        /* iOS step-by-step */
        <div className="space-y-2">
          {[
            { step: "1", text: 'Open this page in Safari' },
            { step: "2", text: 'Tap the Share icon ↑ at the bottom' },
            { step: "3", text: '"Add to Home Screen" → Add' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <span className="text-[10px] text-accent font-600">{step}</span>
              </div>
              <p className="text-[13px] text-inkSoft">{text}</p>
            </div>
          ))}
        </div>
      ) : deferredPrompt ? (
        /* Android: native install button */
        <button
          onClick={handleAndroidInstall}
          className="w-full py-3 rounded-full bg-accent text-bg text-[13px] font-500 active:scale-95 transition-transform"
        >
          Download App
        </button>
      ) : (
        /* Android: no prompt yet */
        <p className="text-[12px] text-inkSoft leading-[1.6]">
          Open in Chrome and tap "Add to Home Screen" from the browser menu (⋮).
        </p>
      )}
    </motion.div>
  );
}
