export default {
  name: 'UtilityPilot', origin: 'https://utilitypilot.online',
  operator: process.env.SITE_OPERATOR || '',
  contactEmail: process.env.CONTACT_EMAIL || '',
  hostName: process.env.HOST_NAME || '',
  hostPrivacyUrl: process.env.HOST_PRIVACY_URL || '',
  logRetention: process.env.LOG_RETENTION || '',
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
  releaseDate: '2026-09-25'
};
