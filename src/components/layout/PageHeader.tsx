interface PageHeaderProps {
  title: string
  subtitle: string
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <>
      <h1 className="mb-2 text-4xl font-bold text-white">{title}</h1>
      <p className="mb-8 text-gray-300">{subtitle}</p>
    </>
  )
}
