# Qroly

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Qroly is a modern QR code redirect platform that allows users to create a personalized QR code which redirects to their chosen social links, UPI payment IDs, or any custom URL. Users can manage links via a dashboard, set a default redirect, and share a single QR code for all purposes.

Live Demo: [https://qroly.in](https://qroly.in) *(replace with actual URL once live)*

---

## Features

- **Personalized QR Code** – Each user has a unique QR that redirects to their chosen link.
- **Social Media Links** – Add Instagram, Facebook, Twitter, LinkedIn, YouTube, and more.
- **UPI Payment Links** – Add Google Pay, PhonePe, Paytm, or any UPI ID for payments.
- **Default Redirect** – Set one link as the default when the QR is scanned.
- **Safe Redirects** – All QR scans pass through Qroly to ensure safe redirection.
- **User Dashboard** – Manage links, QR codes, and default redirect easily.
- **Download QR** – QR code is downloadable for offline use.
- **Responsive UI** – Works smoothly on mobile and desktop.

---

## Tech Stack

- **Frontend:** React, Next.js 13, Tailwind CSS  
- **Backend:** Next.js API Routes, MongoDB, Mongoose  
- **Authentication:** NextAuth.js  
- **QR Code:** `qrcode.react`  
- **Deployment:** Vercel  

---

# App Router and Redirects
- With App Router: Utilize App Router to manage authentication-related routes, enabling smooth navigation and user experience.
- Redirect After Login: Implement seamless redirection after login, enhancing user engagement and ensuring a fluid user journey.

# Usage and Examples

# Credentials Example
- Credential Authentication: Learn how to implement credential-based authentication, enhancing security and user access control.
- Structured App Directory: Explore a well-organized app directory that showcases best practices for implementing NextAuth within a Next.js project.
- Auth Adapters for Customization: Understand the power of Adapters for customizing data storage and authentication behavior, ensuring flexibility and adaptability.

# Multi-Provider Support
- Social Authentication: Enable users to sign in using popular social media accounts, such as GitHub and Google, and extend the functionality to include additional authentication providers as needed.

# Responsive Design
- User-Friendly Interface: Provide a seamless experience across devices with a responsive and thoughtfully designed user interface, ensuring accessibility and user engagement.

# Getting Started

# Prerequisites
- Node.js (>=18.17)
- Internet connection

# Installation
1. Clone the repository

```
git clone https://github.com/yourusername/qroly.git
cd qroly
```

2. Install dependencies

```
cd folder_name
npm install
```

3. Configure environment variables
- In the root create .env file and configure the following variables

```
MONGO_URI=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_ID=
GOOGLE_SECRET=
```

4. Run the application

```
npm run dev
```


Usage:
```
1.Sign up / Login

2.Access your Dashboard

3.Add social links and UPI IDs

4.Set your Default Redirect

5.Share your QR Code

Visitors scanning your QR will be redirected to the chosen link safely.
```
Contributing

Contributions are welcome! Feel free to open issues or pull requests.
