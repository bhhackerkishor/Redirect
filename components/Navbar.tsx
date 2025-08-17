"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Dialog } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const { data: session }: any = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-4 lg:px-8" aria-label="Global">
        {/* Brand */}
        <div className="flex items-center lg:flex-1">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Qroly
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-gray-900 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Session / Auth Buttons */}
        <div className="flex items-center gap-x-4">
          {!session ? (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-900 hover:text-blue-600">
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-700">{session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300"
              >
                Log out
              </button>
            </>
          )}

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10 bg-black/30" aria-hidden="true" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-20 w-3/4 max-w-sm overflow-y-auto bg-white px-6 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Qroly
            </Link>
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <FaXmark className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {!session ? (
              <>
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
              >
                Log out
              </button>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
