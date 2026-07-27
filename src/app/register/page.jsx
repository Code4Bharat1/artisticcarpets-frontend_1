import Navbar from "@/components/layout/Navbar";
import RegisterSection from "@/components/register/RegisterSection";
import LoginFooter from "@/components/login/LoginFooter";

export const metadata = {
  title: "Create Your Account | Artistic Carpets",
  description:
    "Join the Artistic Carpets circle for exclusive access to handwoven heritage collections, bespoke commissions, and private preview events.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#fdf5e3] flex flex-col font-sans">
      {/* Sticky Navigation */}
      {/* <Navbar /> */}

      {/* Spacing for sticky navbar */}
      <div className="  flex-1 flex flex-col justify-center">
        {/* Main Register Section */}
        <RegisterSection />
      </div>

      {/* Footer */}
      {/* <LoginFooter /> */}
    </main>
  );
}
