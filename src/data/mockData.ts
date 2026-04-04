export interface Scheme {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  eligibility: string[];
  status: "OPEN" | "CLOSED" | "UPCOMING";
  deadline: string;
  documents: string[];
  steps: string[];
  faqs: { q: string; a: string }[];
  amount: string;
  tags?: string[];
  flagship?: boolean;
  icon?: string;
}

export interface GrievanceTicket {
  id: string;
  subject: string;
  status: "Submitted" | "Under Review" | "Resolved";
  date: string;
  description: string;
  category?: string;
  district?: string;
  scheme?: string;
  officerAssigned?: string;
  department?: string;
  priority?: "HIGH PRIORITY" | "MEDIUM" | "LOW";
  timelineUpdate?: string;
  timelineTime?: string;
}

export interface Official {
  name: string;
  designation: string;
  photo: string;
  quote?: string;
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
    id: "post-matric-scholarship",
    title: "Post-Matric Scholarship",
    shortDescription: "Providing 100% tuition reimbursement for higher studies in professional and technical courses.",
    description: "The Post-Matric Scholarship scheme provides comprehensive financial support to Christian minority students pursuing higher education in recognized institutions across Telangana. This scheme covers tuition fees, examination fees, and provides a monthly maintenance allowance.",
    category: "Education",
    eligibility: ["Must be a Christian minority", "Annual family income below ₹2,50,000", "Enrolled in recognized institution", "Resident of Telangana"],
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
    tags: ["Students Only", "Income < 2.5L"],
    flagship: true,
    icon: "graduation",
  },
  {
    id: "driver-empowerment",
    title: "Driver Empowerment",
    shortDescription: "Financial assistance for purchase of four-wheelers and commercial vehicles for livelihood.",
    description: "This scheme provides financial assistance to Christian minority individuals for purchasing commercial vehicles to earn a livelihood. Includes subsidized loans and skill training for professional driving.",
    category: "Enterprise",
    eligibility: ["Christian minority community", "Age 21-45 years", "Valid driving license required", "Telangana domicile"],
    status: "OPEN",
    deadline: "2026-08-15",
    documents: ["Aadhaar Card", "Income Certificate", "Community Certificate", "Driving License", "Vehicle Quotation", "Bank Account Details"],
    steps: ["Verify eligibility", "Submit driving license & documents", "Get vehicle quotation", "Apply with all documents", "Loan sanction & disbursement"],
    faqs: [
      { q: "What is the maximum loan amount?", a: "Up to ₹5,00,000 for commercial vehicles." },
      { q: "Which vehicles are eligible?", a: "Four-wheelers and commercial vehicles for livelihood." },
    ],
    amount: "Up to ₹5,00,000",
    tags: ["Age 21-45", "DL Required"],
    flagship: true,
    icon: "car",
  },
  {
    id: "skill-training-pro",
    title: "Skill Training Pro",
    shortDescription: "Job-oriented skill development training for unemployed Christian youth in IT and Service sectors.",
    description: "Comprehensive skill development program offering free training in IT, healthcare, retail, and manufacturing sectors. Includes placement assistance and certification.",
    category: "Skill Development",
    eligibility: ["Age 18-35 years", "Christian minority", "Minimum graduation", "Telangana resident"],
    status: "UPCOMING",
    deadline: "2026-11-15",
    documents: ["Aadhaar Card", "Community Certificate", "Educational Certificates", "Age Proof"],
    steps: ["Select training course", "Submit application", "Attend interview", "Enroll in training", "Complete & get certified"],
    faqs: [
      { q: "What courses are available?", a: "Web development, data entry, digital marketing, and more." },
      { q: "Is there any stipend?", a: "Yes, ₹3,000/month during training period." },
    ],
    amount: "Free Training + ₹3,000/month stipend",
    tags: ["Graduates", "Job Seekers"],
    flagship: true,
    icon: "lightbulb",
  },
  {
    id: "church-repair-grant",
    title: "Church Repair Grant",
    shortDescription: "Financial assistance for the construction/repair/renovation of Christian community buildings.",
    description: "Provides financial grants for repair and renovation of churches and community halls used by Christian minorities.",
    category: "Welfare",
    eligibility: ["Churches Only", "Registered Organization", "Telangana location"],
    status: "CLOSED",
    deadline: "2026-03-31",
    documents: ["Registration Certificate", "Building Documents", "Repair Estimate", "Bank Account Details"],
    steps: ["Submit building documents", "Get repair estimate", "Apply with documents", "Inspection & approval"],
    faqs: [
      { q: "Maximum grant amount?", a: "Up to ₹3,00,000 based on repair estimate." },
    ],
    amount: "Up to ₹3,00,000",
    tags: ["Churches Only", "Registered Org"],
    icon: "building",
  },
  {
    id: "economic-support",
    title: "Economic Support (Bank Linked)",
    shortDescription: "Providing subsidy for setting up small business units like Kirana, Tailoring, or Laundry.",
    description: "Financial support through bank-linked subsidies for Christian minorities to establish small business units. Includes business mentoring and market linkage support.",
    category: "Enterprise",
    eligibility: ["Christian minority", "Age 18-55 years", "Valid business plan", "White Card holder"],
    status: "OPEN",
    deadline: "2026-12-31",
    documents: ["Aadhaar Card", "Community Certificate", "Business Plan", "White Card", "Bank Account Details", "Address Proof"],
    steps: ["Prepare business plan", "Submit application", "Business plan evaluation", "Loan sanction", "Disbursement"],
    faqs: [
      { q: "What is the subsidy rate?", a: "Up to 50% subsidy on sanctioned loan amount." },
      { q: "Maximum loan amount?", a: "Up to ₹10,00,000 for micro enterprises." },
    ],
    amount: "Up to ₹10,00,000",
    tags: ["Age 18-55", "White Card"],
    icon: "credit-card",
  },
  {
    id: "overseas-study-grant",
    title: "Overseas Study Grant",
    shortDescription: "Scholarship of up to ₹20 Lakhs for eligible students pursuing PG/Ph.D studies in Foreign universities.",
    description: "Comprehensive scholarship for meritorious Christian minority students pursuing postgraduate or doctoral studies in recognized foreign universities.",
    category: "Education",
    eligibility: ["Christian minority", "Merit-based selection", "Pursuing PG/PhD abroad", "Annual family income below ₹8,00,000"],
    status: "OPEN",
    deadline: "2026-09-30",
    documents: ["Aadhaar Card", "Community Certificate", "University Admission Letter", "Mark Sheets", "Passport", "Income Certificate"],
    steps: ["Secure admission in foreign university", "Submit application with documents", "Merit evaluation", "Interview", "Scholarship disbursement"],
    faqs: [
      { q: "Maximum scholarship amount?", a: "Up to ₹20,00,000 for the entire course duration." },
      { q: "Which countries are covered?", a: "All countries with recognized universities." },
    ],
    amount: "Up to ₹20,00,000",
    tags: ["Abroad Study", "Merit Based"],
    icon: "globe",
  },
  {
    id: "critical-medical-aid",
    title: "Critical Medical Aid",
    shortDescription: "One-time financial grant for surgery and specialized treatment in major hospitals for the community.",
    description: "Provides financial support for critical medical treatment, surgeries, and health emergencies for Christian minority families who cannot afford treatment costs.",
    category: "Health",
    eligibility: ["Christian minority", "All age groups", "Urgent medical need", "Treatment in recognized hospital"],
    status: "OPEN",
    deadline: "2026-12-31",
    documents: ["Aadhaar Card", "Community Certificate", "Income Certificate", "Medical Reports", "Hospital Bills", "Doctor's Recommendation"],
    steps: ["Submit medical reports", "Apply with documents", "Medical board review", "Approval & disbursement"],
    faqs: [
      { q: "Maximum amount available?", a: "Up to ₹2,00,000 based on treatment cost." },
      { q: "Which hospitals are covered?", a: "All government and recognized private hospitals." },
    ],
    amount: "Up to ₹2,00,000",
    tags: ["All Ages", "Urgent"],
    icon: "heart-pulse",
  },
  {
    id: "computer-training",
    title: "Computer Training Center",
    shortDescription: "Free certificate courses in web development, data entry, and digital marketing for youth.",
    description: "Free computer training program offering certificate courses in modern digital skills. Includes employment linkage after successful completion.",
    category: "Skill Development",
    eligibility: ["Christian minority", "Minimum 10th pass", "Age 18-35", "Telangana resident"],
    status: "UPCOMING",
    deadline: "2026-10-31",
    documents: ["Aadhaar Card", "Community Certificate", "Educational Certificates", "Age Proof"],
    steps: ["Select course", "Submit application", "Aptitude test", "Enroll in training", "Certification"],
    faqs: [
      { q: "What courses are available?", a: "Web development, data entry, digital marketing, and basic computer skills." },
      { q: "Is placement guaranteed?", a: "Employment linkage support is provided after completion." },
    ],
    amount: "Free Training",
    tags: ["10th Passed", "Employment Link"],
    icon: "monitor",
  },
  {
    id: "civils-coaching",
    title: "Civils Coaching Grant",
    shortDescription: "Sponsorship for coaching fees for UPSC and State PSC exams at premier institutes.",
    description: "Financial sponsorship for Christian minority candidates preparing for UPSC Civil Services and State Public Service Commission examinations at recognized coaching institutes.",
    category: "Education",
    eligibility: ["Christian minority", "Degree holders", "Competitive exam aspirants", "Annual income below ₹5,00,000"],
    status: "CLOSED",
    deadline: "2026-02-28",
    documents: ["Aadhaar Card", "Community Certificate", "Degree Certificate", "Coaching Institute Admission", "Income Certificate"],
    steps: ["Get admission in coaching institute", "Submit application", "Document verification", "Fee reimbursement"],
    faqs: [
      { q: "Maximum coaching fee covered?", a: "Up to ₹1,50,000 per year." },
      { q: "Which coaching institutes?", a: "Recognized coaching institutes for UPSC/TSPSC." },
    ],
    amount: "Up to ₹1,50,000",
    tags: ["Degree Holders", "Competitive"],
    icon: "book-open",
  },
];

export const officials: Official[] = [
  { 
    name: "Shri. K. Chandrashekar", 
    designation: "Secretary", 
    photo: "/assets/images/secretary.png", 
    quote: "Our mission is to ensure every minority citizen has the tools to succeed and contribute to the state's progress." 
  },
  { 
    name: "Smt. Sarah Joseph", 
    designation: "Managing Director", 
    photo: "/assets/images/md.png", 
    quote: "Transparency and digital-first governance are the pillars of TGCMFC's commitment to the community." 
  },
  { 
    name: "Shri. Peter Anthony", 
    designation: "Chairman", 
    photo: "/assets/images/chairman.png", 
    quote: "We are building a future where financial barriers do not limit the potential of our talented youth." 
  },
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
  { id: "1", title: "TGCMFC Launches New Education Scholarship Portal", date: "2026-03-25", category: "Announcement", excerpt: "A new digital portal for easy scholarship applications has been launched for the academic year 2026-27.", image: "/assets/images/news_portal.png", type: "news" },
  { id: "2", title: "Skill Development Camp at Warangal", date: "2026-04-10", category: "Event", excerpt: "Three-day skill development camp organized in collaboration with NSDC at Warangal district.", image: "/assets/images/news_camp.png", type: "event" },
  { id: "3", title: "1000+ Students Benefit from Scholarship Scheme", date: "2026-03-15", category: "Achievement", excerpt: "Over 1000 students received educational scholarships in the last quarter, a record achievement.", image: "/assets/images/news_achievement.png", type: "success" },
  { id: "4", title: "Housing Subsidy Distribution Ceremony", date: "2026-03-20", category: "Event", excerpt: "Managing Director distributed housing subsidy checks to 200 beneficiaries at a ceremony in Hyderabad.", image: "/assets/images/news_event.png", type: "event" },
  { id: "5", title: "From Tailor to Entrepreneur: A Success Story", date: "2026-02-28", category: "Success Story", excerpt: "Mary Thomas from Karimnagar used the micro-enterprise loan to build a successful garment business.", image: "/assets/images/news_story.png", type: "success" },
  { id: "6", title: "Annual Report 2025-26 Released", date: "2026-03-01", category: "Report", excerpt: "The corporation's annual report highlighting key achievements and financial disbursements has been published.", image: "/assets/images/news_report.png", type: "news" },
];

export const sampleGrievances: GrievanceTicket[] = [
  { id: "TG-2026-0814", subject: "Scholarship amount not received", status: "Under Review", date: "Jan 15, 2026", description: "Applied for education scholarship 3 months ago but haven't received the amount yet.", category: "Delayed Approval", district: "Hyderabad", scheme: "Post-Matric Scholarship", officerAssigned: "P. Ramesh Rao", department: "DMWO", priority: "HIGH PRIORITY", timelineUpdate: "Grievance has been moved to the Institutional Desk. Verification of documents in progress at District Minority Welfare Office.", timelineTime: "2 hours ago" },
  { id: "TG-2026-0412", subject: "Document verification pending", status: "Submitted", date: "Mar 28, 2026", description: "Documents submitted for housing scheme but no update on verification.", category: "Documentation Issue", district: "Warangal", scheme: "Economic Support", officerAssigned: "S. Mary Thomas", department: "DWMO", priority: "MEDIUM" },
  { id: "TG-2026-1185", subject: "Loan application status unclear", status: "Resolved", date: "Feb 10, 2026", description: "Micro enterprise loan application status was unclear. Issue resolved after escalation.", category: "Delayed Approval", district: "Karimnagar", scheme: "Driver Empowerment", officerAssigned: "K. David Paul", department: "DMWO", priority: "LOW" },
  { id: "TG-2026-0923", subject: "Payment delay in skill training stipend", status: "Under Review", date: "Mar 05, 2026", description: "Monthly stipend for skill training program not received for 2 months.", category: "Delayed Approval", district: "Nizamabad", scheme: "Skill Training Pro", officerAssigned: "R. Grace Samuel", department: "DWMO", priority: "HIGH PRIORITY" },
  { id: "TG-2026-0567", subject: "Staff behavior at district office", status: "Submitted", date: "Mar 20, 2026", description: "Rude behavior by staff at the Khammam district office during document submission.", category: "Staff Behavior", district: "Khammam", scheme: "Church Repair Grant", officerAssigned: "J. Martin", department: "DMWO", priority: "MEDIUM" },
  { id: "TG-2026-0234", subject: "Technical error in online application", status: "Resolved", date: "Jan 28, 2026", description: "Online portal showed error during application submission. Issue was a server timeout.", category: "Technical Error", district: "Hyderabad", scheme: "Overseas Study Grant", officerAssigned: "P. Ramesh Rao", department: "DMWO", priority: "LOW" },
];

export const grievanceDistrictStats = [
  { name: "Hyderabad", complaints: 3200 },
  { name: "Warangal", complaints: 2100 },
  { name: "Nizamabad", complaints: 1800 },
  { name: "Khammam", complaints: 1650 },
  { name: "Karimnagar", complaints: 1400 },
];

export const stats = {
  beneficiaries: 446077,
  schemesActive: 12,
  amountDisbursed: 850,
  districtsServed: 33,
};
