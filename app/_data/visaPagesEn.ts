import type { VisaPage } from "./visaPages";

export const visaPagesEn: Record<string, VisaPage> = {
  "spouse-visa": {
    slug: "spouse-visa",
    title: "Spouse Visa",
    eyebrow: "SPOUSE VISA",
    lead: "Support for spouses of Japanese nationals, permanent residents, and long-term residents who wish to live in Japan.",
    description:
      "We organize evidence of a genuine marriage, stable income, and living arrangements before filing your application.",
    metaTitle: "Spouse Visa Application Support | Gyoseishoshi Arch Office",
    metaDescription:
      "Nationwide support for spouse visa applications in Japan. Learn about requirements, documents, common refusal reasons, and fees.",
    keywords: ["spouse visa Japan", "marriage visa Japan", "Japanese spouse visa", "visa lawyer Japan"],
    overview: [
      "A spouse visa is for spouses of Japanese nationals, permanent residents, or long-term residents living in Japan.",
      "Immigration examines not only the legal marriage but also whether the relationship and household are genuine.",
      "We support certificate of eligibility, change of status, and renewal applications.",
    ],
    requirements: [
      "A legally valid marriage",
      "A genuine marital relationship and living arrangement",
      "Stable income and housing in Japan",
      "No serious problems with past immigration status or legal compliance",
    ],
    documents: [
      "Application form, photo, passport, and residence card",
      "Family register, marriage certificate, and residence certificate",
      "Tax certificates, employment certificate, salary slips, and bank records",
      "Questionnaire, relationship history, photos, and message records",
      "Housing documents and letter of guarantee",
    ],
    refusalReasons: [
      "Short relationship period or weak evidence of a genuine marriage",
      "Unstable income or unclear ability to support the household",
      "Inconsistent or insufficient documents",
      "Past overstays, immigration issues, or repeated short-term stays",
    ],
    support: [
      "Initial case review and application strategy",
      "Preparation of questionnaire, statement of reasons, and relationship history",
      "Document checklist and evidence organization",
      "Additional document response after filing",
    ],
    price: "From ¥88,000",
    priceAmount: 88000,
    priceNote: "Translation, complex reapplication, or additional family members may require a separate quote.",
    faqs: [
      {
        q: "Can we apply if our relationship period is short?",
        a: "Yes, depending on the case. The relationship history, communication records, and supporting evidence must be explained carefully.",
      },
      {
        q: "Is low income always a problem?",
        a: "Not always. Savings, family support, and future employment plans may also be considered.",
      },
      {
        q: "Can you help bring my spouse from overseas?",
        a: "Yes. We support Certificate of Eligibility applications and overseas document preparation.",
      },
    ],
  },
  "work-visa": {
    slug: "work-visa",
    title: "Work Visa",
    eyebrow: "WORK VISA",
    lead: "Support for foreign hiring, job changes, and work status applications in Japan.",
    description:
      "We review job duties, education, work history, and employment conditions to prepare a consistent application.",
    metaTitle: "Work Visa Application Support | Gyoseishoshi Arch Office",
    metaDescription:
      "Nationwide support for Japanese work visa applications, including hiring, job changes, requirements, documents, refusal risks, and fees.",
    keywords: ["work visa Japan", "Japan employment visa", "foreign hiring Japan", "visa application Japan"],
    overview: [
      "Work visa is a general term for statuses that allow paid work in Japan.",
      "The correct status depends on the job, such as Engineer/Specialist in Humanities/International Services, Skilled Labor, or Intra-company Transferee.",
      "The job description and employment contract should be reviewed before filing.",
    ],
    requirements: [
      "The job must fall within an eligible work status",
      "Education or work history must relate to the job duties",
      "Compensation must be equal to or higher than Japanese employees in similar roles",
      "The employer must have stable and continuous business operations",
    ],
    documents: [
      "Application form, photo, passport, and residence card",
      "Employment contract, reason for hiring, and job description",
      "Company registration, financial statements, and company profile",
      "Graduation certificate, transcript, and employment certificates",
      "Payroll and workplace-related documents",
    ],
    refusalReasons: [
      "Job duties are considered simple labor",
      "Weak relation between background and assigned duties",
      "Inappropriate salary or employment conditions",
      "Insufficient evidence of company stability or business substance",
    ],
    support: [
      "Status eligibility review",
      "Employment contract and job description review",
      "Preparation of hiring reason and job explanation documents",
      "Document collection support for both employer and applicant",
    ],
    price: "From ¥88,000",
    priceAmount: 88000,
    priceNote: "Fees vary depending on company category, application type, and additional explanation materials.",
    faqs: [
      {
        q: "Can we consult before making a job offer?",
        a: "Yes. We can review the planned job duties and candidate background before hiring.",
      },
      {
        q: "Do I need a procedure after changing jobs?",
        a: "It depends on your status and job duties. We may recommend a Certificate of Authorized Employment or a status change.",
      },
      {
        q: "Can part-time or simple work qualify?",
        a: "Applications centered on simple labor are generally difficult. We review the actual job design first.",
      },
    ],
  },
  "engineer-visa": {
    slug: "engineer-visa",
    title: "Engineer / Specialist Visa",
    eyebrow: "ENGINEER / SPECIALIST",
    lead: "Support for IT engineers, translators, marketers, trade staff, and other professional roles.",
    description:
      "We explain the link between your academic or professional background and your assigned duties in a clear application package.",
    metaTitle: "Engineer / Specialist Visa Support | Gyoseishoshi Arch Office",
    metaDescription:
      "Support for Engineer/Specialist in Humanities/International Services visa applications in Japan. Requirements, documents, refusal risks, and fees.",
    keywords: ["Engineer visa Japan", "Gijinkoku visa", "Specialist in Humanities", "International Services visa"],
    overview: [
      "This status is for professional work using technical, humanities, or international knowledge.",
      "Typical roles include IT engineer, design, accounting, legal, planning, translation, interpretation, and overseas trade.",
      "The relation between major, experience, and actual job duties is important.",
    ],
    requirements: [
      "Professional duties in technology, humanities, or international services",
      "Relevant academic background or practical experience",
      "The work must not mainly consist of simple labor",
      "Salary must be comparable to Japanese employees",
    ],
    documents: [
      "Application form, photo, passport, and residence card",
      "Employment contract, job description, and hiring reason",
      "Graduation certificate, transcript, resume, and work history",
      "Company profile, registration, and financial statements",
      "Documents showing assigned duties and organization structure",
    ],
    refusalReasons: [
      "Weak relation between major and job duties",
      "Actual duties appear to be simple labor",
      "Hiring reason is too generic",
      "Unclear workload or necessity of employment",
    ],
    support: [
      "Review of background and job-duty relevance",
      "Preparation of hiring reason and job explanation documents",
      "Company-category based document checklist",
      "Risk review for job changes and renewals",
    ],
    price: "From ¥88,000",
    priceAmount: 88000,
    priceNote: "Job change cases, category 4 companies, or complex explanation materials may require a separate quote.",
    faqs: [
      {
        q: "Can vocational school graduates apply?",
        a: "In some cases, yes. The field of study must relate to the assigned duties.",
      },
      {
        q: "Is this only for IT engineers?",
        a: "No. Accounting, legal, planning, translation, interpretation, and international trade roles may also qualify.",
      },
      {
        q: "Can restaurant employees apply?",
        a: "Customer service or kitchen assistance alone is difficult. We review whether there are professional duties such as overseas trade or marketing.",
      },
    ],
  },
  "permanent-residence": {
    slug: "permanent-residence",
    title: "Permanent Residence",
    eyebrow: "PERMANENT RESIDENCE",
    lead: "Support for permanent residence applications, including income, tax, pension, insurance, and residence history review.",
    description:
      "Permanent residence requires careful preparation because income stability, tax compliance, and immigration history are strictly reviewed.",
    metaTitle: "Permanent Residence Application Support | Gyoseishoshi Arch Office",
    metaDescription:
      "Nationwide permanent residence application support in Japan. Requirements, documents, refusal risks, taxes, pension, and fees.",
    keywords: ["permanent residence Japan", "PR application Japan", "Japan permanent resident", "visa lawyer Japan"],
    overview: [
      "Permanent residence allows you to continue living in Japan without regular status renewals.",
      "Immigration reviews conduct, livelihood stability, tax, pension, health insurance, and residence history.",
      "Required years and documents differ depending on your current status.",
    ],
    requirements: [
      "Continuous residence in Japan for the required period",
      "Stable income and independent livelihood",
      "Proper payment of taxes, pension, and health insurance",
      "No serious conduct issues such as repeated traffic violations",
      "Holding the longest period of stay for your current status",
    ],
    documents: [
      "Permanent residence application form, photo, passport, and residence card",
      "Residence certificate, statement of reasons, and guarantor documents",
      "Tax certificates, withholding slips, and income documents",
      "Pension and health insurance payment records",
      "Employment certificate, bank records, and family documents",
    ],
    refusalReasons: [
      "Unstable income or insufficient income for dependent family size",
      "Late or missing tax, pension, or health insurance payments",
      "Too many days outside Japan",
      "Repeated traffic violations or immigration procedure issues",
    ],
    support: [
      "Pre-application eligibility review",
      "Tax, pension, and insurance document review",
      "Preparation of statement of reasons and guarantor documents",
      "Supplementary explanation for risk factors",
    ],
    price: "From ¥110,000",
    priceAmount: 110000,
    priceNote: "Family applications or cases with late payments or many overseas days may require a separate quote.",
    faqs: [
      {
        q: "How much income is required?",
        a: "There is no single fixed number. We review income stability in relation to family size and living situation.",
      },
      {
        q: "I have unpaid pension periods. Is that a problem?",
        a: "It can be a major risk. We review your records and consider timing and explanations.",
      },
      {
        q: "Can family members apply together?",
        a: "Yes, depending on family composition, income, and dependency status.",
      },
    ],
  },
  naturalization: {
    slug: "naturalization",
    title: "Naturalization",
    eyebrow: "NATURALIZATION",
    lead: "Support for people seeking Japanese nationality, from Legal Affairs Bureau preparation to document drafting.",
    description:
      "Naturalization requires extensive documents and consistent explanations about family, life history, income, and tax compliance.",
    metaTitle: "Naturalization Application Support | Gyoseishoshi Arch Office",
    metaDescription:
      "Support for Japanese naturalization applications. Requirements, documents, refusal risks, Legal Affairs Bureau preparation, and fees.",
    keywords: ["naturalization Japan", "Japanese nationality", "kika application", "Legal Affairs Bureau"],
    overview: [
      "Naturalization is the procedure to acquire Japanese nationality through the Legal Affairs Bureau.",
      "It differs from immigration status applications and reviews family, income, tax, conduct, and life history broadly.",
      "Foreign official documents are often required, so early preparation is important.",
    ],
    requirements: [
      "Generally, five or more continuous years of residence in Japan",
      "Good conduct, including taxes, pension, and traffic record",
      "Stable livelihood through the applicant or household",
      "Basic Japanese reading and writing ability",
      "Ability to give up the original nationality in principle",
    ],
    documents: [
      "Application forms, family overview, and resume",
      "Livelihood and business overview documents",
      "Residence certificate, family records, birth and marriage certificates",
      "Tax certificates, withholding slips, and tax returns",
      "Driving record, employment certificate, and bank records",
    ],
    refusalReasons: [
      "Unpaid or late tax, pension, or social insurance",
      "Traffic violations, criminal record, or immigration issues",
      "Unstable income or weak income outlook after job change",
      "Inconsistencies in family records or foreign documents",
    ],
    support: [
      "Naturalization eligibility review",
      "Preparation for Legal Affairs Bureau consultation",
      "Drafting of application forms and motivation statement",
      "Guidance for foreign, tax, and employment documents",
    ],
    price: "From ¥132,000",
    priceAmount: 132000,
    priceNote: "Business owners, sole proprietors, family applications, or many foreign documents may require a separate quote.",
    faqs: [
      {
        q: "Is there a Japanese language test?",
        a: "Japanese ability is checked through interviews and documents. We can review preparation needs in advance.",
      },
      {
        q: "Can my family apply together?",
        a: "Yes. We review family composition, income, and residence history to decide whether a joint application is suitable.",
      },
      {
        q: "Can you accompany me to the Legal Affairs Bureau?",
        a: "Depending on the region and case, support may be available. We confirm the scope during consultation.",
      },
    ],
  },
  "business-manager": {
    slug: "business-manager",
    title: "Business Manager Visa",
    eyebrow: "BUSINESS MANAGER",
    lead: "Support for foreign entrepreneurs establishing or managing a business in Japan.",
    description:
      "We organize business substance, capital, office, and continuity evidence to support your Business Manager visa application.",
    metaTitle: "Business Manager Visa Support | Gyoseishoshi Arch Office",
    metaDescription:
      "Support for Business Manager visa applications in Japan. Company setup, business plan, office preparation, capital explanation, requirements, and fees.",
    keywords: ["Business Manager visa Japan", "Japan startup visa", "company setup Japan", "business plan visa"],
    overview: [
      "The Business Manager visa is for foreign nationals who manage or administer a business in Japan.",
      "Immigration reviews company setup, business substance, capital source, office, and revenue outlook.",
      "For new businesses, the persuasiveness of the business plan is especially important.",
    ],
    requirements: [
      "A lawful business operation structure in Japan",
      "An independent business office",
      "Business scale requirements such as capital, investment, or employment structure",
      "A business plan showing continuity, stability, and profitability",
      "The applicant must substantially manage or administer the business",
    ],
    documents: [
      "Application form, photo, passport, and residence card",
      "Company registration, articles of incorporation, and shareholder list",
      "Business plan, income forecast, and funding documents",
      "Office lease, photos, and floor plan",
      "Licenses, contracts, estimates, and company profile",
    ],
    refusalReasons: [
      "Office independence is weak, such as virtual office use",
      "Capital source or transfer route cannot be explained",
      "Business plan lacks concrete revenue prospects",
      "Applicant's management role is unclear",
    ],
    support: [
      "Pre-application review for Business Manager visa",
      "Company setup and office preparation review",
      "Business plan, reason statement, and financial plan drafting",
      "Organization of capital formation and transaction evidence",
    ],
    price: "From ¥440,000",
    priceAmount: 440000,
    priceNote: "Company setup, licenses, and detailed business plan preparation are quoted depending on the case.",
    faqs: [
      {
        q: "Can I consult before setting up a company?",
        a: "Yes. Early consultation is useful for preparing capital, office, and business plan in a visa-ready way.",
      },
      {
        q: "Can I use my home as an office?",
        a: "It depends. We review separation of residence and business space, lease terms, and business substance.",
      },
      {
        q: "Can I renew if the business is in deficit?",
        a: "A deficit does not automatically mean refusal. You must explain the reason, improvement outlook, and business continuity.",
      },
    ],
  },
};
