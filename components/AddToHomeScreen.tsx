"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isStandalone, isIOS } from "@/lib/pwa";

export default function AddToHomeScreen() {
  const [mounted, setMounted] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [ios, setIos] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [done, setDone] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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

  if (!mounted || installed || done || dismissed) return null;

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDone(true);
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-accent/40 bg-surface overflow-hidden"
      >
        {/* Accent top bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[14px] font-medium text-ink leading-snug">
                Save Ehsaas to your phone
              </p>
              <p className="text-[11px] text-inkSoft mt-0.5">
                {ios ? "Open in Safari to install" : "Add to Home Screen"}
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-inkSoft hover:text-ink text-[18px] leading-none mt-0.5 shrink-0"
            >
              ×
            </button>
          </div>

          {ios ? (
            <div className="space-y-2">
              {[
                { n: "1", t: "Open this link in Safari (not Chrome)" },
                { n: "2", t: 'Tap Share icon  ↑  at the bottom bar' },
                { n: "3", t: 'Tap "Add to Home Screen" then Add' },
              ].map(({ n, t }) => (
                <div key={n} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-600 text-accent">{n}</span>
                  </div>
                  <p className="text-[12px] text-inkSoft leading-snug">{t}</p>
                </div>
              ))}
            </div>
          ) : deferredPrompt ? (
            <button
              onClick={handleAndroidInstall}
              className="w-full py-2.5 rounded-full bg-accent text-bg text-[13px] font-500 active:scale-95 transition-transform"
            >
              Install on Home Screen
            </button>
          ) : (
            <p className="text-[12px] text-inkSoft leading-[1.6]">
              Open in Chrome → tap menu (⋮) → "Add to Home Screen"
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
