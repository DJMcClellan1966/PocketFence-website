#  PRODUCTION LAUNCH CHECKLIST

**Status: IN DEVELOPMENT - NOT READY FOR PRODUCTION**

Complete all items in this checklist before launching PocketFence to production.

---

##  Pre-Launch Checklist

###  **Website Updates (PocketFence-website repo)**

- [ ] **Remove "Coming Soon" Banner**
  - File: `index.html` - Remove `.coming-soon-banner` div
  - File: `early-access.html` - Archive or remove entirely

- [ ] **Enable Real Downloads**
  - Create proper release packages (.zip, .tar.gz, installers)
  - Replace `download.html` redirect with actual download page
  - Restore `download-old.html`  `download.html`
  - Add direct download links to GitHub releases

- [ ] **Update Call-to-Actions**
  - Change "Join Waitlist" buttons to "Download Now" or "Get Started"
  - Update hero button: `early-access.html`  `download.html` or GitHub releases
  - Enable "Try Dashboard" button to point to live demo

- [ ] **Pricing Page**
  - Remove "Launching Soon" badge from Cloud tier
  - Activate Stripe payment integration
  - Add real "Sign Up" links (not waitlist)
  - Update enterprise contact email

###  **Payment Integration**

- [ ] **Stripe Setup**
  - Create Stripe production account
  - Add production publishable key to `script.js`
  - Set up webhook endpoint: `/api/webhooks/stripe`
  - Test subscription creation flow
  - Configure pricing plans in Stripe Dashboard

- [ ] **Backend API**
  - Deploy subscription management API
  - Set up user authentication
  - Configure webhook handling
  - Test payment flow end-to-end

###  **Domain & Hosting**

- [ ] **Website Deployment**
  - Deploy to production hosting (Netlify/Vercel/etc.)
  - Configure custom domain: pocketfence.net
  - Enable HTTPS/SSL certificate
  - Set up CDN for static assets

- [ ] **Dashboard Deployment**
  - Deploy PocketFence dashboard to production server
  - Configure pocketfence.net:5000 or subdomain
  - Set up SSL certificate for dashboard
  - Configure OAuth redirect URLs with production domain

###  **Security & Privacy**

- [ ] **Apple OAuth Production**
  - Update Apple Developer Console with production URLs
  - Ensure `pocketfence.net/OAuth/AppleCallback` is registered
  - Test Sign in with Apple flow on production domain
  - Verify private key (`.p8`) is secure and backed up

- [ ] **Remove Test Credentials**
  - Remove all test/placeholder API keys
  - Set production environment variables
  - Update appsettings.json with production config
  - Audit code for exposed secrets

- [ ] **GDPR/Privacy Compliance**
  - Review privacy.html - ensure accurate for production
  - Add cookie consent banner if needed
  - Set up user data deletion workflow
  - Document data retention policies

###  **Email & Notifications**

- [ ] **Email Service**
  - Configure production SMTP server
  - Test email delivery
  - Set up email templates
  - Configure "from" addresses

- [ ] **Waitlist Contact**
  - Export waitlist signups from early-access form
  - Send launch announcement to waitlist
  - Offer promised 20% discount code

###  **Analytics & Monitoring**

- [ ] **Add Analytics**
  - Set up Google Analytics or alternative
  - Add conversion tracking for sign-ups
  - Monitor error rates
  - Set up uptime monitoring

- [ ] **Error Tracking**
  - Add Sentry or similar error tracking
  - Set up logging infrastructure
  - Configure alerts for critical errors

###  **Testing**

- [ ] **End-to-End Testing**
  - Test complete user journey (signup  install  use)
  - Test payment flow with real card (then refund)
  - Test on multiple browsers/devices
  - Verify mobile responsiveness

- [ ] **Performance Testing**
  - Test page load speeds
  - Optimize images
  - Enable gzip compression
  - Test under load

###  **Content & Documentation**

- [ ] **Update Documentation**
  - Ensure README.md is accurate
  - Update setup guides with production URLs
  - Create troubleshooting guide
  - Write release notes

- [ ] **Support Channels**
  - Set up support@pocketfence.net email
  - Create FAQ page
  - Set up GitHub Discussions
  - Prepare support documentation

###  **Launch Day**

- [ ] **Create GitHub Release**
  - Tag version v1.0.0
  - Upload release binaries
  - Write comprehensive release notes
  - Announce on GitHub

- [ ] **Send Launch Emails**
  - Email waitlist subscribers
  - Announce on social media
  - Post on relevant forums/communities
  - Update website live

- [ ] **Monitor Launch**
  - Watch error logs
  - Monitor server resources
  - Check payment processing
  - Respond to support requests

---

##  Quick Switch Commands

### Remove Coming Soon Banner
```bash
# index.html - Remove this section:
<div class='coming-soon-banner'> PocketFence is in active development...

### Enable Downloads
```bash
mv download-old.html download.html
# Update links in index.html from early-access.html  download.html
```

### Activate Payments
```javascript
// script.js - Update Stripe key
const stripe = Stripe('pk_live_YOUR_PRODUCTION_KEY');
```

---

##  Support

Before launching, ensure these are set up:
-  support@pocketfence.net (monitored inbox)
-  enterprise@pocketfence.net (sales inquiries)
-  GitHub Issues enabled
-  Response SLA defined

---

**Last Updated:** January 5, 2026
**Status:** BETA - Complete checklist before production launch
