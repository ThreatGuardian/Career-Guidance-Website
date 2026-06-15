# Email Setup — EmailJS Integration

Emails are sent directly from the frontend using **EmailJS** (no backend required).

## Two Templates Are Used

| Purpose | Template ID | Env Variable |
|---|---|---|
| Registration confirmation (offline aptitude / counselling) | `template_3t7oi1o` | `VITE_EMAILJS_TEMPLATE_ID_REGISTRATION` |
| AI Career Assessment report delivery | `template_cyx10oq` | `VITE_EMAILJS_TEMPLATE_ID_REPORT` |

---

## Template Variables Reference

### Template 1 — Registration Confirmation (`template_3t7oi1o`)
Used in `BookingWizard.tsx` when a student registers for the offline session.

| Variable | Description |
|---|---|
| `{{to_name}}` | Student's full name |
| `{{to_email}}` | Student's email address |
| `{{service_type}}` | `"Aptitude Test"` or `"Career Counselling"` |
| `{{registration_date}}` | Date of registration |
| `{{message}}` | Auto-generated confirmation message |

### Template 2 — AI Report (`template_cyx10oq`)
Used in `ResultsScreen.tsx` when the student clicks **"Email me this report"**.

| Variable | Description |
|---|---|
| `{{to_name}}` | Student's full name |
| `{{to_email}}` | Student's email address |
| `{{profile_summary}}` | AI-generated conclusion paragraph |
| `{{strengths}}` | Comma-separated list of key strengths |
| `{{growth_areas}}` | Comma-separated areas for development |
| `{{learning_style}}` | Detected learning style description |
| `{{work_style}}` | Academic recommendations (joined) |
| `{{career_recommendations}}` | Career fit narrative |
| `{{top_careers}}` | Top 5 careers with match % (newline-separated) |

---

## Configuration (Already Done)

The credentials are already configured. The fallback values are hardcoded in `services/email.ts` for reliability:

```
Service ID:                  service_g8zyevq
Registration Template ID:    template_3t7oi1o
Report Template ID:          template_cyx10oq
Public Key:                  9xz2Cudlad-sH32df
```

They are also present in `.env.local`:

```env
VITE_EMAILJS_SERVICE_ID=service_g8zyevq
VITE_EMAILJS_TEMPLATE_ID_REGISTRATION=template_3t7oi1o
VITE_EMAILJS_TEMPLATE_ID_REPORT=template_cyx10oq
VITE_EMAILJS_PUBLIC_KEY=9xz2Cudlad-sH32df
```

---

## Testing

1. **Registration email** — Go to **Book a Session**, fill the form, and submit. A confirmation email should arrive at the provided address.
2. **Report email** — Complete the AI Career Assessment, click **Generate AI Report**, then click **Email me this report**.
