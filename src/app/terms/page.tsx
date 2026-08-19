import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal/legal-layout";
import { siteConfig } from "@/data/site";
import { pricingTiers } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${siteConfig.name} and this website.`,
  alternates: { canonical: "/terms" },
};

const listClass = "list-disc space-y-2 pl-5";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: (
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the{" "}
        {siteConfig.name} website ({siteConfig.url}) and the {siteConfig.name} macOS application
        (together, the &ldquo;Service&rdquo;), operated by an independent individual developer
        (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By downloading, installing, or
        using {siteConfig.name}, or by purchasing a license, you agree to these Terms. If you do
        not agree, do not use the Service.
      </p>
    ),
  },
  {
    id: "the-service",
    title: "Description of the Service",
    body: (
      <p>
        {siteConfig.name} is a macOS menu bar application that provides window snapping and
        management, an app switcher and command palette, a clipboard manager, workspace and
        layout tools, and related productivity utilities. {siteConfig.name} requires macOS
        Accessibility permission to function, and optionally Screen Recording permission for
        window thumbnails — both used solely to power the features you enable, as described in
        our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    ),
  },
  {
    id: "license",
    title: "License grant",
    body: (
      <>
        <p>
          Subject to your compliance with these Terms and payment of the applicable fee, we grant
          you a personal, non-exclusive, non-transferable, revocable license to install and use{" "}
          {siteConfig.name} on the Macs you personally own or control, for as long as your
          license remains valid. This license is for your own use — it is not a sale of the
          software, and we retain all ownership rights not expressly granted to you.
        </p>
        <p>You may not:</p>
        <ul className={listClass}>
          <li>Share, resell, sublicense, rent, or lease your license key to anyone else.</li>
          <li>
            Reverse-engineer, decompile, or disassemble the app beyond what applicable law
            expressly permits, or attempt to bypass or defeat its license-activation mechanism.
          </li>
          <li>Redistribute the app, modified or unmodified, outside of the official download channels.</li>
          <li>Use the Service for any unlawful purpose or in a way that infringes anyone else&rsquo;s rights.</li>
        </ul>
      </>
    ),
  },
  {
    id: "purchases",
    title: "Purchases, pricing, and payment",
    body: (
      <>
        <p>
          {siteConfig.name} is offered as a one-time purchase — {" "}
          {pricingTiers.map((tier, i) => (
            <span key={tier.id}>
              {tier.name} (${tier.price.toFixed(2)}){i < pricingTiers.length - 1 ? " and " : ""}
            </span>
          ))}
          {" "}— with no recurring subscription fee. Prices are listed in US dollars and may
          change at any time for future purchases; changing the price does not affect a license
          you&rsquo;ve already purchased.
        </p>
        <p>
          Payments are processed by third-party providers (ABA PayWay and CutLuy for Bakong
          KHQR). We do not collect or store your full payment credentials — see our{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>{" "}
          for details. You are responsible for any taxes applicable to your purchase.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Refund policy",
    body: (
      <p>
        Because {siteConfig.name} is a low-cost, one-time digital purchase delivered instantly as
        an activation key, all sales are final and non-refundable, except where required by
        applicable law. If you believe you were charged in error — for example, a duplicate
        charge or a payment that never produced a working license key — contact{" "}
        <a href={`mailto:${siteConfig.links.supportEmail}`} className="underline">
          {siteConfig.links.supportEmail}
        </a>{" "}
        and we will make it right.
      </p>
    ),
  },
  {
    id: "activation",
    title: "License keys and activation",
    body: (
      <p>
        Your license key is generated and verified entirely on your device — activating it does
        not require an ongoing internet connection or an account with us. You are responsible for
        keeping your license key confidential; treat it like a password. We reserve the right to
        refuse service, revoke access, or decline to honor a license key we reasonably believe was
        obtained fraudulently, shared in violation of these Terms, or generated without a
        corresponding legitimate purchase.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Updates",
    body: (
      <p>
        We may release updates to {siteConfig.name} from time to time, delivered via the
        app&rsquo;s built-in updater. A paid license entitles you to updates released under the same major
        version at no additional cost; we may, but are not obligated to, offer free upgrades
        across major versions. We may also change, suspend, or discontinue any feature of the
        Service at any time.
      </p>
    ),
  },
  {
    id: "beta-disclaimer",
    title: "Beta and pre-release software",
    body: (
      <p>
        Parts of {siteConfig.name} may occasionally be built or tested against pre-release
        (beta) versions of macOS or its developer tools ahead of their public release. While we
        test each release before shipping it, pre-release operating systems can behave
        unpredictably; we are not responsible for issues caused by running {siteConfig.name} on
        beta or unsupported operating system versions.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        {siteConfig.name}, its name, logo, and all associated software, design, and content are
        owned by us and protected by applicable intellectual property laws. Nothing in these
        Terms transfers any ownership of that intellectual property to you beyond the limited
        license described above.
      </p>
    ),
  },
  {
    id: "warranty",
    title: "Disclaimer of warranties",
    body: (
      <p>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
        warranties of any kind, whether express, implied, or statutory, including implied
        warranties of merchantability, fitness for a particular purpose, or non-infringement. We
        do not warrant that the Service will be uninterrupted, error-free, or compatible with
        every macOS version or third-party application.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the fullest extent permitted by law, we will not be liable for any indirect,
        incidental, special, consequential, or punitive damages, or any loss of data, profits, or
        goodwill, arising from your use of or inability to use the Service. Our total aggregate
        liability for any claim arising out of or relating to these Terms or the Service will not
        exceed the amount you paid us for your license in the twelve months preceding the claim.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    body: (
      <p>
        We may suspend or terminate your license if you materially breach these Terms, including
        by sharing or reselling your license key or attempting to circumvent license activation.
        You may stop using the Service and uninstall the app at any time. Sections of these Terms
        that by their nature should survive termination — including intellectual property,
        disclaimers, and limitation of liability — will survive.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the Kingdom of Cambodia, without regard to its
        conflict-of-law principles. Any dispute arising from these Terms or the Service will be
        subject to the exclusive jurisdiction of the competent courts of Cambodia, unless
        applicable mandatory consumer-protection law in your country of residence provides
        otherwise.
      </p>
    ),
  },
  {
    id: "changes-to-terms",
    title: "Changes to these Terms",
    body: (
      <p>
        We may update these Terms from time to time. If we make material changes, we&rsquo;ll
        update the effective date at the top of this page. Continuing to use the Service after
        changes take effect means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <p>
        Questions about these Terms can be sent to{" "}
        <a href={`mailto:${siteConfig.links.supportEmail}`} className="underline">
          {siteConfig.links.supportEmail}
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      effectiveDate="August 19, 2026"
      intro={
        <>
          The rules that apply when you use {siteConfig.name} and purchase a license, written in
          plain language wherever we could manage it.
        </>
      }
      sections={sections}
    />
  );
}
