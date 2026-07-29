import { PrismaClient, AdminRole, AdminStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
        role: AdminRole.ADMIN,
        status: AdminStatus.ACTIVE
      }
    });
    console.log('✅ Default Admin created:', admin.email);
  } else {
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
