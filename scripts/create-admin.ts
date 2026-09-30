/**
 * Creates an admin account, or resets the password of an existing one.
 *
 *   npm run admin:create -- --email owner@example.com --password "a-long-password" --name "Owner"
 *
 * If flags are omitted, ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME from .env are used.
 * Resetting a password signs that admin out of every device.
 */
import { parseArgs } from "node:util";
import { prisma } from "../prisma/client";
import { hashPassword, MIN_PASSWORD_LENGTH } from "../src/lib/auth/password";

async function main() {
  const { values } = parseArgs({
    options: {
      email: { type: "string" },
      password: { type: "string" },
      name: { type: "string" },
    },
  });

  const email = (values.email ?? process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = values.password ?? process.env.ADMIN_PASSWORD ?? "";
  const name = (values.name ?? process.env.ADMIN_NAME ?? "Store Admin").trim();

  if (!/^\S+@\S+\.\S+$/.test(email)) throw new Error("Provide a valid --email (or ADMIN_EMAIL in .env).");
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`The password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }

  const passwordHash = await hashPassword(password);
  const existing = await prisma.adminUser.findUnique({ where: { email } });

  if (existing) {
    await prisma.adminUser.update({
      where: { email },
      data: { passwordHash, name, tokenVersion: { increment: 1 } },
    });
    console.log(`Password updated for ${email}. Existing sessions have been signed out.`);
  } else {
    await prisma.adminUser.create({ data: { email, name, passwordHash } });
    console.log(`Admin account created for ${email}.`);
  }
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
