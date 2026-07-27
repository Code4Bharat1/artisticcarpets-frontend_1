import Navbar from "@/components/layout/Navbar";
import LoginSection from "@/components/login/LoginSection";
import LoginFooter from "@/components/login/LoginFooter";

export const metadata = {
  title: "Login to Your Account | Artistic Carpets",
  description:
    "Welcome back to Artistic Carpets. Enter your details to access your private heritage collections, saved wishlist, and concierge orders.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FEF7E4] flex flex-col font-sans">
      {/* Sticky Navigation */}
      {/* <Navbar /> */}

      {/* Spacing for sticky navbar */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Main Login Section */}
        <LoginSection />
      </div>

      {/* Login Page Custom Footer */}
      {/* <LoginFooter /> */}
    </main>
  );
}
