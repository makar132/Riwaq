import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "icon-billing.svg",
    title: "Online Billing, Invoicing, & Contracts",
    description:
      "Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts",
  },
  {
    icon: "icon-calendar.svg",
    title: "Easy Scheduling & Attendance Tracking",
    description:
      "Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance",
  },
  {
    icon: "icon-group.svg",
    title: "Customer Tracking",
    description:
      "Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
