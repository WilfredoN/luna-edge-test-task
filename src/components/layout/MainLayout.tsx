import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="bg-gradient-to-b from-gray-800 to-gray-900 w-screen h-screen p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
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
  );
};
