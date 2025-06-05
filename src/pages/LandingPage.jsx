
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Bot, ChevronRight, CheckCircle, Award, Shield, Clock, Phone, User, LogOut } from "lucide-react";
import { toast } from "sonner";

const LandingPage = () => {
  console.log("LandingPage component rendering");
  
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sellerLogo, setSellerLogo] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    console.log("LandingPage useEffect running");
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

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTryForFree = () => {
    navigate("/create-invoice");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              {sellerLogo ? (
                <img 
                  src={sellerLogo} 
                  alt="Logo" 
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <Bot className="h-8 w-8 text-purple-600" />
              )}
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                InvoiceAI
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleScrollToSection('features')} 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => handleScrollToSection('pricing')} 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => handleScrollToSection('about')} 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                About
              </button>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              {user?.isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {user.username}
                  </span>
                  <Button variant="ghost" onClick={handleLogout} size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    <Link to="/register">Sign up free</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Build professional invoices with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI assistance
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your billing process with intelligent invoice generation. 
              Create GST-compliant invoices in seconds, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
                asChild
              >
                <Link to="/create-invoice">
                  Create Invoice
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-gray-300 hover:border-purple-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200" 
                asChild
              >
                <Link to="/dashboard">
                  View Dashboard
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Image/Demo */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-8">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80" 
                  alt="Invoice Generator Preview" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl blur-3xl opacity-10 -z-10 transform rotate-1 scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-3xl opacity-10 -z-10 transform -rotate-1 scale-105"></div>
          </div>
        </div>
      </section>
        
        <section id="features" className="py-32 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-gray-900">Powerful Features</h2>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">Our invoice generator comes with everything you need to create professional, GST-compliant invoices for your Indian business.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">GST Compliance</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Automatically validate GST numbers and generate invoices that comply with Indian tax regulations.</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Automatic GST calculation based on HSN/SAC codes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">CGST & SGST/IGST split for interstate transactions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">GST number validation with proper format checking</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Bot className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">AI-Powered</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">Let our AI generate invoices from simple text descriptions, saving you time on manual data entry.</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Auto-fill invoice items from plain text descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Smart product categorization and tax rate assignment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Intelligent customer data extraction and matching</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-purple-600">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Complete Business Solution</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">More than just invoices - a complete solution for your business finances.</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Dashboard with financial insights and analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Customer management and history tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Payment tracking and automated reminders</span>
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
                  <Shield className="h-5 w-5 text-invoice-primary" />
                  <h3 className="text-xl font-semibold ml-3">Secure & Compliant</h3>
                </div>
                <p className="text-gray-600">
                  Your data is always secure with end-to-end encryption. We ensure full compliance with Indian financial regulations, so you can focus on running your business with peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="pricing" className="py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Choose the plan that works best for your business needs.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Free</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹0</span>
                  <span className="text-gray-500 text-lg">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Up to 5 invoices per month
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Basic invoice templates
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    GST validation
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    No AI features
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="w-5 h-5 mr-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    No customer management
                  </li>
                </ul>
                <Button className="w-full py-3 text-lg font-semibold rounded-xl" variant="outline">Get Started</Button>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-purple-500 relative transform lg:-translate-y-4 hover:shadow-3xl transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-6 py-2 rounded-full">
                    POPULAR
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Business</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹999</span>
                  <span className="text-gray-500 text-lg">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Unlimited invoices
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    All premium templates
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Basic AI generation
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Customer management
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Email invoices
                  </li>
                </ul>
                <Button className="w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Started
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">₹2499</span>
                  <span className="text-gray-500 text-lg">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Everything in Business plan
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Multiple user accounts
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Advanced AI features
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    API access
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Priority support
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                    Custom integration support
                  </li>
                </ul>
                <Button className="w-full py-3 text-lg font-semibold rounded-xl" variant="outline">Contact Sales</Button>
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
        
        {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & Description */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6">
                <Bot className="h-10 w-10 text-purple-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  InvoiceAI
                </span>
              </Link>
              <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
                Transform your business with AI-powered invoice generation. 
                GST-compliant, professional, and lightning-fast.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200" 
                  asChild
                >
                  <Link to="/register">
                    Sign up free
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400 px-8 py-3 rounded-xl font-semibold transition-all duration-200"
                  asChild
                >
                  <Link to="/login">
                    Log in
                  </Link>
                </Button>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Product</h3>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => handleScrollToSection('features')} 
                    className="text-gray-300 hover:text-purple-400 transition-colors text-left"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScrollToSection('pricing')} 
                    className="text-gray-300 hover:text-purple-400 transition-colors text-left"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <Link to="/create-invoice" className="text-gray-300 hover:text-purple-400 transition-colors">
                    Create Invoice
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-gray-300 hover:text-purple-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/all-invoices" className="text-gray-300 hover:text-purple-400 transition-colors">
                    All Invoices
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <button 
                    onClick={() => handleScrollToSection('about')} 
                    className="text-gray-300 hover:text-purple-400 transition-colors text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-300 hover:text-purple-400 transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-purple-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-purple-400 transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-gray-700 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 InvoiceAI. Built with ❤️ for Indian businesses.
              </p>
              <div className="flex space-x-8 mt-6 md:mt-0">
                <Link to="/privacy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
