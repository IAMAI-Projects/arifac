'use client';

import { ReactNode } from 'react';

interface EdmingleCourseButtonProps {
  bundleId: string;
  type: 'buy' | 'preview';
  children: ReactNode;
  className?: string;
}

/**
 * Reusable Edmingle Course Button
 * Automatically applies required SDK classes and data attributes.
 */
export default function EdmingleCourseButton({ bundleId, type, children, className }: EdmingleCourseButtonProps) {
  const isBuy = type === 'buy';
  
  // Pattern: course-landing-buy [BUNDLE_ID] for paid courses
  // Pattern: open-signup-course-freepreview enrollFree enrollFree_[BUNDLE_ID] for free preview
  const sdkClass = isBuy
    ? `course-landing-buy ${bundleId}`
    : `open-signup-course-freepreview enrollFree enrollFree_${bundleId}`;

  return (
    <button
      className={`${className || ''} ${sdkClass}`}
      data-instbundleid={bundleId}
    >
      {children}
    </button>
  );
}
