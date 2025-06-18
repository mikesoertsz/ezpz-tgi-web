import React, { useState } from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Trash2,
  Edit,
  CheckCircle,
  Circle,
  Coins,
} from "lucide-react";
import DocumentPage from "./DocumentPage";
import ReportHeader from "./ReportHeader";
import SocialMediaSection from "./sections/SocialMediaSection";
import TeamManagementModal from "./TeamManagementModal";
import Header from "./layout/Header";
import SubNavigation from "./layout/SubNavigation";
import Sidebar from "./layout/Sidebar";
import { generatePersonData } from "../utils/dataGenerator";
import Image from "next/image";

interface BibliographyItem {
  id: string;
  source: string;
  url?: string;
  type: "url" | "document" | "database";
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  sectionId: string;
  approvedSections: Record<string, boolean>;
  onApprovalToggle: (sectionId: string) => void;
  bibliography: BibliographyItem[];
  onRefresh: (sectionId: string) => void;
  isRefreshing: boolean;
  onEdit: (sectionId: string) => void;
  isEditing: boolean;
  creditCost: number;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isOpen,
  onToggle,
  sectionId,
  approvedSections,
  onApprovalToggle,
  bibliography,
  onRefresh,
  isRefreshing,
  onEdit,
  isEditing,
  creditCost,
}) => {
  const [bibliographyOpen, setBibliographyOpen] = useState(false);
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);
  const isApproved = approvedSections[sectionId] || false;

  const handleRefresh = () => {
    onRefresh(sectionId);
  };

  const handleCopy = () => {
    console.log(`Copying ${title}...`);
  };

  const handleClear = () => {
    console.log(`Clearing ${title}...`);
  };

  const handleEdit = () => {
    onEdit(sectionId);
  };

  const handleApprove = () => {
    onApprovalToggle(sectionId);
  };

  const handleSourceClick = (item: BibliographyItem) => {
    if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  return (
    <div className="mb-3 bg-white border border-gray-200 rounded-lg">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-4 transition-colors hover:bg-gray-50"
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="mb-3">{children}</div>

          {/* Bibliography Section */}
          <div className="border-t border-gray-100 pt-3 mb-3">
            <button
              onClick={() => setBibliographyOpen(!bibliographyOpen)}
              className="flex items-center space-x-2 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span>Bibliography</span>
              {bibliographyOpen ? (
                <ChevronUp size={12} />
              ) : (
                <ChevronDown size={12} />
              )}
            </button>

            {bibliographyOpen && (
              <div className="mt-2 space-y-1">
                {bibliography.map((item) => (
                  <div
                    key={item.id}
                    className={`text-xs p-2 rounded transition-colors cursor-pointer ${
                      hoveredSource === item.id
                        ? "bg-yellow-100 border border-yellow-300"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                    onClick={() => handleSourceClick(item)}
                    onMouseEnter={() => setHoveredSource(item.id)}
                    onMouseLeave={() => setHoveredSource(null)}
                  >
                    <span className="text-gray-700">{item.source}</span>
                    {item.url && <span className="text-blue-600 ml-1">↗</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with action buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={`p-1.5 rounded-md transition-all duration-300 ${
                    isRefreshing
                      ? "bg-green-100 text-green-600 cursor-not-allowed"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                  title="Refresh"
                >
                  <RefreshCw
                    size={14}
                    className={`${
                      isRefreshing
                        ? "animate-spin text-green-600"
                        : "text-gray-600"
                    } transition-colors duration-300`}
                  />
                </button>
                <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-md">
                  <Coins size={10} className="text-gray-500" />
                  <span className="text-xs text-gray-600 font-medium">
                    {creditCost}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                title="Copy"
              >
                <Copy size={14} className="text-gray-600" />
              </button>
              <button
                onClick={handleClear}
                className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                title="Clear"
              >
                <Trash2 size={14} className="text-gray-600" />
              </button>
              <button
                onClick={handleEdit}
                className={`p-1.5 rounded-md transition-colors ${
                  isEditing
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                title={isEditing ? "Exit Edit Mode" : "Edit"}
              >
                <Edit
                  size={14}
                  className={isEditing ? "text-blue-600" : "text-gray-600"}
                />
              </button>
            </div>

            <button
              onClick={handleApprove}
              className={`p-1.5 rounded-md transition-colors ${
                isApproved
                  ? "hover:bg-green-50 text-green-600"
                  : "hover:bg-gray-100 text-gray-400"
              }`}
              title={isApproved ? "Content Approved" : "Approve Content"}
            >
              {isApproved ? (
                <CheckCircle size={14} className="text-green-600" />
              ) : (
                <Circle size={14} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Terminal-like text animation component
const TerminalText: React.FC<{
  text: string;
  isAnimating: boolean;
  delay?: number;
}> = ({ text, isAnimating, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isTyping, setIsTyping] = useState(false);

  React.useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setDisplayText("");

        let currentIndex = 0;
        const typeInterval = setInterval(() => {
          if (currentIndex < text.length) {
            setDisplayText(text.substring(0, currentIndex + 1));
            currentIndex++;
          } else {
            clearInterval(typeInterval);
            setIsTyping(false);
          }
        }, 50);

        return () => clearInterval(typeInterval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, text, delay]);

  return (
    <span
      className={`${
        isTyping ? "bg-blue-50" : ""
      } transition-colors duration-200`}
    >
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Editable text component
const EditableText: React.FC<{
  value: string;
  isEditing: boolean;
  onSave: (newValue: string) => void;
  className?: string;
}> = ({ value, isEditing, onSave, className = "" }) => {
  const [editValue, setEditValue] = useState(value);

  React.useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSave(editValue);
    } else if (e.key === "Escape") {
      setEditValue(value);
    }
  };

  const handleBlur = () => {
    if (editValue !== value) {
      onSave(editValue);
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
        className={`bg-blue-50 border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        style={{ minWidth: "200px" }}
      />
    );
  }

  return <span className={className}>{value}</span>;
};

const IntelligenceBriefing: React.FC = () => {
  const [personData, setPersonData] = useState(generatePersonData());
  const [showTeamManagement, setShowTeamManagement] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("home");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    socialMedia: false,
    financial: false,
    business: false,
    property: false,
    legal: false,
    online: false,
  });

  // State for tracking approved sections
  const [approvedSections, setApprovedSections] = useState<
    Record<string, boolean>
  >({});

  // State for tracking refreshing sections
  const [refreshingSections, setRefreshingSections] = useState<
    Record<string, boolean>
  >({});

  // State for tracking editing sections
  const [editingSections, setEditingSections] = useState<
    Record<string, boolean>
  >({});

  // Credit costs for each section (random values between 1.0 and 4.0)
  const [creditCosts] = useState<Record<string, number>>({
    personal: Math.round((Math.random() * 3 + 1) * 10) / 10,
    socialMedia: Math.round((Math.random() * 3 + 1) * 10) / 10,
    financial: Math.round((Math.random() * 3 + 1) * 10) / 10,
    business: Math.round((Math.random() * 3 + 1) * 10) / 10,
    property: Math.round((Math.random() * 3 + 1) * 10) / 10,
    legal: Math.round((Math.random() * 3 + 1) * 10) / 10,
    online: Math.round((Math.random() * 3 + 1) * 10) / 10,
  });

  const socialIcons = [
    { Icon: Twitter, active: true },
    { Icon: Linkedin, active: true },
    { Icon: Github, active: false },
    { Icon: Facebook, active: true },
    { Icon: Instagram, active: true },
    { Icon: Mail, active: true },
  ];

  // Bibliography data for each section
  const bibliographies = {
    personal: [
      {
        id: "linkedin-profile",
        source: "LinkedIn Profile",
        url: "https://linkedin.com/in/alexander-mercer",
        type: "url" as const,
      },
      {
        id: "passport-records",
        source: "US Passport Records Database",
        type: "database" as const,
      },
      {
        id: "university-records",
        source: "Harvard Business School Alumni Directory",
        url: "https://hbs.edu/alumni",
        type: "url" as const,
      },
      {
        id: "mit-records",
        source: "MIT Alumni Database",
        type: "database" as const,
      },
    ],
    socialMedia: [
      {
        id: "twitter-api",
        source: "Twitter API Data",
        url: "https://twitter.com/alexmercer_nyc",
        type: "url" as const,
      },
      {
        id: "linkedin-scrape",
        source: "LinkedIn",
        url: "https://linkedin.com/in/alexander-mercer-consulting",
        type: "url" as const,
      },
      {
        id: "facebook-osint",
        source: "Facebook",
        url: "https://facebook.com/Alexander.J.Mercer",
        type: "url" as const,
      },
      {
        id: "instagram-posts",
        source: "Instagram",
        url: "https://instagram.com/amercer_global",
        type: "url" as const,
      },
    ],
    financial: [
      {
        id: "sec-filings",
        source: "SEC Filing 10-K Forms",
        url: "https://sec.gov/edgar",
        type: "url" as const,
      },
      {
        id: "bank-statements",
        source: "Financial Institution Reports",
        type: "document" as const,
      },
      {
        id: "crypto-wallets",
        source: "Blockchain Analysis Report",
        type: "document" as const,
      },
      {
        id: "offshore-leaks",
        source: "Panama Papers Database",
        url: "https://offshoreleaks.icij.org",
        type: "url" as const,
      },
    ],
    business: [
      {
        id: "corp-filings",
        source: "Delaware Corporate Registry",
        url: "https://corp.delaware.gov",
        type: "url" as const,
      },
      {
        id: "uk-companies",
        source: "UK Companies House",
        url: "https://companieshouse.gov.uk",
        type: "url" as const,
      },
      {
        id: "annual-reports",
        source: "Company Annual Reports",
        type: "document" as const,
      },
      {
        id: "board-minutes",
        source: "Board Meeting Minutes",
        type: "document" as const,
      },
    ],
    property: [
      {
        id: "nyc-records",
        source: "NYC Property Records",
        url: "https://nyc.gov/property",
        type: "url" as const,
      },
      {
        id: "uk-land-registry",
        source: "UK Land Registry",
        url: "https://landregistry.gov.uk",
        type: "url" as const,
      },
      {
        id: "dubai-property",
        source: "Dubai Land Department",
        type: "database" as const,
      },
      {
        id: "trust-documents",
        source: "Family Trust Documentation",
        type: "document" as const,
      },
    ],
    legal: [
      {
        id: "court-records",
        source: "Federal Court Records",
        url: "https://pacer.gov",
        type: "url" as const,
      },
      {
        id: "sec-enforcement",
        source: "SEC Enforcement Actions",
        url: "https://sec.gov/enforce",
        type: "url" as const,
      },
      {
        id: "swiss-investigation",
        source: "Swiss Federal Prosecutor Files",
        type: "document" as const,
      },
      {
        id: "civil-suits",
        source: "State Court Filings",
        type: "database" as const,
      },
    ],
    online: [
      {
        id: "social-media",
        source: "Social Media Platforms",
        type: "url" as const,
      },
      {
        id: "domain-records",
        source: "WHOIS Database",
        url: "https://whois.net",
        type: "url" as const,
      },
      {
        id: "email-headers",
        source: "Email Metadata Analysis",
        type: "document" as const,
      },
      {
        id: "digital-forensics",
        source: "Digital Forensics Report",
        type: "document" as const,
      },
    ],
  };

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleApprovalToggle = (sectionId: string) => {
    setApprovedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleRefresh = (sectionId: string) => {
    setRefreshingSections((prev) => ({ ...prev, [sectionId]: true }));

    // Simulate AI research duration (3-5 seconds)
    const duration = Math.random() * 2000 + 3000;

    setTimeout(() => {
      setRefreshingSections((prev) => ({ ...prev, [sectionId]: false }));
    }, duration);
  };

  const handleEdit = (sectionId: string) => {
    setEditingSections((prev) => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleSaveField = (
    field: string,
    value: string,
    section?: string,
    index?: number
  ) => {
    setPersonData((prev) => {
      const newData = { ...prev };

      if (section === "businesses" && index !== undefined) {
        newData.businesses[index] = {
          ...newData.businesses[index],
          [field]: value,
        };
      } else if (section === "properties" && index !== undefined) {
        newData.properties[index] = {
          ...newData.properties[index],
          [field]: value,
        };
      } else if (section === "financialAssets") {
        newData.financialAssets = {
          ...newData.financialAssets,
          [field]: value,
        };
      } else if (section === "legal") {
        newData.legal = { ...newData.legal, [field]: value };
      } else if (section === "onlinePresence") {
        newData.onlinePresence = { ...newData.onlinePresence, [field]: value };
      } else if (field === "aliases" || field === "languages") {
        (newData as Record<string, unknown>)[field] = value.split(", ");
      } else {
        (newData as Record<string, unknown>)[field] = value;
      }

      return newData;
    });
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Navigation Bar */}
      <Header onOpenTeamManagement={() => setShowTeamManagement(true)} />

      {/* Sub Navigation Bar */}
      <SubNavigation />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Menu */}
        <Sidebar
          activeMenuItem={activeMenuItem}
          setActiveMenuItem={setActiveMenuItem}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            <DocumentPage>
              <ReportHeader
                caseNumber={personData.caseNumber}
                classification={personData.classification}
                subject={personData.name}
                dateCompiled={personData.dateCompiled}
              />

              <div className="mb-6">
                <div className="flex gap-6 mb-6">
                  <div className="flex-grow">
                    <h2 className="mb-2 text-lg font-medium text-gray-900">
                      {personData.name}
                    </h2>
                    <div className="flex gap-3 mb-2">
                      {socialIcons.map(({ Icon, active }, index) => (
                        <Icon
                          key={index}
                          size={16}
                          className={active ? "text-gray-700" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <Image
                    src="/1723734329689.jpg"
                    alt="Subject"
                    className="object-cover border border-gray-200 rounded-lg w-28 h-36"
                    width={112}
                    height={144}
                  />
                </div>

                <div className="space-y-3">
                  <div id="personal">
                    <Accordion
                      title="Personal Information"
                      isOpen={openSections.personal}
                      onToggle={() => toggleSection("personal")}
                      sectionId="personal"
                      approvedSections={approvedSections}
                      onApprovalToggle={handleApprovalToggle}
                      bibliography={bibliographies.personal}
                      onRefresh={handleRefresh}
                      isRefreshing={refreshingSections.personal || false}
                      onEdit={handleEdit}
                      isEditing={editingSections.personal || false}
                      creditCost={creditCosts.personal}
                    >
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-600">DOB:</span>{" "}
                          {editingSections.personal ? (
                            <EditableText
                              value={personData.dob}
                              isEditing={true}
                              onSave={(value) => handleSaveField("dob", value)}
                            />
                          ) : (
                            <TerminalText
                              text={personData.dob}
                              isAnimating={refreshingSections.personal || false}
                              delay={200}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">Nationality:</span>{" "}
                          {editingSections.personal ? (
                            <EditableText
                              value={personData.nationality}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField("nationality", value)
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.nationality}
                              isAnimating={refreshingSections.personal || false}
                              delay={400}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">Known Aliases:</span>{" "}
                          {editingSections.personal ? (
                            <EditableText
                              value={personData.aliases.join(", ")}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField("aliases", value)
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.aliases.join(", ")}
                              isAnimating={refreshingSections.personal || false}
                              delay={600}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">
                            Current Location:
                          </span>{" "}
                          {editingSections.personal ? (
                            <EditableText
                              value={personData.currentLocation}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField("currentLocation", value)
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.currentLocation}
                              isAnimating={refreshingSections.personal || false}
                              delay={800}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">Education:</span>{" "}
                          {editingSections.personal ? (
                            <EditableText
                              value={personData.education}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField("education", value)
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.education}
                              isAnimating={refreshingSections.personal || false}
                              delay={1000}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">Languages:</span>{" "}
                          {editingSections.personal ? (
                            <EditableText
                              value={personData.languages.join(", ")}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField("languages", value)
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.languages.join(", ")}
                              isAnimating={refreshingSections.personal || false}
                              delay={1200}
                            />
                          )}
                        </p>
                      </div>
                    </Accordion>
                  </div>

                  <div id="socialMedia">
                    <Accordion
                      title="Social Media"
                      isOpen={openSections.socialMedia}
                      onToggle={() => toggleSection("socialMedia")}
                      sectionId="socialMedia"
                      approvedSections={approvedSections}
                      onApprovalToggle={handleApprovalToggle}
                      bibliography={bibliographies.socialMedia}
                      onRefresh={handleRefresh}
                      isRefreshing={refreshingSections.socialMedia || false}
                      onEdit={handleEdit}
                      isEditing={editingSections.socialMedia || false}
                      creditCost={creditCosts.socialMedia}
                    >
                      <SocialMediaSection />
                    </Accordion>
                  </div>

                  <div id="financial">
                    <Accordion
                      title="Financial Assets"
                      isOpen={openSections.financial}
                      onToggle={() => toggleSection("financial")}
                      sectionId="financial"
                      approvedSections={approvedSections}
                      onApprovalToggle={handleApprovalToggle}
                      bibliography={bibliographies.financial}
                      onRefresh={handleRefresh}
                      isRefreshing={refreshingSections.financial || false}
                      onEdit={handleEdit}
                      isEditing={editingSections.financial || false}
                      creditCost={creditCosts.financial}
                    >
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-600">Net Worth:</span>{" "}
                          {editingSections.financial ? (
                            <EditableText
                              value={personData.financialAssets.netWorth}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "netWorth",
                                  value,
                                  "financialAssets"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.financialAssets.netWorth}
                              isAnimating={
                                refreshingSections.financial || false
                              }
                              delay={200}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">Bank Accounts:</span>{" "}
                          {editingSections.financial ? (
                            <EditableText
                              value={personData.financialAssets.bankAccounts}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "bankAccounts",
                                  value,
                                  "financialAssets"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.financialAssets.bankAccounts}
                              isAnimating={
                                refreshingSections.financial || false
                              }
                              delay={400}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">Investments:</span>{" "}
                          {editingSections.financial ? (
                            <EditableText
                              value={personData.financialAssets.investments}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "investments",
                                  value,
                                  "financialAssets"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.financialAssets.investments}
                              isAnimating={
                                refreshingSections.financial || false
                              }
                              delay={600}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">
                            Crypto Holdings:
                          </span>{" "}
                          {editingSections.financial ? (
                            <EditableText
                              value={personData.financialAssets.cryptoHoldings}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "cryptoHoldings",
                                  value,
                                  "financialAssets"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.financialAssets.cryptoHoldings}
                              isAnimating={
                                refreshingSections.financial || false
                              }
                              delay={800}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">
                            Offshore Accounts:
                          </span>{" "}
                          {editingSections.financial ? (
                            <EditableText
                              value={
                                personData.financialAssets.offshoreAccounts
                              }
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "offshoreAccounts",
                                  value,
                                  "financialAssets"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.financialAssets.offshoreAccounts}
                              isAnimating={
                                refreshingSections.financial || false
                              }
                              delay={1000}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">Annual Income:</span>{" "}
                          {editingSections.financial ? (
                            <EditableText
                              value={personData.financialAssets.annualIncome}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "annualIncome",
                                  value,
                                  "financialAssets"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.financialAssets.annualIncome}
                              isAnimating={
                                refreshingSections.financial || false
                              }
                              delay={1200}
                            />
                          )}
                        </p>
                      </div>
                    </Accordion>
                  </div>

                  <div id="business">
                    <Accordion
                      title="Business Interests"
                      isOpen={openSections.business}
                      onToggle={() => toggleSection("business")}
                      sectionId="business"
                      approvedSections={approvedSections}
                      onApprovalToggle={handleApprovalToggle}
                      bibliography={bibliographies.business}
                      onRefresh={handleRefresh}
                      isRefreshing={refreshingSections.business || false}
                      onEdit={handleEdit}
                      isEditing={editingSections.business || false}
                      creditCost={creditCosts.business}
                    >
                      <div className="space-y-4 text-sm">
                        {personData.businesses.map((business, index) => (
                          <div
                            key={index}
                            className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                          >
                            <p className="font-medium text-gray-900">
                              {editingSections.business ? (
                                <EditableText
                                  value={business.name}
                                  isEditing={true}
                                  onSave={(value) =>
                                    handleSaveField(
                                      "name",
                                      value,
                                      "businesses",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <TerminalText
                                  text={business.name}
                                  isAnimating={
                                    refreshingSections.business || false
                                  }
                                  delay={200 + index * 400}
                                />
                              )}
                            </p>
                            <p className="text-gray-600">
                              Role:{" "}
                              {editingSections.business ? (
                                <EditableText
                                  value={business.role}
                                  isEditing={true}
                                  onSave={(value) =>
                                    handleSaveField(
                                      "role",
                                      value,
                                      "businesses",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <TerminalText
                                  text={business.role}
                                  isAnimating={
                                    refreshingSections.business || false
                                  }
                                  delay={300 + index * 400}
                                />
                              )}
                            </p>
                            <p className="text-gray-600">
                              Location:{" "}
                              {editingSections.business ? (
                                <EditableText
                                  value={business.location}
                                  isEditing={true}
                                  onSave={(value) =>
                                    handleSaveField(
                                      "location",
                                      value,
                                      "businesses",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <TerminalText
                                  text={business.location}
                                  isAnimating={
                                    refreshingSections.business || false
                                  }
                                  delay={400 + index * 400}
                                />
                              )}
                            </p>
                            <p className="text-gray-600">
                              Est. Annual Revenue:{" "}
                              {editingSections.business ? (
                                <EditableText
                                  value={business.revenue}
                                  isEditing={true}
                                  onSave={(value) =>
                                    handleSaveField(
                                      "revenue",
                                      value,
                                      "businesses",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <TerminalText
                                  text={business.revenue}
                                  isAnimating={
                                    refreshingSections.business || false
                                  }
                                  delay={500 + index * 400}
                                />
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Accordion>
                  </div>

                  <div id="property">
                    <Accordion
                      title="Property Holdings"
                      isOpen={openSections.property}
                      onToggle={() => toggleSection("property")}
                      sectionId="property"
                      approvedSections={approvedSections}
                      onApprovalToggle={handleApprovalToggle}
                      bibliography={bibliographies.property}
                      onRefresh={handleRefresh}
                      isRefreshing={refreshingSections.property || false}
                      onEdit={handleEdit}
                      isEditing={editingSections.property || false}
                      creditCost={creditCosts.property}
                    >
                      <div className="space-y-4 text-sm">
                        {personData.properties.map((property, index) => (
                          <div
                            key={index}
                            className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                          >
                            <p className="font-medium text-gray-900">
                              {editingSections.property ? (
                                <EditableText
                                  value={property.address}
                                  isEditing={true}
                                  onSave={(value) =>
                                    handleSaveField(
                                      "address",
                                      value,
                                      "properties",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <TerminalText
                                  text={property.address}
                                  isAnimating={
                                    refreshingSections.property || false
                                  }
                                  delay={200 + index * 400}
                                />
                              )}
                            </p>
                            <p className="text-gray-600">
                              Type:{" "}
                              {editingSections.property ? (
                                <EditableText
                                  value={property.type}
                                  isEditing={true}
                                  onSave={(value) =>
                                    handleSaveField(
                                      "type",
                                      value,
                                      "properties",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <TerminalText
                                  text={property.type}
                                  isAnimating={
                                    refreshingSections.property || false
                                  }
                                  delay={300 + index * 400}
                                />
                              )}
                            </p>
                            <p className="text-gray-600">
                              Value:{" "}
                              {editingSections.property ? (
                                <EditableText
                                  value={property.value}
                                  isEditing={true}
                                  onSave={(value) =>
                                    handleSaveField(
                                      "value",
                                      value,
                                      "properties",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <TerminalText
                                  text={property.value}
                                  isAnimating={
                                    refreshingSections.property || false
                                  }
                                  delay={400 + index * 400}
                                />
                              )}
                            </p>
                            <p className="text-gray-600">
                              Ownership:{" "}
                              {editingSections.property ? (
                                <EditableText
                                  value={property.ownership}
                                  isEditing={true}
                                  onSave={(value) =>
                                    handleSaveField(
                                      "ownership",
                                      value,
                                      "properties",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <TerminalText
                                  text={property.ownership}
                                  isAnimating={
                                    refreshingSections.property || false
                                  }
                                  delay={500 + index * 400}
                                />
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Accordion>
                  </div>

                  <div id="legal">
                    <Accordion
                      title="Legal & Litigation"
                      isOpen={openSections.legal}
                      onToggle={() => toggleSection("legal")}
                      sectionId="legal"
                      approvedSections={approvedSections}
                      onApprovalToggle={handleApprovalToggle}
                      bibliography={bibliographies.legal}
                      onRefresh={handleRefresh}
                      isRefreshing={refreshingSections.legal || false}
                      onEdit={handleEdit}
                      isEditing={editingSections.legal || false}
                      creditCost={creditCosts.legal}
                    >
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-600">
                            Criminal Record:
                          </span>{" "}
                          {editingSections.legal ? (
                            <EditableText
                              value={personData.legal.criminalRecord}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "criminalRecord",
                                  value,
                                  "legal"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.legal.criminalRecord}
                              isAnimating={refreshingSections.legal || false}
                              delay={200}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">
                            Active Lawsuits:
                          </span>{" "}
                          {editingSections.legal ? (
                            <EditableText
                              value={personData.legal.activeLawsuits}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "activeLawsuits",
                                  value,
                                  "legal"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.legal.activeLawsuits}
                              isAnimating={refreshingSections.legal || false}
                              delay={400}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">
                            Regulatory Violations:
                          </span>{" "}
                          {editingSections.legal ? (
                            <EditableText
                              value={personData.legal.regulatoryViolations}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "regulatoryViolations",
                                  value,
                                  "legal"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.legal.regulatoryViolations}
                              isAnimating={refreshingSections.legal || false}
                              delay={600}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">Civil Cases:</span>{" "}
                          {editingSections.legal ? (
                            <EditableText
                              value={personData.legal.civilCases}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField("civilCases", value, "legal")
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.legal.civilCases}
                              isAnimating={refreshingSections.legal || false}
                              delay={800}
                            />
                          )}
                        </p>
                      </div>
                    </Accordion>
                  </div>

                  <div id="online">
                    <Accordion
                      title="Online Presence"
                      isOpen={openSections.online}
                      onToggle={() => toggleSection("online")}
                      sectionId="online"
                      approvedSections={approvedSections}
                      onApprovalToggle={handleApprovalToggle}
                      bibliography={bibliographies.online}
                      onRefresh={handleRefresh}
                      isRefreshing={refreshingSections.online || false}
                      onEdit={handleEdit}
                      isEditing={editingSections.online || false}
                      creditCost={creditCosts.online}
                    >
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-gray-600">Social Media:</span>{" "}
                          {editingSections.online ? (
                            <EditableText
                              value={personData.onlinePresence.socialMedia}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "socialMedia",
                                  value,
                                  "onlinePresence"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.onlinePresence.socialMedia}
                              isAnimating={refreshingSections.online || false}
                              delay={200}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">Email Accounts:</span>{" "}
                          {editingSections.online ? (
                            <EditableText
                              value={personData.onlinePresence.emailAccounts}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "emailAccounts",
                                  value,
                                  "onlinePresence"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.onlinePresence.emailAccounts}
                              isAnimating={refreshingSections.online || false}
                              delay={400}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">
                            Digital Footprint:
                          </span>{" "}
                          {editingSections.online ? (
                            <EditableText
                              value={personData.onlinePresence.digitalFootprint}
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "digitalFootprint",
                                  value,
                                  "onlinePresence"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={personData.onlinePresence.digitalFootprint}
                              isAnimating={refreshingSections.online || false}
                              delay={600}
                            />
                          )}
                        </p>
                        <p>
                          <span className="text-gray-600">
                            Communication Methods:
                          </span>{" "}
                          {editingSections.online ? (
                            <EditableText
                              value={
                                personData.onlinePresence.communicationMethods
                              }
                              isEditing={true}
                              onSave={(value) =>
                                handleSaveField(
                                  "communicationMethods",
                                  value,
                                  "onlinePresence"
                                )
                              }
                            />
                          ) : (
                            <TerminalText
                              text={
                                personData.onlinePresence.communicationMethods
                              }
                              isAnimating={refreshingSections.online || false}
                              delay={800}
                            />
                          )}
                        </p>
                      </div>
                    </Accordion>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  This document contains sensitive information and is intended
                  for authorized personnel only.
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs font-medium text-gray-900">
                    {personData.classification}
                  </p>
                  <p className="text-xs text-gray-500">Page 1 of 1</p>
                </div>
              </div>
            </DocumentPage>
          </div>
        </div>
      </div>

      {/* Team Management Modal */}
      <TeamManagementModal
        isOpen={showTeamManagement}
        onClose={() => setShowTeamManagement(false)}
      />
    </div>
  );
};

export default IntelligenceBriefing;
