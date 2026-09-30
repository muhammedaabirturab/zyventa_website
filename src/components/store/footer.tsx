import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { policyPages, siteConfig } from "@/config/site";
import { Logo } from "@/components/logo";
import { SocialIcons } from "@/components/store/social-icons";

type NavCategory = { name: string; slug: string };

export function Footer({ categories }: { categories: NavCategory[] }) {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-strong text-white/75">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed">{siteConfig.tagline} Wellness, skincare and home health essentials delivered to your door.</p>
          <div className="mt-6">
            <SocialIcons links={siteConfig.social} />
          </div>
        </div>

        <FooterColumn title="Shop" className="lg:col-span-2">
          <FooterLink href="/shop">All products</FooterLink>
          {categories.map((c) => (
            <FooterLink key={c.slug} href={`/shop?category=${c.slug}`}>
              {c.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Customer care" className="lg:col-span-3">
          <FooterLink href="/contact">Contact us</FooterLink>
          <FooterLink href="/about">About Zyventa</FooterLink>
          {policyPages.map((p) => (
            <FooterLink key={p.slug} href={`/policies/${p.slug}`}>
              {p.title}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Get in touch" className="lg:col-span-3">
          <li className="flex gap-3">
            <Mail className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
            <span>{contact.email}</span>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
            <span>{contact.phone}</span>
          </li>
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
            <span>{contact.address}</span>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
            <span>{contact.hours}</span>
          </li>
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Secure checkout · Cash on delivery available</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="text-xs font-semibold tracking-[0.14em] text-white uppercase">{title}</h2>
      <ul className="mt-4 space-y-3 text-[15px]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-white hover:underline hover:underline-offset-4">
        {children}
      </Link>
    </li>
  );
}
