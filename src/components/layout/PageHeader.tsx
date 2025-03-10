interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <>
      <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
      <p className="text-gray-300 mb-8">{subtitle}</p>
    </>
  );
};
