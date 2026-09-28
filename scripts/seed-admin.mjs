import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Load .env.local if present
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [k, ...v] = trimmed.split("=");
        if (!process.env[k.trim()]) {
          process.env[k.trim()] = v.join("=").trim();
        }
      }
    }
  }
} catch {
  // ignore
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/armor_fit";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@armorfit.com").toLowerCase().trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ArmorFitStaff2025!";
const ADMIN_NAME = process.env.ADMIN_NAME || "Armor Fit Head Coach";

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "admin" },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function seedAdmin() {
  console.log(`[Seed] Connecting to MongoDB at ${MONGODB_URI}...`);
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("[Seed] Connected successfully.");

    const existing = await Admin.findOne({ email: ADMIN_EMAIL });
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    if (existing) {
      console.log(`[Seed] Admin user "${ADMIN_EMAIL}" exists. Updating credentials...`);
      existing.password = hashedPassword;
      existing.name = ADMIN_NAME;
      await existing.save();
      console.log("[Seed] Admin user credentials updated successfully.");
    } else {
      console.log(`[Seed] Creating initial admin user "${ADMIN_EMAIL}"...`);
      await Admin.create({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        name: ADMIN_NAME,
        role: "admin",
      });
      console.log("[Seed] Admin user created successfully.");
    }
  } catch (err) {
    console.error("[Seed] Error seeding admin account:", err.message);
    console.log("\nNote: If MongoDB is offline, the app automatically falls back to in-memory credential verification via environment variables.");
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seedAdmin();
