'use client';

import { User, LogOut } from 'lucide-react';
import { getUser, logout } from '@/lib/auth';
import { useLanguage } from './LanguageContext';
import Link from 'next/link';

export default function EdmingleAuthButtons() {
  const user = getUser();
  const { t } = useLanguage();

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-foreground/70">
          <User size={18} />
          <span className="text-sm font-semibold">{user.name}</span>
        </div>
        <button
          onClick={() => {
            logout();
            // Optional: Also logout from Edmingle if SDK provides a method
            window.location.reload();
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={16} />
          {t('nav.logout')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-5 py-2.5 text-[13px] font-bold text-foreground/70 hover:text-accent transition-all"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="px-6 py-2.5 text-[13px] font-bold bg-[#0066cc] text-white rounded-xl hover:bg-[#0077ed] transition-all shadow-sm"
      >
        Sign Up
      </Link>
    </div>
  );
}
