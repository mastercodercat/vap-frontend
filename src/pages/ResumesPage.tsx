import { useState, useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../store/hooks";
import {
  fetchResumes,
  setSearchFilter,
  setDeveloperFilter,
  setSkillsFilter,
  clearFilters,
} from "../store/slices/resumesSlice";
import { fetchDevelopers } from "../store/slices/developersSlice";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import {
  Button,
  Text,
  Card,
  Flex,
  Box,
  Container,
  Heading,
  Grid,
  Badge,
  Select,
  TextField,
  Separator,
} from "@radix-ui/themes";
import { DownloadIcon, FileTextIcon } from "@radix-ui/react-icons";
import type { RootState } from "../store";

const API_URL = import.meta.env.VITE_API_URL;

export function ResumesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeveloperId, setSelectedDeveloperId] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");

  const dispatch = useAppDispatch();
  const { filteredResumes, isLoading, error } = useTypedSelector(
    (state: RootState) => state.resumes
  );
  const { developers } = useTypedSelector(
    (state: RootState) => state.developers
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchResumes());
    dispatch(fetchDevelopers());
    // Clear all filters on initial load to show all resumes
    dispatch(clearFilters());
  }, [dispatch]);

  // Get unique skills from all resumes (parse skills string)
  const allSkills = Array.from(
    new Set(
      filteredResumes.flatMap((resume) => {
        // Parse skills string - assuming comma-separated or space-separated
        if (!resume.skills) return [];
        return resume.skills
          .split(/[,\s]+/)
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0);
      })
    )
  ).sort();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    dispatch(setSearchFilter(value));
  };

  const handleDeveloperFilterChange = (developerId: string) => {
    setSelectedDeveloperId(developerId);
    if (developerId === "all") {
      dispatch(setDeveloperFilter(""));
    } else {
      dispatch(setDeveloperFilter(developerId));
    }
  };

  const handleSkillFilterChange = (skill: string) => {
    setSelectedSkill(skill);
    if (skill === "all") {
      dispatch(setSkillsFilter([]));
    } else {
      dispatch(setSkillsFilter([skill]));
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedDeveloperId("all");
    setSelectedSkill("all");
    dispatch(clearFilters());
  };

  const handleDownloadResume = (resumeUrl: string, title: string) => {
    const link = document.createElement("a");
    link.href = `${API_URL}${resumeUrl}.pdf`;
    link.download = `${title}.pdf`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to parse skills string into array
  const parseSkills = (skillsString: string | null | undefined): string[] => {
    if (!skillsString) return [];
    return skillsString
      .split(/[,\s]+/)
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header onMenuToggle={toggleSidebar} pageTitle="Generated Resumes" />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Container size="4">
            {/* Header */}
            <Box mb="6">
              <Heading size="8" mb="2">
                Generated Resumes
              </Heading>
              <Text color="gray" size="3">
                View and manage all your generated resumes
              </Text>
            </Box>

            {/* Filters Section */}
            <Card size="3" mb="6">
              <Heading size="5" mb="4">
                Filters
              </Heading>

              <Grid columns={{ initial: "1", md: "2", lg: "4" }} gap="4">
                {/* Search Input */}
                <Box>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Search
                  </Text>
                  <TextField.Root
                    type="text"
                    size="2"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSearchChange(e.target.value)
                    }
                    placeholder="Search by title, developer, or skills..."
                  />
                </Box>

                {/* Developer Filter */}
                <Box>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Developer
                  </Text>
                  <Select.Root
                    value={selectedDeveloperId}
                    onValueChange={handleDeveloperFilterChange}
                  >
                    <Select.Trigger
                      placeholder="All Developers"
                      className="w-full"
                    />
                    <Select.Content>
                      <Select.Item value="all">All Developers</Select.Item>
                      {developers.map((developer) => (
                        <Select.Item key={developer.id} value={developer.id}>
                          {developer.name}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Box>

                {/* Skills Filter */}
                <Box>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Skills
                  </Text>
                  <Select.Root
                    value={selectedSkill}
                    onValueChange={handleSkillFilterChange}
                  >
                    <Select.Trigger
                      placeholder="All Skills"
                      className="w-full"
                    />
                    <Select.Content>
                      <Select.Item value="all">All Skills</Select.Item>
                      {allSkills.map((skill) => (
                        <Select.Item key={skill} value={skill}>
                          {skill}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Box>

                {/* Clear Filters Button */}
                <Box style={{ display: "flex", alignItems: "end" }}>
                  <Button
                    onClick={handleClearFilters}
                    variant="outline"
                    style={{ width: "100%" }}
                  >
                    Clear Filters
                  </Button>
                </Box>
              </Grid>
            </Card>

            {/* Error Message */}
            {error && (
              <Box
                mb="6"
                p="4"
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

            {/* Loading State */}
            {isLoading && (
              <Box py="12" style={{ textAlign: "center" }}>
                <Text size="3">Loading resumes...</Text>
              </Box>
            )}

            {/* Resumes List */}
            {!isLoading && filteredResumes.length === 0 ? (
              <Box py="12" style={{ textAlign: "center" }}>
                <FileTextIcon
                  width="64"
                  height="64"
                  style={{ color: "var(--gray-8)", margin: "0 auto 16px" }}
                />
                <Heading size="5" mb="2">
                  No resumes found
                </Heading>
                <Text as="p" color="gray">
                  {searchTerm ||
                  selectedDeveloperId !== "all" ||
                  selectedSkill !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "No resumes have been generated yet."}
                </Text>
              </Box>
            ) : (
              <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="6">
                {filteredResumes.map((resume) => (
                  <Card key={resume.id} size="3">
                    <Flex direction="column" gap="3">
                      <Box>
                        <Heading size="4" mb="2">
                          {resume.title}
                        </Heading>
                        <Text as="p" size="2" color="gray" mb="2">
                          Generated for:{" "}
                          {typeof resume.developer === "string"
                            ? resume.developer
                            : resume.developer?.name || "Unknown"}
                        </Text>
                        <Text as="p" size="2" color="gray">
                          Created: {formatDate(resume.createdAt)}
                        </Text>
                      </Box>

                      {resume.skills && (
                        <Box>
                          <Text size="2" weight="bold" mb="2">
                            Skills:
                          </Text>
                          <Flex gap="1" wrap="wrap">
                            {parseSkills(resume.skills).map((skill, index) => (
                              <Badge key={index} variant="soft" size="1">
                                {skill}
                              </Badge>
                            ))}
                          </Flex>
                        </Box>
                      )}

                      <Separator />

                      <Button
                        variant="outline"
                        size="2"
                        onClick={() =>
                          handleDownloadResume(resume.resumeUrl, resume.title)
                        }
                        style={{ width: "100%" }}
                      >
                        <DownloadIcon />
                        Download PDF
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            )}
          </Container>
        </main>
      </div>
    </div>
  );
}
