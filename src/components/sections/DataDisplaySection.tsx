import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableFooter,
  useSortableTable,
} from "../ui/Table";
import {
  List,
  ListItem,
  DescriptionList,
  DescriptionTerm,
  DescriptionDetails,
  InteractiveList,
} from "../ui/List";
import { Avatar, AvatarGroup } from "../ui/Avatar";
import { EmptyState, EmptySearch, EmptyData, EmptyError } from "../ui/EmptyState";
import { Stats, StatsGrid, StatsCard, MetricStats, StatsSummary } from "../ui/Stats";
import { Typography } from "../ui/Typography";
import { ComponentDemo } from "../showcase/ComponentDemo";
import { ComponentCopyButton } from "../showcase/CopyButton";
import {
  User,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Search,
  Plus,
  Settings,
  Bell,
  BookOpen,
  Code,
  Layers,
} from "lucide-react";

const DataDisplaySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showEmptySearch, setShowEmptySearch] = useState(false);

  // Sample data for table
  const tableData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  ];

  const { sortedData, sortDirection, handleSort } = useSortableTable(tableData, "name");

  // Sample stats data
  const statsData = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: 12.5,
      changeType: "positive" as const,
      description: "vs last month",
    },
    {
      title: "Active Users",
      value: "2,345",
      change: -2.3,
      changeType: "negative" as const,
      description: "vs last week",
    },
    {
      title: "Orders",
      value: "1,234",
      change: 8.1,
      changeType: "positive" as const,
      description: "vs last month",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: 0,
      changeType: "neutral" as const,
      description: "no change",
    },
  ];

  const handleSearch = () => {
    setShowEmptySearch(searchTerm.trim() !== "");
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowEmptySearch(false);
  };

  return (
    <section id="data-display" className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                Data Display
              </h2>
              <p className="text-lg text-cyber-gray mt-2">
                Components for displaying and organizing data, content, and metrics
              </p>
            </div>
          </div>

          {/* Table Demo */}
          <div id="table" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Table
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Sortable data tables with brutalist styling and variants
                </p>
              </div>
              <ComponentCopyButton componentName="Table" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
            <ComponentDemo
              title="Table Component"
              description="Sortable table with different variants and features"
              fullWidth={true}
              component={
                <div className="space-y-4">
                  <Table variant="brutalist" hoverable>
                    <TableHeader>
                      <TableRow>
                        <TableHead sortable sortDirection={sortDirection} onSort={handleSort}>
                          Name
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedData.map(user => (
                        <TableRow key={user.id} hoverable>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "Admin" ? "primary" : "secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "primary" : "secondary"}>
                              {user.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-cyber-gray">
                          Showing {sortedData.length} users
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </div>
              }
              code={`const { sortedData, sortDirection, handleSort } = useSortableTable(data, "name");

<Table variant="brutalist" hoverable>
  <TableHeader>
    <TableRow>
      <TableHead 
        sortable 
        sortDirection={sortDirection}
        onSort={handleSort}
      >
        Name
      </TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {sortedData.map((user) => (
      <TableRow key={user.id} hoverable>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Badge variant={user.role === "Admin" ? "primary" : "secondary"}>
            {user.role}
          </Badge>
        </TableCell>
        <TableCell>
          <Badge variant={user.status === "Active" ? "success" : "secondary"}>
            {user.status}
          </Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={4} className="text-center">
        Showing {sortedData.length} users
      </TableCell>
    </TableRow>
  </TableFooter>
</Table>`}
            />
          </div>

          {/* List Demo */}
          <div id="list" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  List
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Versatile list components with multiple variants and markers
                </p>
              </div>
              <ComponentCopyButton componentName="List" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="List Component"
              description="Lists with different markers and variants"
              component={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Brutalist List
                    </h4>
                    <List variant="brutalist" marker="arrow">
                      <ListItem icon={<Code className="w-4 h-4" />}>React Components</ListItem>
                      <ListItem icon={<Layers className="w-4 h-4" />}>TypeScript Support</ListItem>
                      <ListItem icon={<Settings className="w-4 h-4" />}>Brutalist Design</ListItem>
                      <ListItem icon={<BookOpen className="w-4 h-4" />}>
                        Full Documentation
                      </ListItem>
                    </List>
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Interactive List
                    </h4>
                    <InteractiveList variant="cards" selectable>
                      <div className="flex items-center gap-3">
                        <Settings className="w-5 h-5 text-cyber-green" />
                        <div>
                          <div className="font-semibold text-cyber-white">Settings</div>
                          <div className="text-sm text-cyber-gray">Configure your preferences</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-cyber-green" />
                        <div>
                          <div className="font-semibold text-cyber-white">Profile</div>
                          <div className="text-sm text-cyber-gray">Manage your account</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-cyber-green" />
                        <div>
                          <div className="font-semibold text-cyber-white">Notifications</div>
                          <div className="text-sm text-cyber-gray">Control your alerts</div>
                        </div>
                      </div>
                    </InteractiveList>
                  </div>
                </div>
              }
              code={`// Brutalist list with icons
<List variant="brutalist" marker="arrow">
  <ListItem icon={<Code className="w-4 h-4" />}>
    React Components
  </ListItem>
  <ListItem icon={<Layers className="w-4 h-4" />}>
    TypeScript Support
  </ListItem>
  <ListItem icon={<Settings className="w-4 h-4" />}>
    Brutalist Design
  </ListItem>
</List>

// Interactive list with cards
<InteractiveList variant="cards" selectable>
  <div className="flex items-center gap-3">
    <Settings className="w-5 h-5 text-cyber-green" />
    <div>
      <div className="font-semibold">Settings</div>
      <div className="text-sm text-cyber-gray">Configure preferences</div>
    </div>
  </div>
  // ... more items
</InteractiveList>`}
            />

            <ComponentDemo
              title="Description List"
              description="Structured lists for displaying key-value pairs"
              component={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      User Information
                    </h4>
                    <DescriptionList variant="brutalist">
                      <DescriptionTerm>Name</DescriptionTerm>
                      <DescriptionDetails>John Doe</DescriptionDetails>

                      <DescriptionTerm>Email</DescriptionTerm>
                      <DescriptionDetails>john@example.com</DescriptionDetails>

                      <DescriptionTerm>Role</DescriptionTerm>
                      <DescriptionDetails>
                        <Badge variant="primary">Administrator</Badge>
                      </DescriptionDetails>

                      <DescriptionTerm>Status</DescriptionTerm>
                      <DescriptionDetails>
                        <Badge variant="primary">Active</Badge>
                      </DescriptionDetails>

                      <DescriptionTerm>Last Login</DescriptionTerm>
                      <DescriptionDetails>2 hours ago</DescriptionDetails>
                    </DescriptionList>
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">Ordered List</h4>
                    <List ordered variant="spaced">
                      <ListItem>Install ChaoS/UI</ListItem>
                      <ListItem>Import components</ListItem>
                      <ListItem>Configure Tailwind</ListItem>
                      <ListItem>Start building</ListItem>
                    </List>
                  </div>
                </div>
              }
              code={`// Description list
<DescriptionList variant="brutalist">
  <DescriptionTerm>Name</DescriptionTerm>
  <DescriptionDetails>John Doe</DescriptionDetails>
  
  <DescriptionTerm>Email</DescriptionTerm>
  <DescriptionDetails>john@example.com</DescriptionDetails>
  
  <DescriptionTerm>Status</DescriptionTerm>
  <DescriptionDetails>
    <Badge variant="success">Active</Badge>
  </DescriptionDetails>
</DescriptionList>

// Ordered list
<List ordered variant="spaced">
  <ListItem>Install ChaoS/UI</ListItem>
  <ListItem>Import components</ListItem>
  <ListItem>Configure Tailwind</ListItem>
  <ListItem>Start building</ListItem>
</List>`}
            />
          </div>

          {/* Avatar Demo */}
          <div id="avatar" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Avatar
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  User avatars with fallbacks, status indicators, and grouping
                </p>
              </div>
              <ComponentCopyButton componentName="Avatar" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Avatar Component"
              description="Avatars with different sizes, variants, and status indicators"
              component={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">Sizes</h4>
                    <div className="flex items-center gap-4">
                      <Avatar size="xs" fallback="XS" />
                      <Avatar size="sm" fallback="SM" />
                      <Avatar size="md" fallback="MD" />
                      <Avatar size="lg" fallback="LG" />
                      <Avatar size="xl" fallback="XL" />
                      <Avatar size="2xl" fallback="2XL" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Variants & Status
                    </h4>
                    <div className="flex items-center gap-4">
                      <Avatar variant="default" fallback="JD" status="online" ring />
                      <Avatar
                        variant="brutalist"
                        fallback="AB"
                        status="busy"
                        ring
                        ringColor="red"
                      />
                      <Avatar variant="square" fallback="CD" status="away" ring ringColor="blue" />
                      <Avatar
                        variant="rounded"
                        fallback="EF"
                        status="offline"
                        ring
                        ringColor="white"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">With Images</h4>
                    <div className="flex items-center gap-4">
                      <Avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="User 1"
                        status="online"
                        ring
                      />
                      <Avatar
                        src="https://images.unsplash.com/photo-1494790108755-2616b5ad4a2e?w=40&h=40&fit=crop&crop=face"
                        alt="User 2"
                        status="busy"
                        ring
                        ringColor="red"
                      />
                      <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt="User 3"
                        status="away"
                        ring
                        ringColor="blue"
                      />
                    </div>
                  </div>
                </div>
              }
              code={`// Different sizes
<Avatar size="xs" fallback="XS" />
<Avatar size="sm" fallback="SM" />
<Avatar size="md" fallback="MD" />
<Avatar size="lg" fallback="LG" />

// With status and ring
<Avatar 
  variant="brutalist" 
  fallback="JD" 
  status="online"
  ring
  ringColor="green"
/>

// With image
<Avatar 
  src="https://example.com/avatar.jpg"
  alt="User"
  status="online"
  ring
/>`}
            />

            <ComponentDemo
              title="Avatar Group"
              description="Grouped avatars with overflow handling"
              component={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">Avatar Group</h4>
                    <AvatarGroup max={4} spacing="normal">
                      <Avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                        alt="User 1"
                        fallback="U1"
                      />
                      <Avatar
                        src="https://images.unsplash.com/photo-1494790108755-2616b5ad4a2e?w=40&h=40&fit=crop&crop=face"
                        alt="User 2"
                        fallback="U2"
                      />
                      <Avatar
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                        alt="User 3"
                        fallback="U3"
                      />
                      <Avatar
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face"
                        alt="User 4"
                        fallback="U4"
                      />
                      <Avatar fallback="U5" />
                      <Avatar fallback="U6" />
                    </AvatarGroup>
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Different Spacing
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-cyber-gray mb-2">Tight spacing</div>
                        <AvatarGroup max={3} spacing="tight" size="sm">
                          <Avatar fallback="T1" />
                          <Avatar fallback="T2" />
                          <Avatar fallback="T3" />
                          <Avatar fallback="T4" />
                        </AvatarGroup>
                      </div>
                      <div>
                        <div className="text-sm text-cyber-gray mb-2">Loose spacing</div>
                        <AvatarGroup max={3} spacing="loose" size="md">
                          <Avatar fallback="L1" />
                          <Avatar fallback="L2" />
                          <Avatar fallback="L3" />
                          <Avatar fallback="L4" />
                        </AvatarGroup>
                      </div>
                    </div>
                  </div>
                </div>
              }
              code={`// Avatar group with overflow
<AvatarGroup max={4} spacing="normal">
  <Avatar 
    src="https://example.com/user1.jpg"
    alt="User 1"
    fallback="U1"
  />
  <Avatar 
    src="https://example.com/user2.jpg"
    alt="User 2"
    fallback="U2"
  />
  <Avatar fallback="U3" />
  <Avatar fallback="U4" />
  <Avatar fallback="U5" />
  <Avatar fallback="U6" />
</AvatarGroup>

// Different spacing
<AvatarGroup max={3} spacing="tight" size="sm">
  <Avatar fallback="T1" />
  <Avatar fallback="T2" />
  <Avatar fallback="T3" />
  <Avatar fallback="T4" />
</AvatarGroup>`}
            />
          </div>

          {/* Empty State Demo */}
          <div id="empty-state" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Empty State
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Placeholder states for empty content and error scenarios
                </p>
              </div>
              <ComponentCopyButton componentName="EmptyState" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Empty State Component"
              description="Different empty state variants and illustrations"
              component={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Search Results
                    </h4>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search components..."
                        className="flex-1 px-3 py-2 bg-cyber-dark border border-cyber-green/20 rounded text-cyber-white text-sm"
                      />
                      <Button size="sm" onClick={handleSearch}>
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                    {showEmptySearch && (
                      <EmptySearch
                        title="No results found"
                        searchTerm={searchTerm}
                        onClear={clearSearch}
                        size="sm"
                      />
                    )}
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">No Data</h4>
                    <EmptyData
                      title="No projects found"
                      resource="projects"
                      onCreate={() => console.log("Create project")}
                      onRefresh={() => console.log("Refresh")}
                      size="sm"
                    />
                  </div>
                </div>
              }
              code={`// Empty search state
<EmptySearch
  searchTerm={searchTerm}
  onClear={clearSearch}
  title="No results found"
  description="Try adjusting your search terms"
/>

// Empty data state
<EmptyData
  resource="projects"
  onCreate={() => console.log("Create project")}
  onRefresh={() => console.log("Refresh")}
  title="No projects found"
  description="Get started by creating your first project"
/>`}
            />

            <ComponentDemo
              title="Empty State Variants"
              description="Error states and custom empty states"
              component={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">Error State</h4>
                    <EmptyError
                      title="Something went wrong"
                      error="Failed to load data"
                      onRetry={() => console.log("Retry")}
                      size="sm"
                    />
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">
                      Custom Empty State
                    </h4>
                    <EmptyState
                      title="No Messages"
                      description="Your inbox is empty. Start a conversation to see messages here."
                      illustration="inbox"
                      variant="brutalist"
                      size="sm"
                      actions={
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          New Message
                        </Button>
                      }
                    />
                  </div>
                </div>
              }
              code={`// Error state
<EmptyError
  error="Failed to load data"
  onRetry={() => console.log("Retry")}
  title="Something went wrong"
  description="An error occurred while loading data"
/>

// Custom empty state
<EmptyState
  title="No Messages"
  description="Your inbox is empty. Start a conversation to see messages here."
  illustration="inbox"
  variant="brutalist"
  actions={
    <Button size="sm">
      <Plus className="w-4 h-4 mr-2" />
      New Message
    </Button>
  }
/>`}
            />
          </div>

          {/* Stats Demo */}
          <div id="stats" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Stats
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Metric displays with trends, charts, and brutalist styling
                </p>
              </div>
              <ComponentCopyButton componentName="Stats" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
            <ComponentDemo
              title="Stats Component"
              description="Metric displays with trends and different variants"
              fullWidth={true}
              component={
                <div className="space-y-6">
                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">Stats Grid</h4>
                    <StatsGrid columns={4} gap="md">
                      <StatsCard
                        title="Total Revenue"
                        value="$45,231"
                        change={12.5}
                        changeType="positive"
                        description="vs last month"
                        icon={<DollarSign className="w-5 h-5" />}
                      />
                      <StatsCard
                        title="Active Users"
                        value="2,345"
                        change={-2.3}
                        changeType="negative"
                        description="vs last week"
                        icon={<Users className="w-5 h-5" />}
                      />
                      <StatsCard
                        title="Orders"
                        value="1,234"
                        change={8.1}
                        changeType="positive"
                        description="vs last month"
                        icon={<ShoppingCart className="w-5 h-5" />}
                      />
                      <StatsCard
                        title="Conversion Rate"
                        value="3.2%"
                        change={0}
                        changeType="neutral"
                        description="no change"
                        icon={<Activity className="w-5 h-5" />}
                      />
                    </StatsGrid>
                  </div>

                  <div>
                    <h4 className="font-brutalist font-bold text-cyber-green mb-3">Metric Stats</h4>
                    <StatsGrid columns={3} gap="md">
                      <MetricStats
                        metric="revenue"
                        title="Monthly Revenue"
                        value="$12,345"
                        change={15.2}
                        changeType="positive"
                        variant="brutalist"
                      />
                      <MetricStats
                        metric="users"
                        title="New Signups"
                        value="89"
                        change={-5.1}
                        changeType="negative"
                        variant="card"
                      />
                      <MetricStats
                        metric="performance"
                        title="System Load"
                        value="67%"
                        change={2.3}
                        changeType="positive"
                        variant="minimal"
                      />
                    </StatsGrid>
                  </div>
                </div>
              }
              code={`// Stats grid
<StatsGrid columns={4} gap="md">
  <StatsCard
    title="Total Revenue"
    value="$45,231"
    change={12.5}
    changeType="positive"
    description="vs last month"
    icon={<DollarSign className="w-5 h-5" />}
  />
  <StatsCard
    title="Active Users"
    value="2,345"
    change={-2.3}
    changeType="negative"
    description="vs last week"
    icon={<Users className="w-5 h-5" />}
  />
  // ... more stats
</StatsGrid>

// Metric stats
<MetricStats
  metric="revenue"
  title="Monthly Revenue"
  value="$12,345"
  change={15.2}
  changeType="positive"
  variant="brutalist"
/>`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Stats Summary"
              description="Organized summary of multiple metrics"
              fullWidth={true}
              component={
                <div className="space-y-4">
                  <StatsSummary
                    title="Monthly Overview"
                    stats={statsData.slice(0, 3)}
                    variant="brutalist"
                  />
                </div>
              }
              code={`const statsData = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: 12.5,
    changeType: "positive",
    description: "vs last month"
  },
  {
    title: "Active Users",
    value: "2,345",
    change: -2.3,
    changeType: "negative",
    description: "vs last week"
  },
  // ... more stats
];

<StatsSummary
  title="Monthly Overview"
  stats={statsData}
  variant="brutalist"
/>`}
            />

            <ComponentDemo
              title="Individual Stats"
              description="Single stat components with different variants"
              component={
                <div className="space-y-4">
                  <Stats
                    title="Performance"
                    value="98.5%"
                    change={1.2}
                    changeType="positive"
                    description="uptime"
                    variant="brutalist"
                    icon={<Activity className="w-5 h-5" />}
                  />

                  <Stats
                    title="Storage Used"
                    value="45.2 GB"
                    change={12.3}
                    changeType="positive"
                    description="of 100 GB"
                    variant="card"
                    showTrend={false}
                  />

                  <Stats
                    title="API Calls"
                    value="12,345"
                    change={-8.4}
                    changeType="negative"
                    description="this hour"
                    variant="minimal"
                    loading={false}
                  />
                </div>
              }
              code={`// Individual stats with different variants
<Stats
  title="Performance"
  value="98.5%"
  change={1.2}
  changeType="positive"
  description="uptime"
  variant="brutalist"
  icon={<Activity className="w-5 h-5" />}
/>

<Stats
  title="Storage Used"
  value="45.2 GB"
  change={12.3}
  changeType="positive"
  description="of 100 GB"
  variant="card"
  showTrend={false}
/>

<Stats
  title="API Calls"
  value="12,345"
  change={-8.4}
  changeType="negative"
  description="this hour"
  variant="minimal"
  loading={false}
/>`}
            />
          </div>

          {/* Typography Demo */}
          <div id="typography" className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-brutalist font-black uppercase tracking-tighter text-cyber-green">
                  Typography
                </h3>
                <p className="text-lg text-cyber-gray mt-2">
                  Text styling with brutalist typography and cyber aesthetics
                </p>
              </div>
              <ComponentCopyButton componentName="Typography" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
            <ComponentDemo
              title="Typography Component"
              description="Text elements with different variants and styles"
              component={
                <div className="space-y-4">
                  <Typography variant="h1" className="text-cyber-green">
                    Heading 1
                  </Typography>
                  <Typography variant="h2" className="text-cyber-green">
                    Heading 2
                  </Typography>
                  <Typography variant="h3" className="text-cyber-green">
                    Heading 3
                  </Typography>
                  <Typography variant="lead" className="text-cyber-white">
                    This is a lead paragraph that stands out from regular text.
                  </Typography>
                  <Typography variant="p" className="text-cyber-white">
                    This is regular body text that provides detailed information.
                  </Typography>
                  <Typography variant="small" className="text-cyber-gray">
                    This is small text for captions and less important information.
                  </Typography>
                  <Typography variant="code" className="text-cyber-green">
                    const component = "Typography";
                  </Typography>
                </div>
              }
              code={`<Typography variant="h1" className="text-cyber-green">
  Heading 1
</Typography>

<Typography variant="h2" className="text-cyber-green">
  Heading 2
</Typography>

<Typography variant="lead" className="text-cyber-white">
  This is a lead paragraph that stands out from regular text.
</Typography>

<Typography variant="body" className="text-cyber-white">
  This is regular body text that provides detailed information.
</Typography>

<Typography variant="code" className="text-cyber-green">
  const component = "Typography";
</Typography>`}
            />

            <ComponentDemo
              title="Typography Variants"
              description="Different text styles and formatting options"
              component={
                <div className="space-y-4">
                  <Typography variant="h2" brutalist className="text-cyber-green">
                    Brutalist Heading
                  </Typography>
                  <Typography variant="p" className="text-cyber-white">
                    Regular body text with <strong>bold</strong> and <em>italic</em> formatting.
                  </Typography>
                  <Typography variant="p" className="text-cyber-white line-through">
                    Strikethrough text
                  </Typography>
                  <Typography variant="p" className="text-cyber-white underline">
                    Underlined text
                  </Typography>
                  <Typography variant="code" className="text-cyber-green bg-cyber-dark p-2 rounded">
                    function hello() {"{"}
                    <br />
                    &nbsp;&nbsp;console.log("Hello, World!");
                    <br />
                    {"}"}
                  </Typography>
                  <Typography variant="small" className="text-cyber-gray uppercase tracking-wide">
                    Small caps text
                  </Typography>
                </div>
              }
              code={`// Brutalist heading
<Typography variant="h2" brutalist className="text-cyber-green">
  Brutalist Heading
</Typography>

// Body text with formatting
<Typography variant="body" className="text-cyber-white">
  Regular body text with <strong>bold</strong> and <em>italic</em> formatting.
</Typography>

// Code block
<Typography variant="code" className="text-cyber-green bg-cyber-dark p-2 rounded">
  function hello() {"{"}
  <br />
  &nbsp;&nbsp;console.log("Hello, World!");
  <br />
  {"}"}
</Typography>

// Small caps
<Typography variant="small" className="text-cyber-gray uppercase tracking-wide">
  Small caps text
</Typography>`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataDisplaySection;
