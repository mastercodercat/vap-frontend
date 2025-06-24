import { useState, useEffect } from "react";
import {
  Button,
  Select,
  Text,
  Card,
  Flex,
  Box,
  Container,
  Heading,
  TextArea,
  Separator,
} from "@radix-ui/themes";
import {
  ChevronDownIcon,
  DownloadIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
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
  const [docType, setDocType] = useState("pdf");
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
          docType: docType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to generate resume");
      }

      const data = await response.json();
      const url = `${API_URL}${
        docType === "pdf" ? data.pdfUrl : data.resumeUrl
      }`;
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
      link.download = `generated-resume.${docType}`;
      document.body.appendChild(link);
      link.click();
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
          <Container size="4">
            {/* Header */}
            <Box mb="6">
              <Heading size="8" mb="2">
                Resume Generation
              </Heading>
              <Text color="gray" size="3">
                Generate customized resumes for developers based on job
                descriptions
              </Text>
            </Box>

            {/* Form */}
            <Card size="3" mb="6">
              <Heading size="5" mb="5">
                Generate Resume
              </Heading>

              <Flex direction="column" gap="5">
                {/* Job Description Input */}
                <Box>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Job Description *
                  </Text>
                  <TextArea
                    value={jobDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setJobDescription(e.target.value)
                    }
                    placeholder="Enter the job description to customize the resume..."
                    disabled={isGenerating}
                    style={{
                      minHeight: "120px",
                      resize: "vertical",
                    }}
                  />
                  <Text as="p" size="2" color="gray" mt="2">
                    Provide a detailed job description to tailor the resume
                    accordingly
                  </Text>
                </Box>

                {/* Developer Select */}
                <Box>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Select Developer *
                  </Text>
                  {isLoadingDevelopers ? (
                    <Flex align="center" gap="2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <Text size="2" color="gray">
                        Loading developers...
                      </Text>
                    </Flex>
                  ) : developers.length === 0 ? (
                    <Box py="4" style={{ textAlign: "center" }}>
                      <Text as="p" color="gray" size="2">
                        No developers available. Please add developers first.
                      </Text>
                    </Box>
                  ) : (
                    <Select.Root
                      value={selectedDeveloperId}
                      onValueChange={setSelectedDeveloperId}
                    >
                      <Select.Trigger
                        placeholder="Select a developer"
                        disabled={isGenerating}
                        className="w-full"
                      />
                      <Select.Content>
                        {developers.map((developer) => (
                          <Select.Item key={developer.id} value={developer.id}>
                            {developer.name}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                  )}
                </Box>

                {/* Document Type Select */}
                <Box>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Document Type
                  </Text>
                  <Select.Root value={docType} onValueChange={setDocType}>
                    <Select.Trigger
                      disabled={isGenerating}
                      className="w-full"
                    />
                    <Select.Content>
                      <Select.Item value="pdf">PDF</Select.Item>
                      <Select.Item value="docx">DOCX</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  <Text as="p" size="2" color="gray" mt="2">
                    Choose the document format for your resume
                  </Text>
                </Box>

                {/* Generate Button */}
                <Box>
                  <Button
                    onClick={handleGenerateResume}
                    disabled={!isFormValid || isGenerating}
                    size="3"
                    style={{ width: "100%" }}
                  >
                    {isGenerating ? (
                      <Flex align="center" gap="2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Generating Resume...
                      </Flex>
                    ) : (
                      "Generate Resume"
                    )}
                  </Button>
                </Box>
              </Flex>

              {/* Error Message */}
              {error && (
                <Box
                  mt="4"
                  p="3"
                  style={{
                    backgroundColor: "var(--red-2)",
                    border: "1px solid var(--red-6)",
                    borderRadius: "var(--radius-3)",
                    color: "var(--red-11)",
                  }}
                >
                  {error}
                </Box>
              )}
            </Card>

            {/* Generated Resume Display */}
            {generatedResumeUrl && (
              <Card size="3">
                <Flex justify="between" align="center" mb="4">
                  <Heading size="5">Generated Resume</Heading>
                  <Button onClick={handleDownloadResume} color="green">
                    <DownloadIcon />
                    Download {docType.toUpperCase()}
                  </Button>
                </Flex>

                {selectedDeveloper && (
                  <Box
                    p="4"
                    mb="4"
                    style={{
                      backgroundColor: "var(--blue-2)",
                      borderRadius: "var(--radius-3)",
                    }}
                  >
                    <Text as="p" size="2" color="blue">
                      <strong>Generated for:</strong> {selectedDeveloper.name}
                    </Text>
                    <Text as="p" size="2" color="blue" mt="1">
                      <strong>Format:</strong> {docType.toUpperCase()}
                    </Text>
                  </Box>
                )}

                <Separator my="4" />

                {/* PDF Preview - Only show for PDF files */}
                {docType === "pdf" && (
                  <Box
                    style={{
                      border: "1px solid var(--gray-6)",
                      borderRadius: "var(--radius-3)",
                      overflow: "hidden",
                    }}
                  >
                    <iframe
                      src={generatedResumeUrl}
                      style={{ width: "100%", height: "400px" }}
                      title="Generated Resume Preview"
                    />
                  </Box>
                )}

                {/* DOCX files - Show info message */}
                {docType === "docx" && (
                  <Box
                    p="6"
                    style={{
                      border: "1px solid var(--gray-6)",
                      borderRadius: "var(--radius-3)",
                      backgroundColor: "var(--gray-2)",
                      textAlign: "center",
                    }}
                  >
                    <FileTextIcon
                      width="64"
                      height="64"
                      style={{ color: "var(--gray-8)", margin: "0 auto 16px" }}
                    />
                    <Text as="p" color="gray">
                      DOCX file generated successfully. Click the download
                      button above to save the file.
                    </Text>
                  </Box>
                )}
              </Card>
            )}
          </Container>
        </main>
      </div>
    </div>
  );
}
