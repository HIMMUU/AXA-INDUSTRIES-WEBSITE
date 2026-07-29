"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const adminEmail = 'admin@axaindustries.com';
    const existingAdmin = await prisma.admin.findUnique({
        where: { email: adminEmail }
    });
    if (!existingAdmin) {
        const passwordHash = await bcrypt.hash('AdminPass123!', 12);
        const admin = await prisma.admin.create({
            data: {
                email: adminEmail,
                name: 'AXA Business Owner',
                passwordHash,
                role: client_1.AdminRole.ADMIN,
                status: client_1.AdminStatus.ACTIVE
            }
        });
        console.log('✅ Default Admin created:', admin.email);
    }
    else {
        console.log('ℹ️ Admin already exists:', existingAdmin.email);
    }
    // Create default company settings if missing
    const settingsCount = await prisma.settings.count();
    if (settingsCount === 0) {
        await prisma.settings.create({
            data: {
                companyName: 'AXA Industries',
                email: 'contact@axaindustries.com',
                phone: '+1 (800) 555-0199',
                address: '100 Industrial Parkway, Tech Park, CA 94025',
                gst: 'GSTIN998877665544',
                socialLinks: {
                    linkedin: 'https://linkedin.com/company/axaindustries',
                    twitter: 'https://twitter.com/axaindustries'
                },
                footerSettings: {
                    copyright: '© 2026 AXA Industries. All rights reserved.'
                }
            }
        });
        console.log('✅ Default Settings initialized');
    }
}
main()
    .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map