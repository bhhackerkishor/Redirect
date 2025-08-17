"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Check, 
  Globe, 
  DollarSign, 
  QrCode,
  Share2,
  Smartphone,
  User,
  LayoutDashboard,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";

const features = [
  {
    icon: <QrCode className="w-6 h-6" />,
    title: "Single QR Code",
    description: "One QR code that directs people to all your important links"
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Smart Redirects",
    description: "Set default destinations or let users choose where to go"
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: "Centralized Control",
    description: "Update your links anytime without changing your QR code"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Friendly",
    description: "Works perfectly on all devices with instant scanning"
  }
];

const platforms = [
  { name: "Facebook", icon: <Facebook className="w-5 h-5" /> },
  { name: "Twitter", icon: <Twitter className="w-5 h-5" /> },
  { name: "Instagram", icon: <Instagram className="w-5 h-5" /> },
  { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" /> },
  { name: "YouTube", icon: <Youtube className="w-5 h-5" /> },
  { name: "Payment Apps", icon: <CreditCard className="w-5 h-5" /> }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              One Link. <br className="hidden md:block" />
              <span className="text-blue-600">Everything You Share.</span>
            </motion.h1>
            <p className="mt-6 text-xl text-gray-600">
              Simplify your online presence with a single QR code that connects to all your social profiles, payment methods, and important links.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
              >
                Create Your Qroly <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                href="#how-it-works" 
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center"
              >
                How It Works
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
          >
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <QRCodeCanvas
                  value={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://Qroly.example'}/r/username`}
                  size={180}
                  level="H"
                  includeMargin
                />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Qroly.example/r/username</span>
              </div>
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-5 h-5 text-gray-500" />
                <span className="text-gray-600">Redirects to your default link</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {platforms.slice(0, 5).map((platform) => (
                    <div key={platform.name} className="flex items-center px-3 py-1.5 bg-gray-100 rounded-full">
                      {platform.icon}
                      <span className="ml-2 text-sm">{platform.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Cloud */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
            Works with all your favorite platforms
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex justify-center items-center">
                <div className="flex items-center text-gray-700">
                  {platform.icon}
                  <span className="ml-2">{platform.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Simplify Your Digital Life</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Qroly replaces all your individual links with one smart, customizable solution.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold text-gray-900">How Qroly Works</h2>
              <p className="mt-4 text-lg text-gray-600">
                Get set up in minutes and start simplifying your online presence today.
              </p>
              
              <div className="mt-8 space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white">
                      1
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Create Your Account</h3>
                    <p className="mt-2 text-gray-600">
                      Sign up in seconds with just your email address.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white">
                      2
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Add Your Links</h3>
                    <p className="mt-2 text-gray-600">
                      Connect all your social profiles, payment methods, and important websites.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white">
                      3
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Share Your QR Code</h3>
                    <p className="mt-2 text-gray-600">
                      Print it, share it digitally, or embed it anywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 lg:col-span-7">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <QRCodeCanvas
                        value={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://Qroly.example'}/r/username`}
                        size={200}
                        level="H"
                        includeMargin
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-center">
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <span className="ml-2 font-medium">Facebook</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">facebook.com/yourprofile</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="ml-2 font-medium">Payment</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">yourname@upi</p>
                  </div>
                  
                  <div className="col-span-2 bg-gray-900 text-white p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Default Redirect</span>
                      <span className="text-blue-300">Instagram</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Simplify Your Links?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of users who&apos;ve made their online presence simpler and more effective.
          </p>
          <div className="mt-8">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition shadow-lg"
            >
              Get Started for Free <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <Globe className="w-6 h-6 text-blue-400" />
              <span className="ml-2 text-white font-bold">Qroly</span>
            </div>
            <p className="mt-4 md:mt-0 text-sm">
              &copy; {new Date().getFullYear()} Qroly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
