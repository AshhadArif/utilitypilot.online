export default {
  name: 'UtilityPilot', origin: 'https://utilitypilot.online',
  operator: process.env.SITE_OPERATOR || 'Fahad (UtilityPilot / Bazmino)',
  contactEmail: process.env.CONTACT_EMAIL || 'bazminoadsense@gmail.com',
  hostName: process.env.HOST_NAME || 'Hostinger',
  hostPrivacyUrl: process.env.HOST_PRIVACY_URL || 'https://www.hostinger.com/legal/privacy-policy',
  logRetention: process.env.LOG_RETENTION || '30 days',
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || '',
  releaseDate: '2026-09-25'
};
