import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="min-h-screen min-w-screen bg-gradient-to-b from-gray-800 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <motion.div
          className="flex flex-col items-center justify-center py-8"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </main>
  )
}
