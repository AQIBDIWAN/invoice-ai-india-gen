
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Bot, ChevronRight, CheckCircle, Award, Shield, Clock, Phone, User, LogOut } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface UserData {
  username: string;
  isLoggedIn: boolean;
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [sellerLogo, setSellerLogo] = useState<string | null>(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedLogo = localStorage.getItem('sellerLogo');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedLogo) {
      setSellerLogo(storedLogo);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTryForFree = () => {
    navigate("/create-invoice");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap">
            <Link to="/" className="flex items-center gap-2 mb-2 sm:mb-0">
              {sellerLogo ? (
                <img 
                  src={sellerLogo} 
                  alt="Seller Logo" 
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <FileText className="h-6 w-6 text-invoice-primary" />
              )}
              <span className="font-bold text-xl text-invoice-dark">InvoiceAI</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => handleScrollToSection('features')} 
                className="text-gray-600 hover:text-invoice-primary transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => handleScrollToSection('pricing')} 
                className="text-gray-600 hover:text-invoice-primary transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleScrollToSection('about')} 
                className="text-gray-600 hover:text-invoice-primary transition-colors"
              >
                About
              </button>
            </nav>
            
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end mt-2 sm:mt-0">
              {user?.isLoggedIn ? (
                <>
                  {/* User info and logout */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium hidden sm:inline">
                      {user.username}
                    </span>
                    <Button variant="outline" onClick={handleLogout} className="text-xs md:text-sm px-2 md:px-3">
                      <LogOut className="h-4 w-4 mr-1 md:mr-2" />
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <Button variant="outline" asChild className="text-xs md:text-sm px-2 md:px-3">
                  <Link to="/login">
                    <User className="h-4 w-4 mr-1 md:mr-2" />
                    Login
                  </Link>
                </Button>
              )}
              
              <Button asChild className="text-xs md:text-sm px-2 md:px-3">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Create Professional Invoices with 
                  <span className="text-invoice-primary"> AI Assistance</span>
                </h1>
                <p className="text-lg text-gray-600">
                  Generate GST-compliant invoices in seconds. Our AI-powered invoice generator streamlines your billing process for Indian businesses.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/create-invoice">
                      Create Invoice
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/dashboard">
                      View Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative animate-slide-up">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-invoice-light rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-invoice-light rounded-full opacity-50 blur-3xl"></div>
                <div className="relative z-10 shadow-xl rounded-lg overflow-hidden border">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80" 
                    alt="Invoice Generator Preview" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Our invoice generator comes with everything you need to create professional, GST-compliant invoices for your Indian business.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-invoice-light rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-invoice-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">GST Compliance</h3>
                <p className="text-gray-600">Automatically validate GST numbers and generate invoices that comply with Indian tax regulations.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Automatic GST calculation based on HSN/SAC codes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>CGST & SGST/IGST split for interstate transactions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>GST number validation with proper format checking</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-invoice-light rounded-lg flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-invoice-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
                <p className="text-gray-600">Let our AI generate invoices from simple text descriptions, saving you time on manual data entry.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Auto-fill invoice items from plain text descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Smart product categorization and tax rate assignment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Intelligent customer data extraction and matching</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-invoice-light rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-invoice-primary">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Complete Business Solution</h3>
                <p className="text-gray-600">More than just invoices - a complete solution for your business finances.</p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Dashboard with financial insights and analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Customer management and history tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Payment tracking and automated reminders</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-invoice-light rounded-full flex items-center justify-center mr-4">
                    <Award className="h-5 w-5 text-invoice-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Premium Quality</h3>
                </div>
                <p className="text-gray-600">
                  Our professionally designed invoice templates ensure your business makes a great impression. Customize with your logo, colors, and brand elements for a personalized touch.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-invoice-light rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-5 w-5 text-invoice-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Secure & Compliant</h3>
                </div>
                <p className="text-gray-600">
                  Your data is always secure with end-to-end encryption. We ensure full compliance with Indian financial regulations, so you can focus on running your business with peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="pricing" className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Choose the plan that works best for your business needs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-4">₹0<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Up to 5 invoices per month
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Basic invoice templates
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    GST validation
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    No AI features
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    No customer management
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Get Started</Button>
              </div>
              
              <div className="bg-invoice-primary bg-opacity-5 p-8 rounded-lg shadow-lg border-2 border-invoice-primary relative">
                <div className="absolute top-0 right-0 bg-invoice-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  POPULAR
                </div>
                <h3 className="text-xl font-semibold mb-2">Business</h3>
                <div className="text-3xl font-bold mb-4">₹999<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Unlimited invoices
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    All premium templates
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Basic AI generation
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Customer management
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Email invoices
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-4">₹2499<span className="text-lg text-gray-500 font-normal">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Everything in Business plan
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Multiple user accounts
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Advanced AI features
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    API access
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Custom integration support
                  </li>
                </ul>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </div>
            </div>
            
            <div className="mt-16 bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-center">Compare Plan Features</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 pl-4 font-medium">Feature</th>
                      <th className="pb-3 font-medium text-center">Free</th>
                      <th className="pb-3 font-medium text-center">Business</th>
                      <th className="pb-3 font-medium text-center">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 pl-4">Monthly Invoices</td>
                      <td className="py-3 text-center">5</td>
                      <td className="py-3 text-center">Unlimited</td>
                      <td className="py-3 text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pl-4">Invoice Templates</td>
                      <td className="py-3 text-center">3</td>
                      <td className="py-3 text-center">10</td>
                      <td className="py-3 text-center">All + Custom</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pl-4">Customer Management</td>
                      <td className="py-3 text-center">❌</td>
                      <td className="py-3 text-center">✅</td>
                      <td className="py-3 text-center">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pl-4">User Accounts</td>
                      <td className="py-3 text-center">1</td>
                      <td className="py-3 text-center">3</td>
                      <td className="py-3 text-center">10+</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pl-4">Email Support</td>
                      <td className="py-3 text-center">❌</td>
                      <td className="py-3 text-center">✅</td>
                      <td className="py-3 text-center">Priority</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        
        <section id="about" className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">About InvoiceAI</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2023, InvoiceAI was created with a simple mission: to help Indian businesses simplify their invoicing and financial management processes.
                </p>
                <p className="text-gray-600 mb-6">
                  Our team of experienced developers and financial experts combined their knowledge to create a platform that understands the unique needs of businesses operating in India's complex tax environment.
                </p>
                <p className="text-gray-600 mb-6">
                  With a focus on GST compliance, user-friendly design, and cutting-edge AI technology, we've helped thousands of businesses save time and reduce errors in their invoicing processes.
                </p>
                <div className="flex flex-wrap justify-between mt-8">
                  <div className="flex flex-col items-center mb-4 w-full xs:w-auto">
                    <span className="text-3xl font-bold text-invoice-primary">5000+</span>
                    <span className="text-gray-500">Happy Customers</span>
                  </div>
                  <div className="flex flex-col items-center mb-4 w-full xs:w-auto">
                    <span className="text-3xl font-bold text-invoice-primary">100,000+</span>
                    <span className="text-gray-500">Invoices Generated</span>
                  </div>
                  <div className="flex flex-col items-center mb-4 w-full xs:w-auto">
                    <span className="text-3xl font-bold text-invoice-primary whitespace-nowrap">₹150Cr+</span>
                    <span className="text-gray-500">Transactions</span>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <Award className="h-6 w-6 text-invoice-primary mr-3" />
                    <h3 className="text-xl font-semibold">Our Mission</h3>
                  </div>
                  <p className="text-gray-600">
                    To simplify financial management for Indian businesses through intelligent, easy-to-use tools that ensure compliance and accuracy.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-invoice-primary mr-3" />
                    <h3 className="text-xl font-semibold">Our Values</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span><strong>Simplicity:</strong> Making complex financial tasks easy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span><strong>Innovation:</strong> Constantly improving our technology</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span><strong>Reliability:</strong> Being a trusted partner for businesses</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <Phone className="h-6 w-6 text-invoice-primary mr-3" />
                    <h3 className="text-xl font-semibold">Contact Us</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Have questions or need assistance? Our support team is ready to help.
                  </p>
                  <div className="flex items-center space-x-4">
                    <Button>
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline">
                      Email Us
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-4 bg-invoice-primary text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to streamline your invoicing?</h2>
            <p className="text-lg mb-8 opacity-90">Join thousands of Indian businesses already using InvoiceAI</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register">
                  Sign Up Now
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent"
                onClick={handleTryForFree}
              >
                Try for Free
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-invoice-primary" />
                <span className="font-bold text-xl text-white">InvoiceAI</span>
              </div>
              <p className="text-sm text-gray-400">AI-powered invoicing platform for Indian businesses.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">API Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400">
            <div className="flex flex-col md:flex-row justify-between">
              <div>© 2023 InvoiceAI. All rights reserved.</div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <Link to="#" className="hover:text-white transition-colors">Terms</Link>
                <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
                <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
