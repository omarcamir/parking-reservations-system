type PageTitleProps = {
  title: string;
  subTitle?: string;
};
const PageTitle = ({ title, subTitle }: PageTitleProps) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl text-main-color font-semibold mb-2">{title}</h2>
      {subTitle && <p className="text-gray-600">{subTitle}</p>}
    </div>
  );
};

export default PageTitle;
