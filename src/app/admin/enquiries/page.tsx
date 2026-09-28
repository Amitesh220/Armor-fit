"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

interface EnquiryItem {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  age?: number;
  fitnessGoal: string;
  preferredTraining: string;
  preferredContactMethod: string;
  message?: string;
  status: "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";
  notes?: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Modals state
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EnquiryItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        status: statusFilter,
        search,
      });

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch {
      // Error
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search, router]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus as EnquiryItem["status"] } : e))
        );
        if (selectedEnquiry && selectedEnquiry._id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus as EnquiryItem["status"] } : null));
        }
      }
    } catch {
      // ignore
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: adminNote }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === selectedEnquiry._id ? { ...e, notes: adminNote } : e))
        );
        setSelectedEnquiry((prev) => (prev ? { ...prev, notes: adminNote } : null));
      }
    } catch {
      // ignore
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e._id !== deleteTarget._id));
        setTotal((prev) => Math.max(0, prev - 1));
        setDeleteTarget(null);
      }
    } catch {
      // ignore
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f4f4f5] flex flex-col">
      <AdminNav />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#23272e]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#121417] text-[#a1a1aa] font-label-sm text-[10px] uppercase tracking-widest border border-[#23272e] mb-2">
              <span className="w-1.5 h-1.5 bg-white"></span>
              INTAKE ARCHIVE
            </div>
            <h1 className="font-headline-lg text-[26px] sm:text-[32px] uppercase text-white font-black tracking-tight">
              ATHLETE INQUIRIES ({total})
            </h1>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#121417] p-3 border border-[#23272e] rounded-[2px]">
          {/* Search Input */}
          <div className="sm:col-span-8 relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-[#71717a] text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name, phone, email, or goal..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white pl-10 pr-4 py-2 text-[13px] text-white placeholder-[#71717a] outline-none rounded-[2px]"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-3 py-2 text-[13px] text-white outline-none rounded-[2px]"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">NEW Only</option>
              <option value="CONTACTED">CONTACTED</option>
              <option value="CONVERTED">CONVERTED</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#121417] border border-[#23272e] rounded-[2px] overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-[#71717a] font-label-md text-[13px] uppercase tracking-widest">
              Retrieving Records...
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-16 text-center space-y-2">
              <span className="material-symbols-outlined text-[36px] text-[#71717a]">inbox</span>
              <h3 className="font-headline-sm text-[16px] text-white uppercase font-bold">
                NO INQUIRIES FOUND
              </h3>
              <p className="font-body-sm text-[13px] text-[#71717a]">
                There are no athlete inquiries matching your current filter criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#0e1013] border-b border-[#23272e] font-label-sm text-[10px] uppercase text-[#71717a] tracking-widest">
                  <tr>
                    <th className="py-3 px-4">Athlete</th>
                    <th className="py-3 px-4">Phone / Desk</th>
                    <th className="py-3 px-4">Goal</th>
                    <th className="py-3 px-4">Format</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23272e]">
                  {enquiries.map((enq) => (
                    <tr key={enq._id} className="hover:bg-[#181b20] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{enq.fullName}</div>
                        {enq.email && (
                          <div className="text-[11px] text-[#71717a] truncate max-w-[160px]">
                            {enq.email}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-white font-mono text-[12px]">
                        <a href={`tel:${enq.phone}`} className="hover:underline">
                          {enq.phone}
                        </a>
                        <div className="text-[10px] text-[#71717a] uppercase font-sans">
                          via {enq.preferredContactMethod}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#d4d4d8]">{enq.fitnessGoal}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-[#1c2026] text-[11px] font-label-sm uppercase rounded-[2px] border border-[#23272e]">
                          {enq.preferredTraining}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={enq.status}
                          disabled={actionLoading}
                          onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                          className={`px-2 py-1 text-[11px] font-label-sm uppercase font-bold rounded-[2px] outline-none cursor-pointer border ${
                            enq.status === "NEW"
                              ? "bg-white text-black border-white"
                              : enq.status === "CONVERTED"
                              ? "bg-zinc-800 text-white border-zinc-600"
                              : enq.status === "CONTACTED"
                              ? "bg-[#1c2026] text-[#e4e4e7] border-[#3a3f47]"
                              : "bg-[#0e1013] text-[#71717a] border-[#23272e]"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CONVERTED">CONVERTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-[#71717a] font-mono text-[11px]">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedEnquiry(enq);
                            setAdminNote(enq.notes || "");
                          }}
                          className="px-2.5 py-1 bg-[#16181d] border border-[#23272e] hover:border-white text-[11px] font-label-sm uppercase tracking-wider text-white rounded-[2px]"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(enq)}
                          className="px-2 py-1 text-red-400 hover:text-red-300 text-[11px] font-label-sm uppercase"
                          title="Delete enquiry"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="bg-[#0e1013] px-4 py-3 border-t border-[#23272e] flex items-center justify-between text-[12px] font-label-sm uppercase text-[#71717a]">
            <span>
              Showing Page {page} of {totalPages} ({total} Total)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 bg-[#16181d] border border-[#23272e] rounded-[2px] disabled:opacity-40 text-white"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 bg-[#16181d] border border-[#23272e] rounded-[2px] disabled:opacity-40 text-white"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* View Details Drawer / Modal */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-[#121417] border border-[#23272e] w-full max-w-lg p-6 rounded-[2px] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#23272e]">
                <div>
                  <span className="font-label-sm text-[10px] uppercase text-[#71717a] tracking-widest block">
                    Athlete Intake Record
                  </span>
                  <h3 className="font-headline-sm text-[20px] uppercase text-white font-bold">
                    {selectedEnquiry.fullName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="text-[#a1a1aa] hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div className="p-3 bg-[#0e1013] border border-[#23272e]">
                  <span className="text-[10px] uppercase text-[#71717a] block font-label-sm">Phone</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-white font-mono hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div className="p-3 bg-[#0e1013] border border-[#23272e]">
                  <span className="text-[10px] uppercase text-[#71717a] block font-label-sm">Email</span>
                  <span className="text-white">{selectedEnquiry.email || "Not provided"}</span>
                </div>
                <div className="p-3 bg-[#0e1013] border border-[#23272e]">
                  <span className="text-[10px] uppercase text-[#71717a] block font-label-sm">Goal</span>
                  <span className="text-white font-semibold">{selectedEnquiry.fitnessGoal}</span>
                </div>
                <div className="p-3 bg-[#0e1013] border border-[#23272e]">
                  <span className="text-[10px] uppercase text-[#71717a] block font-label-sm">Format</span>
                  <span className="text-white font-semibold">{selectedEnquiry.preferredTraining}</span>
                </div>
              </div>

              {selectedEnquiry.message && (
                <div className="p-3 bg-[#0e1013] border border-[#23272e] space-y-1">
                  <span className="text-[10px] uppercase text-[#71717a] block font-label-sm">
                    Inquiry Details / Message
                  </span>
                  <p className="text-[13px] text-[#e4e4e7] leading-relaxed">
                    {selectedEnquiry.message}
                  </p>
                </div>
              )}

              {/* Staff Internal Notes */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase text-white font-label-sm font-bold block">
                  Staff Internal Notes
                </span>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Record coaching call outcome, scheduled walkthrough time, or membership preference..."
                  className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white p-3 text-[13px] text-white placeholder-[#71717a] outline-none rounded-[2px]"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#23272e]">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 border border-[#23272e] text-[12px] font-label-md uppercase text-[#a1a1aa] hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleSaveNotes}
                  className="px-5 py-2 bg-white text-black font-label-md text-[12px] uppercase font-bold hover:bg-[#e4e4e7]"
                >
                  {actionLoading ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="bg-[#121417] border border-red-900/60 w-full max-w-sm p-6 rounded-[2px] shadow-2xl space-y-4">
              <div className="space-y-1">
                <h3 className="font-headline-sm text-[18px] uppercase text-red-400 font-bold">
                  DELETE ENQUIRY?
                </h3>
                <p className="font-body-sm text-[13px] text-[#a1a1aa]">
                  This action cannot be undone. Are you sure you wish to delete the inquiry for{" "}
                  <strong className="text-white">{deleteTarget.fullName}</strong>?
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#23272e]">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 border border-[#23272e] text-[12px] font-label-md uppercase text-[#a1a1aa] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-label-md text-[12px] uppercase font-bold rounded-[2px]"
                >
                  {actionLoading ? "DELETING..." : "DELETE"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
