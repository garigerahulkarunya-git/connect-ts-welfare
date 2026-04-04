import { useState, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2, Upload, ArrowLeft, ArrowRight, FileText, Info, Lightbulb, Phone,
  Save, Copy, Download, Mail, Bell, Shield, Check, ChevronDown, Camera, FileCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { schemes } from "@/data/mockData";
import { useTranslation } from "react-i18next";



interface UploadedFile {
  name: string;
  size: string;
}

const TrusteeGuide = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 bg-primary/5 rounded-xl p-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
          T
        </div>
        <div>
          <p className="font-semibold text-primary text-sm">{t("apply_trustee_guide")}</p>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{t("apply_trustee_subtitle")}</p>
        </div>
      </div>
      <div className="space-y-1">
        <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left">
          <Info className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{t("apply_instructions")}</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
          <Lightbulb className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium">{t("apply_protips")}</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{t("apply_helpline")}</span>
        </button>
      </div>
      <Button variant="outline" className="w-full mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
        <Phone className="h-4 w-4 mr-2" /> {t("apply_call_support")}
      </Button>
    </div>
  );
};

const Apply = () => {
  const { t } = useTranslation();
  const stepLabels = [
    t("apply_step_eligibility"),
    t("apply_step_personal"),
    t("apply_step_documents"),
    t("apply_step_review")
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [certified, setCertified] = useState(false);

  // Eligibility state
  const [isChristian, setIsChristian] = useState<boolean | null>(null);
  const [ageRange, setAgeRange] = useState("18-35");
  const [incomeRange, setIncomeRange] = useState("below-1l");

  // Personal details state
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [dob, setDob] = useState("");

  // Document state
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, UploadedFile | null>>({
    aadhaar: null,
    income: null,
    community: null,
    photo: null,
  });

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const applicationId = useMemo(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "TGC-2026-";
    for (let i = 0; i < 5; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
    return id;
  }, []);

  const isEligible = isChristian === true;

  const canProceed = () => {
    if (currentStep === 0) return isEligible;
    if (currentStep === 1) return fullName && mobile && aadhaar && district;
    if (currentStep === 2) return true;
    if (currentStep === 3) return certified;
    return true;
  };

  const handleFileUpload = (docKey: string) => {
    const input = fileInputRefs.current[docKey];
    if (input) input.click();
  };

  const handleFileChange = (docKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;
      setUploadedDocs(prev => ({ ...prev, [docKey]: { name: file.name, size: sizeStr } }));
    }
  };

  const handleSubmit = () => setSubmitted(true);

  const copyToClipboard = () => navigator.clipboard?.writeText(applicationId);

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/30">
        {/* Step nav header */}
        <header className="bg-card border-b border-border">
          <div className="container flex items-center justify-between py-4">
            <Link to="/" className="font-extrabold text-foreground tracking-tight">{t("apply_brand")}</Link>
            <nav className="hidden md:flex items-center gap-6">
              {stepLabels.map((label, i) => (
                <span key={label} className={`text-sm font-medium ${i === 3 ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"}`}>
                  {label}
                </span>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><Info className="h-4 w-4" /></button>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">A</div>
            </div>
          </div>
        </header>

        <div className="container py-12 max-w-3xl text-center">
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border rounded-full px-4 py-1.5 mb-6">
              <CheckCircle2 className="h-3.5 w-3.5" /> {t("apply_success_badge")}
            </span>

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("apply_success_title")}</h1>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              {t("apply_success_desc")}
            </p>

            {/* Reference Number */}
            <div className="mt-8 bg-muted/60 rounded-2xl p-6 border border-dashed border-border">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{t("apply_reference_label")}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl md:text-3xl font-extrabold text-primary tracking-wider">{applicationId}</span>
                <button onClick={copyToClipboard} className="h-8 w-8 rounded-md bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Copy">
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <Link to="/grievance">
                <Button size="lg" className="font-semibold min-w-[200px]">
                  <Shield className="h-4 w-4 mr-2" /> {t("apply_track_btn")}
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="font-semibold min-w-[200px] bg-accent/10 border-accent/30 text-foreground hover:bg-accent/20">
                <Download className="h-4 w-4 mr-2" /> {t("apply_download_btn")}
              </Button>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: Mail, title: t("apply_info_email_title"), desc: t("apply_info_email_desc") },
              { icon: FileText, title: t("apply_info_verify_title"), desc: t("apply_info_verify_desc") },
              { icon: Bell, title: t("apply_info_alert_title"), desc: t("apply_info_alert_desc") },
            ].map(card => (
              <div key={card.title} className="flex items-start gap-3 text-left bg-card rounded-xl p-4 border border-border">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <card.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{card.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pro tip */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-card rounded-xl p-4 border border-border text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lightbulb className="h-4 w-4 text-accent" />
              <em>{t("apply_protip")}</em>
            </div>
            <a href="tel:1800425XXXX" className="flex items-center gap-1 text-primary font-semibold hover:underline mt-2 sm:mt-0">
              <Phone className="h-4 w-4" /> {t("apply_need_help")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main Form
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Step nav header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="font-extrabold text-foreground tracking-tight text-sm md:text-base">{t("apply_brand")}</Link>
          <nav className="hidden md:flex items-center gap-6">
            {stepLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => { if (i < currentStep) setCurrentStep(i); }}
                className={`text-sm font-medium transition-colors ${
                  i === currentStep
                    ? "text-primary border-b-2 border-primary pb-1"
                    : i < currentStep
                    ? "text-foreground cursor-pointer hover:text-primary"
                    : "text-muted-foreground cursor-default"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded-full bg-muted flex items-center justify-center"><Info className="h-4 w-4" /></button>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">A</div>
          </div>
        </div>
      </header>

      {/* Mobile step indicator */}
      <div className="md:hidden bg-card border-b border-border px-4 py-2">
        <div className="flex gap-1">
          {stepLabels.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full ${i <= currentStep ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-1.5">{t("apply_step_indicator", { step: currentStep + 1, label: stepLabels[currentStep] })}</p>
      </div>

      {/* Content */}
      <div className="flex-1 container py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main content */}
          <div>
            {/* Step 0: Eligibility */}
            {currentStep === 0 && (
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("apply_eligibility_title")}</h1>
                <p className="mt-2 text-muted-foreground">
                  {t("apply_eligibility_desc")}
                </p>

                <Card className="mt-6">
                  <CardContent className="p-6 space-y-8">
                    {/* Christian minority */}
                    <div>
                      <p className="font-semibold text-foreground mb-3">{t("apply_christian_question")}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setIsChristian(true)}
                          className={`h-12 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                            isChristian === true
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {isChristian === true && <Check className="h-4 w-4" />} {t("apply_yes")}
                        </button>
                        <button
                          onClick={() => setIsChristian(false)}
                          className={`h-12 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                            isChristian === false
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {t("apply_no")}
                        </button>
                      </div>
                    </div>

                    {/* Age range */}
                    <div>
                      <p className="font-semibold text-foreground mb-3">{t("apply_age_question")}</p>
                      <div className="relative">
                        <select
                          value={ageRange}
                          onChange={(e) => setAgeRange(e.target.value)}
                          className="w-full h-12 rounded-xl bg-muted text-foreground px-4 text-sm appearance-none focus:ring-2 focus:ring-primary focus:outline-none border-0"
                        >
                          <option value="18-35">18-35</option>
                          <option value="36-45">36-45</option>
                          <option value="46-55">46-55</option>
                          <option value="55+">55+</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    {/* Income range */}
                    <div>
                      <p className="font-semibold text-foreground mb-3">{t("apply_income_question")}</p>
                      <div className="relative">
                        <select
                          value={incomeRange}
                          onChange={(e) => setIncomeRange(e.target.value)}
                          className="w-full h-12 rounded-xl bg-muted text-foreground px-4 text-sm appearance-none focus:ring-2 focus:ring-primary focus:outline-none border-0"
                        >
                          <option value="below-1l">{t("apply_income_below_1l")}</option>
                          <option value="1l-2.5l">{t("apply_income_1l_2.5l")}</option>
                          <option value="2.5l-5l">{t("apply_income_2.5l_5l")}</option>
                          <option value="above-5l">{t("apply_income_above_5l")}</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>

                    {/* Eligibility result */}
                    {isChristian !== null && (
                      <div className={`rounded-xl p-4 flex items-center gap-3 ${isEligible ? "bg-green-50 border border-green-200" : "bg-destructive/10 border border-destructive/20"}`}>
                        <CheckCircle2 className={`h-8 w-8 ${isEligible ? "text-green-600" : "text-destructive"}`} />
                        <div>
                          <p className={`font-bold ${isEligible ? "text-green-800" : "text-destructive"}`}>
                            {isEligible ? t("apply_eligible_title") : t("apply_not_eligible_title")}
                          </p>
                          <p className={`text-sm ${isEligible ? "text-green-700" : "text-destructive/80"}`}>
                            {isEligible ? t("apply_eligible_desc") : t("apply_not_eligible_desc")}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("apply_personal_title")}</h1>
                <p className="mt-2 text-muted-foreground">{t("apply_personal_desc")}</p>

                <Card className="mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-foreground">{t("apply_applicant_info")}</h3>
                      <span className="text-xs text-accent flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent" /> {t("apply_autosave")}
                      </span>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("apply_fullname_label")}</label>
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="mt-1.5 h-12 bg-muted border-0 rounded-xl"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("apply_mobile_label")}</label>
                          <div className="relative mt-1.5">
                            <Input
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              placeholder="98765 43210"
                              className="h-12 bg-muted border-0 rounded-xl pr-20"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md">
                              {t("apply_verify_btn")}
                            </button>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-1 italic">{t("apply_mobile_hint")}</p>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("apply_aadhaar_label")}</label>
                          <Input
                            value={aadhaar}
                            onChange={(e) => setAadhaar(e.target.value)}
                            placeholder="XXXX XXXX XXXX"
                            className="mt-1.5 h-12 bg-muted border-0 rounded-xl"
                          />
                          <p className="text-[11px] text-muted-foreground mt-1 italic">{t("apply_aadhaar_hint")}</p>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("apply_address_label")}</label>
                        <Textarea
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder={t("apply_address_placeholder")}
                          className="mt-1.5 bg-muted border-0 rounded-xl min-h-[80px]"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("apply_district_label")}</label>
                          <div className="relative mt-1.5">
                            <select
                              value={district}
                              onChange={(e) => setDistrict(e.target.value)}
                              className="w-full h-12 rounded-xl bg-muted text-foreground px-4 text-sm appearance-none focus:ring-2 focus:ring-primary focus:outline-none border-0"
                            >
                              <option value="">{t("apply_district_placeholder")}</option>
                              {["Hyderabad", "Rangareddy", "Medchal-Malkajgiri", "Warangal Urban", "Karimnagar", "Khammam", "Nizamabad", "Adilabad", "Nalgonda", "Mahabubnagar"].map(d => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("apply_dob_label")}</label>
                          <Input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="mt-1.5 h-12 bg-muted border-0 rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Document Upload */}
            {currentStep === 2 && (
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("apply_docs_title")}</h1>
                <p className="mt-2 text-muted-foreground">{t("apply_docs_desc")}</p>

                <Card className="mt-6">
                  <CardContent className="p-6">
                    {/* Format notice */}
                    <div className="bg-accent/10 rounded-xl p-4 flex items-center gap-3 mb-6">
                      <Info className="h-5 w-5 text-accent shrink-0" />
                      <p className="text-sm text-foreground">{t("apply_docs_format")}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        { key: "aadhaar", label: t("apply_doc_aadhaar"), icon: Upload, hint: t("apply_doc_hint_upload") },
                        { key: "income", label: t("apply_doc_income"), icon: FileText, hint: t("apply_doc_hint_pdf_jpg") },
                        { key: "community", label: t("apply_doc_community"), icon: Upload, hint: t("apply_doc_hint_browse") },
                        { key: "photo", label: t("apply_doc_photo"), icon: Camera, hint: t("apply_doc_hint_photo") },
                      ].map(doc => (
                        <div key={doc.key}>
                          <p className="font-semibold text-foreground mb-2">{doc.label}</p>
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            className="hidden"
                            ref={el => { fileInputRefs.current[doc.key] = el; }}
                            onChange={(e) => handleFileChange(doc.key, e)}
                          />
                          <button
                            onClick={() => handleFileUpload(doc.key)}
                            className="w-full rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors p-8 flex flex-col items-center gap-2"
                          >
                            <doc.icon className="h-6 w-6 text-primary" />
                            <span className="text-sm text-muted-foreground">{doc.hint}</span>
                          </button>
                          {uploadedDocs[doc.key] && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-primary">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>{uploadedDocs[doc.key]!.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Upload status indicators */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {[
                        { color: "bg-green-100 text-green-700", icon: CheckCircle2, label: t("apply_status_verified") },
                        { color: "bg-accent/10 text-accent", icon: FileCheck, label: t("apply_status_pending") },
                        { color: "bg-primary/10 text-primary", icon: Upload, label: t("apply_status_upload") },
                      ].map(status => (
                        <div key={status.label} className={`${status.color} rounded-lg p-3 flex items-center gap-2 text-xs font-semibold`}>
                          <status.icon className="h-4 w-4" />
                          {status.label}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">{t("apply_review_title")}</h1>
                <p className="mt-2 text-muted-foreground">
                  {t("apply_review_desc")}
                </p>

                <Card className="mt-6">
                  <CardContent className="p-6 space-y-6">
                    {/* Personal Details Review */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-foreground flex items-center gap-2">
                          <span className="h-5 w-1 bg-primary rounded-full" /> {t("apply_review_personal")}
                        </h3>
                        <button onClick={() => setCurrentStep(1)} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                          {t("apply_review_edit")} ✏️
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{t("apply_review_fullname")}</p>
                          <p className="text-foreground font-medium mt-0.5">{fullName || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{t("apply_review_mobile")}</p>
                          <p className="text-foreground font-medium mt-0.5">{mobile ? `+91 ${mobile}` : "—"}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{t("apply_review_aadhaar")}</p>
                          <p className="text-foreground font-medium mt-0.5">{aadhaar ? `XXXX XXXX ${aadhaar.slice(-4)}` : "—"}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{t("apply_review_dob")}</p>
                          <p className="text-foreground font-medium mt-0.5">{dob ? new Date(dob).toLocaleDateString(t("common_lang_code"), { day: "numeric", month: "long", year: "numeric" }) : "—"}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{t("apply_review_address")}</p>
                          <p className="text-foreground font-medium mt-0.5">{address || "—"}{district ? `, ${district}, Telangana` : ""}</p>
                        </div>
                      </div>
                    </div>

                    <hr className="border-border" />

                    {/* Documents Review */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-foreground flex items-center gap-2">
                          <span className="h-5 w-1 bg-primary rounded-full" /> {t("apply_review_docs")}
                        </h3>
                        <button onClick={() => setCurrentStep(2)} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                          {t("apply_review_edit")} ✏️
                        </button>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {[
                          { key: "aadhaar", label: "Aadhaar_Card.pdf" },
                          { key: "income", label: "Income_Certificate.pdf" },
                          { key: "community", label: "Community_Cert.pdf" },
                        ].map(doc => (
                          <div key={doc.key} className="flex items-center gap-3 bg-muted rounded-xl p-3">
                            <FileText className="h-5 w-5 text-primary shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {uploadedDocs[doc.key]?.name || doc.label}
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                VERIFIED • {uploadedDocs[doc.key]?.size || "1.2 MB"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr className="border-border" />

                    {/* Certification */}
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={certified}
                        onCheckedChange={(v) => setCertified(v === true)}
                        className="mt-0.5"
                      />
                      <div>
                        <p className="font-semibold text-sm text-foreground">{t("apply_certify_label")}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t("apply_certify_desc")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Right sidebar - Trustee Guide */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <TrusteeGuide />

              {currentStep === 3 && (
                <div className="mt-4 bg-muted rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{t("apply_submission_tip_title")}</p>
                  <p className="text-sm text-foreground">
                    {t("apply_submission_tip_desc")}
                  </p>
                  <Button variant="outline" size="sm" className="w-full mt-3 uppercase tracking-wider text-xs font-bold">
                    {t("apply_call_support")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation bar */}
      <div className="sticky bottom-0 bg-card border-t border-border py-4 z-40">
        <div className="container flex items-center justify-between">
          <button
            onClick={() => currentStep > 0 && setCurrentStep(s => s - 1)}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t("apply_back")}
          </button>

          <button className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground transition-colors">
            <Save className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {currentStep === 3 ? t("apply_save_short") : t("apply_save")}
            </span>
          </button>

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(s => s + 1)}
              disabled={!canProceed()}
              className="min-w-[200px] font-semibold"
            >
              {t("apply_next_prefix")} {stepLabels[currentStep + 1]?.toUpperCase()} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!certified}
              className="min-w-[200px] font-semibold"
            >
              {t("apply_final_submit")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apply;
