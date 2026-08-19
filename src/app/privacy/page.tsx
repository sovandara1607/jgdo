import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
};

const listClass = "list-disc space-y-2 pl-5";

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {siteConfig.name} is a macOS menu bar application developed and operated by an
          independent individual developer (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;), not a registered company. This Privacy Policy explains what
          information we collect through the {siteConfig.name} website ({siteConfig.url}) and the{" "}
          {siteConfig.name} desktop application, why we collect it, and what your options are.
        </p>
        <p>
          If you have questions about this policy or how your information is handled, you can
          reach us at{" "}
          <a href={`mailto:${siteConfig.links.supportEmail}`} className="underline">
            {siteConfig.links.supportEmail}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "Scope of this policy",
    body: (
      <p>
        This policy covers two distinct surfaces: this marketing/checkout website, and the{" "}
        {siteConfig.name} desktop app you install on your Mac. We describe each separately below
        because they collect very different amounts of information — the website processes what
        it needs to run a checkout and respond to you; the app is designed to keep your data on
        your device.
      </p>
    ),
  },
  {
    id: "website-data",
    title: "Information collected on the website",
    body: (
      <>
        <p>We collect information you choose to give us, and nothing more:</p>
        <ul className={listClass}>
          <li>
            <strong className="text-foreground">Checkout:</strong> to purchase a license, we
            collect the plan you selected and, if you pay via Bakong KHQR, the email address you
            provide so we can send your license key. We never see or store your card number, bank
            account number, or KHQR app credentials — those are handled entirely by our payment
            processors (see &ldquo;Payment processing&rdquo; below).
          </li>
          <li>
            <strong className="text-foreground">Contact form:</strong> if you write to us via the
            support page, we collect your name, email address, and message so we can reply.
          </li>
          <li>
            <strong className="text-foreground">Newsletter:</strong> if you subscribe for product
            updates, we collect your email address for that sole purpose. Every email includes an
            unsubscribe option.
          </li>
        </ul>
        <p>
          We do not use cookies, analytics scripts, or any third-party tracking or advertising
          technology on this website. Our hosting provider may keep standard server access logs
          (such as IP address, request time, and user agent) for security and reliability
          purposes, in line with normal web hosting operations.
        </p>
      </>
    ),
  },
  {
    id: "app-data",
    title: "Information collected by the desktop app",
    body: (
      <>
        <p>
          {siteConfig.name} is built to work entirely on your Mac. It does not include telemetry,
          analytics, or crash reporting that sends data to us, and it does not require an account
          or sign-in. Concretely:
        </p>
        <ul className={listClass}>
          <li>
            Clipboard history, saved workspaces, snap groups, layout presets, parked windows,
            scratchpad notes, and workflow-insight statistics are stored locally on your Mac (via
            local storage) and are never transmitted anywhere.
          </li>
          <li>
            The clipboard manager automatically skips content copied from password managers and
            other sensitive sources, so that data is never captured even locally.
          </li>
          <li>
            Your license key is verified entirely offline, on your device — activating the app
            does not phone home or check in with any server.
          </li>
          <li>
            The app does make two kinds of outbound network requests on its own: checking GitHub
            for app updates (via the open-source Sparkle update framework) and, if you use
            clipboard image OCR, running text recognition locally via Apple&rsquo;s on-device
            Vision framework — no image or extracted text leaves your Mac for that feature either.
          </li>
        </ul>
        <p>
          The app requests macOS Accessibility permission (and, optionally, Screen Recording
          permission for window thumbnails). These permissions are used exclusively to read and
          move window positions and render previews within the app itself — never to log
          keystrokes, capture screen contents for any purpose other than the feature you
          triggered, or send that data off your Mac.
        </p>
      </>
    ),
  },
  {
    id: "payment-processing",
    title: "Payment processing",
    body: (
      <>
        <p>
          Purchases are handled by third-party payment processors, not by us directly:
        </p>
        <ul className={listClass}>
          <li>
            <strong className="text-foreground">ABA PayWay</strong> — for card and ABA mobile
            payments.
          </li>
          <li>
            <strong className="text-foreground">CutLuy</strong> — for Bakong KHQR payments across
            participating Cambodian banking apps.
          </li>
        </ul>
        <p>
          Each processor collects and handles your payment details under its own privacy policy
          and security standards; we recommend reviewing them directly. We only receive
          confirmation that a payment succeeded (or failed) and the minimal metadata described
          above needed to issue your license key.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <ul className={listClass}>
        <li>To process your purchase and generate and deliver your license key.</li>
        <li>To respond to support requests and contact-form messages.</li>
        <li>To send product update emails, only if you subscribed, and only until you unsubscribe.</li>
        <li>To maintain the security and reliability of the website.</li>
      </ul>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party service providers",
    body: (
      <>
        <p>We share the minimum information necessary with a small number of service providers who help us run the website and deliver purchases:</p>
        <ul className={listClass}>
          <li><strong className="text-foreground">Resend</strong> — sends transactional email (e.g. your license key).</li>
          <li><strong className="text-foreground">ABA PayWay</strong> and <strong className="text-foreground">CutLuy</strong> — process payments, as described above.</li>
          <li><strong className="text-foreground">GitHub</strong> — hosts app downloads and update metadata that the desktop app checks for new versions.</li>
        </ul>
        <p>We do not sell your information, and we do not share it with anyone for advertising purposes.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data retention",
    body: (
      <p>
        We keep contact-form messages and newsletter subscriptions only as long as needed to
        respond to you or until you unsubscribe. Checkout metadata (plan, order reference, and
        email if provided) is kept for as long as reasonably necessary for accounting, license
        support, and fraud-prevention purposes. Data stored locally by the desktop app remains on
        your Mac under your control — uninstalling the app or deleting its data removes it.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    body: (
      <>
        <p>You can, at any time:</p>
        <ul className={listClass}>
          <li>Ask what information we hold about you.</li>
          <li>Ask us to correct or delete it, subject to what we need to keep for legal, accounting, or fraud-prevention reasons.</li>
          <li>Unsubscribe from marketing email using the link in any newsletter message.</li>
          <li>Uninstall the app at any time to remove all locally stored data from your Mac.</li>
        </ul>
        <p>
          To exercise any of these, email{" "}
          <a href={`mailto:${siteConfig.links.supportEmail}`} className="underline">
            {siteConfig.links.supportEmail}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's privacy",
    body: (
      <p>
        {siteConfig.name} is not directed at children, and we do not knowingly collect
        information from anyone under 16. If you believe a child has provided us information,
        contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        We take reasonable technical and organizational measures to protect the information we
        do hold, including relying on established, reputable providers (Resend, ABA PayWay,
        CutLuy) for the parts of the flow that touch payment and email data. No method of
        transmission or storage is perfectly secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "international",
    title: "International data transfers",
    body: (
      <p>
        We operate from Cambodia. Some of the service providers listed above may process or store
        data outside Cambodia, in whichever regions they operate their infrastructure. By using
        the website or purchasing a license, you understand that your information may be
        processed in a country other than your own.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as {siteConfig.name} evolves. If we make material changes,
        we&rsquo;ll update the effective date at the top of this page. We encourage you to review
        this page periodically.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions, requests, or concerns about this policy can be sent to{" "}
        <a href={`mailto:${siteConfig.links.supportEmail}`} className="underline">
          {siteConfig.links.supportEmail}
        </a>
        . We aim to respond to every message personally.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate="August 19, 2026"
      intro={
        <>
          We built {siteConfig.name} to keep your data on your own Mac wherever possible. This
          page explains, in plain language, exactly what we collect on the website and in the
          app, and why.
        </>
      }
      sections={sections}
    />
  );
}
