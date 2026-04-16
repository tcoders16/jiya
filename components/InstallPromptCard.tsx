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
    if (isIOS()) setVisible(true);
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
        className="card p-5"
      >
        <div className="mb-2 flex items-center gap-3">
          <span className="label">Home Screen</span>
          <div className="hair flex-1" />
        </div>
        <p className="text-[13px] font-light leading-[1.75] text-inkSoft">
          {ios
            ? "Tap the Share icon in Safari, then Add to Home Screen."
            : "Add Ehsaas to your Home Screen for a softer daily feel."}
        </p>
        <div className="mt-4 flex items-center gap-2">
          {!ios && deferred ? (
            <Button variant="primary" size="sm" onClick={install}>
              Install
            </Button>
          ) : null}
          <Button variant="ghost" size="sm" onClick={dismiss}>
            Not now
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
