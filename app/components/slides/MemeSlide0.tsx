'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function MemeSlide0({ contentVisible = true }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden bg-black">
      <AnimatePresence>
        {contentVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.img
              src="https://img.picturequotes.com/2/3/2200/you-little-rebel-i-like-you-quote-1.jpg"
              alt="You little rebel meme"
              className="max-h-[80vh] rounded-lg shadow-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-white/50 text-lg"
            >
              Let&apos;s have some fun! 🎉
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
