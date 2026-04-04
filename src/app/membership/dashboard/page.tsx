'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building2,
  Download,
  ShieldCheck,
  ExternalLink,
  Award,
  Clock,
  ArrowRight,
  LogOut,
  Mail,
  Phone,
  Loader2,
  Edit2,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function MembershipDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [memberData, setMemberData] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: '',
    designation: '',
    email: '',
    mobile: '',
    organisationName: ''
  });

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/membership/login');
  };



  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    try {
      const res = await fetch('/api/membership/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();

      if (data.success) {
        setUpdateSuccess('Profile updated successfully!');
        setMemberData((prev: any) => ({
          ...prev,
          name: editForm.fullName,
          designation: editForm.designation,
          email: editForm.email,
          mobile: editForm.mobile,
          organisation: editForm.organisationName,
        }));
        setTimeout(() => {
          setIsEditing(false);
          setUpdateSuccess(null);
        }, 1500);
      } else {
        setUpdateError(data.error || 'Update failed');
      }
    } catch (err) {
      setUpdateError('Connection error. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const openEditModal = () => {
    setEditForm({
      fullName: memberData.name,
      designation: memberData.designation,
      email: memberData.email,
      mobile: memberData.mobile,
      organisationName: memberData.organisation
    });
    setIsEditing(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/membership/applications');
        const data = await res.json();

        if (data.success && data.applications && data.applications.length > 0) {
          const mainApp = data.applications[0];
          setMemberData({
            id: mainApp.id,
            name: mainApp.users?.full_name || "Member",
            organisation: mainApp.organisations?.name || "N/A",
            email: mainApp.users?.email || "N/A",
            mobile: mainApp.users?.mobile || "N/A",
            designation: mainApp.users?.designation || "Member",
            membershipId: `ARI-2024-${mainApp.id.toString().substring(0, 8).toUpperCase()}`,
            memberSince: new Date(mainApp.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            expiryDate: new Date(new Date(mainApp.created_at).setFullYear(new Date(mainApp.created_at).getFullYear() + 1)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            status: mainApp.status,
            type: mainApp.application_type === 'PRE_APPROVED' ? "Industry Member (Pre-approved)" : "Non Pre-approved"
          });
        }
      } catch (err) {
        console.error("Failed to fetch dashboad data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-400 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!memberData) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center p-6">

        <div className="bg-white/5 border border-white/10 p-12 rounded-3xl text-center max-w-md shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full translate-y-1/2" />
          <div className="relative z-10">

            <Building2 className="w-16 h-16 text-blue-400 mx-auto mb-6 opacity-40 group-hover:scale-110 transition-transform duration-500" />
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">No Membership Found</h2>
            <p className="text-gray-400 mb-10 leading-relaxed font-medium">
              We couldn't find an active membership for your account. If you just registered, it might take a moment to reflect.
            </p>
            <div className="flex flex-col gap-4">
              <Link href="/membership/register" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95 text-center">
                Start Registration
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-sm"
              >
                Refresh Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="px-8 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold hover:bg-red-500/20 transition-all text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#050505] min-h-screen font-sans text-white overflow-x-hidden">
      <Navbar />
      <br />
      <br />
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header Card */}
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-1">
                    {memberData.name}
                  </h1>
                  <p className="text-gray-400 text-sm">{memberData.designation} at <span className="text-blue-400">{memberData.organisation}</span></p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all flex items-center gap-2 text-sm font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
                <button
                  onClick={openEditModal}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center gap-2 text-sm font-bold"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Quick Actions & Certificate Selection */}
            <div className="lg:col-span-2 space-y-8">

              {/* Main Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Certificate Download Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group h-full flex flex-col"
                >
                  <Award className="w-12 h-12 text-blue-400 mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-xl font-bold mb-3">Membership Certificate</h3>
                  <p className="text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
                    Verification of institutional commitment to ARIFAC's standards for the current period.
                  </p>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/membership/certificate"
                      className="w-full py-3 rounded-2xl bg-white text-black font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group"
                    >
                      <Award className="w-4 h-4 group-hover:scale-110 transition-all" />
                      View Certificate
                    </Link>
                    <Link
                      href={`/membership/verify/${memberData.id}`}
                      target="_blank"
                      className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verification Page
                    </Link>
                  </div>
                </motion.div>

                {/* Account Status Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full flex flex-col"
                >
                  <ShieldCheck className="w-12 h-12 text-green-500 mb-6 opacity-40" />
                  <h3 className="text-xl font-bold mb-3">Account Status</h3>
                  <div className="space-y-4 mb-8 flex-grow">
                    {/* <div className={`p-3 rounded-xl border flex items-center justify-between ${memberData.status === 'ACTIVE' || memberData.status === 'PAYMENT_SUCCESS' || memberData.status === 'VERIFIED'
                        ? 'bg-green-500/5 border-green-500/10'
                        : 'bg-amber-500/5 border-amber-500/10'
                      }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${memberData.status === 'ACTIVE' || memberData.status === 'PAYMENT_SUCCESS' || memberData.status === 'VERIFIED'
                            ? 'bg-green-500'
                            : 'bg-amber-500'
                          }`} />
                        <span className={`text-sm font-bold uppercase ${memberData.status === 'ACTIVE' || memberData.status === 'PAYMENT_SUCCESS' || memberData.status === 'VERIFIED'
                            ? 'text-green-500'
                            : 'text-amber-500'
                          }`}>
                          {memberData.status?.replace(/_/g, ' ') || 'PENDING'}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded border font-bold uppercase ${memberData.status === 'ACTIVE' || memberData.status === 'PAYMENT_SUCCESS' || memberData.status === 'VERIFIED'
                          ? 'bg-green-500/10 text-green-500 border-green-500/20'
                          : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                        {memberData.status === 'ACTIVE' || memberData.status === 'VERIFIED' ? 'Verified' : 'In Review'}
                      </span>
                    </div> */}
                    {/* <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">MEMBER TYPE</p>
                      <p className="text-sm font-medium">{memberData.type}</p>
                    </div> */}
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">MEMBERSHIP ID</p>
                      <p className="text-sm font-mono text-blue-400">{memberData.membershipId}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
                    <p className="text-[11px] text-gray-400">All information is synced with your organisation's official registration.</p>
                  </div>
                </motion.div>

              </div>

              {/* Collapsible Section for Timeline / Audit (UX Improvement) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8"
              >
                <h3 className="text-xl font-bold mb-6">Membership Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Email Address</p>
                        <p className="font-medium text-sm">{memberData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Primary Mobile</p>
                        <p className="font-medium text-sm">{memberData.mobile}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Organisation</p>
                        <p className="font-medium text-sm">{memberData.organisation}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Designation</p>
                        <p className="font-medium text-sm">{memberData.designation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Renewal & Expiry */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sticky top-32"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">Renewal Timeline</h3>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <span className="text-sm text-gray-400">Membership Progress</span>
                      <span className="text-xs font-bold text-amber-500">365 Days Left</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                      <span className="text-xs text-gray-400 uppercase font-bold">Registered</span>
                      <span className="text-sm font-medium">{memberData.memberSince}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                      <span className="text-xs text-gray-400 uppercase font-bold">Valid Until</span>
                      <span className="text-sm font-medium">{memberData.expiryDate}</span>
                    </div>
                  </div>

                  <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-500 font-bold text-sm cursor-not-allowed">
                    Renewal Not Required Yet
                  </button>

                  <div className="text-center">
                    <p className="text-[10px] text-gray-500">Automatic renewal notification will be sent <br /> 30 days before expiry.</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold">Edit Profile Details</h3>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] text-gray-500 uppercase font-bold tracking-widest px-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] text-gray-500 uppercase font-bold tracking-widest px-1">Designation</label>
                    <input
                      type="text"
                      required
                      value={editForm.designation}
                      onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] text-gray-500 uppercase font-bold tracking-widest px-1">Organisation Name</label>
                    <input
                      type="text"
                      required
                      value={editForm.organisationName}
                      onChange={(e) => setEditForm({ ...editForm, organisationName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[11px] text-gray-500 uppercase font-bold tracking-widest px-1">Email</label>
                      <input
                        type="email"
                        required
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-gray-500 uppercase font-bold tracking-widest px-1">Mobile</label>
                      <input
                        type="text"
                        required
                        value={editForm.mobile}
                        onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {updateError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> {updateError}
                    </motion.div>
                  )}
                  {updateSuccess && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> {updateSuccess}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                  >
                    {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
