import { useEffect, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../store/hooks";
import {
  fetchDevelopers,
  openAddDialog,
  openEditDialog,
} from "../store/slices/developersSlice";
import { AddDeveloperDialog } from "../components/AddDeveloperDialog";
import { EditDeveloperDialog } from "../components/EditDeveloperDialog";
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
} from "@radix-ui/themes";
import {
  PlusIcon,
  Pencil1Icon,
  FileTextIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import type { RootState } from "../store";
import type { Developer } from "../store/slices/developersSlice";

export function DevelopersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { developers, isLoading, error } = useTypedSelector(
    (state: RootState) => state.developers
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch developers on component mount
  useEffect(() => {
    dispatch(fetchDevelopers());
  }, [dispatch]);

  const handleEditDeveloper = (developer: Developer) => {
    dispatch(openEditDialog(developer));
  };

  const handleAddDeveloper = () => {
    dispatch(openAddDialog());
  };

  const getFileName = (link: string) => {
    return link.split("/").pop() || "Profile File";
  };

  const handleDownloadFile = (link: string, developerName: string) => {
    const fileName = developerName;
    const downloadLink = document.createElement("a");
    downloadLink.href = link;
    downloadLink.download = fileName;
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener noreferrer";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  if (isLoading && developers.length === 0) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col lg:ml-64">
          <Header onMenuToggle={toggleSidebar} pageTitle="Developers" />
          <main className="flex-1 overflow-y-auto p-6">
            <Container size="4">
              <Flex align="center" justify="center" style={{ height: "400px" }}>
                <Box style={{ textAlign: "center" }}>
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <Text color="gray">Loading developers...</Text>
                </Box>
              </Flex>
            </Container>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header onMenuToggle={toggleSidebar} pageTitle="Developers" />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Container size="4">
            {/* Header */}
            <Flex justify="between" align="center" mb="6">
              <Box>
                <Heading size="8" mb="2">
                  Developers
                </Heading>
                <Text color="gray" size="3">
                  Manage and connect with talented developers
                </Text>
              </Box>
              <Button onClick={handleAddDeveloper} size="3">
                <PlusIcon />
                Add Developer
              </Button>
            </Flex>

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

            {/* Developers List */}
            {developers.length === 0 ? (
              <Box py="12" style={{ textAlign: "center" }}>
                <PersonIcon
                  width="64"
                  height="64"
                  style={{ color: "var(--gray-8)", margin: "0 auto 16px" }}
                />
                <Heading size="5" mb="2">
                  No developers found
                </Heading>
                <Text color="gray" mb="4">
                  Get started by adding your first developer.
                </Text>
                <Button onClick={handleAddDeveloper}>Add Developer</Button>
              </Box>
            ) : (
              <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="6">
                {developers.map((developer) => (
                  <Card key={developer.id} size="3">
                    <Flex justify="between" align="start" mb="4">
                      <Box style={{ flex: 1 }}>
                        <Heading size="4" mb="2">
                          {developer.name}
                        </Heading>
                        <Flex align="center" gap="2" mb="2">
                          <FileTextIcon />
                          <Text size="2" color="gray">
                            {getFileName(developer.link)}
                          </Text>
                        </Flex>
                      </Box>
                      <Button
                        variant="ghost"
                        size="2"
                        onClick={() => handleEditDeveloper(developer)}
                        title="Edit developer"
                      >
                        <Pencil1Icon />
                      </Button>
                    </Flex>

                    <Flex gap="2">
                      <Button
                        variant="outline"
                        size="2"
                        onClick={() =>
                          handleDownloadFile(developer.link, developer.name)
                        }
                        style={{ flex: 1 }}
                      >
                        Download Profile
                      </Button>
                    </Flex>
                  </Card>
                ))}
              </Grid>
            )}

            {/* Dialogs */}
            <AddDeveloperDialog />
            <EditDeveloperDialog />
          </Container>
        </main>
      </div>
    </div>
  );
}
