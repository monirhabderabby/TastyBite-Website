import dynamic from "next/dynamic";
const WizardForm = dynamic(() => import("./_components/wizard-form"));

const WizardPage = () => {
  return (
    <div className="container mx-auto mt-[70px] h-[calc(100vh-70px)] flex justify-center items-center">
      <WizardForm />
    </div>
  );
};

export default WizardPage;
