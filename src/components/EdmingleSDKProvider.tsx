'use client';

import Script from 'next/script';
import { ReactNode } from 'react';

export default function EdmingleSDKProvider({ children }: { children: ReactNode }) {
  const lmsDomain = process.env.NEXT_PUBLIC_EDMINGLE_LMS_DOMAIN || 'your-lms.edmingle.com';
  const subdomain = process.env.NEXT_PUBLIC_EDMINGLE_SUBDOMAIN || 'your-subdomain';

  return (
    <>
      {children}
      {/* Edmingle Login/Signup SDK Hidden Iframe */}
      <iframe
        id="edmingle-signup-sdk-iframe"
        src={`https://${lmsDomain}/signup-sdk?subdomain=${subdomain}`}
        style={{
          display: 'none',
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 999999,
          border: 'none',
        }}
      />
      {/* Edmingle SDK Script */}
      <Script
        id="edmingle-signup-sdk-script"
        src={`https://${lmsDomain}/signup-sdk.js`}
        strategy="lazyOnload"
      />
    </>
  );
}
