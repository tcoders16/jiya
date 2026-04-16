"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { isIOS, isStandalone } from "@/lib/pwa";

export default function InstallPromptCard() {
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);
  const [deferred, setDeferred] = useState<any>(null);

  useEffect(() => {
    if (isStandalone()) return;
    if (localStorage.getItem("ehsaas:install:dismissed")) return;
    setIos(isIOS());

    const handler = (e: any) => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    setVisible(true);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem("ehsaas:install:dismissed", "1");
    setVisible(false);
  };

  const install = async () => {
    if (deferred) {
      deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
      setVisible(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="card p-5 border border-accent/20"
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="label">📱 Get Ehsaas</span>
          <div className="hair flex-1" />
        </div>

        {ios ? (
          <>
            <p className="text-[13px] font-light leading-[1.75] text-inkSoft mb-4">
              One tap to install on your home screen.
            </p>
            <ol className="text-[12px] leading-[1.7] text-inkSoft space-y-1 mb-4">
              <li>1. Tap the Share icon <span className="text-accent">↑</span></li>
              <li>2. Scroll down → tap "Add to Home Screen"</li>
              <li>3. Name it "Ehsaas" → tap "Add"</li>
            </ol>
          </>
        ) : (
          <p className="text-[13px] font-light leading-[1.75] text-inkSoft mb-4">
            Add Ehsaas to your Home Screen for a softer, quieter daily experience.
          </p>
        )}

        <div className="mt-5 flex items-center gap-2">
          {!ios && deferred ? (
            <Button variant="primary" size="sm" onClick={install}>
              Download
            </Button>
          ) : !ios ? (
            <span className="text-[11px] text-mute">
              Open on Android to install
            </span>
          ) : null}
          <Button variant="ghost" size="sm" onClick={dismiss}>
            Not now
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
