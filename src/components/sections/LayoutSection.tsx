import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/Card";
import { Container } from "../ui/Container";
import { Grid, GridItem } from "../ui/Grid";
import { Stack, HStack, VStack } from "../ui/Stack";
import { Spacer, FlexSpacer } from "../ui/Spacer";
import { Separator } from "../ui/Separator";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Alert, AlertTitle, AlertDescription } from "../ui/Alert";
import { Progress } from "../ui/Progress";
import { Skeleton, SkeletonText, SkeletonAvatar } from "../ui/Skeleton";
import { Spinner, LoadingSpinner } from "../ui/Spinner";
import { ComponentDemo } from "../showcase/ComponentDemo";
import { PropsTable } from "../showcase/PropsTable";
import { ComponentCopyButton } from "../showcase/CopyButton";
import { PropInfo } from "../../utils/component-registry";

const LayoutSection: React.FC = () => {
  const cardProps: PropInfo[] = [
    {
      name: "variant",
      type: '"default" | "brutalist" | "ghost" | "bordered"',
      required: false,
      default: "default",
      description: "The visual style variant of the card",
      options: ["default", "brutalist", "ghost", "bordered"],
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg" | "xl"',
      required: false,
      default: "md",
      description: "The padding size of the card",
      options: ["sm", "md", "lg", "xl"],
    },
    {
      name: "shadow",
      type: '"none" | "brutal" | "magenta" | "white" | "black"',
      required: false,
      default: "brutal",
      description: "The shadow style of the card",
      options: ["none", "brutal", "magenta", "white", "black"],
    },
    {
      name: "hover",
      type: "boolean",
      required: false,
      default: false,
      description: "Enables hover effects",
    },
    {
      name: "glitchOnHover",
      type: "boolean",
      required: false,
      default: false,
      description: "Enables glitch animation on hover",
    },
  ];

  const alertProps: PropInfo[] = [
    {
      name: "variant",
      type: '"default" | "success" | "warning" | "error" | "info"',
      required: false,
      default: "default",
      description: "The alert type and styling",
      options: ["default", "success", "warning", "error", "info"],
    },
    {
      name: "size",
      type: '"sm" | "md" | "lg"',
      required: false,
      default: "md",
      description: "The size of the alert",
      options: ["sm", "md", "lg"],
    },
    {
      name: "dismissible",
      type: "boolean",
      required: false,
      default: false,
      description: "Shows dismiss button when true",
    },
    {
      name: "brutalist",
      type: "boolean",
      required: false,
      default: true,
      description: "Enables brutalist styling",
    },
    {
      name: "glitchOnHover",
      type: "boolean",
      required: false,
      default: false,
      description: "Enables glitch animation on hover",
    },
  ];

  return (
    <section id="layout" className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <div id="card" className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                Layout & Feedback
              </h2>
              <p className="text-lg text-cyber-gray mt-2">
                Cards, alerts, and layout components for structuring content
              </p>
            </div>
            <ComponentCopyButton componentName="Card" children="Card content" />
          </div>

          {/* Card Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Card Component"
              description="Basic card with header, content, and footer"
              component={
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>
                      This is a card description that explains what the card is about.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-cyber-white">
                      This is the main content of the card. You can put any content here.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary">Action</Button>
                  </CardFooter>
                </Card>
              }
              code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      This is a card description that explains what the card is about.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-cyber-white">
      This is the main content of the card. You can put any content here.
    </p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>`}
            />

            <ComponentDemo
              title="Card Variants"
              description="Different card styles and effects"
              component={
                <div className="space-y-4">
                  <Card variant="default" size="sm">
                    <CardContent>
                      <p className="text-sm">Default card</p>
                    </CardContent>
                  </Card>
                  <Card variant="brutalist" size="sm">
                    <CardContent>
                      <p className="text-sm">Brutalist card</p>
                    </CardContent>
                  </Card>
                  <Card variant="ghost" size="sm">
                    <CardContent>
                      <p className="text-sm">Ghost card</p>
                    </CardContent>
                  </Card>
                  <Card variant="bordered" size="sm">
                    <CardContent>
                      <p className="text-sm">Bordered card</p>
                    </CardContent>
                  </Card>
                </div>
              }
              code={`<Card variant="default" size="sm">
  <CardContent>
    <p className="text-sm">Default card</p>
  </CardContent>
</Card>
<Card variant="brutalist" size="sm">
  <CardContent>
    <p className="text-sm">Brutalist card</p>
  </CardContent>
</Card>
<Card variant="ghost" size="sm">
  <CardContent>
    <p className="text-sm">Ghost card</p>
  </CardContent>
</Card>
<Card variant="bordered" size="sm">
  <CardContent>
    <p className="text-sm">Bordered card</p>
  </CardContent>
</Card>`}
            />
          </div>

          {/* Card Effects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Card Effects"
              description="Interactive cards with hover effects"
              component={
                <div className="space-y-4">
                  <Card hover>
                    <CardContent>
                      <p className="text-sm">Hover effect card</p>
                    </CardContent>
                  </Card>
                  <Card hover glitchOnHover>
                    <CardContent>
                      <p className="text-sm">Glitch on hover card</p>
                    </CardContent>
                  </Card>
                  <Card shadow="magenta">
                    <CardContent>
                      <p className="text-sm">Magenta shadow card</p>
                    </CardContent>
                  </Card>
                </div>
              }
              code={`<Card hover>
  <CardContent>
    <p className="text-sm">Hover effect card</p>
  </CardContent>
</Card>
<Card hover glitchOnHover>
  <CardContent>
    <p className="text-sm">Glitch on hover card</p>
  </CardContent>
</Card>
<Card shadow="magenta">
  <CardContent>
    <p className="text-sm">Magenta shadow card</p>
  </CardContent>
</Card>`}
            />

            <ComponentDemo
              title="Card with Badge"
              description="Card with status badges and actions"
              component={
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Feature Card</CardTitle>
                      <Badge variant="primary">New</Badge>
                    </div>
                    <CardDescription>
                      A card showcasing a new feature with status badge
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Badge variant="outline" size="sm">
                        React
                      </Badge>
                      <Badge variant="outline" size="sm">
                        TypeScript
                      </Badge>
                      <Badge variant="outline" size="sm">
                        Tailwind
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" size="sm">
                      Learn More
                    </Button>
                    <Button variant="ghost" size="sm">
                      Dismiss
                    </Button>
                  </CardFooter>
                </Card>
              }
              code={`<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Feature Card</CardTitle>
      <Badge variant="primary">New</Badge>
    </div>
    <CardDescription>
      A card showcasing a new feature with status badge
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <Badge variant="outline" size="sm">React</Badge>
      <Badge variant="outline" size="sm">TypeScript</Badge>
      <Badge variant="outline" size="sm">Tailwind</Badge>
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="primary" size="sm">Learn More</Button>
    <Button variant="ghost" size="sm">Dismiss</Button>
  </CardFooter>
</Card>`}
            />
          </div>

          {/* Alert Demo */}
          <div id="alert" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Alert Component"
              description="Alert messages with different variants"
              component={
                <div className="space-y-4">
                  <Alert variant="default">
                    <AlertTitle>Default Alert</AlertTitle>
                    <AlertDescription>This is a default alert message.</AlertDescription>
                  </Alert>
                  <Alert variant="success">
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>Your action was completed successfully.</AlertDescription>
                  </Alert>
                  <Alert variant="warning">
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>Please review this information carefully.</AlertDescription>
                  </Alert>
                  <Alert variant="error">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                  </Alert>
                </div>
              }
              code={`<Alert variant="default">
  <AlertTitle>Default Alert</AlertTitle>
  <AlertDescription>
    This is a default alert message.
  </AlertDescription>
</Alert>
<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>
    Your action was completed successfully.
  </AlertDescription>
</Alert>
<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>
    Please review this information carefully.
  </AlertDescription>
</Alert>
<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>`}
            />

            <ComponentDemo
              title="Alert Sizes & Effects"
              description="Different alert sizes and dismissible alerts"
              component={
                <div className="space-y-4">
                  <Alert variant="info" size="sm">
                    <AlertDescription>Small alert message</AlertDescription>
                  </Alert>
                  <Alert variant="info" size="md">
                    <AlertDescription>Medium alert message</AlertDescription>
                  </Alert>
                  <Alert variant="info" size="lg">
                    <AlertDescription>Large alert message</AlertDescription>
                  </Alert>
                  <Alert variant="success" dismissible onDismiss={() => {}}>
                    <AlertTitle>Dismissible Alert</AlertTitle>
                    <AlertDescription>
                      This alert can be dismissed by clicking the X button.
                    </AlertDescription>
                  </Alert>
                </div>
              }
              code={`<Alert variant="info" size="sm">
  <AlertDescription>
    Small alert message
  </AlertDescription>
</Alert>
<Alert variant="info" size="md">
  <AlertDescription>
    Medium alert message
  </AlertDescription>
</Alert>
<Alert variant="info" size="lg">
  <AlertDescription>
    Large alert message
  </AlertDescription>
</Alert>
<Alert variant="success" dismissible onDismiss={() => {}}>
  <AlertTitle>Dismissible Alert</AlertTitle>
  <AlertDescription>
    This alert can be dismissed by clicking the X button.
  </AlertDescription>
</Alert>`}
            />
          </div>

          {/* Badge Demo */}
          <div id="badge" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Badge Component"
              description="Status badges with different variants"
              component={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="ghost">Ghost</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </div>
              }
              code={`<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>

<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
            />

            <ComponentDemo
              title="Badge Effects"
              description="Badges with special effects and animations"
              component={
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge pulse>Pulsing</Badge>
                    <Badge glitchOnHover>Glitch on Hover</Badge>
                    <Badge variant="primary" brutalist={false}>
                      Non-Brutalist
                    </Badge>
                    <Badge variant="secondary" className="animate-bounce-brutal">
                      Bouncing
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyber-white">Status:</span>
                    <Badge variant="primary">Active</Badge>
                  </div>
                </div>
              }
              code={`<Badge pulse>Pulsing</Badge>
<Badge glitchOnHover>Glitch on Hover</Badge>
<Badge variant="primary" brutalist={false}>Non-Brutalist</Badge>
<Badge variant="secondary" className="animate-bounce-brutal">Bouncing</Badge>

<div className="flex items-center gap-2">
  <span className="text-cyber-white">Status:</span>
  <Badge variant="primary">Active</Badge>
</div>`}
            />
          </div>

          {/* Container Demo */}
          <div id="container" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Container Component"
              description="Responsive container with max-width constraints"
              component={
                <div className="space-y-4">
                  <Container size="sm" padding="md">
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                      Small Container
                    </div>
                  </Container>
                  <Container size="md" padding="md">
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                      Medium Container
                    </div>
                  </Container>
                  <Container size="lg" variant="brutalist" padding="md">
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                      Large Brutalist Container
                    </div>
                  </Container>
                </div>
              }
              code={`<Container size="sm" padding="md">
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
    Small Container
  </div>
</Container>
<Container size="md" padding="md">
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
    Medium Container
  </div>
</Container>
<Container size="lg" variant="brutalist" padding="md">
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
    Large Brutalist Container
  </div>
</Container>`}
            />

            <ComponentDemo
              title="Container Variants"
              description="Different container styles and behaviors"
              component={
                <div className="space-y-4">
                  <Container variant="default" padding="md">
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                      Default Container
                    </div>
                  </Container>
                  <Container variant="brutalist" padding="md">
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                      Brutalist Container
                    </div>
                  </Container>
                  <Container variant="centered" size="md" padding="md">
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                      Centered Container
                    </div>
                  </Container>
                </div>
              }
              code={`<Container variant="default" padding="md">
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
    Default Container
  </div>
</Container>
<Container variant="brutalist" padding="md">
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
    Brutalist Container
  </div>
</Container>
<Container variant="centered" size="md" padding="md">
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
    Centered Container
  </div>
</Container>`}
            />
          </div>

          {/* Grid Demo */}
          <div id="grid" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Grid Component"
              description="Flexible grid system with responsive columns"
              fullWidth={true}
              component={
                <div className="space-y-4">
                  <Grid cols={3} gap="md">
                    <GridItem>
                      <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">1</div>
                    </GridItem>
                    <GridItem>
                      <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">2</div>
                    </GridItem>
                    <GridItem>
                      <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">3</div>
                    </GridItem>
                  </Grid>
                  <Grid cols={2} gap="lg" variant="brutalist">
                    <GridItem variant="brutalist">
                      <div className="text-center text-cyber-green">Brutalist Grid 1</div>
                    </GridItem>
                    <GridItem variant="brutalist">
                      <div className="text-center text-cyber-green">Brutalist Grid 2</div>
                    </GridItem>
                  </Grid>
                </div>
              }
              code={`<Grid cols={3} gap="md">
  <GridItem>
    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">1</div>
  </GridItem>
  <GridItem>
    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">2</div>
  </GridItem>
  <GridItem>
    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">3</div>
  </GridItem>
</Grid>
<Grid cols={2} gap="lg" variant="brutalist">
  <GridItem variant="brutalist">
    <div className="text-center text-cyber-green">Brutalist Grid 1</div>
  </GridItem>
  <GridItem variant="brutalist">
    <div className="text-center text-cyber-green">Brutalist Grid 2</div>
  </GridItem>
</Grid>`}
            />

            <ComponentDemo
              title="Grid Item Positioning"
              description="Grid items with span and positioning"
              component={
                <Grid cols={4} gap="md">
                  <GridItem colSpan={2}>
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Span 2</div>
                  </GridItem>
                  <GridItem>
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">1</div>
                  </GridItem>
                  <GridItem>
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">2</div>
                  </GridItem>
                  <GridItem colSpan={4}>
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                      Full Width
                    </div>
                  </GridItem>
                </Grid>
              }
              code={`<Grid cols={4} gap="md">
  <GridItem colSpan={2}>
    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Span 2</div>
  </GridItem>
  <GridItem>
    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">1</div>
  </GridItem>
  <GridItem>
    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">2</div>
  </GridItem>
  <GridItem colSpan={4}>
    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Full Width</div>
  </GridItem>
</Grid>`}
            />
          </div>

          {/* Stack Demo */}
          <div id="stack" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Stack Component"
              description="Flexible stacking with spacing and alignment"
              component={
                <div className="space-y-4">
                  <VStack spacing="md">
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Item 1</div>
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Item 2</div>
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Item 3</div>
                  </VStack>
                  <HStack spacing="md" justify="center">
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">A</div>
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">B</div>
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">C</div>
                  </HStack>
                </div>
              }
              code={`<VStack spacing="md">
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Item 1</div>
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Item 2</div>
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Item 3</div>
</VStack>
<HStack spacing="md" justify="center">
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">A</div>
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">B</div>
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">C</div>
</HStack>`}
            />

            <ComponentDemo
              title="Stack Variants & Alignment"
              description="Different stack configurations and alignment options"
              component={
                <div className="space-y-4">
                  <Stack
                    direction="horizontal"
                    spacing="lg"
                    align="center"
                    justify="between"
                    variant="brutalist"
                  >
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Left</div>
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Center</div>
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Right</div>
                  </Stack>
                  <VStack spacing="sm" align="center">
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">
                      Centered
                    </div>
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Items</div>
                  </VStack>
                </div>
              }
              code={`<Stack direction="horizontal" spacing="lg" align="center" justify="between" variant="brutalist">
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Left</div>
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Center</div>
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Right</div>
</Stack>
<VStack spacing="sm" align="center">
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Centered</div>
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Items</div>
</VStack>`}
            />
          </div>

          {/* Spacer Demo */}
          <div id="spacer" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Spacer Component"
              description="Fixed spacing between elements"
              component={
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Item 1</div>
                    <Spacer size="md" direction="horizontal" variant="visible" />
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Item 2</div>
                  </div>
                  <div>
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Top</div>
                    <Spacer size="lg" direction="vertical" variant="visible" />
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Bottom</div>
                  </div>
                </div>
              }
              code={`<div className="flex items-center">
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Item 1</div>
  <Spacer size="md" direction="horizontal" variant="visible" />
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Item 2</div>
</div>
<div>
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Top</div>
  <Spacer size="lg" direction="vertical" variant="visible" />
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Bottom</div>
</div>`}
            />

            <ComponentDemo
              title="Flex Spacer"
              description="Flexible spacing that fills available space"
              component={
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Left</div>
                    <FlexSpacer variant="visible" />
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Right</div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Start</div>
                    <FlexSpacer />
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Center</div>
                    <FlexSpacer />
                    <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">End</div>
                  </div>
                </div>
              }
              code={`<div className="flex items-center">
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Left</div>
  <FlexSpacer variant="visible" />
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Right</div>
</div>
<div className="flex items-center">
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Start</div>
  <FlexSpacer />
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">Center</div>
  <FlexSpacer />
  <div className="bg-cyber-green/10 p-2 text-center text-cyber-green">End</div>
</div>`}
            />
          </div>

          {/* Separator Demo */}
          <div id="separator" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Separator
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Dividers and separators with brutalist styling
                </p>
              </div>
              <ComponentCopyButton componentName="Separator" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Separator Component"
              description="Dividers and separators with brutalist styling"
              component={
                <div className="space-y-4">
                  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                    Section 1
                  </div>
                  <Separator variant="default" />
                  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                    Section 2
                  </div>
                  <Separator variant="brutalist" />
                  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                    Section 3
                  </div>
                  <Separator variant="dashed" />
                  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">
                    Section 4
                  </div>
                </div>
              }
              code={`<div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Section 1</div>
<Separator variant="default" />
<div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Section 2</div>
<Separator variant="brutalist" />
<div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Section 3</div>
<Separator variant="dashed" />
<div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Section 4</div>`}
            />

            <ComponentDemo
              title="Separator Orientations"
              description="Horizontal and vertical separators"
              component={
                <div className="space-y-4">
                  <div className="flex items-center h-24">
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Left</div>
                    <Separator orientation="vertical" variant="brutalist" className="mx-4" />
                    <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Right</div>
                  </div>
                  <Separator orientation="horizontal" size="lg" />
                  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Below</div>
                </div>
              }
              code={`<div className="flex items-center h-24">
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Left</div>
  <Separator orientation="vertical" variant="brutalist" className="mx-4" />
  <div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Right</div>
</div>
<Separator orientation="horizontal" size="lg" />
<div className="bg-cyber-green/10 p-4 text-center text-cyber-green">Below</div>`}
            />
          </div>

          {/* Progress Demo */}
          <div id="progress" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Progress
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Progress bars with brutalist styling and animations
                </p>
              </div>
              <ComponentCopyButton componentName="Progress" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Progress Component"
              description="Progress bars with different variants and colors"
              component={
                <div className="space-y-4">
                  <Progress value={45} showValue />
                  <Progress value={70} variant="brutalist" color="magenta" showValue />
                  <Progress value={100} variant="gradient" glitchOnComplete showValue />
                  <Progress value={30} color="red" size="lg" showValue />
                </div>
              }
              code={`<Progress value={45} showValue />
<Progress value={70} variant="brutalist" color="magenta" showValue />
<Progress value={100} variant="gradient" glitchOnComplete showValue />
<Progress value={30} color="red" size="lg" showValue />`}
            />

            <ComponentDemo
              title="Animated Progress"
              description="Progress bars with animations and effects"
              component={
                <div className="space-y-4">
                  <Progress value={60} animated striped showValue />
                  <Progress value={80} variant="brutalist" animated color="green" showValue />
                  <Progress value={25} size="sm" striped color="blue" showValue />
                  <Progress value={90} size="lg" animated color="magenta" showValue />
                </div>
              }
              code={`<Progress value={60} animated striped showValue />
<Progress value={80} variant="brutalist" animated color="green" showValue />
<Progress value={25} size="sm" striped color="blue" showValue />
<Progress value={90} size="lg" animated color="magenta" showValue />`}
            />
          </div>

          {/* Skeleton Demo */}
          <div id="skeleton" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Skeleton
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Loading placeholders with brutalist styling
                </p>
              </div>
              <ComponentCopyButton componentName="Skeleton" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Skeleton Component"
              description="Basic skeleton loading states"
              component={
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <SkeletonAvatar size="md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton width="75%" height="20px" />
                      <Skeleton width="50%" height="16px" />
                    </div>
                  </div>
                  <SkeletonText lines={3} />
                  <Skeleton variant="brutalist" height="60px" />
                </div>
              }
              code={`<div className="flex items-center space-x-4">
  <SkeletonAvatar size="md" />
  <div className="flex-1 space-y-2">
    <Skeleton width="75%" height="20px" />
    <Skeleton width="50%" height="16px" />
  </div>
</div>
<SkeletonText lines={3} />
<Skeleton variant="brutalist" height="60px" />`}
            />

            <ComponentDemo
              title="Skeleton Variants"
              description="Different skeleton styles and animations"
              component={
                <div className="space-y-4">
                  <Skeleton variant="default" height="40px" />
                  <Skeleton variant="brutalist" height="40px" />
                  <Skeleton variant="shimmer" height="40px" />
                  <div className="flex space-x-4">
                    <SkeletonAvatar size="sm" />
                    <SkeletonAvatar size="md" />
                    <SkeletonAvatar size="lg" />
                  </div>
                </div>
              }
              code={`<Skeleton variant="default" height="40px" />
<Skeleton variant="brutalist" height="40px" />
<Skeleton variant="shimmer" height="40px" />
<div className="flex space-x-4">
  <SkeletonAvatar size="sm" />
  <SkeletonAvatar size="md" />
  <SkeletonAvatar size="lg" />
</div>`}
            />
          </div>

          {/* Spinner Demo */}
          <div id="spinner" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Spinner
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Loading spinners with various animations
                </p>
              </div>
              <ComponentCopyButton componentName="Spinner" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Spinner Component"
              description="Loading spinners with different variants"
              component={
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                    <Spinner size="xl" />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Spinner variant="brutalist" color="green" />
                    <Spinner variant="dots" color="magenta" />
                    <Spinner variant="pulse" color="white" />
                  </div>
                </div>
              }
              code={`<div className="flex items-center space-x-4">
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>
<div className="flex items-center space-x-4">
  <Spinner variant="brutalist" color="green" />
  <Spinner variant="dots" color="magenta" />
  <Spinner variant="pulse" color="white" />
</div>`}
            />

            <ComponentDemo
              title="Spinner with Labels"
              description="Spinners with loading text and different speeds"
              component={
                <div className="space-y-4">
                  <Spinner showLabel label="Loading..." />
                  <Spinner variant="dots" showLabel label="Processing..." speed="slow" />
                  <Spinner variant="brutalist" showLabel label="Initializing..." speed="fast" />
                  <LoadingSpinner size="lg" />
                </div>
              }
              code={`<Spinner showLabel label="Loading..." />
<Spinner variant="dots" showLabel label="Processing..." speed="slow" />
<Spinner variant="brutalist" showLabel label="Initializing..." speed="fast" />
<LoadingSpinner size="lg" />`}
            />
          </div>

          {/* Toast Demo */}
          <div id="toast" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Toast
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Notification toasts with brutalist styling
                </p>
              </div>
              <ComponentCopyButton componentName="Toast" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Toast Component"
              description="Notification toasts with different variants"
              component={
                <div className="space-y-4 relative">
                  <div className="bg-cyber-dark/50 p-4 rounded border border-cyber-green/30 min-h-[200px] relative">
                    <p className="text-cyber-gray text-sm mb-4">Toast preview area:</p>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          console.log("Toast would appear here");
                        }}
                      >
                        Show Success Toast
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          console.log("Toast would appear here");
                        }}
                      >
                        Show Error Toast
                      </Button>
                    </div>
                  </div>
                </div>
              }
              code={`// Use with ToastProvider
const { addToast } = useToast();

addToast({
  variant: "success",
  title: "Success!",
  description: "Operation completed successfully",
  duration: 5000
});

addToast({
  variant: "error", 
  title: "Error",
  description: "Something went wrong",
  closable: true
});`}
            />

            <ComponentDemo
              title="Toast Variants"
              description="Different toast styles and positions"
              component={
                <div className="space-y-4">
                  <div className="bg-cyber-dark/50 p-4 rounded border border-cyber-green/30 min-h-[200px] relative">
                    <p className="text-cyber-gray text-sm mb-4">Toast variants:</p>
                    <div className="space-y-2">
                      <div className="text-xs text-cyber-gray">• Default toast</div>
                      <div className="text-xs text-cyber-gray">• Success toast with icon</div>
                      <div className="text-xs text-cyber-gray">• Warning toast</div>
                      <div className="text-xs text-cyber-gray">• Error toast with action</div>
                      <div className="text-xs text-cyber-gray">• Info toast with glitch effect</div>
                    </div>
                  </div>
                </div>
              }
              code={`// Different toast configurations
addToast({
  variant: "default",
  title: "Notification",
  description: "Default toast message"
});

addToast({
  variant: "success",
  title: "Success",
  showIcon: true,
  glitchOnShow: true
});

addToast({
  variant: "warning",
  title: "Warning",
  action: {
    label: "Retry",
    onClick: () => console.log("Retry clicked")
  }
});`}
            />
          </div>
        </div>

        {/* Props Tables */}
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="text-xl font-brutalist font-bold uppercase text-cyber-green mb-6">
              Card Props
            </h3>
            <PropsTable props={cardProps} />
          </div>

          <div>
            <h3 className="text-xl font-brutalist font-bold uppercase text-cyber-green mb-6">
              Alert Props
            </h3>
            <PropsTable props={alertProps} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayoutSection;
