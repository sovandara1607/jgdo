import { Resend } from "resend";

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

export async function sendLicenseEmail(params: SendLicenseEmailParams): Promise<void> {
  const client = getClient();
  const planName = params.plan === "pro-plus" ? "Pro+" : "Pro";

  const { error } = await client.emails.send({
    from: "JgDo <onboarding@resend.dev>",
    to: params.to,
    subject: `Your JgDo ${planName} License Key`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <h1 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px;">
          Welcome to JgDo ${planName}!
        </h1>
        <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin-bottom: 24px;">
          Thanks for upgrading! Here's your license key:
        </p>
        <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <code style="font-size: 14px; color: #1a1a1a; word-break: break-all;">
            ${params.licenseKey}
          </code>
        </div>
        <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin-bottom: 24px;">
          To activate:
        </p>
        <ol style="font-size: 16px; color: #4a4a4a; line-height: 1.8; padding-left: 24px; margin-bottom: 24px;">
          <li>Open JgDo and click the menu bar icon</li>
          <li>Select "Enter License Key"</li>
          <li>Paste your license key above</li>
        </ol>
        <p style="font-size: 14px; color: #8a8a8a; margin-top: 32px;">
          Keep this email for your records. If you have any issues, contact us at
          <a href="mailto:hello@jgdo.app" style="color: #4a4a4a;">hello@jgdo.app</a>.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("[email] failed to send license:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  console.log(`[email] license sent to ${params.to}`);
}
