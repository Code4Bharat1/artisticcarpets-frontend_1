"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import {
  User, Package, CreditCard, LogOut, ChevronRight, Settings,
  Truck, ShoppingBag, Search, MapPin, Bell, Heart, LayoutGrid,
  Tag, Inbox, HeadphonesIcon, Sliders, Plus, Minus, Menu, X, Trash2, HelpCircle, CheckCircle, AlertCircle, RefreshCw
} from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { DM_Serif_Display } from "next/font/google";
import axiosInstance from "@/services/axiosInstance";

const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, cart, removeFromCart, updateCartQuantity } = useStore();
  const [activeTab, setActiveTab] = useState("activeOrders");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      const timer = setTimeout(() => {
        if (!useStore.getState().user) router.push("/login");
      }, 100);
      return () => clearTimeout(timer);
    }

    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [user, router]);

  if (!mounted) return null;
  if (!user) return <div className="min-h-screen flex items-center justify-center bg-[#faf9f5]">Redirecting...</div>;

  const menuGroups = [
    {
      title: "Dashboard",
      items: [
        { id: "home", label: "Home", icon: LayoutGrid },
        { id: "activeOrders", label: "My Orders", icon: Truck },
        { id: "payment", label: "Payments", icon: CreditCard },
        { id: "orderHistory", label: "Order History", icon: Package },
        { id: "complaints", label: "Complaints", icon: HelpCircle },
        { id: "refunds", label: "Refunds", icon: RefreshCw },
      ]
    }
  ];

  const bottomLinks = [];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "activeOrders": return <ActiveOrdersTab />;
      case "orderHistory": return <OrderHistoryTab />;
      case "payment": return <PaymentTab />;
      case "complaints": return <ComplaintsTab />;
      case "refunds": return <RefundsTab />;
      default: return <div className="p-10 font-sans text-gray-500 text-center">Section under construction...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] flex overflow-hidden fixed inset-0 z-50">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`fixed lg:relative top-0 left-0 bottom-0 w-64 bg-white border-r border-[#E8E3DD] flex flex-col z-[70] transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="h-20 flex items-center px-6 border-b border-[#E8E3DD] justify-between lg:justify-start">
          <Link href="/" className="flex items-center">
            <img src="/logo2.jpeg" alt="Artistic Carpets" className="h-10 w-auto object-contain" />
          </Link>
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5 text-[#666666]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
          {menuGroups.map((group, idx) => (
            <div key={idx}>
              <h4 className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#999999] mb-4 px-3">
                {group.title}
              </h4>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.id === "home") {
                          router.push("/");
                        } else {
                          setActiveTab(item.id); 
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors ${isActive ? "bg-[#faf9f5]" : "hover:bg-gray-50"
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${isActive ? "text-[#1E1E1E]" : "text-[#999999]"}`} />
                        <span className={`font-sans text-sm ${isActive ? "font-bold text-[#1E1E1E]" : "font-medium text-[#666666]"}`}>
                          {item.label}
                        </span>
                      </div>
                      {item.badge && (
                        <span className="bg-[#700B08] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-[#E8E3DD] space-y-1">
          {bottomLinks.map(item => {
            const Icon = item.icon;
            return (
              <button key={item.id} className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors text-[#666666]">
                <Icon className="w-5 h-5" />
                <span className="font-sans text-sm font-medium">{item.label}</span>
              </button>
            )
          })}
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-600">
            <LogOut className="w-5 h-5" />
            <span className="font-sans text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Header */}
        <header className="h-20 bg-white border-b border-[#E8E3DD] flex items-center justify-between px-6 lg:px-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-[#1E1E1E]" />
            </button>
            <h2 className="font-serif text-xl md:text-2xl text-[#1E1E1E] hidden sm:block">
              Welcome {user.name.split(' ')[0]}
            </h2>
            
          </div>

          <div className="flex flex-1 max-w-xl mx-4 sm:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Anything"
                className="w-full bg-[#faf9f5] border border-[#E8E3DD] rounded-full py-2.5 pl-11 pr-4 font-sans text-sm focus:outline-none focus:border-[#700B08] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="relative hidden sm:block">
              <Bell className="w-6 h-6 text-[#1E1E1E]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#700B08] rounded-full"></span>
            </button>
            <button className="relative lg:hidden">
              <ShoppingBag className="w-6 h-6 text-[#1E1E1E]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#700B08] text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-3 border-l border-[#E8E3DD] pl-4 sm:pl-6">
              <div className="w-9 h-9 rounded-full bg-[#700B08] text-white flex items-center justify-center font-serif shadow-sm">
                {user.name[0].toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="font-sans text-sm font-semibold text-[#1E1E1E]">{user.name}</p>
                <p className="font-sans text-[10px] text-[#666666]">@{user.name.split(' ')[0].toLowerCase()}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Panel */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide">
            {renderContent()}
          </main>

          {/* Right Sidebar (Detail Cart) */}
          {activeTab === "payment" && (
            <DetailCart cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} placeOrder={useStore.getState().placeOrder} />
          )}
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Sub-components mapped to layout
// -------------------------------------------------------------

function DetailCart({ cart, removeFromCart, updateCartQuantity, placeOrder }) {
  const router = useRouter();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 20 : 0;
  const taxes = subtotal > 0 ? 5 : 0;
  const total = subtotal + delivery + taxes;

  return (
    <div className="w-80 2xl:w-96 bg-white border-l border-[#E8E3DD] hidden lg:flex flex-col flex-shrink-0 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] relative z-10">
      <div className="p-8 pb-4 flex items-center space-x-3 border-b border-[#E8E3DD]/50">
        <ChevronRight className="w-5 h-5 rotate-180 text-[#1E1E1E]" />
        <h2 className="font-serif text-xl text-[#1E1E1E]">Detail Cart</h2>
      </div>

      <div className="px-8 py-4 flex justify-between items-center">
        <p className="font-sans text-xs font-medium text-[#1E1E1E]">{cart.length} Items selected</p>
        <button className="font-sans text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">Delete All</button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 space-y-4 py-2 scrollbar-hide">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-50">
            <ShoppingBag className="w-12 h-12 text-[#999999]" />
            <p className="text-[#666666] font-sans text-sm">Your cart is empty</p>
          </div>
        ) : cart.map((item) => (
          <div key={item.id} className="flex gap-4 p-3 bg-white rounded-2xl border border-[#E8E3DD] hover:border-[#C4A892] transition-colors">
            <div className="w-16 h-16 bg-[#faf9f5] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src={(() => {
                  const path = item.thumbnail?.path || (item.images && item.images[0]?.path) || item.image || item.mainImage?.path;
                  if (!path) return "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=800&auto=format&fit=crop";
                  if (path.startsWith("http") || path.startsWith("/")) return path.startsWith("/") && !path.startsWith("/images") ? `http://localhost:5000${path}` : path;
                  return `http://localhost:5000/${path}`;
                })()}
                alt={item.name || "Product"} 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1600166898232-2c9018300e0a?q=80&w=800&auto=format&fit=crop"; }}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <h4 className="font-sans text-sm font-semibold text-[#1E1E1E] truncate">{item.name}</h4>
              <p className="font-sans text-xs font-bold text-[#666666] mt-1">₹{item.price}</p>
            </div>
            <div className="flex flex-col justify-between items-center bg-[#faf9f5] rounded-lg p-1 border border-[#E8E3DD]/50">
              <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="w-5 h-5 bg-white rounded flex items-center justify-center shadow-sm text-[#1E1E1E] hover:text-[#700B08]"><Plus className="w-3 h-3" /></button>
              <span className="text-[10px] font-bold">{item.quantity}</span>
              <button onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-5 h-5 bg-white rounded flex items-center justify-center shadow-sm text-[#1E1E1E] hover:text-[#700B08]"><Minus className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 border-t border-[#E8E3DD] bg-white">
        <h3 className="font-serif text-lg text-[#1E1E1E] mb-5">Details Payment</h3>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between font-sans text-xs text-[#666666]">
            <span>Subtotal product</span>
            <span className="font-bold text-[#1E1E1E]">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-sans text-xs text-[#666666]">
            <span>Delivery & Handling</span>
            <span className="font-bold text-[#1E1E1E]">₹{delivery}</span>
          </div>
          <div className="flex justify-between font-sans text-xs text-[#666666]">
            <span>Duties & Taxes</span>
            <span className="font-bold text-[#1E1E1E]">₹{taxes}</span>
          </div>
        </div>

        <div className="border-t border-dashed border-[#E8E3DD] mb-5"></div>

        <div className="flex justify-between items-end mb-6">
          <span className="font-sans text-sm font-semibold text-[#1E1E1E]">Total Payment</span>
          <span className="font-serif text-2xl text-[#1E1E1E]">
            ₹{total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={async () => {
            if (cart.length === 0) return;

            // Check if Razorpay SDK is loaded
            if (!window.Razorpay) {
              alert("Razorpay SDK failed to load. Are you online?");
              return;
            }

            try {
              // 1. Create order on backend
              const { data } = await axiosInstance.post("/payment/razorpay/order", { amount: total, currency: "INR" });
              const orderId = data.id || data.data?.id;

              const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_1234567890",
                amount: Math.round(total * 100), // Amount in paise
                currency: "INR",
                name: "Artistic Carpets",
                description: "Luxury Carpet Purchase",
                order_id: orderId, // Link to backend generated order ID
                handler: async function (response) {
                  try {
                    // 2. Verify payment on backend
                    const verifyRes = await axiosInstance.post("/payment/razorpay/verify", {
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature
                    });

                    if (verifyRes.data.success) {
                      // Save order to backend
                      const orderPayload = {
                        items: cart.map(item => ({
                          productId: item.id || item._id,
                          quantity: item.quantity
                        })),
                        paymentMethod: "razorpay"
                      };
                      await axiosInstance.post("/orders", orderPayload);

                      alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                      placeOrder({ total, item: cart.length === 1 ? cart[0].name : `${cart.length} Items` });
                      router.push("/dashboard?tab=activeOrders");
                    } else {
                      alert("Payment verification failed on the server.");
                    }
                  } catch (error) {
                    console.error("Verification error:", error);
                    alert("Order save failed: " + (error.response?.data?.message || error.message));
                  }
                },
                prefill: {
                  name: useStore.getState().user?.name || "Customer",
                  email: useStore.getState().user?.email || "info@artisticcarpet.shop",
                },
                theme: {
                  color: "#700B08"
                }
              };

              const rzp = new window.Razorpay(options);
              rzp.on('payment.failed', function (response) {
                alert(response.error.description);
              });
              rzp.open();
            } catch (err) {
              console.error("Razorpay order creation error:", err);
              alert("Failed to initialize Razorpay payment. Please check your keys or backend server.");
            }
          }}
          className="w-full py-4 bg-[#980E0A] hover:bg-[black] text-white rounded-2xl font-sans text-sm font-semibold transition-colors flex justify-between items-center px-6 group shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={cart.length === 0}
        >
          <span>Place an Order</span>
          <span className="bg-white/20 px-3 py-1 rounded-lg group-hover:bg-white/30 transition-colors">
            ₹{total.toFixed(2)}
          </span>
        </button>
      </div>
    </div>
  )
}

function ActiveOrdersTab() {
  const { orders } = useStore();

  // Filter active orders (not Delivered, not Returned)
  const activeOrders = orders.filter(o => o.status !== "Delivered" && o.status !== "Returned");

  // Fallback to dummy data if no orders exist yet
  const displayOrders = activeOrders.length > 0 ? activeOrders : [
    { id: "ORD-987654321", date: "Oct 24, 2026", status: "Shipped", item: "Persian Vintage Oushak Rug", estimatedDelivery: "Oct 28, 2026" },
    { id: "ORD-123456789", date: "Oct 25, 2026", status: "Ordered", item: "Modern Abstract Area Rug", estimatedDelivery: "Nov 02, 2026" },
    { id: "ORD-555555555", date: "Oct 22, 2026", status: "Out for Delivery", item: "Bohemian Jute Runner", estimatedDelivery: "Today" },
  ];

  const getProgress = (status) => {
    if (status === "Ordered") return "0%";
    if (status === "Shipped") return "50%";
    if (status === "Out for Delivery" || status === "Delivered") return "100%";
    return "0%";
  };

  const getStepState = (status, stepIndex) => {
    const steps = ["Ordered", "Shipped", "Out for Delivery"];
    const currentIdx = steps.indexOf(status) !== -1 ? steps.indexOf(status) : 0;
    return stepIndex <= currentIdx;
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-10">
        <h2 className="font-serif text-3xl text-[#1E1E1E]">My Active Orders</h2>
        <p className="font-sans text-sm text-[#666666] mt-2">Track the progress of your current shipments.</p>
      </div>

      <div className="space-y-8">
        {displayOrders.map((order) => {
          const step1Active = getStepState(order.status, 0);
          const step2Active = getStepState(order.status, 1);
          const step3Active = getStepState(order.status, 2);

          return (
            <div key={order.id} className="bg-white border border-[#E8E3DD] rounded-3xl p-8 lg:p-10 shadow-lg shadow-black/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#faf9f5] rounded-full -translate-y-1/2 translate-x-1/3"></div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 relative z-10 border-b border-[#E8E3DD] pb-8">
                <div>
                  <p className="text-[11px] text-[#999999] uppercase tracking-widest font-bold mb-1">Order Number</p>
                  <p className="font-bold text-xl font-mono text-[#1E1E1E]">{order.id}</p>
                </div>
                <div className="text-left sm:text-right mt-4 sm:mt-0">
                  <p className="text-[11px] text-[#999999] uppercase tracking-widest font-bold mb-1">Estimated Delivery</p>
                  <p className="font-bold text-xl font-serif text-[#700B08]">{order.estimatedDelivery}</p>
                </div>
              </div>

              <div className="relative z-10 px-4 md:px-10">
                <div className="absolute inset-0 flex items-center px-4 md:px-10" aria-hidden="true">
                  <div className="h-1 w-full bg-[#E8E3DD] rounded-full overflow-hidden">
                    <div className="h-full bg-[#700B08] transition-all duration-500" style={{ width: getProgress(order.status) }}></div>
                  </div>
                </div>
                <div className="relative flex justify-between">
                  <div className="flex flex-col items-center">
                    <span className={`h-12 w-12 rounded-full flex items-center justify-center ring-8 ring-white shadow-md transition-colors ${step1Active ? 'bg-[#700B08] text-white' : 'bg-white border-2 border-[#E8E3DD] text-[#999999]'}`}>
                      <Package className="h-5 w-5" />
                    </span>
                    <p className={`mt-4 text-xs font-bold uppercase tracking-wider text-center w-24 ${step1Active ? 'text-[#700B08]' : 'text-[#999999]'}`}>Ordered</p>
                    <p className="text-[10px] text-[#999999] mt-1 text-center w-24">{order.date}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`h-12 w-12 rounded-full flex items-center justify-center ring-8 ring-white shadow-md transition-colors ${step2Active ? 'bg-[#700B08] text-white' : 'bg-white border-2 border-[#E8E3DD] text-[#999999]'}`}>
                      <Truck className="h-5 w-5" />
                    </span>
                    <p className={`mt-4 text-xs font-bold uppercase tracking-wider text-center w-24 ${step2Active ? 'text-[#700B08]' : 'text-[#999999]'}`}>Shipped</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`h-12 w-12 rounded-full flex items-center justify-center ring-8 ring-white shadow-md transition-colors ${step3Active ? 'bg-[#700B08] text-white' : 'bg-white border-2 border-[#E8E3DD] text-[#999999]'}`}>
                      <MapPin className="h-5 w-5" />
                    </span>
                    <p className={`mt-4 text-xs font-bold uppercase tracking-wider text-center w-24 ${step3Active ? 'text-[#700B08]' : 'text-[#999999]'}`}>Out for Delivery</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#E8E3DD] relative z-10 flex justify-between items-center">
                <p className="font-sans text-sm font-semibold text-[#1E1E1E]">Item: {order.item}</p>
                <button className="px-6 py-2 border border-[#E8E3DD] rounded-xl text-[#1E1E1E] font-sans text-xs font-semibold hover:bg-[#faf9f5]">View Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderHistoryTab() {
  const [history, setHistory] = useState([
    { id: "ORD-9382", date: "Sep 15, 2026", status: "Delivered", total: 1250, item: "Persian Vintage Oushak Rug", refundStatus: "None" },
    { id: "ORD-8472", date: "Aug 28, 2026", status: "Delivered", total: 890, item: "Modern Geometric Runner", refundStatus: "Refunded" },
    { id: "ORD-7111", date: "Jul 10, 2026", status: "Returned", total: 450, item: "Classic Silk Carpet", refundStatus: "None" }
  ]);

  const [refundModalOpen, setRefundModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openRefundModal = (order) => {
    setSelectedOrder(order);
    setRefundModalOpen(true);
  };

  const submitRefundRequest = (orderId, reason, description) => {
    setHistory(history.map(o => o.id === orderId ? { ...o, refundStatus: "Pending" } : o));
    setRefundModalOpen(false);
    alert(`Refund request submitted for order ${orderId}`);
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-10">
        <h2 className="font-serif text-3xl text-[#1E1E1E]">Order History</h2>
        <p className="font-sans text-sm text-[#666666] mt-2">View your past purchases and download invoices.</p>
      </div>

      <div className="space-y-6">
        {history.map((order) => (
          <div key={order.id} className="bg-white border border-[#E8E3DD] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-[#E8E3DD]/50 pb-5 mb-5">
              <div>
                <p className="font-sans text-xs font-bold text-[#999999] uppercase tracking-widest mb-1">Order #{order.id}</p>
                <p className="font-sans text-sm font-medium text-[#1E1E1E]">Placed on {order.date}</p>
              </div>
              <div className="text-left md:text-right flex flex-col md:items-end">
                <p className="font-sans text-lg font-bold text-[#1E1E1E]">${order.total.toLocaleString()}</p>
                <span className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest ${order.status === "Delivered" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                  {order.status === "Delivered" ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {order.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#faf9f5] rounded-xl flex items-center justify-center border border-[#E8E3DD]">
                  <Package className="w-6 h-6 text-[#999999]" />
                </div>
                <p className="font-sans text-sm text-[#1E1E1E] font-semibold">{order.item}</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-xl border border-[#E8E3DD] font-sans text-xs font-semibold text-[#1E1E1E] hover:bg-[#faf9f5] transition-colors">
                  Invoice
                </button>
                <button className="bg-[#1E1E1E] text-white px-5 py-2.5 rounded-xl font-sans text-xs font-semibold hover:bg-[#700B08] transition-colors shadow-sm">
                  Reorder
                </button>
                {order.refundStatus === "None" && order.status === "Delivered" && (
                  <button onClick={() => openRefundModal(order)} className="bg-red-50 text-[#700B08] px-5 py-2.5 rounded-xl border border-red-200 font-sans text-xs font-semibold hover:bg-red-100 transition-colors shadow-sm">
                    Request Refund
                  </button>
                )}
                {order.refundStatus !== "None" && (
                  <span className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest ${order.refundStatus === "Pending" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" : order.refundStatus === "Approved" ? "bg-blue-50 text-blue-700 border border-blue-200" : order.refundStatus === "Refunded" ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-50 text-gray-700 border border-gray-200"}`}>
                    Refund: {order.refundStatus}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {refundModalOpen && selectedOrder && (
        <RefundModal 
          order={selectedOrder} 
          onClose={() => setRefundModalOpen(false)} 
          onSubmit={submitRefundRequest} 
        />
      )}
    </div>
  );
}

function RefundModal({ order, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason) { alert("Please select a reason."); return; }
    onSubmit(order.id, reason, description);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#999999] hover:text-[#1E1E1E]">
          <X className="w-5 h-5" />
        </button>
        <h3 className="font-serif text-2xl text-[#1E1E1E] mb-2">Request Refund</h3>
        <p className="font-sans text-sm text-[#666666] mb-6">Order #{order.id}</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-sans text-xs font-bold text-[#1E1E1E] uppercase tracking-wider mb-2">Reason for Refund *</label>
            <select value={reason} onChange={e => setReason(e.target.value)} required className="w-full bg-[#faf9f5] border border-[#E8E3DD] rounded-xl px-4 py-3 font-sans text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C4A892]">
              <option value="">Select a reason</option>
              <option value="Item damaged">Item damaged or defective</option>
              <option value="Wrong item">Received wrong item</option>
              <option value="Not as described">Item not as described</option>
              <option value="Changed mind">Changed mind</option>
            </select>
          </div>
          <div>
            <label className="block font-sans text-xs font-bold text-[#1E1E1E] uppercase tracking-wider mb-2">Additional Comments</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows="3" className="w-full bg-[#faf9f5] border border-[#E8E3DD] rounded-xl px-4 py-3 font-sans text-sm text-[#1E1E1E] focus:outline-none focus:border-[#C4A892] resize-none" placeholder="Please provide details..."></textarea>
          </div>
          
          <button type="submit" className="w-full bg-[#1E1E1E] text-white rounded-xl py-3.5 font-sans text-sm font-semibold hover:bg-[#700B08] transition-colors mt-4">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

function ComplaintsTab() {
  const [complaints, setComplaints] = useState([]);
  const [order, setOrder] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const res = await axiosInstance.get("/complaints/my-complaints");
      if (res.data && res.data.data) {
        setComplaints(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!order || !issueType || !description) {
      alert("Please fill out all fields.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/complaints", {
        orderId: order,
        issueType,
        description
      });
      alert("Support ticket submitted successfully.");
      setOrder("");
      setIssueType("");
      setDescription("");
      fetchComplaints(); // Refresh list
    } catch (error) {
      console.error("Failed to submit complaint:", error);
      alert("Failed to submit ticket.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Submit Complaint Form */}
      <div className="lg:col-span-3">
        <div className="mb-8">
          <h2 className="font-serif text-3xl text-[#1E1E1E]">Submit a Complaint</h2>
          <p className="font-sans text-sm text-[#666666] mt-2">We're sorry you had an issue. Please let us know how we can help.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-[#E8E3DD] rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <label className="block font-sans text-[11px] font-bold uppercase tracking-widest text-[#999999] mb-2">
              Select Related Order
            </label>
            <select 
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full bg-[#faf9f5] border border-[#E8E3DD] rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#700B08]"
            >
              <option value="">Select an order...</option>
              <option value="ORD-987654321">ORD-987654321 - Persian Vintage Oushak Rug</option>
              <option value="ORD-9382">ORD-9382 - Persian Vintage Oushak Rug</option>
            </select>
          </div>
          <div>
            <label className="block font-sans text-[11px] font-bold uppercase tracking-widest text-[#999999] mb-2">
              Issue Type
            </label>
            <select 
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full bg-[#faf9f5] border border-[#E8E3DD] rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#700B08]"
            >
              <option value="">Select issue category...</option>
              <option value="damaged">Damaged Item</option>
              <option value="wrong_item">Wrong Item Received</option>
              <option value="missing">Missing Item</option>
              <option value="delay">Delivery Delay</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-sans text-[11px] font-bold uppercase tracking-widest text-[#999999] mb-2">
              Describe your issue
            </label>
            <textarea 
              rows={4} 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide details about your issue..."
              className="w-full bg-[#faf9f5] border border-[#E8E3DD] rounded-xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#700B08] resize-none"
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#700B08] text-white px-6 py-4 rounded-xl font-sans text-sm font-semibold hover:bg-[#980E0A] transition-colors shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Support Ticket"}
          </button>
        </form>
      </div>

      {/* Complaint History */}
      <div className="lg:col-span-2">
        <h3 className="font-serif text-xl text-[#1E1E1E] mb-6">Recent Tickets</h3>
        <div className="space-y-4">
          {loading ? (
             <div className="text-center py-10 bg-[#faf9f5] rounded-xl border border-dashed border-[#E8E3DD]">
               <p className="font-sans text-sm text-[#999999]">Loading tickets...</p>
             </div>
          ) : (
            <>
              {complaints.map(tkt => (
                <div key={tkt._id || tkt.id} className="bg-white border border-[#E8E3DD] rounded-xl p-5 hover:border-[#700B08]/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-sans text-[10px] font-bold text-[#999999] uppercase tracking-widest">{tkt.ticketId || tkt.id}</span>
                    <span className={`px-2 py-1 rounded font-sans text-[9px] font-bold uppercase tracking-wider ${
                      tkt.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                      tkt.status === 'Open' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {tkt.status}
                    </span>
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-[#1E1E1E] mb-3">{tkt.issueType}</h4>
                  <p className="font-sans text-xs text-[#666666]">Opened: {new Date(tkt.createdAt || tkt.date).toLocaleDateString()}</p>
                </div>
              ))}
              {complaints.length === 0 && (
                <div className="text-center py-10 bg-[#faf9f5] rounded-xl border border-dashed border-[#E8E3DD]">
                  <HelpCircle className="w-8 h-8 text-[#E8E3DD] mx-auto mb-3" />
                  <p className="font-sans text-sm text-[#999999]">No recent tickets found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PaymentTab() {
  const [cards, setCards] = useState([
    { id: 1, type: 'mastercard', number: '**** **** **** 4242', holder: 'ALEXANDER STERLING', expiry: '12/28', isDefault: true },
    { id: 2, type: 'visa', number: '**** **** **** 8831', holder: 'ALEXANDER STERLING', expiry: '04/27', isDefault: false },
  ]);

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      type: Math.random() > 0.5 ? 'visa' : 'mastercard',
      number: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
      holder: 'ALEXANDER STERLING',
      expiry: `0${Math.floor(1 + Math.random() * 9)}/${Math.floor(27 + Math.random() * 5)}`,
      isDefault: cards.length === 0,
    };
    setCards([...cards, newCard]);
    alert("Demo card added successfully!");
  };

  const handleDelete = (id) => {
    setCards(cards.filter(c => c.id !== id));
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div>
          <h2 className="font-serif text-3xl text-[#1E1E1E]">Payment Methods</h2>
          <p className="font-sans text-sm text-[#666666] mt-2">Manage your saved credit cards and billing info.</p>
        </div>
        <button onClick={handleAddCard} className="bg-[#700B08] hover:bg-[#980E0A] text-white px-6 py-3 rounded-xl font-sans text-sm font-semibold transition-colors shadow-md flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white border border-dashed border-[#E8E3DD] rounded-2xl">
            <CreditCard className="w-12 h-12 text-[#E8E3DD] mx-auto mb-4" />
            <p className="font-sans text-[#999999]">No saved payment methods found.</p>
          </div>
        )}

        {cards.map((card) => (
          <div key={card.id} className={`${card.isDefault ? "bg-[#1E1E1E] text-white shadow-xl" : "bg-white border border-[#E8E3DD] text-[#1E1E1E] hover:shadow-lg"} rounded-2xl p-6 relative transition-shadow group overflow-hidden`}>
            {card.isDefault && <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>}

            <div className="flex justify-between items-start mb-10 relative z-10">
              {card.type === 'mastercard' ? (
                <div className={`w-12 h-8 ${card.isDefault ? 'bg-white/10' : 'bg-gray-100'} backdrop-blur-sm rounded-lg flex items-center justify-center`}>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-90"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-90 -ml-1.5"></div>
                  </div>
                </div>
              ) : (
                <div className="w-12 h-8 bg-blue-50 rounded-lg flex items-center justify-center font-bold text-blue-800 text-xs italic border border-blue-100">
                  VISA
                </div>
              )}

              <div className="flex items-center space-x-2">
                {card.isDefault && (
                  <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    Default
                  </span>
                )}
                {!card.isDefault && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <button className="p-2 bg-[#faf9f5] rounded-lg text-[#666666] hover:text-[#1E1E1E] transition-colors"><Settings className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(card.id)} className="p-2 bg-red-50 rounded-lg text-red-500 hover:text-red-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                )}
              </div>
            </div>

            <div className="relative z-10">
              <p className={`font-sans text-sm ${card.isDefault ? 'text-white/60' : 'text-[#999999]'} mb-1`}>Card Number</p>
              <p className={`font-mono text-xl tracking-widest ${card.isDefault ? '' : 'text-[#1E1E1E]'} mb-6`}>{card.number}</p>
              <div className="flex justify-between">
                <div>
                  <p className={`font-sans text-[10px] ${card.isDefault ? 'text-white/60' : 'text-[#999999]'} uppercase tracking-widest mb-1`}>Card Holder</p>
                  <p className={`font-sans text-sm font-medium tracking-wide ${card.isDefault ? '' : 'text-[#1E1E1E]'}`}>{card.holder}</p>
                </div>
                <div>
                  <p className={`font-sans text-[10px] ${card.isDefault ? 'text-white/60' : 'text-[#999999]'} uppercase tracking-widest mb-1`}>Expires</p>
                  <p className={`font-sans text-sm font-medium tracking-wide ${card.isDefault ? '' : 'text-[#1E1E1E]'}`}>{card.expiry}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RefundsTab() {
  const [refunds, setRefunds] = useState([
    { id: "REF-8472", orderId: "ORD-8472", date: "Sep 01, 2026", status: "Refunded", amount: 890, item: "Modern Geometric Runner" },
    { id: "REF-9921", orderId: "ORD-9921", date: "Sep 20, 2026", status: "Pending", amount: 350, item: "Bohemian Jute Runner" }
  ]);

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="mb-10">
        <h2 className="font-serif text-3xl text-[#1E1E1E]">My Refunds</h2>
        <p className="font-sans text-sm text-[#666666] mt-2">Track the status of your refund requests.</p>
      </div>

      <div className="space-y-6">
        {refunds.map((refund) => (
          <div key={refund.id} className="bg-white border border-[#E8E3DD] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-[#E8E3DD]/50 pb-5 mb-5">
              <div>
                <p className="font-sans text-xs font-bold text-[#999999] uppercase tracking-widest mb-1">Refund #{refund.id} • Order #{refund.orderId}</p>
                <p className="font-sans text-sm font-medium text-[#1E1E1E]">Requested on {refund.date}</p>
              </div>
              <div className="text-left md:text-right flex flex-col md:items-end">
                <p className="font-sans text-lg font-bold text-[#1E1E1E]">₹{refund.amount.toLocaleString()}</p>
                <span className={`inline-flex items-center gap-1 mt-2 px-3 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest ${refund.status === "Pending" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" : refund.status === "Approved" ? "bg-blue-50 text-blue-700 border border-blue-200" : refund.status === "Refunded" ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-50 text-gray-700 border border-gray-200"}`}>
                  {refund.status === "Refunded" ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {refund.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#faf9f5] rounded-xl flex items-center justify-center border border-[#E8E3DD]">
                  <RefreshCw className="w-6 h-6 text-[#999999]" />
                </div>
                <p className="font-sans text-sm text-[#1E1E1E] font-semibold">{refund.item}</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-xl border border-[#E8E3DD] font-sans text-xs font-semibold text-[#1E1E1E] hover:bg-[#faf9f5] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
