import React, { useState } from "react";
import {
  Bell,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Smartphone,
  Calendar,
  Info,
} from "lucide-react";

interface CalendarNotificationsGuideProps {
  onComplete?: () => void;
}

const CalendarNotificationsGuide: React.FC<CalendarNotificationsGuideProps> = ({
  onComplete,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>("ios");

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-primary100 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-primary300 flex items-center">
            <Bell className="mr-2 text-text200" size={20} />
            Enable Calendar Notifications
          </h2>
          <p className="text-text200 mt-2">
            Don't miss your appointment! Follow these steps to ensure you
            receive reminders.
          </p>
        </div>

        {/* iOS Instructions */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("ios")}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-accent100"
          >
            <div className="flex items-center">
              <Smartphone className="mr-3 text-gray-500" size={20} />
              <span className="font-medium">iOS (iPhone/iPad)</span>
            </div>
            {expandedSection === "ios" ? (
              <ChevronDown size={20} className="text-gray-500" />
            ) : (
              <ChevronRight size={20} className="text-gray-500" />
            )}
          </button>

          {expandedSection === "ios" && (
            <div className="px-4 pb-4">
              <ol className="space-y-4 ml-2">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    1
                  </div>
                  <div>
                    <p className="text-text200">
                      Open the <strong>Settings</strong> app
                    </p>
                    <p className="text-sm text-text200 mt-1">
                      Look for the gear icon on your home screen
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    2
                  </div>
                  <div>
                    <p className="text-text200">
                      Scroll down and tap <strong>Calendar</strong>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    3
                  </div>
                  <div>
                    <p className="text-text200">
                      Tap <strong>Notifications</strong>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    4
                  </div>
                  <div>
                    <p className="text-text200">
                      Ensure <strong>Allow Notifications</strong> is turned on
                    </p>
                    <p className="text-sm text-text200 mt-1">
                      Toggle should be green
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    5
                  </div>
                  <div>
                    <p className="text-text200">
                      Select your preferred alert style and options
                    </p>
                    <p className="text-sm text-text200 mt-1">
                      We recommend enabling <strong>Sounds</strong> and{" "}
                      <strong>Badges</strong>
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Android Instructions */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("android")}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-accent100"
          >
            <div className="flex items-center">
              <Smartphone className="mr-3 text-gray-500" size={20} />
              <span className="font-medium">Android</span>
            </div>
            {expandedSection === "android" ? (
              <ChevronDown size={20} className="text-gray-500" />
            ) : (
              <ChevronRight size={20} className="text-gray-500" />
            )}
          </button>

          {expandedSection === "android" && (
            <div className="px-4 pb-4">
              <ol className="space-y-4 ml-2">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    1
                  </div>
                  <div>
                    <p className="text-text200">
                      Open <strong>Settings</strong>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    2
                  </div>
                  <div>
                    <p className="text-text200">
                      Tap <strong>Apps</strong> or <strong>Applications</strong>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    3
                  </div>
                  <div>
                    <p className="text-text200">
                      Find and tap <strong>Calendar</strong> or{" "}
                      <strong>Google Calendar</strong>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    4
                  </div>
                  <div>
                    <p className="text-text200">
                      Tap <strong>Notifications</strong>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    5
                  </div>
                  <div>
                    <p className="text-text200">
                      Ensure the toggle for <strong>Show notifications</strong>{" "}
                      is on
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Google Calendar Web */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => toggleSection("google")}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-accent100"
          >
            <div className="flex items-center">
              <Calendar className="mr-3 text-gray-500" size={20} />
              <span className="font-medium">Google Calendar (Web)</span>
            </div>
            {expandedSection === "google" ? (
              <ChevronDown size={20} className="text-gray-500" />
            ) : (
              <ChevronRight size={20} className="text-gray-500" />
            )}
          </button>

          {expandedSection === "google" && (
            <div className="px-4 pb-4">
              <ol className="space-y-4 ml-2">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    1
                  </div>
                  <div>
                    <p className="text-text200">
                      Go to <strong>Google Calendar</strong> in your browser
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    2
                  </div>
                  <div>
                    <p className="text-text200">
                      Click the <strong>gear icon</strong> in the top right
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    3
                  </div>
                  <div>
                    <p className="text-text200">
                      Select <strong>Settings</strong>
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    4
                  </div>
                  <div>
                    <p className="text-text200">
                      Click on <strong>Event Settings</strong> on the left menu
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 text-text200 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    5
                  </div>
                  <div>
                    <p className="text-text200">
                      Under <strong>Notifications</strong>, customize your
                      preferences
                    </p>
                    <p className="text-sm text-text200 mt-1">
                      Select email and/or notifications and how far in advance
                      you want to be reminded
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Tip Section */}
        <div className="p-4 bg-blue-50 m-4 rounded-lg flex">
          <Info size={20} className="text-blue-500 flex-shrink-0 mt-1 mr-3" />
          <div>
            <p className="text-text200 font-medium">Pro Tip</p>
            <p className="text-sm text-text200 mt-1">
              We recommend setting at least two reminders: one day before your
              procedure and another reminder 2-3 hours before.
            </p>
          </div>
        </div>

        {/* Completion Button */}
        {onComplete && (
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={onComplete}
              className="w-full flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <CheckCircle size={18} className="mr-2" />
              <span>I've Enabled Notifications</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarNotificationsGuide;
