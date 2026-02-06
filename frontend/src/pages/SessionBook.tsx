import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import type PageProps from "@/PageProps";

const apiUrl = import.meta.env.VITE_GOOGLE_API;

interface SessionFormData {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  role: string;
  products: string[];
  delivery_date: string;
  beta_updates: string;
  communication: string;
  website_url: string;
}

// Simple email format validation
const validateEmail = (email: string): { isValid: boolean; error: string } => {
  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true, error: "" };
};

const SessionBook = ({pageView}:PageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [sessionData, setSessionData] = useState<SessionFormData>({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    role: "",
    products: [],
    delivery_date: "",
    beta_updates: "",
    communication: "",
    website_url: "",
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSessionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setSessionData((prev) => ({ ...prev, email }));
    setEmailError("");

    // Only validate if email looks complete
    if (email.includes('@') && email.includes('.')) {
      const validation = validateEmail(email);
      if (!validation.isValid) {
        setEmailError(validation.error);
      }
    }
  };

  const handleGenericToggle = (
    field: keyof SessionFormData,
    item: string,
    checked: boolean,
  ) => {
    setSessionData((prev) => {
      const currentValues = prev[field] as string[];

      return {
        ...prev,
        [field]: checked
          ? [...currentValues, item]
          : currentValues.filter((value) => value !== item),
      };
    });
  };

  // Comprehensive form validation
  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Name validation
    if (!sessionData.name.trim()) {
      errors.push("Name is required");
    } else if (sessionData.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters");
    }

    // Email validation
    if (!sessionData.email.trim()) {
      errors.push("Email is required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sessionData.email)) {
        errors.push("Please enter a valid email address");
      }
    }

    // Phone validation
    if (!sessionData.phone.trim()) {
      errors.push("Phone number is required");
    } else if (sessionData.phone.trim().length < 10) {
      errors.push("Please enter a valid phone number");
    }

    // Company name validation
    if (!sessionData.company_name.trim()) {
      errors.push("Company name is required");
    }

    // Role validation
    if (!sessionData.role) {
      errors.push("Please select your role");
    }

    // Products validation
    if (sessionData.products.length === 0) {
      errors.push("Please select at least one product");
    }

    // Delivery date validation
    if (!sessionData.delivery_date) {
      errors.push("Please select when you'd like to start using the products");
    }

    // Beta updates validation
    if (!sessionData.beta_updates) {
      errors.push("Please specify if you'd like to receive beta updates");
    }

    // Communication preference validation
    if (!sessionData.communication) {
      errors.push("Please select a preferred communication method");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Honeypot check (bot detection)
    if (sessionData.website_url) {
      console.warn("Bot detected!");
      return; 
    }

    // Validate form
    const validation = validateForm();
    if (!validation.isValid) {
      toast.error("Please complete all required fields", {
        description: validation.errors[0]
      });
      return;
    }

    // Email validation
    const emailValidation = validateEmail(sessionData.email);
    if (!emailValidation.isValid) {
      toast.error("Invalid email address", {
        description: emailValidation.error
      });
      return;
    }

    setIsLoading(true);

    try {
      await fetch(apiUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionData),
      });

      toast.success("Waitlist joined successfully", {
        description: "We'll be in touch soon!"
      });
      
      // Reset form
      setSessionData({
        name: "",
        email: "",
        phone: "",
        company_name: "",
        role: "",
        products: [],
        delivery_date: "",
        beta_updates: "",
        communication: "",
        website_url: "",
      });
      
      pageView?.("mainView");
      
    } catch (error) {
      console.error("submission failed:", error);
      toast.error("Something went wrong", {
        description: "Please try again later"
      });
    } finally{
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto flex items-center justify-center mb-4 mt-2">
        <Card className="w-full max-w-2xl pt-2 lg:max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Cloudora Waitlist Form</CardTitle>
            <CardDescription>
              Sign up to use our effective, solution-oriented software that will
              simplify work and amplify your impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateSession} className="space-y-6 pb-3">
              {/* Basic Information Section */}
              <div className="space-y-4 border p-4 mt-4 rounded-lg bg-slate-50/50">
                <div className="col-span-full border-b pb-2 mb-2">
                  <Label className="text-base font-bold text-gray-900">
                    Personal Details
                  </Label>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Honeypot field - hidden from users */}
                  <div className="hidden" aria-hidden="true">
                    <Input
                      type="text"
                      name="website_url"
                      tabIndex={-1}
                      autoComplete="off"
                      onChange={handleFormChange}
                      value={sessionData.website_url || ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-1">
                      Name <span className="text-destructive text-sm">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g., John Doe"
                      required
                      value={sessionData.name}
                      onChange={handleFormChange}
                      className="focus-visible:ring-orange-500"
                      minLength={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@gmail.com"
                      name="email"
                      onChange={handleEmailChange}
                      required
                      value={sessionData.email}
                      className={emailError ? "border-red-500" : ""}
                    />
                    {emailError && (
                      <p className="text-xs text-red-500 mt-1">{emailError}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+254 712345678"
                      name="phone"
                      onChange={handleFormChange}
                      required
                      value={sessionData.phone}
                      minLength={10}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company_name">
                      Company name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="company_name"
                      type="text"
                      placeholder="e.g., Acme Corporation"
                      name="company_name"
                      onChange={handleFormChange}
                      required
                      value={sessionData.company_name}
                    />
                  </div>
                </div>
                
                {/* Role Radio Group */}
                <div className="space-y-4 p-4 border rounded-lg bg-slate-50/50">
                  <div className="col-span-full border-b pb-2 mb-2">
                    <Label className="text-base font-bold text-gray-900">
                      Your Role <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  <RadioGroup
                    value={sessionData.role}
                    onValueChange={(value) =>
                      setSessionData((prev) => ({ ...prev, role: value }))
                    }
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {[
                      { id: "owner", label: "Owner/Founder" },
                      { id: "manager", label: "Manager" },
                      { id: "employee", label: "Employee" },
                      { id: "student", label: "Student" },
                      { id: "other", label: "Other" },
                    ].map((role) => (
                      <div
                        key={role.id}
                        className={`relative flex items-center space-x-3 p-0 rounded-md 
                        border transition-all cursor-pointer hover:bg-orange-100
                        ${
                          sessionData.role === role.id
                            ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <Label
                          htmlFor={role.id}
                          className="flex items-center w-full h-full p-4 cursor-pointer font-medium text-slate-700"
                        >
                          <RadioGroupItem
                            value={role.id}
                            id={role.id}
                            className="mr-3"
                          />
                          {role.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {(sessionData.role === "other" ||
                    sessionData.role.startsWith("other:")) && (
                    <Input
                      placeholder="Please specify your role..."
                      className="mt-2 transition-all duration-300"
                      required
                      value={
                        sessionData.role.startsWith("other:")
                          ? sessionData.role.replace("other: ", "")
                          : ""
                      }
                      onChange={(e) =>
                        setSessionData((prev) => ({
                          ...prev,
                          role: `other: ${e.target.value}`,
                        }))
                      }
                    />
                  )}
                </div>

                {/* Products Checkbox Group */}
                <div className="space-y-4 border rounded-lg bg-slate-50/50 p-4">
                  <div className="col-span-full border-b pb-2 mb-2">
                    <Label className="text-base font-bold text-gray-900">
                      Product Details <span className="text-destructive">*</span>
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">Select at least one product</p>
                  </div>
                  <div className="grid gap-3">
                    {[
                      "Booking System",
                      "MPESA QR",
                      "LMS",
                      "Inventory",
                      "Rent Tracking",
                    ].map((item) => {
                      const isSelected = sessionData.products.includes(item);
                      return (
                        <div
                          key={item}
                          className={`rounded-md border transition-all shadow-sm hover:bg-orange-100 ${
                            isSelected
                              ? "border-orange-500 bg-orange-50"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <Label
                            htmlFor={item}
                            className="flex items-center space-x-3 p-4 cursor-pointer w-full"
                          >
                            <Checkbox
                              className={`
                                  data-[state=checked]:bg-orange-500
                                  data-[state=checked]:border-white border-orange-400
                                `}
                              id={item}
                              checked={isSelected}
                              onCheckedChange={(checked) =>
                                handleGenericToggle("products", item, !!checked)
                              }
                            />
                            <span className="text-sm font-medium leading-none">
                              {item}
                            </span>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Date Radio Group */}
                <div className="space-y-4 border rounded-lg bg-slate-50/50 p-4">
                  <div className="col-span-full border-b pb-2 mb-2">
                    <Label className="text-base font-bold text-gray-900">
                      How soon would you like to start using these products?{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  <RadioGroup
                    value={sessionData.delivery_date}
                    onValueChange={(value) =>
                      setSessionData((prev) => ({
                        ...prev,
                        delivery_date: value,
                      }))
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    <div
                      className={`relative flex items-center rounded-md border transition-all
                        ${
                          sessionData.delivery_date === "immediately"
                            ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                      <Label
                        htmlFor="immediately"
                        className="flex items-center w-full p-4 cursor-pointer font-medium"
                      >
                        <RadioGroupItem
                          value="immediately"
                          id="immediately"
                          className="mr-3"
                        />
                        Immediately
                      </Label>
                    </div>

                    <div
                      className={`relative flex items-center rounded-md border transition-all
                        ${
                          sessionData.delivery_date === "within-1-3-months"
                            ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                      <Label
                        htmlFor="within-1-3-months"
                        className="flex items-center w-full p-4 cursor-pointer font-medium"
                      >
                        <RadioGroupItem
                          value="within-1-3-months"
                          id="within-1-3-months"
                          className="mr-3"
                        />
                        Within 1-3 months
                      </Label>
                    </div>

                    <div
                      className={`relative flex items-center rounded-md border transition-all
                        ${
                          sessionData.delivery_date === "just-exploring"
                            ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                    >
                      <Label
                        htmlFor="just-exploring"
                        className="flex items-center w-full p-4 cursor-pointer font-medium"
                      >
                        <RadioGroupItem
                          value="just-exploring"
                          id="just-exploring"
                          className="mr-3"
                        />
                        Just Exploring
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Beta Updates Radio Group */}
                <div className="space-y-4 p-4 border rounded-lg bg-slate-50/50">
                  <div className="col-span-full border-b pb-2 mb-2">
                    <Label className="text-base font-semibold">
                      Would you like to receive beta updates and early access?{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  <RadioGroup
                    value={sessionData.beta_updates}
                    onValueChange={(value) =>
                      setSessionData((prev) => ({
                        ...prev,
                        beta_updates: value,
                      }))
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    <div
                      className={`relative flex items-center rounded-md border transition-all
                    ${
                      sessionData.beta_updates === "yes"
                        ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                    >
                      <Label
                        htmlFor="beta-yes"
                        className="flex items-center w-full p-4 cursor-pointer font-medium"
                      >
                        <RadioGroupItem
                          value="yes"
                          id="beta-yes"
                          className="mr-3"
                        />
                        Yes
                      </Label>
                    </div>

                    <div
                      className={`relative flex items-center rounded-md border transition-all
                    ${
                      sessionData.beta_updates === "no"
                        ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                    >
                      <Label
                        htmlFor="beta-no"
                        className="flex items-center w-full p-4 cursor-pointer font-medium"
                      >
                        <RadioGroupItem
                          value="no"
                          id="beta-no"
                          className="mr-3"
                        />
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Communication Preference Radio Group */}
                <div className="space-y-4 p-4 border rounded-lg bg-slate-50/50">
                  <div className="col-span-full border-b pb-2 mb-2">
                    <Label className="text-base font-semibold">
                      What is your preferred communication method?{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                  </div>
                  <div className="grid gap-3 lg:grid-cols-auto md:grid-cols-2">
                    {[
                      { id: "comm-email", label: "Email" },
                      { id: "comm-whatsapp", label: "Whatsapp" },
                      { id: "comm-phone", label: "Phone" },
                      { id: "comm-sms", label: "SMS" },
                      { id: "comm-other", label: "Other" },
                    ].map((item) => {
                      const isSelected = sessionData.communication.includes(
                        item.label,
                      );
                      const isOtherSelected =
                        sessionData.communication.includes("Other");
                      const isDisabled =
                        isOtherSelected && item.label !== "Other";

                      return (
                        <div
                          key={item.id}
                          className={`rounded-md border transition-all shadow-sm hover:bg-orange-100 
                              ${
                                isSelected
                                  ? "border-orange-500 bg-orange-50"
                                  : "border-slate-200 bg-white"
                              }
                              ${
                                isDisabled
                                  ? "opacity-50 cursor-not-allowed bg-slate-50"
                                  : "hover:bg-orange-100"
                              }
                              
                              `}
                        >
                          <Label
                            htmlFor={item.id}
                            className={`flex items-center space-x-3 p-4 w-full
                              ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
                            `}
                          >
                            <Checkbox
                              className={`data-[state=checked]:bg-orange-500
                                data-[state=checked]:border-white border-orange-400`}
                              id={item.id}
                              disabled={isDisabled}
                              checked={isSelected}
                              onCheckedChange={(checked) =>
                                handleGenericToggle(
                                  "communication",
                                  item.label,
                                  !!checked,
                                )
                              }
                            />
                            <span className="text-sm font-medium leading-none">
                              {item.label}
                            </span>
                          </Label>
                        </div>
                      );
                    })}
                  </div>

                  {sessionData.communication.includes("Other") && (
                    <div className="mt-2 animate-in fade-in slide-in-from-top-1">
                      <Label className="text-xs text-slate-500 mb-1.5 block">
                        Please Specify
                      </Label>
                      <Input
                        placeholder="Please Specify (e.g., Slack, Telegram...)"
                        className="border-orange-200 focus:border-orange-500"
                        required
                        onChange={(e) =>
                          setSessionData((prev) => ({
                            ...prev,
                            other_comm_details: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="outline"
                    className="order-3 sm:order-1"
                    onClick={() => {
                      if (
                        Object.values(sessionData).some((val) =>
                          Array.isArray(val) ? val.length > 0 : val !== "",
                        )
                      ) {
                        if (
                          confirm("Are you sure you want to clear all fields?")
                        ) {
                          setSessionData({
                            name: "",
                            email: "",
                            phone: "",
                            company_name: "",
                            role: "",
                            products: [],
                            delivery_date: "",
                            beta_updates: "",
                            communication: "",
                            website_url: "",
                          });
                          setEmailError("");
                        }
                      }
                    }}
                  >
                    Clear Form
                  </Button>

                  <Link to={"/"} className="order-2 sm:order-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      disabled={isLoading}
                      onClick={() => pageView?.("mainView")}
                    >
                      Cancel
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    disabled={isLoading || !!emailError}
                    className="order-1 sm:order-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2">Submitting...</span>
                        <span className="animate-spin">⏳</span>
                      </>
                    ) : (
                      "Join Waitlist"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <Toaster />
        </Card>
      </div>
    </>
  );
};

export default SessionBook;