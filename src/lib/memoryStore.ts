import bcrypt from "bcryptjs";

export interface StoredEnquiry {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  age?: number;
  fitnessGoal: string;
  preferredTraining: string;
  preferredContactMethod: "Phone" | "WhatsApp" | "Email";
  message?: string;
  status: "NEW" | "CONTACTED" | "CONVERTED" | "CLOSED";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoredFeedback {
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
  createdAt: Date;
  updatedAt: Date;
}

interface MemoryStoreState {
  enquiries: StoredEnquiry[];
  feedback: StoredFeedback[];
}

declare global {
  // eslint-disable-next-line no-var
  var __armorFitMemoryStore: MemoryStoreState | undefined;
}

function getStore(): MemoryStoreState {
  if (!global.__armorFitMemoryStore) {
    global.__armorFitMemoryStore = {
      enquiries: [
        {
          _id: "enq_mock_001",
          fullName: "Rajesh Sharma",
          phone: "+91 98765 43210",
          email: "rajesh.sharma@example.com",
          age: 28,
          fitnessGoal: "Strength",
          preferredTraining: "Gym",
          preferredContactMethod: "WhatsApp",
          message: "Looking for dedicated powerlifting and deadlift platform training.",
          status: "NEW",
          createdAt: new Date(Date.now() - 3600 * 1000 * 2),
          updatedAt: new Date(Date.now() - 3600 * 1000 * 2),
        },
        {
          _id: "enq_mock_002",
          fullName: "Ananya Pandey",
          phone: "+91 98123 45678",
          email: "ananya.p@example.com",
          age: 24,
          fitnessGoal: "CrossFit / Functional Training",
          preferredTraining: "CrossFit",
          preferredContactMethod: "Phone",
          message: "Interested in morning conditioning sessions and coach guidance.",
          status: "CONTACTED",
          createdAt: new Date(Date.now() - 3600 * 1000 * 24),
          updatedAt: new Date(Date.now() - 3600 * 1000 * 12),
        },
      ],
      feedback: [
        {
          _id: "fb_mock_001",
          name: "Vikram Pratap Singh",
          memberIdentifier: "AF-1042",
          feedbackType: "Equipment",
          rating: 5,
          feedback: "The calibrated steel plates and deadlift bars are exceptional. Best knurling in Gorakhpur.",
          contactPermission: true,
          contactDetails: "+91 97112 33445",
          status: "NEW",
          createdAt: new Date(Date.now() - 3600 * 1000 * 4),
          updatedAt: new Date(Date.now() - 3600 * 1000 * 4),
        },
        {
          _id: "fb_mock_002",
          name: "Anonymous Member",
          feedbackType: "Cleanliness",
          rating: 5,
          feedback: "Appreciate the fresh chalk trays and daily disinfectant schedule on barbell platforms.",
          contactPermission: false,
          status: "REVIEWED",
          createdAt: new Date(Date.now() - 3600 * 1000 * 36),
          updatedAt: new Date(Date.now() - 3600 * 1000 * 18),
        },
      ],
    };
  }
  return global.__armorFitMemoryStore;
}

export const memoryStore = {
  createEnquiry(data: Omit<StoredEnquiry, "_id" | "createdAt" | "updatedAt" | "status"> & { status?: StoredEnquiry["status"] }): StoredEnquiry {
    const store = getStore();
    const newEnquiry: StoredEnquiry = {
      ...data,
      _id: "enq_" + Math.random().toString(36).substr(2, 9),
      status: data.status || "NEW",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.enquiries.unshift(newEnquiry);
    return newEnquiry;
  },

  getEnquiries(filter?: { status?: string; search?: string; page?: number; limit?: number }) {
    const store = getStore();
    let result = [...store.enquiries];

    if (filter?.status && filter.status !== "ALL") {
      result = result.filter((e) => e.status === filter.status);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.fullName.toLowerCase().includes(q) ||
          e.phone.toLowerCase().includes(q) ||
          (e.email && e.email.toLowerCase().includes(q)) ||
          e.fitnessGoal.toLowerCase().includes(q)
      );
    }

    const total = result.length;
    const page = filter?.page || 1;
    const limit = filter?.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginated = result.slice(startIndex, startIndex + limit);

    return {
      enquiries: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    };
  },

  updateEnquiry(id: string, update: Partial<StoredEnquiry>): StoredEnquiry | null {
    const store = getStore();
    const index = store.enquiries.findIndex((e) => e._id === id);
    if (index === -1) return null;
    store.enquiries[index] = {
      ...store.enquiries[index],
      ...update,
      updatedAt: new Date(),
    };
    return store.enquiries[index];
  },

  deleteEnquiry(id: string): boolean {
    const store = getStore();
    const initialLen = store.enquiries.length;
    store.enquiries = store.enquiries.filter((e) => e._id !== id);
    return store.enquiries.length < initialLen;
  },

  createFeedback(data: Omit<StoredFeedback, "_id" | "createdAt" | "updatedAt" | "status"> & { status?: StoredFeedback["status"] }): StoredFeedback {
    const store = getStore();
    const newFeedback: StoredFeedback = {
      ...data,
      _id: "fb_" + Math.random().toString(36).substr(2, 9),
      status: data.status || "NEW",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.feedback.unshift(newFeedback);
    return newFeedback;
  },

  getFeedback(filter?: { status?: string; search?: string; type?: string; rating?: number; page?: number; limit?: number }) {
    const store = getStore();
    let result = [...store.feedback];

    if (filter?.status && filter.status !== "ALL") {
      result = result.filter((f) => f.status === filter.status);
    }

    if (filter?.type && filter.type !== "ALL") {
      result = result.filter((f) => f.feedbackType === filter.type);
    }

    if (filter?.rating && filter.rating > 0) {
      result = result.filter((f) => f.rating === filter.rating);
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (f) =>
          (f.name && f.name.toLowerCase().includes(q)) ||
          (f.memberIdentifier && f.memberIdentifier.toLowerCase().includes(q)) ||
          f.feedback.toLowerCase().includes(q)
      );
    }

    const total = result.length;
    const page = filter?.page || 1;
    const limit = filter?.limit || 20;
    const startIndex = (page - 1) * limit;
    const paginated = result.slice(startIndex, startIndex + limit);

    return {
      feedback: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    };
  },

  updateFeedback(id: string, update: Partial<StoredFeedback>): StoredFeedback | null {
    const store = getStore();
    const index = store.feedback.findIndex((f) => f._id === id);
    if (index === -1) return null;
    store.feedback[index] = {
      ...store.feedback[index],
      ...update,
      updatedAt: new Date(),
    };
    return store.feedback[index];
  },

  deleteFeedback(id: string): boolean {
    const store = getStore();
    const initialLen = store.feedback.length;
    store.feedback = store.feedback.filter((f) => f._id !== id);
    return store.feedback.length < initialLen;
  },

  getStats() {
    const store = getStore();
    const totalEnquiries = store.enquiries.length;
    const newEnquiries = store.enquiries.filter((e) => e.status === "NEW").length;
    const contactedEnquiries = store.enquiries.filter((e) => e.status === "CONTACTED").length;
    const convertedEnquiries = store.enquiries.filter((e) => e.status === "CONVERTED").length;

    const totalFeedback = store.feedback.length;
    const newFeedback = store.feedback.filter((f) => f.status === "NEW").length;
    const avgRating =
      totalFeedback > 0
        ? Number((store.feedback.reduce((acc, f) => acc + f.rating, 0) / totalFeedback).toFixed(1))
        : 5.0;

    return {
      enquiries: {
        total: totalEnquiries,
        new: newEnquiries,
        contacted: contactedEnquiries,
        converted: convertedEnquiries,
      },
      feedback: {
        total: totalFeedback,
        new: newFeedback,
        averageRating: avgRating,
      },
    };
  },

  async verifyAdmin(email: string, pass: string): Promise<{ valid: boolean; admin?: { email: string; name: string; role: string } }> {
    const configuredEmail = (process.env.ADMIN_EMAIL || "admin@armorfit.com").toLowerCase().trim();
    const configuredPassword = process.env.ADMIN_PASSWORD || "ArmorFitStaff2025!";
    const configuredName = process.env.ADMIN_NAME || "Armor Fit Staff";

    if (email.toLowerCase().trim() === configuredEmail) {
      if (pass === configuredPassword) {
        return { valid: true, admin: { email: configuredEmail, name: configuredName, role: "admin" } };
      }
      try {
        const matches = await bcrypt.compare(pass, configuredPassword);
        if (matches) {
          return { valid: true, admin: { email: configuredEmail, name: configuredName, role: "admin" } };
        }
      } catch {
        // pass
      }
    }

    return { valid: false };
  },
};
