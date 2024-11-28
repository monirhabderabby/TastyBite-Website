import CancelledContainer from "./_components/cancelled_container";

const ErrorPage = ({ params }) => {
  const { id } = params;

  return (
    <div className="min-h-[calc(100vh-20vh)]">
      <CancelledContainer packageId={id} />
    </div>
  );
};

export default ErrorPage;
