import React, { useState } from "react";
import {
  X,
  Plus,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Edit2,
  Trash2,
  Mail,
  Calendar,
  MoreVertical,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "analyst" | "viewer";
  status: "active" | "pending" | "inactive";
  lastActive: string;
  joinDate: string;
  avatar: string;
}

interface TeamManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamManagementModal: React.FC<TeamManagementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"members" | "roles" | "settings">(
    "members"
  );
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "viewer" as const,
  });

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      role: "admin",
      status: "active",
      lastActive: "2 minutes ago",
      joinDate: "Jan 15, 2024",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      email: "marcus.r@example.com",
      role: "analyst",
      status: "active",
      lastActive: "1 hour ago",
      joinDate: "Feb 3, 2024",
      avatar:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      id: "3",
      name: "Emily Watson",
      email: "emily.watson@example.com",
      role: "viewer",
      status: "pending",
      lastActive: "Never",
      joinDate: "Mar 10, 2024",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david.kim@example.com",
      role: "analyst",
      status: "inactive",
      lastActive: "3 days ago",
      joinDate: "Dec 8, 2023",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
  ];

  const rolePermissions = {
    admin: {
      icon: ShieldAlert,
      color: "text-red-600",
      bgColor: "bg-red-50",
      permissions: [
        "Full system access",
        "User management",
        "Settings configuration",
        "Data export",
        "Report creation",
        "Case management",
      ],
    },
    analyst: {
      icon: ShieldCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      permissions: [
        "Report creation",
        "Case management",
        "Data analysis",
        "Limited export",
        "Collaboration tools",
      ],
    },
    viewer: {
      icon: Shield,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      permissions: [
        "View reports",
        "Basic search",
        "Comment on cases",
        "Export summaries",
      ],
    },
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      // In a real app, this would make an API call
      console.log("Adding member:", newMember);
      setNewMember({ name: "", email: "", role: "viewer" });
      setShowAddMember(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Team Management
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: "members", label: "Team Members" },
              { id: "roles", label: "Roles & Permissions" },
              { id: "settings", label: "Team Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "members" && (
            <div className="space-y-6">
              {/* Add Member Button */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Team Members
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage your team members and their access levels
                  </p>
                </div>
                <button
                  onClick={() => setShowAddMember(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Member</span>
                </button>
              </div>

              {/* Add Member Form */}
              {showAddMember && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Add New Team Member
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember({ ...newMember, name: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={newMember.email}
                      onChange={(e) =>
                        setNewMember({ ...newMember, email: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={newMember.role}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          role: e.target.value as any,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="viewer">Viewer</option>
                      <option value="analyst">Analyst</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 mt-4">
                    <button
                      onClick={() => setShowAddMember(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMember}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Send Invitation
                    </button>
                  </div>
                </div>
              )}

              {/* Members List */}
              <div className="space-y-3">
                {teamMembers.map((member) => {
                  const RoleIcon = rolePermissions[member.role].icon;
                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                              member.status === "active"
                                ? "bg-green-500"
                                : member.status === "pending"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {member.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {member.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <RoleIcon
                              size={16}
                              className={rolePermissions[member.role].color}
                            />
                            <span className="text-sm font-medium capitalize">
                              {member.role}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Last active: {member.lastActive}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit2 size={16} className="text-gray-500" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical size={16} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "roles" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Roles & Permissions
                </h3>
                <p className="text-sm text-gray-500">
                  Understand what each role can access and modify
                </p>
              </div>

              <div className="grid gap-6">
                {Object.entries(rolePermissions).map(([role, config]) => {
                  const Icon = config.icon;
                  return (
                    <div
                      key={role}
                      className={`p-6 rounded-lg border-2 ${config.bgColor} border-gray-200`}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <Icon size={24} className={config.color} />
                        <h4 className="text-lg font-semibold capitalize text-gray-900">
                          {role}
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {config.permissions.map((permission, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${config.color.replace(
                                "text-",
                                "bg-"
                              )}`}
                            />
                            <span className="text-sm text-gray-700">
                              {permission}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Team Settings
                </h3>
                <p className="text-sm text-gray-500">
                  Configure team-wide preferences and security settings
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Security Settings
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Two-Factor Authentication
                        </p>
                        <p className="text-sm text-gray-500">
                          Require 2FA for all team members
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Session Timeout
                        </p>
                        <p className="text-sm text-gray-500">
                          Auto-logout after inactivity
                        </p>
                      </div>
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>4 hours</option>
                        <option>8 hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Data Access
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Data Export Restrictions
                        </p>
                        <p className="text-sm text-gray-500">
                          Limit data export capabilities
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Audit Logging
                        </p>
                        <p className="text-sm text-gray-500">
                          Track all user actions
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamManagementModal;
