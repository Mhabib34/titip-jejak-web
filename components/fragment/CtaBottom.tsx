"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { DonasiModal } from "@/components/fragment/DonasiModal";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/animations";

export function CtaBottom() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="px-4 pb-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-orange-500 rounded-3xl px-8 py-12 text-center relative overflow-hidden"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={0}
            viewport={viewportOnce}
          >
            {/* decorative blobs */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none"
              animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />

            <motion.div
              className="relative z-10"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <motion.h2
                className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight"
                variants={staggerItem}
              >
                Jadilah Bagian dari
                <br />
                Solusi Kemanusiaan Kami.
              </motion.h2>

              <motion.p
                className="text-orange-100 text-sm md:text-base mb-7 max-w-md mx-auto leading-relaxed"
                variants={staggerItem}
              >
                Bergabunglah sebagai relawan dan bantu awasi lingkungan sekitar
                Anda. Keberadaan Anda bisa menyelamatkan nyawa seseorang hari
                ini.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-3"
                variants={staggerItem}
              >
                <Link
                  href="/register"
                  className="h-11 px-8 rounded-2xl bg-white text-orange-600 font-bold text-sm flex items-center justify-center shadow-md hover:bg-orange-50 transition-all active:scale-95"
                >
                  Daftar Relawan
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="h-11 cursor-pointer px-8 rounded-2xl bg-orange-600 text-white font-semibold text-sm flex items-center justify-center border-2 border-orange-400 hover:bg-orange-700 transition-all active:scale-95"
                >
                  Donasi Dukungan
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <DonasiModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
