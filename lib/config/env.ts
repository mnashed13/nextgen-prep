/**
 * Environment & Application Configuration
 * Provides strongly-typed, runtime-safe configuration with production fallbacks.
 */

export const env = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "NextGen Clinical Simulator",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "https://nextgen-prep.vercel.app",
  DEFAULT_TIME_MINUTES: Number(process.env.NEXT_PUBLIC_DEFAULT_TIME_MINUTES || 45),
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  // Australian Entity Information
  AU_ENTITY: {
    COMPANY_NAME: "NextGen Clinical Prep Pty Ltd",
    ACN: "XXX XXX XXX",
    ABN: "XX XXX XXX XXX",
    SUPPORT_EMAIL: "support@nextgen-prep.com.au",
    PRIVACY_EMAIL: "privacy@nextgen-prep.com.au",
    LEGAL_EMAIL: "legal@nextgen-prep.com.au",
    REGISTERED_OFFICE: "Level 14, 100 Mount Street, North Sydney NSW 2060, Australia",
    DEFAULT_CURRENCY: "AUD",
    GST_RATE: 0.1, // 10% Australian Goods and Services Tax
  },
} as const;
