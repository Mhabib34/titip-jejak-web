import { Variants } from "framer-motion";

/* ─────────────────────────────────────────
   FADE + DIRECTIONAL SLIDE
   usage: variants={fadeUp} custom={delayInSeconds}
───────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1.2], delay },
  }),
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1.2], delay },
  }),
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 0.68, 0, 1.2], delay },
  }),
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 0.68, 0, 1.2], delay },
  }),
};

/* ─────────────────────────────────────────
   FADE + SCALE
   usage: variants={fadeScale} custom={delayInSeconds}
───────────────────────────────────────── */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1.2], delay },
  }),
};

/* ─────────────────────────────────────────
   STAGGER CONTAINER
   Wrap children dengan ini, lalu tiap anak pakai staggerItem.
   usage: variants={staggerContainer} initial="hidden" animate="show"
          (atau whileInView="show")
───────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

/** Stagger lebih lambat — cocok untuk card grid yang lebih besar */
export const staggerContainerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

/* ─────────────────────────────────────────
   STAGGER ITEM
   Dipakai sebagai anak dari staggerContainer.
───────────────────────────────────────── */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1.2] },
  },
};

export const staggerItemFadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* ─────────────────────────────────────────
   LOOP ANIMATIONS
   Dipakai langsung di prop `animate`, bukan variants.

   contoh:
   <motion.div animate={floatY.animate} transition={floatY.transition} />
───────────────────────────────────────── */
export const floatY = {
  animate: { y: [0, -8, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

export const floatYSlow = {
  animate: { y: [0, -5, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

export const pulseScale = {
  animate: { scale: [1, 1.04, 1] },
  transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
};

/* ─────────────────────────────────────────
   VIEWPORT DEFAULTS
   Spread ke prop `viewport` pada whileInView.

   contoh:
   <motion.div whileInView="show" viewport={viewportOnce} />
───────────────────────────────────────── */
export const viewportOnce = { once: true, margin: "-60px" } as const;
export const viewportOnceTight = { once: true, margin: "-30px" } as const;
