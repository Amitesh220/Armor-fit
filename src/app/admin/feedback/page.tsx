"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

interface FeedbackItem {
  _id: string;
  name?: string;
  memberIdentifier?: string;
  feedbackType: string;
  rating: number;
  feedback: string;
  contactPermission: boolean;
  contactDetails?: string;
  status: "NEW" | "REVIEWED" | "RESOLVED";
  adminNotes?: string;
  createdAt: string;
}

const SECTORS = [
  "ALL",
  "Equipment",
  "Cleanliness",
  "Training",
  "Staff",
  "Personal Training",
  "Classes",
  "Environment",
  "Membership Experience",
  "Other",
];

export default function AdminFeedbackPage() {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [ratingFilter, setRatingFilter] = useState("0");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Modals state
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FeedbackItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
        status: statusFilter,
        type: typeFilter,
        rating: ratingFilter,
        search,
      });

      const res = await fetch(`/api/admin/feedback?${params.toString()}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setFeedbackList(data.feedback || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch {
      // Error
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, typeFilter, ratingFilter, search, router]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setFeedbackList((prev) =>
          prev.map((f) => (f._id === id ? { ...f, status: newStatus as FeedbackItem["status"] } : f))
        );
        if (selectedFeedback && selectedFeedback._id === id) {
          setSelectedFeedback((prev) =>
            prev ? { ...prev, status: newStatus as FeedbackItem["status"] } : null
          );
        }
      }
    } catch {
      // ignore
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedFeedback) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/feedback/${selectedFeedback._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNotes: adminNote }),
      });
      if (res.ok) {
        setFeedbackList((prev) =>
          prev.map((f) => (f._id === selectedFeedback._id ? { ...f, adminNotes: adminNote } : f))
        );
        setSelectedFeedback((prev) => (prev ? { ...prev, adminNotes: adminNote } : null));
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
      const res = await fetch(`/api/admin/feedback/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFeedbackList((prev) => prev.filter((f) => f._id !== deleteTarget._id));
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
              FACILITY INTELLIGENCE
            </div>
            <h1 className="font-headline-lg text-[26px] sm:text-[32px] uppercase text-white font-black tracking-tight">
              MEMBER FEEDBACK ({total})
            </h1>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#121417] p-3 border border-[#23272e] rounded-[2px]">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-[#71717a] text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search member, observation, or ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white pl-10 pr-4 py-2 text-[13px] text-white placeholder-[#71717a] outline-none rounded-[2px]"
            />
          </div>

          {/* Sector Filter */}
          <div className="sm:col-span-2">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-2 py-2 text-[13px] text-white outline-none rounded-[2px]"
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s === "ALL" ? "All Sectors" : s}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-2 py-2 text-[13px] text-white outline-none rounded-[2px]"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="REVIEWED">REVIEWED</option>
              <option value="RESOLVED">RESOLVED</option>
            </select>
          </div>

          {/* Rating Filter */}
          <div className="sm:col-span-2">
            <select
              value={ratingFilter}
              onChange={(e) => {
                setRatingFilter(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white px-2 py-2 text-[13px] text-white outline-none rounded-[2px]"
            >
              <option value="0">All Ratings</option>
              <option value="5">5★ Only</option>
              <option value="4">4★</option>
              <option value="3">3★</option>
              <option value="2">2★</option>
              <option value="1">1★ Deficit</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-[#121417] border border-[#23272e] rounded-[2px] overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-[#71717a] font-label-md text-[13px] uppercase tracking-widest">
              Retrieving Feedback Records...
            </div>
          ) : feedbackList.length === 0 ? (
            <div className="p-16 text-center space-y-2">
              <span className="material-symbols-outlined text-[36px] text-[#71717a]">rate_review</span>
              <h3 className="font-headline-sm text-[16px] text-white uppercase font-bold">
                NO FEEDBACK RECORDED
              </h3>
              <p className="font-body-sm text-[13px] text-[#71717a]">
                There are no member reviews matching your filter criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead className="bg-[#0e1013] border-b border-[#23272e] font-label-sm text-[10px] uppercase text-[#71717a] tracking-widest">
                  <tr>
                    <th className="py-3 px-4">Member</th>
                    <th className="py-3 px-4">Sector</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Observation</th>
                    <th className="py-3 px-4">Follow-up</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23272e]">
                  {feedbackList.map((fb) => (
                    <tr key={fb._id} className="hover:bg-[#181b20] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">
                          {fb.name || "Anonymous Member"}
                        </div>
                        {fb.memberIdentifier && (
                          <div className="text-[11px] font-mono text-[#71717a]">
                            ID: {fb.memberIdentifier}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-[#1c2026] text-[11px] font-label-sm uppercase rounded-[2px] border border-[#23272e] text-[#d4d4d8]">
                          {fb.feedbackType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                        {fb.rating}★
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-[#a1a1aa]">
                        {fb.feedback}
                      </td>
                      <td className="py-3.5 px-4">
                        {fb.contactPermission ? (
                          <span className="text-[11px] text-white font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white"></span>
                            Requested
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#71717a]">None</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={fb.status}
                          disabled={actionLoading}
                          onChange={(e) => handleStatusChange(fb._id, e.target.value)}
                          className={`px-2 py-1 text-[11px] font-label-sm uppercase font-bold rounded-[2px] outline-none cursor-pointer border ${
                            fb.status === "NEW"
                              ? "bg-white text-black border-white"
                              : fb.status === "RESOLVED"
                              ? "bg-zinc-800 text-white border-zinc-600"
                              : "bg-[#1c2026] text-[#e4e4e7] border-[#3a3f47]"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="REVIEWED">REVIEWED</option>
                          <option value="RESOLVED">RESOLVED</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-[#71717a] font-mono text-[11px] whitespace-nowrap">
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFeedback(fb);
                            setAdminNote(fb.adminNotes || "");
                          }}
                          className="px-2.5 py-1 bg-[#16181d] border border-[#23272e] hover:border-white text-[11px] font-label-sm uppercase tracking-wider text-white rounded-[2px]"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(fb)}
                          className="px-2 py-1 text-red-400 hover:text-red-300 text-[11px] font-label-sm uppercase"
                          title="Delete feedback"
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

        {/* View Feedback Details Modal */}
        {selectedFeedback && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-[#121417] border border-[#23272e] w-full max-w-lg p-6 rounded-[2px] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#23272e]">
                <div>
                  <span className="font-label-sm text-[10px] uppercase text-[#71717a] tracking-widest block">
                    Member Intelligence Detail
                  </span>
                  <h3 className="font-headline-sm text-[18px] uppercase text-white font-bold">
                    {selectedFeedback.feedbackType} • {selectedFeedback.rating}★ Rating
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFeedback(null)}
                  className="text-[#a1a1aa] hover:text-white"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <div className="space-y-3 text-[13px]">
                <div className="p-3 bg-[#0e1013] border border-[#23272e] flex justify-between">
                  <span className="text-[#71717a]">Submitted By:</span>
                  <span className="text-white font-semibold">
                    {selectedFeedback.name || "Anonymous Member"}{" "}
                    {selectedFeedback.memberIdentifier && `(${selectedFeedback.memberIdentifier})`}
                  </span>
                </div>

                <div className="p-3 bg-[#0e1013] border border-[#23272e] space-y-1">
                  <span className="text-[10px] uppercase text-[#71717a] block font-label-sm">
                    Detailed Observation:
                  </span>
                  <p className="text-[14px] text-white leading-relaxed whitespace-pre-wrap">
                    {selectedFeedback.feedback}
                  </p>
                </div>

                {selectedFeedback.contactPermission && (
                  <div className="p-3 bg-[#16181d] border border-white space-y-1">
                    <span className="text-[10px] uppercase text-white font-bold block font-label-sm">
                      Follow-up Requested:
                    </span>
                    <p className="text-[13px] text-white font-mono">
                      {selectedFeedback.contactDetails || "Contact requested without details"}
                    </p>
                  </div>
                )}
              </div>

              {/* Staff Resolution Notes */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase text-white font-label-sm font-bold block">
                  Staff Resolution / Facility Notes
                </span>
                <textarea
                  rows={3}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Record actions taken, e.g. barbell knurling cleaned, replacement plates ordered..."
                  className="w-full bg-[#0e1013] border border-[#23272e] focus:border-white p-3 text-[13px] text-white placeholder-[#71717a] outline-none rounded-[2px]"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#23272e]">
                <button
                  type="button"
                  onClick={() => setSelectedFeedback(null)}
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
                  DELETE FEEDBACK?
                </h3>
                <p className="font-body-sm text-[13px] text-[#a1a1aa]">
                  This action cannot be undone. Are you sure you wish to permanently delete this member feedback?
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
