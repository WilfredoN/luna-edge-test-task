import { motion } from 'framer-motion'
interface PageHeaderProps {
  title: string
  subtitle: string
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <>
      <motion.img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png"
        alt="Pokemon Logo"
        className="w-full/2 h-full object-cover"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      />
      <h1 className="mb-2 text-4xl font-bold text-white">{title}</h1>
      <p className="mb-8 text-gray-300">{subtitle}</p>
    </>
  )
}
