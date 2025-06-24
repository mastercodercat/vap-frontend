import { useState, useEffect } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import { useAppDispatch, useTypedSelector } from "../store/hooks";
import { fetchDevelopers } from "../store/slices/developersSlice";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { getAuthHeaders } from "../utils/authPersistence";
import type { RootState } from "../store";

const API_URL = import.meta.env.VITE_API_URL;

export function ResumePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedDeveloperId, setSelectedDeveloperId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResumeUrl, setGeneratedResumeUrl] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { developers, isLoading: isLoadingDevelopers } = useTypedSelector(
    (state: RootState) => state.developers
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchDevelopers());
  }, [dispatch]);

  const isFormValid =
    jobDescription.trim() !== "" && selectedDeveloperId !== "";

  const handleGenerateResume = async () => {
    if (!isFormValid) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedResumeUrl(null);

    try {
      const response = await fetch(`${API_URL}/resumes/generate`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: jobDescription.trim(),
          developerId: selectedDeveloperId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to generate resume");
      }

      const data = await response.json();
      const url = `${API_URL}${data.resumeUrl}.pdf`;
      setGeneratedResumeUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadResume = () => {
    if (generatedResumeUrl) {
      const link = document.createElement("a");
      link.href = generatedResumeUrl;
      link.download = "generated-resume.pdf";
      document.body.appendChild(link);
      link.click();
      0;
      document.body.removeChild(link);
    }
  };

  const selectedDeveloper = developers.find(
    (dev) => dev.id === selectedDeveloperId
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header onMenuToggle={toggleSidebar} pageTitle="Resume Generation" />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Resume Generation
              </h1>
              <p className="text-gray-600 mt-2">
                Generate customized resumes for developers based on job
                descriptions
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Generate Resume
              </h2>

              <div className="space-y-6">
                {/* Job Description Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Enter the job description to customize the resume..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={6}
                    disabled={isGenerating}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Provide a detailed job description to tailor the resume
                    accordingly
                  </p>
                </div>

                {/* Developer Select */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Developer *
                  </label>
                  {isLoadingDevelopers ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      <span className="text-gray-600">
                        Loading developers...
                      </span>
                    </div>
                  ) : developers.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                      No developers available. Please add developers first.
                    </div>
                  ) : (
                    <Select.Root
                      value={selectedDeveloperId}
                      onValueChange={setSelectedDeveloperId}
                    >
                      <Select.Trigger
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white flex items-center justify-between"
                        disabled={isGenerating}
                      >
                        <Select.Value placeholder="Select a developer" />
                        <Select.Icon>
                          <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                        </Select.Icon>
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content className="bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                          <Select.Viewport className="p-1">
                            {developers.map((developer) => (
                              <Select.Item
                                key={developer.id}
                                value={developer.id}
                                className="relative flex items-center px-3 py-2 text-sm text-gray-900 rounded cursor-pointer hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                              >
                                <Select.ItemText>
                                  {developer.name}
                                </Select.ItemText>
                                <Select.ItemIndicator className="absolute right-2">
                                  <CheckIcon className="w-4 h-4 text-blue-600" />
                                </Select.ItemIndicator>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  )}
                </div>

                {/* Generate Button */}
                <div>
                  <button
                    onClick={handleGenerateResume}
                    disabled={!isFormValid || isGenerating}
                    className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                      isFormValid && !isGenerating
                        ? "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating Resume...
                      </div>
                    ) : (
                      "Generate Resume"
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                  {error}
                </div>
              )}
            </div>

            {/* Generated Resume Display */}
            {generatedResumeUrl && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Generated Resume
                  </h2>
                  <button
                    onClick={handleDownloadResume}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PDF
                  </button>
                </div>

                {selectedDeveloper && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">
                      <strong>Generated for:</strong> {selectedDeveloper.name}
                    </p>
                  </div>
                )}

                {/* PDF Preview */}
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <iframe
                    src={generatedResumeUrl}
                    className="w-full h-96"
                    title="Generated Resume Preview"
                  />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
