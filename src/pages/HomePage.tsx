import { useState } from "react";
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
  PersonIcon,
  FileTextIcon,
  CodeIcon,
  CheckIcon,
  ClockIcon,
  TargetIcon,
  BarChartIcon,
} from "@radix-ui/react-icons";

export function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header onMenuToggle={toggleSidebar} pageTitle="Dashboard" />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Container size="4">
            {/* Welcome section */}
            <Box mb="6">
              <Heading size="8" mb="2">
                Welcome to VAP Dashboard
              </Heading>
              <Text as="p" color="gray" size="3">
                Your AI-powered virtual assistant is ready to help you be more
                productive.
              </Text>
            </Box>

            {/* Stats cards */}
            <Grid columns={{ initial: "1", md: "2", lg: "4" }} gap="6" mb="6">
              <Card size="3">
                <Flex align="center">
                  <Box
                    p="2"
                    style={{
                      backgroundColor: "var(--blue-2)",
                      borderRadius: "var(--radius-3)",
                    }}
                  >
                    <BarChartIcon
                      style={{
                        color: "var(--blue-9)",
                        fontSize: "var(--font-size-5)",
                      }}
                    />
                  </Box>
                  <Box ml="4">
                    <Text as="p" size="2" color="gray" weight="medium">
                      Total Tasks
                    </Text>
                    <Text as="p" size="6" weight="bold">
                      24
                    </Text>
                  </Box>
                </Flex>
              </Card>

              <Card size="3">
                <Flex align="center">
                  <Box
                    p="2"
                    style={{
                      backgroundColor: "var(--green-2)",
                      borderRadius: "var(--radius-3)",
                    }}
                  >
                    <CheckIcon
                      style={{
                        color: "var(--green-9)",
                        fontSize: "var(--font-size-5)",
                      }}
                    />
                  </Box>
                  <Box ml="4">
                    <Text as="p" size="2" color="gray" weight="medium">
                      Completed
                    </Text>
                    <Text as="p" size="6" weight="bold">
                      18
                    </Text>
                  </Box>
                </Flex>
              </Card>

              <Card size="3">
                <Flex align="center">
                  <Box
                    p="2"
                    style={{
                      backgroundColor: "var(--yellow-2)",
                      borderRadius: "var(--radius-3)",
                    }}
                  >
                    <ClockIcon
                      style={{
                        color: "var(--yellow-9)",
                        fontSize: "var(--font-size-5)",
                      }}
                    />
                  </Box>
                  <Box ml="4">
                    <Text as="p" size="2" color="gray" weight="medium">
                      In Progress
                    </Text>
                    <Text as="p" size="6" weight="bold">
                      6
                    </Text>
                  </Box>
                </Flex>
              </Card>

              <Card size="3">
                <Flex align="center">
                  <Box
                    p="2"
                    style={{
                      backgroundColor: "var(--purple-2)",
                      borderRadius: "var(--radius-3)",
                    }}
                  >
                    <TargetIcon
                      style={{
                        color: "var(--purple-9)",
                        fontSize: "var(--font-size-5)",
                      }}
                    />
                  </Box>
                  <Box ml="4">
                    <Text as="p" size="2" color="gray" weight="medium">
                      Efficiency
                    </Text>
                    <Text as="p" size="6" weight="bold">
                      85%
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Grid>

            {/* Quick actions */}
            <Grid columns={{ initial: "1", lg: "2" }} gap="6" mb="6">
              <Card size="3">
                <Heading size="5" mb="4">
                  Quick Actions
                </Heading>
                <Flex direction="column" gap="3">
                  <Button
                    variant="ghost"
                    style={{
                      justifyContent: "flex-start",
                      padding: "var(--space-3)",
                    }}
                  >
                    <PersonIcon
                      style={{
                        marginRight: "var(--space-3)",
                        fontSize: "var(--font-size-5)",
                      }}
                    />
                    <Box style={{ textAlign: "left" }}>
                      <Text as="p" weight="medium">
                        Find Developers
                      </Text>
                      <Text as="p" size="2" color="gray">
                        Browse and connect with talented developers
                      </Text>
                    </Box>
                  </Button>
                  <Button
                    variant="ghost"
                    style={{
                      justifyContent: "flex-start",
                      padding: "var(--space-3)",
                    }}
                  >
                    <FileTextIcon
                      style={{
                        marginRight: "var(--space-3)",
                        fontSize: "var(--font-size-5)",
                      }}
                    />
                    <Box style={{ textAlign: "left" }}>
                      <Text as="p" weight="medium">
                        Generate Resume
                      </Text>
                      <Text as="p" size="2" color="gray">
                        Create professional resumes with AI assistance
                      </Text>
                    </Box>
                  </Button>
                  <Button
                    variant="ghost"
                    style={{
                      justifyContent: "flex-start",
                      padding: "var(--space-3)",
                    }}
                  >
                    <CodeIcon
                      style={{
                        marginRight: "var(--space-3)",
                        fontSize: "var(--font-size-5)",
                      }}
                    />
                    <Box style={{ textAlign: "left" }}>
                      <Text as="p" weight="medium">
                        Manage Projects
                      </Text>
                      <Text as="p" size="2" color="gray">
                        Organize and track your project progress
                      </Text>
                    </Box>
                  </Button>
                </Flex>
              </Card>

              <Card size="3">
                <Heading size="5" mb="4">
                  Recent Activity
                </Heading>
                <Flex direction="column" gap="4">
                  <Flex align="start">
                    <Box
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "var(--blue-9)",
                        borderRadius: "50%",
                        marginTop: "var(--space-2)",
                        marginRight: "var(--space-3)",
                      }}
                    />
                    <Box>
                      <Text as="p" size="2" weight="medium">
                        Resume generated successfully
                      </Text>
                      <Text as="p" size="1" color="gray">
                        2 hours ago
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="start">
                    <Box
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "var(--green-9)",
                        borderRadius: "50%",
                        marginTop: "var(--space-2)",
                        marginRight: "var(--space-3)",
                      }}
                    />
                    <Box>
                      <Text as="p" size="2" weight="medium">
                        Connected with 3 developers
                      </Text>
                      <Text as="p" size="1" color="gray">
                        4 hours ago
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="start">
                    <Box
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "var(--yellow-9)",
                        borderRadius: "50%",
                        marginTop: "var(--space-2)",
                        marginRight: "var(--space-3)",
                      }}
                    />
                    <Box>
                      <Text as="p" size="2" weight="medium">
                        Project milestone completed
                      </Text>
                      <Text as="p" size="1" color="gray">
                        1 day ago
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Card>
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
}
