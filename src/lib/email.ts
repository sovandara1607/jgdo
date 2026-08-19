import { Resend } from "resend";
import { siteConfig } from "@/data/site";

function getClient(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing required env var: RESEND_API_KEY");
  return new Resend(key);
}

export interface SendLicenseEmailParams {
  to: string;
  plan: "pro" | "pro-plus";
  licenseKey: string;
}

/**
 * License delivery email. Styled to match the website's design system
 * exactly (src/app/globals.css, components/ui/button.tsx): flat black/white,
 * no accent color, no gradients, hairline borders instead of shadows, italic
 * for emphasis instead of color, solid black pill buttons. Email clients
 * don't load Tailwind, so every value here is a literal hex/px pulled from
 * those files rather than a class name — keep them in sync if the site
 * theme ever changes.
 */
export async function sendLicenseEmail(params: SendLicenseEmailParams): Promise<void> {
  const client = getClient();
  const planName = params.plan === "pro-plus" ? "Pro+" : "Pro";

  const { error } = await client.emails.send({
    // Sent from the domain verified in Resend. siteConfig.links.email /
    // supportEmail stay the human-facing contact addresses — this one
    // exists only to send transactional mail.
    from: "JgDo <license@jgdo.sovandara.lol>",
    to: params.to,
    subject: `Your JgDo ${planName} License Key`,
    html: `
<body style="margin: 0; padding: 40px 20px; background: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 20px; padding: 40px;">

    <div style="font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: #71717a; margin: 0 0 24px;">
      JgDo
    </div>

    <h1 style="font-size: 26px; font-weight: 700; letter-spacing: -0.02em; color: #0a0a0a; margin: 0 0 12px;">
      Welcome to <span style="font-style: italic; font-weight: 500;">JgDo</span> ${planName}
    </h1>
    <p style="font-size: 15px; color: #52525b; line-height: 1.6; margin: 0 0 28px;">
      Thanks for upgrading. Here's your license key — paste it into JgDo to activate.
    </p>

    <div style="background: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 14px; padding: 20px 24px; margin: 0 0 28px; text-align: center;">
      <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: #a1a1aa; margin: 0 0 8px;">
        License Key
      </div>
      <code style="font-family: 'SF Mono', ui-monospace, Menlo, Consolas, monospace; font-size: 17px; color: #0a0a0a; letter-spacing: 0.03em;">
        ${params.licenseKey}
      </code>
    </div>

    <div style="margin: 0 0 32px;">
      <div style="font-size: 13px; font-weight: 600; color: #0a0a0a; margin: 0 0 12px;">
        To activate
      </div>
      <ol style="margin: 0; padding-left: 20px; color: #3f3f46; font-size: 14px; line-height: 1.9;">
        <li>Open JgDo — the activation window appears automatically until a key is entered</li>
        <li>Paste your license key above</li>
        <li>Click Activate</li>
      </ol>
    </div>

    <a href="https://jgdo.sovandara.lol/download"
       style="display: inline-block; background: #0a0a0a; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; padding: 12px 24px; border-radius: 999px;">
      Download JgDo →
    </a>

    <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e4e4e7; font-size: 12.5px; color: #a1a1aa; line-height: 1.6;">
      Keep this email for your records. Questions? <a href="mailto:${siteConfig.links.supportEmail}" style="color: #52525b; text-decoration: underline;">${siteConfig.links.supportEmail}</a>
    </div>

  </div>
</body>
    `,
  });

  if (error) {
    console.error("[email] failed to send license:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  console.log(`[email] license sent to ${params.to}`);
}
