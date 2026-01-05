# PocketFence Website

Marketing website for PocketFence - Privacy-first parental control with local AI.

##  Current Status: PRE-LAUNCH / BETA

The website is live in "coming soon" mode with waitlist signup. **Not ready for production use.**

---

##  What's Implemented

###  Live Features
- **Coming Soon Banner** - Orange banner across all pages
- **Early Access Waitlist** - Email signup at `/early-access.html`
- **Freemium Pricing** - 3 tiers: Free Self-Hosted, Cloud ($12.99/mo), Enterprise
- **Informational Content** - Features, about, legal pages
- **Mobile Responsive** - Works on all devices
- **Emoji Font Support** - Proper rendering across browsers

###  Pages
- `index.html` - Homepage with features and pricing
- `early-access.html` - Waitlist signup form ( Currently logs to console only)
- `download.html` - Redirects to early-access
- `privacy.html` - Privacy policy with self-hosted guarantees
- `terms.html` - Terms of service for open source project
- `OAuth/AppleCallback.html` - Apple OAuth redirect handler

---

##  Before Production Launch

**Complete ALL items in `PRODUCTION_CHECKLIST.md`**

### Quick Summary:

1. **Waitlist Integration** - Currently emails go nowhere!
   ```javascript
   // In early-access.html, add real backend:
   // Option 1: FormSpree (free tier)
   // Option 2: EmailJS
   // Option 3: Your own API endpoint
   ```

2. **Remove Coming Soon Banner**
   - Delete the banner div from `index.html`
   - Remove orange alert styling

3. **Enable Real Downloads**
   - Restore `download-old.html`  `download.html`
   - Add links to GitHub releases
   - Create proper installers/packages

4. **Activate Payments**
   - Set up Stripe production account
   - Add webhook endpoint
   - Enable subscription signups

5. **Email Waitlist Subscribers**
   - Export signups (currently in browser console)
   - Send launch announcement
   - Provide promised 20% discount

---

##  Waitlist Form Integration Options

### Option 1: FormSpree (Easiest)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" required>
  <button type="submit">Join Waitlist</button>
</form>
```

### Option 2: EmailJS (Free, No Backend)
```javascript
emailjs.send("service_id", "template_id", {
  name: formData.name,
  email: formData.email,
  interest: formData.interest
});
```

### Option 3: Custom Backend
```javascript
fetch('https://your-api.com/waitlist', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(formData)
});
```

---

##  Pricing Strategy

### Free Self-Hosted
- **Price:** $0/forever
- **Target:** Technical users, privacy advocates
- **Benefits:** Builds community, establishes trust

### Cloud Managed ($12.99/month)
- **Price:** $12.99/month (20% off first year for early adopters = $10.39/mo)
- **Target:** Non-technical families who want convenience
- **Benefits:** Recurring revenue, support included

### Enterprise (Custom)
- **Target:** Schools, libraries, youth organizations
- **Benefits:** High-value contracts, B2B relationships

---

##  Launch Day Checklist

- [ ] Complete `PRODUCTION_CHECKLIST.md`
- [ ] Test all forms end-to-end
- [ ] Verify Stripe integration works
- [ ] Remove coming soon banner
- [ ] Enable real download links
- [ ] Send email to waitlist (export from console logs or backend)
- [ ] Announce on social media
- [ ] Monitor errors/analytics

---

##  File Structure

```
PocketFence-website/
 index.html              # Homepage (HAS BANNER)
 early-access.html       # Waitlist signup ( Console only)
 download.html           # Redirects to early-access
 download-old.html       # Original download page (restore later)
 privacy.html            # Privacy policy
 terms.html              # Terms of service
 styles.css              # All styling + emoji fonts
 script.js               # Interactive functionality
 PRODUCTION_CHECKLIST.md # Complete before launch
 OAuth/
     AppleCallback.html  # Apple OAuth handler
```

---

##  Deployment

### Current: Development Mode
- GitHub Pages: `https://djmcclellan1966.github.io/PocketFence-website/`
- Shows coming soon banner
- Waitlist logs to console

### Production: After Launch
1. Remove banner
2. Enable downloads
3. Activate payments
4. Deploy to: `https://pocketfence.net`

---

##  Support

- **Before Launch:** Check console logs for waitlist signups
- **After Launch:** support@pocketfence.net
- **Enterprise:** enterprise@pocketfence.net

---

**Last Updated:** January 5, 2026
**Status:** BETA - Not production ready
