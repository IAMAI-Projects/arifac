
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ArrowLeft, 
  Search, 
  Filter,
  MoreVertical,
  Calendar,
  Building2,
  Mail,
  User,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import Logo from '@/components/Logo';

interface AppUser {
  id: string;
  name: string;
  email: string;
  formB?: {
    organisationName: string;
  };
}

interface ApprovalRecord {
  id: string;
  userId: string;
  stage: string;
  status: string;
  remarks?: string;
  createdAt: string;
  user: AppUser;
}

export default function AdminDashboard() {
  const [data, setData] = useState<{ pendingFormB: ApprovalRecord[], pendingFinal: ApprovalRecord[], approvedList: ApprovalRecord[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/approvals');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          setError('Failed to fetch approvals. Access denied.');
          router.push('/admin/login');
        }
      } catch (err) {
        setError('An unexpected error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  async function handleApprove(userId: string) {
    if (!confirm('Are you sure you want to approve this application?')) return;
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status: 'APPROVED', remarks: remarks[userId] || '' }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to approve');
      }
    } catch (err) {
      alert('Error during approval');
    }
  }

  async function handleReject(userId: string) {
    if (!confirm('Are you sure you want to reject this application?')) return;
    try {
      const res = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, status: 'REJECTED', remarks: remarks[userId] || '' }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to reject');
      }
    } catch (err) {
      alert('Error during rejection');
    }
  }

  const filteredPending = data?.pendingFormB.filter(item => 
    item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.user.formB?.organisationName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#f5f5f7]">
      <Loader2 className="animate-spin text-[#0066cc] mb-4" size={40} />
      <p className="text-[#86868b] font-medium animate-pulse">Initializing Dashboard...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans selection:bg-[#0066cc]/10 selection:text-[#0066cc]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <Logo className="h-12 w-auto scale-90" />
              <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>
              <h2 className="text-[#1d1d1f] font-heading font-bold text-lg hidden sm:block uppercase tracking-wider">Admin Panel</h2>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors text-sm font-semibold"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back to Platform</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center text-white text-[10px] font-bold">
                AD
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-heading font-black text-[#1d1d1f] mb-2"
              >
                Approval Dashboard
              </motion.h1>
              <p className="text-[#86868b] font-medium">Manage and review membership applications across the ARIFAC platform.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0066cc] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search applications..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#0066cc]/20 focus:border-[#0066cc] transition-all shadow-sm"
                />
              </div>
              <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
               <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                 <Clock size={24} />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">Pending</p>
                 <p className="text-2xl font-black text-[#1d1d1f]">{data?.pendingFormB.length || 0}</p>
               </div>
             </div>
             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
               <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                 <CheckCircle2 size={24} />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">Approved</p>
                 <p className="text-2xl font-black text-[#1d1d1f]">{data?.approvedList.length || 0}</p>
               </div>
             </div>
             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4 lg:col-span-1">
               <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                 <TrendingUp size={24} />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">Total Actions</p>
                 <p className="text-2xl font-black text-[#1d1d1f]">{(data?.pendingFormB.length || 0) + (data?.approvedList.length || 0)}</p>
               </div>
             </div>
             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                 <FileText size={24} />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">Next Step</p>
                 <p className="text-sm font-bold text-[#1d1d1f]">Review Stages</p>
               </div>
             </div>
          </div>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-semibold flex items-center gap-3">
             <XCircle size={20} />
             {error}
          </div>
        )}

        <div className="space-y-16">
          {/* Main Work Area: Pending Submissions */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-black text-[#1d1d1f] flex items-center gap-3 whitespace-nowrap">
                <span className="w-2 h-8 bg-amber-400 rounded-full"></span>
                Pending Review
              </h2>
              <div className="h-px bg-gray-200 flex-grow mx-6"></div>
              <span className="px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-black rounded-full uppercase tracking-tighter">
                Action Required
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredPending.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/50 border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">Everything Clear!</h3>
                  <p className="text-[#86868b] max-w-sm mx-auto">No pending Stage 1 submissions match your current filter.</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPending.map((approval, index) => (
                    <motion.div
                      key={approval.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white rounded-3xl shadow-sm hover:shadow-xl hover:shadow-black/5 border border-gray-200 overflow-hidden transition-all duration-300"
                    >
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#1d1d1f] border border-gray-100 group-hover:bg-[#0066cc]/5 transition-colors">
                              <User size={28} />
                            </div>
                            <div>
                              <h3 className="text-xl font-heading font-bold text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">{approval.user.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-[#86868b] mt-0.5">
                                <Mail size={14} />
                                {approval.user.email}
                              </div>
                            </div>
                          </div>
                          <span className="p-1 px-2 text-[8px] bg-amber-50 text-amber-600 font-black rounded border border-amber-100 uppercase tracking-[0.2em]">
                            Stage 1
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                           <div className="bg-[#f5f5f7]/50 p-3 rounded-2xl border border-gray-100">
                             <p className="text-[10px] font-bold text-[#86868b] uppercase mb-1">Organisation</p>
                             <div className="flex items-center gap-2 text-[#1d1d1f] font-bold text-xs truncate">
                               <Building2 size={12} className="text-gray-400" />
                               {approval.user.formB?.organisationName || "Not Specified"}
                             </div>
                           </div>
                           <div className="bg-[#f5f5f7]/50 p-3 rounded-2xl border border-gray-100">
                             <p className="text-[10px] font-bold text-[#86868b] uppercase mb-1">Submission Date</p>
                             <div className="flex items-center gap-2 text-[#1d1d1f] font-bold text-xs">
                               <Calendar size={12} className="text-gray-400" />
                               {new Date(approval.createdAt).toLocaleDateString()}
                             </div>
                           </div>
                        </div>

                        <div className="space-y-4">
                          <div className="relative">
                            <textarea
                              placeholder="Add review remarks (internal or for user)..."
                              className="w-full bg-[#f5f5f7] border-none rounded-2xl p-4 text-xs font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-[#0066cc]/20 transition-all outline-none resize-none h-24"
                              onChange={(e) => setRemarks({ ...remarks, [approval.userId]: e.target.value })}
                            />
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleApprove(approval.userId)}
                              className="flex-1 bg-[#1d1d1f] text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#000] transition-all transform active:scale-[0.98] shadow-md shadow-black/10"
                            >
                              <CheckCircle2 size={16} /> Approve
                            </button>
                            <button
                              onClick={() => handleReject(approval.userId)}
                              className="px-6 border border-gray-200 text-rose-600 hover:bg-rose-50 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.95]"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </section>

          {/* Activity Log: Approved Submissions */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-heading font-black text-[#1d1d1f] flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-400 rounded-full"></span>
                Approval History
              </h2>
              <div className="h-px bg-gray-200 flex-grow mx-6"></div>
              <div className="flex items-center gap-2 text-[#86868b] text-sm font-bold bg-white px-4 py-1.5 rounded-full border border-gray-200">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>{data?.approvedList.length || 0} Processed</span>
              </div>
            </div>

            {data?.approvedList.length === 0 ? (
               <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm">
                 <p className="text-gray-400 italic">Historical records will appear here.</p>
               </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-8 py-5 text-[10px] font-black text-[#86868b] uppercase tracking-widest">Candidate / Organisation</th>
                        <th className="px-6 py-5 text-[10px] font-black text-[#86868b] uppercase tracking-widest text-center">Stage</th>
                        <th className="px-6 py-5 text-[10px] font-black text-[#86868b] uppercase tracking-widest text-center">Processed On</th>
                        <th className="px-8 py-5 text-[10px] font-black text-[#86868b] uppercase tracking-widest">Administrator Remarks</th>
                        <th className="px-6 py-5 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data?.approvedList.map((approval) => (
                        <tr key={approval.id} className="hover:bg-[#f5f5f7]/40 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-[#1d1d1f] leading-tight mb-0.5">{approval.user.name}</span>
                              <span className="text-[11px] font-medium text-[#86868b] flex items-center gap-1">
                                {approval.user.formB?.organisationName}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className={`inline-flex px-2 py-0.5 text-[9px] font-black rounded leading-4 uppercase tracking-tighter ${
                              approval.stage === 'FINAL' 
                                ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                                : 'bg-blue-50 text-blue-600 border border-blue-100'
                            }`}>
                              {approval.stage}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="text-[12px] font-bold text-[#1d1d1f]">
                              {new Date(approval.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-[12px] text-[#86868b] italic max-w-sm line-clamp-1">
                              {approval.remarks || "No remarks provided"}
                            </p>
                          </td>
                          <td className="px-6 py-5 text-right">
                             <button className="p-2 rounded-xl text-gray-400 hover:text-[#1d1d1f] group-hover:bg-white transition-all shadow-sm shadow-transparent hover:shadow-black/5">
                               <ExternalLink size={14} />
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
            <div className="w-8 h-8 rounded-lg bg-[#1d1d1f] flex items-center justify-center text-white text-[8px] font-black">AR</div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">ARIFAC Platform &bull; Operations</p>
          </div>
          <div className="flex gap-8">
            <span className="text-xs font-bold text-[#86868b] cursor-help border-b border-dotted border-gray-300 pb-0.5">Security Guidelines</span>
            <span className="text-xs font-bold text-[#86868b] cursor-help border-b border-dotted border-gray-300 pb-0.5">Admin Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
