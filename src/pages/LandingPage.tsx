import { useAppDispatch, useTypedSelector } from "../store/hooks";
import { openSignInDialog, openSignUpDialog } from "../store/slices/uiSlice";
import { signOut } from "../store/slices/authSlice";
import { SignInDialog } from "../components/SignInDialog";
import { SignUpDialog } from "../components/SignUpDialog";
import { Logo } from "../components/Logo";
import type { RootState } from "../store";
import {
  Button,
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Card,
  Grid,
} from "@radix-ui/themes";
import {
  CheckIcon,
  PersonIcon,
  FileTextIcon,
  GearIcon,
  BarChartIcon,
} from "@radix-ui/react-icons";

export function LandingPage() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useTypedSelector(
    (state: RootState) => state.auth
  );

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Box className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <Box className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <Container size="4">
          <Flex justify="between" align="center" className="h-16">
            {/* Logo */}
            <Flex align="center">
              <Box className="flex-shrink-0">
                <Logo />
              </Box>
              <Box className="hidden md:block ml-10">
                <Flex gap="4">
                  <Button variant="ghost" asChild>
                    <a href="#features">Features</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href="#pricing">Pricing</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href="#about">About</a>
                  </Button>
                </Flex>
              </Box>
            </Flex>

            {/* Auth Buttons */}
            <Flex align="center" gap="4">
              {isAuthenticated ? (
                <>
                  <Text size="2" className="text-gray-700">
                    Welcome, {user?.name || user?.email}
                  </Text>
                  <Button variant="ghost" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => dispatch(openSignInDialog())}
                  >
                    Sign In
                  </Button>
                  <Button onClick={() => dispatch(openSignUpDialog())}>
                    Sign Up
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box className="relative bg-gradient-to-r from-blue-600 to-purple-600">
        <Container size="4" className="py-24">
          <Box className="text-center">
            <Heading size="4" className="text-white sm:text-6xl md:text-8xl">
              Your AI-Powered Virtual Assistant
            </Heading>
            <Text
              size="5"
              className="mt-3 max-w-md mx-auto text-blue-100 sm:text-6 md:mt-5 md:max-w-3xl"
            >
              Streamline your workflow with intelligent automation, developer
              connections, and AI-powered resume generation.
            </Text>
            <Box className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Button size="4" variant="solid" asChild>
                <a href="#features">Get Started</a>
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" className="py-12 bg-white">
        <Container size="4">
          <Box className="lg:text-center">
            <Text
              size="3"
              className="text-blue-600 font-semibold tracking-wide uppercase"
            >
              Features
            </Text>
            <Heading
              size="8"
              className="mt-2 tracking-tight text-gray-900 sm:text-9"
            >
              Everything you need to be productive
            </Heading>
          </Box>

          <Box className="mt-10">
            <Grid columns={{ initial: "1", md: "2" }} gap="8">
              <Flex gap="4">
                <Box className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <PersonIcon width="24" height="24" />
                </Box>
                <Box>
                  <Heading size="4" className="text-gray-900">
                    Developer Network
                  </Heading>
                  <Text size="3" className="mt-2 text-gray-500">
                    Connect with talented developers, find collaborators, and
                    build amazing projects together.
                  </Text>
                </Box>
              </Flex>

              <Flex gap="4">
                <Box className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <FileTextIcon width="24" height="24" />
                </Box>
                <Box>
                  <Heading size="4" className="text-gray-900">
                    AI Resume Generation
                  </Heading>
                  <Text size="3" className="mt-2 text-gray-500">
                    Create professional resumes with AI assistance, tailored to
                    your skills and experience.
                  </Text>
                </Box>
              </Flex>

              <Flex gap="4">
                <Box className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <GearIcon width="24" height="24" />
                </Box>
                <Box>
                  <Heading size="4" className="text-gray-900">
                    AI Assistant
                  </Heading>
                  <Text size="3" className="mt-2 text-gray-500">
                    Get help with tasks, questions, and productivity tips from
                    your personal AI assistant.
                  </Text>
                </Box>
              </Flex>

              <Flex gap="4">
                <Box className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <BarChartIcon width="24" height="24" />
                </Box>
                <Box>
                  <Heading size="4" className="text-gray-900">
                    Analytics & Insights
                  </Heading>
                  <Text size="3" className="mt-2 text-gray-500">
                    Track your productivity, analyze your workflow, and get
                    insights to improve performance.
                  </Text>
                </Box>
              </Flex>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box className="bg-gray-50 py-12">
        <Container size="4">
          <Box className="sm:text-center">
            <Heading size="8" className="text-gray-900 sm:text-9">
              Simple, transparent pricing
            </Heading>
            <Text size="5" className="mt-4 text-gray-600">
              Choose the plan that's right for you
            </Text>
          </Box>

          <Box className="mt-10">
            <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="8">
              <Card size="3">
                <Box className="p-6">
                  <Heading size="4" className="text-gray-900">
                    Free
                  </Heading>
                  <Text size="2" className="mt-4 text-gray-500">
                    Perfect for getting started
                  </Text>
                  <Box className="mt-8">
                    <Text size="8" className="font-extrabold text-gray-900">
                      $0
                    </Text>
                    <Text size="3" className="font-medium text-gray-500">
                      /month
                    </Text>
                  </Box>
                </Box>
                <Box className="px-6 pt-6 pb-8">
                  <Flex direction="column" gap="4">
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Basic AI assistant
                      </Text>
                    </Flex>
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        5 resume generations
                      </Text>
                    </Flex>
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Basic developer search
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Card>

              <Card size="3">
                <Box className="p-6">
                  <Heading size="4" className="text-gray-900">
                    Pro
                  </Heading>
                  <Text size="2" className="mt-4 text-gray-500">
                    For professionals and teams
                  </Text>
                  <Box className="mt-8">
                    <Text size="8" className="font-extrabold text-gray-900">
                      $29
                    </Text>
                    <Text size="3" className="font-medium text-gray-500">
                      /month
                    </Text>
                  </Box>
                </Box>
                <Box className="px-6 pt-6 pb-8">
                  <Flex direction="column" gap="4">
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Advanced AI assistant
                      </Text>
                    </Flex>
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Unlimited resume generations
                      </Text>
                    </Flex>
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Advanced developer search
                      </Text>
                    </Flex>
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Analytics dashboard
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Card>

              <Card size="3">
                <Box className="p-6">
                  <Heading size="4" className="text-gray-900">
                    Enterprise
                  </Heading>
                  <Text size="2" className="mt-4 text-gray-500">
                    For large organizations
                  </Text>
                  <Box className="mt-8">
                    <Text size="8" className="font-extrabold text-gray-900">
                      $99
                    </Text>
                    <Text size="3" className="font-medium text-gray-500">
                      /month
                    </Text>
                  </Box>
                </Box>
                <Box className="px-6 pt-6 pb-8">
                  <Flex direction="column" gap="4">
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Everything in Pro
                      </Text>
                    </Flex>
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Team collaboration
                      </Text>
                    </Flex>
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Custom integrations
                      </Text>
                    </Flex>
                    <Flex gap="3" align="start">
                      <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                      <Text size="2" className="text-gray-700">
                        Priority support
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              </Card>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box className="bg-gray-800">
        <Container size="4" className="py-12">
          <Grid columns={{ initial: "1", md: "4" }} gap="8">
            <Box className="col-span-1 md:col-span-2">
              <Logo />
              <Text size="3" className="mt-4 text-gray-300">
                Your AI-powered virtual assistant for productivity, developer
                connections, and professional growth.
              </Text>
            </Box>
            <Box>
              <Text
                size="2"
                className="font-semibold text-gray-400 tracking-wider uppercase"
              >
                Product
              </Text>
              <Flex direction="column" gap="4" className="mt-4">
                <Button
                  variant="ghost"
                  asChild
                  className="justify-start text-gray-300 hover:text-white"
                >
                  <a href="#">Features</a>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="justify-start text-gray-300 hover:text-white"
                >
                  <a href="#">Pricing</a>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="justify-start text-gray-300 hover:text-white"
                >
                  <a href="#">API</a>
                </Button>
              </Flex>
            </Box>
            <Box>
              <Text
                size="2"
                className="font-semibold text-gray-400 tracking-wider uppercase"
              >
                Support
              </Text>
              <Flex direction="column" gap="4" className="mt-4">
                <Button
                  variant="ghost"
                  asChild
                  className="justify-start text-gray-300 hover:text-white"
                >
                  <a href="#">Help Center</a>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="justify-start text-gray-300 hover:text-white"
                >
                  <a href="#">Contact</a>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="justify-start text-gray-300 hover:text-white"
                >
                  <a href="#">Status</a>
                </Button>
              </Flex>
            </Box>
          </Grid>
          <Box className="mt-8 border-t border-gray-700 pt-8">
            <Text size="3" className="text-gray-400 text-center">
              © 2025 VAP. All rights reserved.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Dialogs */}
      <SignInDialog />
      <SignUpDialog />
    </Box>
  );
}
