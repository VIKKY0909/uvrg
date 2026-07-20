# UVR ONE — Scope, Quotation & Agreement
## Solar ERP Platform | UVR Techsol Pvt. Ltd.

**Prepared for:** Rahul J. Patel, UVR Techsol Pvt. Ltd.  
**Prepared by:** [Your Name / Company Name]  
**Date:** June 27, 2026  
**Project:** UVR ONE — Solar Business Management Platform  
**Version:** 1.1  
**Valid until:** August 27, 2026

---

# PART A — SCOPE OF WORK

## A1. Project summary

Development of **UVR ONE** — a single mobile application with role-based access, a web admin dashboard, and a **custom company website** — to manage UVR’s solar business from **lead to service and AMC**.

| Item | Detail |
|------|--------|
| Project type | Custom Solar ERP + company website |
| Deliverables | Flutter mobile app + web admin + backend API + **UVR company website** |
| Timeline | **6 months** from date of upfront payment |
| Total development fee | **₹5,00,000** (see Part B) |
| AI features | **Not included** (per client request) |
| Third-party / cloud costs | Paid directly by UVR (see A7 — aligned with technical proposal estimates) |

---

## A2. Platforms & technology

| Layer | Technology | Purpose |
|-------|------------|---------|
| Mobile app | Flutter (Android + iOS) | All 8 user roles |
| Admin dashboard | Web — responsive (React / Next.js) | Management & operations |
| Company website | Web — responsive | Public UVR Techsol presence + lead capture |
| Backend API | Node.js + PostgreSQL | Business logic & data |
| File storage | AWS S3 | Documents, photos, PDFs |
| Cloud hosting | AWS (ap-south-1 Mumbai) | Application & database |
| Notifications | Firebase push, SMS, email | Alerts & OTP |

---

## A3. User roles (8 roles — single mobile app)

| # | Role | Access summary |
|---|------|----------------|
| 1 | **Customer** | Plant dashboard, generation view, savings/ROI, subsidy & loan status, documents, complaints, cleaning/health reminders, AMC renewal, referral |
| 2 | **Channel Partner** | Leads, quotations, documents, territory targets, commission, marketing downloads, training videos, announcements, project status |
| 3 | **Sales Employee** | Attendance, visit plan, leads, follow-ups, quotations, calculators, order booking, targets, incentives, leaderboard, daily report |
| 4 | **Survey Engineer** | Assigned sites (map), survey forms, photos, structure details, survey PDF |
| 5 | **Installer** | Installation & commissioning checklists, material checklist, photos, signatures, status updates |
| 6 | **Service Engineer** | Complaints, AMC & health-check calendar, QR scan, service/cleaning/health reports, spare parts request |
| 7 | **Warehouse** | Stock, inward/dispatch, barcode/QR scan, serial numbers, PO, vendor records, returns, alerts |
| 8 | **Admin / Management** | Full web dashboard, user/role management, reports, exports, announcement CMS |

---

## A4. Modules & features included

### A4.1 Company website (included)

| Page / feature | Detail |
|----------------|--------|
| Home | UVR branding, services overview, call-to-action |
| About UVR | Company profile (content provided by UVR) |
| Services / Solutions | Solar services overview |
| Contact | Address, phone, email, map embed |
| Lead enquiry form | Form submissions linked to admin / lead module |
| Mobile responsive | Works on phone and desktop |
| Deployment | Live on UVR domain with SSL |

*Website content (text, images) provided by UVR within 14 days of project start.*

---

### Phase 1 — Core (Month 1–2)

| Module | Features (validated vs technical scope) |
|--------|----------------------------------------|
| **Authentication** | Customer mobile OTP (10-digit); partner/staff login; secure JWT sessions |
| **User & role management** | Admin creates users, assigns roles, manages access |
| **Role-based access (RBAC)** | 8 roles; permission-based menus on mobile + web |
| **Lead management** | CRUD, assignment, pipeline (New → Contacted → Survey → Won/Lost), follow-up notes |
| **Customer management** | Profile linked to lead/project; plant details (capacity, install date, inverter) |
| **Channel partner** | Lead CRUD, project status, announcements, document upload, territory targets vs achievement, marketing asset download |
| **Sales employee** | Lead management, daily visit plan, follow-up reminders, visit log, click-to-call, WhatsApp share link, order booking, end-of-day report |
| **Quotation** | Template-based PDF quotation; share via WhatsApp link |
| **Calculators** | EMI, subsidy, bill savings / ROI estimate |
| **Project tracking** | Full journey: Lead → Survey → Quotation → Loan → Subsidy → Payment → Installation → Commissioning → Service → AMC → Referral |
| **Loan & subsidy (UI)** | Manual status tracking for loan/EMI and PM Surya Ghar subsidy stages |
| **Documents** | Upload/view — Aadhaar, bills, agreements, warranty, insurance |
| **Service complaints** | Customer raises ticket; admin assigns; priority & status timeline |
| **Customer dashboard** | Plant info, project progress, savings view, document vault |
| **Admin dashboard** | KPIs: leads, sales, installed kW, revenue indicators; pending queues (quotations, payments, subsidy, loan, installation, complaints); employee & partner performance tables |
| **Notifications** | SMS OTP, email alerts, Firebase push |
| **Company website** | As per A4.1 — live by end of Phase 1 |
| **App publishing** | Google Play Store + Apple App Store submission support |

---

### Phase 2 — Operations (Month 3–4)

| Module | Features (validated vs technical scope) |
|--------|----------------------------------------|
| **Survey engineer** | Assigned sites (map view), roof/shadow photos, shadow-free area, structure requirement, load assessment, electricity bill upload, auto survey PDF |
| **Installation** | Installation checklist, material checklist, before/after photos |
| **Commissioning** | Commissioning checklist, customer digital signature |
| **Service engineer** | Assigned complaints (SLA), AMC calendar, quarterly health-check schedule, QR scan → plant record, health check form, cleaning report, spare parts request, before/after photos, customer signature, digital service report PDF |
| **GPS attendance** | Sales check-in/out with GPS location (geo-fence optional) |
| **Inventory & warehouse** | SKU master, inward GRN, outward site dispatch, barcode/QR scan, panel/inverter serial registry, site-wise ledger, returns, PO entry, vendor master, low-stock alerts |
| **Commission** | Partner & sales commission payable/paid statements |
| **AMC** | AMC contract management, renewal reminders (push/email) |
| **Customer (extended)** | Cleaning schedule view, health-check reminders, AMC renewal request, referral code & reward ledger |
| **Payments** | Razorpay / PayU gateway integration (UVR merchant account) |
| **Reports & export** | Excel & PDF export; state/district-wise breakdown; revenue & profitability view (configurable cost vs sale) |
| **Map** | India map with project pins by status (Google Maps) |
| **Offline support** | Photo upload retry queue for field roles (survey/install/service) |
| **Partner training** | Training video list & download (files/URLs from UVR) |

---

### Phase 3 — Monitoring & handover (Month 5–6)

| Module | Features (validated vs technical scope) |
|--------|----------------------------------------|
| **Inverter monitoring** | **One (1) inverter brand** integration (brand confirmed by UVR — e.g. Solis / Growatt); live generation on customer & admin screens |
| **Generation history** | Daily, monthly, lifetime views |
| **Manual generation fallback** | Admin manual entry / CSV import until API is connected |
| **DISCOM / subsidy workflow** | Internal DISCOM process tracking with document checkpoints (no government API) |
| **WhatsApp** | Quotation & status share via WhatsApp link; WhatsApp Business API setup support if UVR completes Meta business verification |
| **Multi-language UI** | Hindi & Gujarati labels on mobile app (where feasible within timeline) |
| **Inventory snapshot** | Admin inventory summary widget |
| **Handover** | Source code, deployment guide, admin user guide, training session (online, 2 hours) |

---

## A5. Explicitly NOT included

| Item | Note |
|------|------|
| **All AI features** | No chatbot, AI quotation, AI proposal, OCR, voice, or AI assistants |
| Power BI or external analytics platforms | Built-in dashboard reports only |
| Tally / SAP / third-party ERP integration | Separate quote |
| Hardware | Barcode scanners, tablets, etc. |
| Content writing & photography | UVR provides website text, images, templates, videos, tariff data |
| Second inverter brand | Add-on: **₹75,000 per brand** |
| Bank / lender loan API integration | Manual loan status workflow only |
| Post-warranty support | **Maintenance Package** (Part D) |

---

## A6. Client responsibilities (UVR)

UVR shall provide within **14 days** of project start:

1. Company logo, brand colours, and website content (text + images)  
2. Quotation PDF/Word template  
3. State-wise tariff and subsidy rules  
4. Survey, installation, and service checklist SOPs  
5. Sample customer document list  
6. Commission structure (partner & sales)  
7. Primary inverter brand + OEM cloud account  
8. Domain name for website and app  
9. Apple Developer & Google Play Developer accounts (UVR company name)  
10. Registration of AWS, SMS, payment, and other third-party accounts  
11. Feedback on milestone demos within **5 business days**

**Client delays extend the timeline day-for-day.**

---

## A7. Third-party & cloud costs (paid by UVR directly)

**Not included in ₹5,00,000 development fee.**

Estimates below are **aligned with the UVR ONE Technical Proposal** (Section 13 & 14) for a production system with **500–2,000 active users**. Costs scale with usage and team size.

### A7.1 AWS cloud hosting (monthly)

*Region: ap-south-1 (Mumbai)*

| Service | Specification | Monthly (INR) |
|---------|---------------|---------------|
| AWS EC2 / Fargate | 2× API instances (2 vCPU, 4GB) | ₹8,000 – ₹15,000 |
| AWS RDS PostgreSQL | db.t3.medium, 100GB SSD | ₹10,000 – ₹18,000 |
| AWS S3 + CloudFront | Document/photo storage + CDN | ₹2,000 – ₹5,000 |
| AWS ElastiCache Redis | cache.t3.micro (queues, OTP cache) | ₹2,500 – ₹4,000 |
| AWS ALB + WAF | Load balancer + basic security | ₹3,000 – ₹6,000 |
| Backups & monitoring | RDS snapshots, CloudWatch | ₹2,000 – ₹4,000 |
| Domain + SSL | Route 53 + certificate | ₹500 – ₹1,000 |
| **Total AWS (production estimate)** | | **₹28,000 – ₹53,000 / month** |

| Phase | Typical monthly AWS |
|-------|---------------------|
| Month 1–2 (development & staging only) | ₹8,000 – ₹15,000 |
| Month 3–4 (field teams + inventory go-live) | ₹18,000 – ₹30,000 |
| Month 5–6+ (full production, all roles) | **₹28,000 – ₹53,000** |

**Year 1 AWS budget (recommended):** **₹4,00,000 – ₹6,50,000**

*At larger scale (5,000+ users): ₹80,000 – ₹1,50,000/month.*

---

### A7.2 API & integration costs (monthly)

*AI-related APIs excluded (not in scope).*

| Service | Low usage | Medium usage | High usage |
|---------|-----------|--------------|------------|
| SMS OTP (MSG91 / similar) | ₹1,500 | ₹4,000 | ₹10,000 |
| Email (AWS SES / SendGrid) | ₹500 | ₹1,500 | ₹5,000 |
| Firebase push notifications | Free | Free | ₹1,000 |
| Google Maps Platform | ₹2,000 | ₹5,000 | ₹15,000 |
| WhatsApp Business API | ₹2,000 | ₹6,000 | ₹20,000 |
| Payment gateway (Razorpay / PayU) | Per transaction (~2%) | Per transaction | Per transaction |
| **Total integrations (excl. payment %)** | **₹6,000 – ₹9,000** | **₹16,500 – ₹21,500** | **₹51,000+** |

**Combined AWS + integrations (medium usage, production):** approximately **₹45,000 – ₹75,000 / month**

**Year 1 total third-party budget (AWS + APIs, recommended planning figure):** **₹5,00,000 – ₹9,00,000**

*Actual cost depends on number of users, SMS volume, map usage, and payment transaction volume.*

---

### A7.3 One-time & annual fixed costs

| Item | Cost |
|------|------|
| Apple Developer Program | ~₹8,300 / year |
| Google Play Console | ~₹2,100 one-time |
| Domain registration | ~₹500 – ₹1,500 / year |
| Inverter OEM cloud API | Usually free with installer account |

---

# PART B — QUOTATION

## B1. Development fee

| Description | Amount (INR) |
|-------------|--------------|
| UVR ONE — Full scope (6 months, Part A) | ₹5,00,000 |
| **Total project fee** | **₹5,00,000** |

*All amounts in Indian Rupees. Third-party and cloud costs billed separately by providers to UVR (Part A7).*

---

## B2. Payment schedule (milestones)

**Agreed: 30% upfront before work begins.**

| # | Milestone | % | Amount (₹) | Trigger |
|---|-----------|---|------------|---------|
| **1** | **Upfront — project kickoff** | **30%** | **₹1,50,000** | **Before development starts** (within 7 days of signing) |
| **2** | Phase 1 complete | 30% | ₹1,50,000 | End of **Month 2** — website live, auth, 8 roles, leads, sales, partner, quotation, projects, complaints, customer module, admin dashboard on staging |
| **3** | Phase 2 complete | 25% | ₹1,25,000 | End of **Month 4** — survey, install, service, inventory, commission, AMC, GPS, payments, reports, map on staging |
| **4** | Final go-live & handover | 15% | ₹75,000 | End of **Month 6** — inverter monitoring, referral, app stores live, source code & docs transferred |
| | **TOTAL** | **100%** | **₹5,00,000** | |

### Payment terms

- Payment via bank transfer / UPI  
- Work **pauses** if any milestone payment is delayed **7+ days**  
- Source code transfers after **Milestone 4** payment  
- Receipt provided for each payment  

### Timeline

```
Month 1-2  → Phase 1 (+ website)  →  ₹1,50,000 (Milestone 2)
Month 3-4  → Phase 2               →  ₹1,25,000 (Milestone 3)
Month 5-6  → Phase 3               →  ₹75,000  (Milestone 4)
```

---

## B3. Optional add-ons

| Add-on | Price |
|--------|-------|
| Additional inverter brand | ₹75,000 per brand |
| Tally / accounting integration | Quote on request |
| Extra custom report | ₹15,000 – ₹25,000 each |
| Scope change after sign-off | ₹1,500 per hour |
| On-site training (travel extra) | ₹10,000 per session |

---

# PART C — DEVELOPMENT AGREEMENT

**Effective Date:** _______________

**CLIENT:** Rahul J. Patel, UVR Techsol Pvt. Ltd.  
Address: _______________________________________________  
Phone: _______________________________________________  
Email: _______________________________________________  

**DEVELOPER:** _______________________________________________  
Address: _______________________________________________  
Phone: _______________________________________________  
Email: _______________________________________________  
PAN: _______________________________________________  

---

## C1. Scope

Developer shall deliver **UVR ONE** as defined in **Part A**, including mobile app, admin dashboard, backend, and **custom company website**. **AI features are excluded.**

---

## C2. Fee and payment

2.1 Total fee: **₹5,00,000** (Rupees Five Lakhs Only).

2.2 Payments per **Part B, Section B2**.

2.3 **₹1,50,000 upfront required before work begins.**

2.4 Late payment beyond 7 days: Developer may suspend work; timeline extends accordingly.

---

## C3. Timeline

6 months from upfront payment receipt, subject to Client providing materials (Part A6) and third-party accounts (Part A7) on time.

---

## C4. Client obligations

4.1 Client pays all third-party and cloud costs (Part A7) directly to providers.

4.2 Client provides content and approvals on schedule.

4.3 Client designates one approval contact.

---

## C5. Change requests

Features not in Part A = Change Request at **₹1,500/hour** or fixed quote, written approval required.

---

## C6. Intellectual property

Full custom source code ownership transfers to Client after **full ₹5,00,000 payment**. Portfolio use only with Client written permission.

---

## C7. Warranty

**30 days** bug-fix warranty from final go-live. Excludes third-party outages, new features, and Client-side modifications.

---

## C8. Maintenance

After warranty, support requires **Maintenance Package (Part D)** or hourly rate **₹1,500/hour** (4-hour minimum).

---

## C9 – C12. Confidentiality, liability, termination, governing law

- Confidentiality applies to both parties.  
- Developer liability capped at **₹5,00,000** total fees paid.  
- Termination: Client pays for work completed; Developer may terminate if payment overdue **14+ days**.  
- Governed by laws of **India**; courts at _______________, Gujarat.

---

## C13. Signatures

**CLIENT — UVR Techsol Pvt. Ltd.**

Signature: _________________________  
Name: Rahul J. Patel  
Date: _________________________

**DEVELOPER**

Signature: _________________________  
Name: _________________________  
Date: _________________________

---

# PART D — MAINTENANCE PACKAGES (Post go-live)

*Client selects a plan at or before Month 6 go-live.*

## D1. Why maintenance is needed

UVR ONE requires ongoing server updates, mobile OS compatibility, bug fixes, and API provider changes. **Maintenance is separate from the ₹5,00,000 development fee.**

## D2. Packages

| | **Basic** | **Standard** *(Recommended)* | **Premium** |
|---|:---:|:---:|:---:|
| **Annual fee** | **₹36,000/yr** | **₹60,000/yr** | **₹96,000/yr** |
| **Monthly** | ₹3,000 | ₹5,000 | ₹8,000 |
| Bug fixes & security patches | ✅ | ✅ | ✅ |
| Server monitoring alerts | ✅ | ✅ | ✅ |
| Email support (2 business days) | ✅ | ✅ | — |
| WhatsApp support (1 business day) | — | ✅ | ✅ |
| Phone support | — | — | ✅ |
| App store compliance updates | ✅ | ✅ | ✅ |
| Minor enhancements | — | 20 hrs/year | 50 hrs/year |
| Priority response | — | 24 hours | 8 hours |
| Monthly health check call | — | — | ✅ |
| Database backup check | — | ✅ | ✅ |
| **Website content updates** | — | 4 updates/year | 12 updates/year |

*Maintenance covers application support only. AWS, SMS, and other third-party bills remain Client's responsibility (Part A7).*

## D3. Billing

| Plan | Payment |
|------|---------|
| Basic | ₹36,000/year in advance, or ₹3,000/month |
| Standard | ₹60,000/year in advance, or ₹5,500/month |
| Premium | ₹96,000/year in advance |

**Launch offer:** First month **free** on Standard or Premium if signed at go-live.

## D4. Client selection

| ☐ Basic — ₹36,000/year | ☐ Standard — ₹60,000/year *(Recommended)* |
| ☐ Premium — ₹96,000/year | ☐ No plan — hourly at ₹1,500/hr |

Signature: _________________________ Date: _________

---

# PART E — ACCEPTANCE CHECKLIST

- [ ] Scope Part A agreed (**includes company website**; **no AI**)  
- [ ] Total **₹5,00,000** agreed  
- [ ] **30% upfront ₹1,50,000** before start  
- [ ] Milestone payments Part B agreed  
- [ ] Third-party costs Part A7 understood (**₹28k–53k/mo AWS at production scale**)  
- [ ] Maintenance Part D reviewed  
- [ ] 30-day warranty understood  

---

# PART F — TECHNICAL SCOPE VALIDATION

*Cross-check: Part A vs UVR ONE Technical Proposal (AI items excluded per client request).*

| Technical proposal module | Covered in Part A | Phase |
|---------------------------|:-----------------:|-------|
| Customer — OTP, plant, docs, complaints | ✅ | 1–2 |
| Customer — savings, ROI, subsidy, loan status | ✅ | 1 |
| Customer — cleaning, health reminders, AMC renewal | ✅ | 2 |
| Customer — referral | ✅ | 2 |
| Customer — live generation | ✅ | 3 (1 inverter brand) |
| Channel partner — full module | ✅ | 1–2 |
| Sales — visits, follow-ups, booking, leaderboard | ✅ | 1–2 |
| Survey & install — full module | ✅ | 2 |
| Service — health check, cleaning, QR, spare parts | ✅ | 2 |
| Warehouse — full inventory module | ✅ | 2 |
| Admin — KPIs, performance, profitability, exports | ✅ | 1–2 |
| Admin — user/role management, announcement CMS | ✅ | 1 |
| Payment gateway | ✅ | 2 |
| India map, GPS attendance | ✅ | 2 |
| WhatsApp share / Business API support | ✅ | 2–3 |
| PM Surya Ghar / DISCOM workflow | ✅ | 1–3 |
| Multi-language (HI / GU) | ✅ | 3 |
| **Company website** | ✅ | 1 |
| **AI features (all)** | ❌ Excluded | — |

**Validated:** Part A covers the full non-AI technical proposal within ₹5,00,000 / 6 months.

---

**Document End**

*UVR ONE — Scope, Quotation & Agreement — v1.1 — June 2026*
