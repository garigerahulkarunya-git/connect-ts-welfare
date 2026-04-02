export interface Scheme {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  eligibility: string[];
  status: "OPEN" | "CLOSED";
  deadline: string;
  documents: string[];
  steps: string[];
  faqs: { q: string; a: string }[];
  amount: string;
}

export interface GrievanceTicket {
  id: string;
  subject: string;
  status: "Submitted" | "Under Review" | "Resolved";
  date: string;
  description: string;
}

export interface Official {
  name: string;
  designation: string;
  photo: string;
}

export interface District {
  name: string;
  officer: string;
  phone: string;
  email: string;
  address: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  type: "news" | "event" | "success" | "gallery";
}

export const schemes: Scheme[] = [
  {
    id: "edu-scholarship",
    title: "Education Scholarship for Minority Students",
    shortDescription: "Financial assistance for higher education to Christian minority students from economically weaker sections.",
    description: "The Education Scholarship scheme provides comprehensive financial support to Christian minority students pursuing higher education in recognized institutions across Telangana. This scheme covers tuition fees, examination fees, and provides a monthly maintenance allowance.",
    category: "Education",
    eligibility: ["Must be a Christian minority", "Annual family income below ₹2,00,000", "Enrolled in recognized institution", "Resident of Telangana"],
    status: "OPEN",
    deadline: "2026-06-30",
    documents: ["Aadhaar Card", "Income Certificate", "Caste/Community Certificate", "Previous Mark Sheets", "Institution Admission Letter", "Bank Passbook"],
    steps: ["Check eligibility criteria", "Fill personal details", "Upload required documents", "Submit application", "Receive confirmation & Application ID"],
    faqs: [
      { q: "What is the maximum scholarship amount?", a: "Up to ₹50,000 per annum depending on the course." },
      { q: "Can I apply for multiple scholarships?", a: "No, only one scholarship per academic year." },
      { q: "How long does the approval process take?", a: "Typically 30-45 working days after submission." },
    ],
    amount: "Up to ₹50,000/year",
  },
  {
    id: "housing-subsidy",
    title: "Housing Subsidy Scheme",
    shortDescription: "Subsidized housing loans for Christian minorities to build or purchase homes.",
    description: "This scheme provides subsidized housing loans and direct financial assistance to Christian minority families for construction or purchase of residential houses. The subsidy covers up to 30% of the total loan amount.",
    category: "Housing",
    eligibility: ["Christian minority community", "No existing house ownership", "Annual income below ₹3,00,000", "Telangana domicile"],
    status: "OPEN",
    deadline: "2026-08-15",
    documents: ["Aadhaar Card", "Income Certificate", "Community Certificate", "Land Documents", "House Plan Approval", "Bank Loan Sanction Letter"],
    steps: ["Verify eligibility", "Submit land/property documents", "Get loan sanction from bank", "Apply with all documents", "Inspection & approval"],
    faqs: [
      { q: "What is the maximum subsidy?", a: "Up to ₹5,00,000 or 30% of loan amount, whichever is less." },
      { q: "Which banks are eligible?", a: "All nationalized and scheduled banks." },
    ],
    amount: "Up to ₹5,00,000",
  },
  {
    id: "skill-training",
    title: "Skill Development & Training Program",
    shortDescription: "Free skill development courses for youth to enhance employability.",
    description: "Comprehensive skill development program offering free training in IT, healthcare, retail, and manufacturing sectors. Includes placement assistance and certification.",
    category: "Skill Development",
    eligibility: ["Age 18-35 years", "Christian minority", "Minimum 10th pass", "Telangana resident"],
    status: "OPEN",
    deadline: "2026-05-31",
    documents: ["Aadhaar Card", "Community Certificate", "Educational Certificates", "Age Proof"],
    steps: ["Select training course", "Submit application", "Attend interview", "Enroll in training", "Complete & get certified"],
    faqs: [
      { q: "What courses are available?", a: "Computer basics, web development, nursing, retail management, and more." },
      { q: "Is there any stipend?", a: "Yes, ₹3,000/month during training period." },
    ],
    amount: "Free Training + ₹3,000/month stipend",
  },
  {
    id: "micro-enterprise",
    title: "Micro Enterprise Loan Scheme",
    shortDescription: "Low-interest loans for starting micro and small enterprises.",
    description: "Financial support through low-interest loans for Christian minorities to establish micro and small enterprises. Includes business mentoring and market linkage support.",
    category: "Enterprise",
    eligibility: ["Christian minority", "Age 18-55 years", "Valid business plan", "Annual income below ₹5,00,000"],
    status: "OPEN",
    deadline: "2026-12-31",
    documents: ["Aadhaar Card", "Community Certificate", "Business Plan", "Income Certificate", "Bank Account Details", "Address Proof"],
    steps: ["Prepare business plan", "Submit application", "Business plan evaluation", "Loan sanction", "Disbursement"],
    faqs: [
      { q: "What is the interest rate?", a: "4% per annum with government subsidy." },
      { q: "Maximum loan amount?", a: "Up to ₹10,00,000 for micro enterprises." },
    ],
    amount: "Up to ₹10,00,000",
  },
  {
    id: "marriage-assistance",
    title: "Marriage Financial Assistance",
    shortDescription: "One-time financial aid for marriage of daughters from economically weaker families.",
    description: "One-time financial assistance for the marriage of daughters belonging to Christian minority families from economically weaker sections.",
    category: "Welfare",
    eligibility: ["Christian minority family", "Bride's age 18+", "Annual family income below ₹2,00,000", "First two daughters only"],
    status: "CLOSED",
    deadline: "2026-03-31",
    documents: ["Aadhaar Cards (Bride & Family)", "Community Certificate", "Income Certificate", "Age Proof of Bride", "Wedding Invitation"],
    steps: ["Apply with documents", "Verification by district office", "Approval", "Fund disbursement"],
    faqs: [
      { q: "What is the assistance amount?", a: "₹1,00,116 per marriage." },
      { q: "Can I apply after the marriage?", a: "Yes, within 6 months of marriage." },
    ],
    amount: "₹1,00,116",
  },
  {
    id: "medical-aid",
    title: "Medical Aid & Health Support",
    shortDescription: "Financial assistance for medical treatment and health emergencies.",
    description: "Provides financial support for medical treatment, surgeries, and health emergencies for Christian minority families who cannot afford treatment costs.",
    category: "Health",
    eligibility: ["Christian minority", "Annual income below ₹3,00,000", "Treatment in recognized hospital", "Telangana resident"],
    status: "OPEN",
    deadline: "2026-09-30",
    documents: ["Aadhaar Card", "Community Certificate", "Income Certificate", "Medical Reports", "Hospital Bills", "Doctor's Recommendation"],
    steps: ["Submit medical reports", "Apply with documents", "Medical board review", "Approval & disbursement"],
    faqs: [
      { q: "Maximum amount available?", a: "Up to ₹2,00,000 based on treatment cost." },
      { q: "Which hospitals are covered?", a: "All government and recognized private hospitals." },
    ],
    amount: "Up to ₹2,00,000",
  },
];

export const officials: Official[] = [
  { name: "Sri. A. Bhaskar Rao, IAS", designation: "Managing Director", photo: "" },
  { name: "Sri. K. Praveen Kumar", designation: "General Manager", photo: "" },
  { name: "Smt. Mary Johnson", designation: "Deputy Director", photo: "" },
  { name: "Sri. David Thomas", designation: "Chief Accounts Officer", photo: "" },
];

export const districts: District[] = [
  { name: "Hyderabad", officer: "Sri. John Samuel", phone: "+91-40-23456789", email: "hyd@tgcmfc.gov.in", address: "3rd Floor, Minorities Bhawan, Nampally, Hyderabad" },
  { name: "Rangareddy", officer: "Smt. Grace Mary", phone: "+91-40-23567890", email: "rr@tgcmfc.gov.in", address: "District Collectorate Complex, LB Nagar" },
  { name: "Medchal-Malkajgiri", officer: "Sri. Peter Paul", phone: "+91-40-24567891", email: "medchal@tgcmfc.gov.in", address: "Collectorate Building, Medchal" },
  { name: "Warangal Urban", officer: "Sri. Thomas David", phone: "+91-870-2456789", email: "wgl@tgcmfc.gov.in", address: "Minorities Welfare Office, Hanamkonda" },
  { name: "Karimnagar", officer: "Smt. Elizabeth Paul", phone: "+91-878-2345678", email: "knr@tgcmfc.gov.in", address: "District Minorities Office, Karimnagar" },
  { name: "Khammam", officer: "Sri. Joseph Martin", phone: "+91-874-2234567", email: "kmm@tgcmfc.gov.in", address: "Collectorate Complex, Khammam" },
  { name: "Nizamabad", officer: "Smt. Ruth Samuel", phone: "+91-846-2345678", email: "nzb@tgcmfc.gov.in", address: "District Office, Nizamabad" },
  { name: "Adilabad", officer: "Sri. Mark Anthony", phone: "+91-873-2234567", email: "adl@tgcmfc.gov.in", address: "Minorities Bhawan, Adilabad" },
  { name: "Nalgonda", officer: "Sri. Simon Peter", phone: "+91-868-2345678", email: "nlg@tgcmfc.gov.in", address: "District Welfare Office, Nalgonda" },
  { name: "Mahabubnagar", officer: "Smt. Sarah Abraham", phone: "+91-854-2234567", email: "mbnr@tgcmfc.gov.in", address: "Collectorate Premises, Mahabubnagar" },
];

export const newsItems: NewsItem[] = [
  { id: "1", title: "TGCMFC Launches New Education Scholarship Portal", date: "2026-03-25", category: "Announcement", excerpt: "A new digital portal for easy scholarship applications has been launched for the academic year 2026-27.", image: "", type: "news" },
  { id: "2", title: "Skill Development Camp at Warangal", date: "2026-04-10", category: "Event", excerpt: "Three-day skill development camp organized in collaboration with NSDC at Warangal district.", image: "", type: "event" },
  { id: "3", title: "1000+ Students Benefit from Scholarship Scheme", date: "2026-03-15", category: "Achievement", excerpt: "Over 1000 students received educational scholarships in the last quarter, a record achievement.", image: "", type: "success" },
  { id: "4", title: "Housing Subsidy Distribution Ceremony", date: "2026-03-20", category: "Event", excerpt: "Managing Director distributed housing subsidy checks to 200 beneficiaries at a ceremony in Hyderabad.", image: "", type: "event" },
  { id: "5", title: "From Tailor to Entrepreneur: A Success Story", date: "2026-02-28", category: "Success Story", excerpt: "Mary Thomas from Karimnagar used the micro-enterprise loan to build a successful garment business.", image: "", type: "success" },
  { id: "6", title: "Annual Report 2025-26 Released", date: "2026-03-01", category: "Report", excerpt: "The corporation's annual report highlighting key achievements and financial disbursements has been published.", image: "", type: "news" },
];

export const sampleGrievances: GrievanceTicket[] = [
  { id: "GRV-2026-001", subject: "Scholarship amount not received", status: "Under Review", date: "2026-03-15", description: "Applied for education scholarship 3 months ago but haven't received the amount yet." },
  { id: "GRV-2026-002", subject: "Document verification pending", status: "Submitted", date: "2026-03-28", description: "Documents submitted for housing scheme but no update on verification." },
  { id: "GRV-2026-003", subject: "Loan application status unclear", status: "Resolved", date: "2026-02-10", description: "Micro enterprise loan application status was unclear. Issue resolved after escalation." },
];

export const stats = {
  beneficiaries: 446077,
  schemesActive: 12,
  amountDisbursed: 850,
  districtsServed: 33,
};
