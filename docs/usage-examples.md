# Usage Examples

## Real-World Implementation Patterns

This guide shows how to use ChaoS/UI components in common application scenarios with practical examples.

## Form Layouts

### Login Form

```tsx
import { Button, Input, Label, Card } from "./components/ui";

const LoginForm = () => {
  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-brutalist font-bold uppercase text-cyber-green mb-brutal-6">
        LOGIN
      </h2>

      <div className="space-y-brutal-4">
        <div>
          <Label htmlFor="email">EMAIL</Label>
          <Input id="email" type="email" placeholder="user@example.com" className="w-full" />
        </div>

        <div>
          <Label htmlFor="password">PASSWORD</Label>
          <Input id="password" type="password" placeholder="••••••••" className="w-full" />
        </div>

        <Button className="w-full" variant="primary">
          SIGN IN
        </Button>

        <Button className="w-full" variant="ghost">
          FORGOT PASSWORD?
        </Button>
      </div>
    </Card>
  );
};
```

### Contact Form with Validation

```tsx
import { useState } from "react";
import { Button, Input, TextArea, Label, Alert } from "./components/ui";

const ContactForm = () => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // Validation logic here
    setSuccess(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {success && (
        <Alert variant="success" className="mb-brutal-6">
          MESSAGE SENT SUCCESSFULLY!
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-brutal-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-brutal-4">
          <div>
            <Label htmlFor="name">NAME *</Label>
            <Input id="name" error={errors.name} className="w-full" />
            {errors.name && <p className="text-cyber-red text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="email">EMAIL *</Label>
            <Input id="email" type="email" error={errors.email} className="w-full" />
          </div>
        </div>

        <div>
          <Label htmlFor="message">MESSAGE *</Label>
          <TextArea id="message" rows={6} placeholder="Your message here..." className="w-full" />
        </div>

        <Button type="submit" variant="primary" size="lg">
          SEND MESSAGE
        </Button>
      </form>
    </div>
  );
};
```

## Dashboard Layouts

### Analytics Dashboard

```tsx
import { Card, Stats, Progress, Badge, Button } from "./components/ui";

const DashboardCard = ({ title, value, change, icon: Icon }) => (
  <Card className="p-brutal-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-cyber-gray text-sm font-mono uppercase">{title}</p>
        <p className="text-3xl font-brutalist font-bold text-cyber-white mt-2">{value}</p>
        <div className="flex items-center mt-2">
          <Badge variant={change > 0 ? "success" : "destructive"}>
            {change > 0 ? "+" : ""}
            {change}%
          </Badge>
        </div>
      </div>
      <Icon className="w-8 h-8 text-cyber-green" />
    </div>
  </Card>
);

const AnalyticsDashboard = () => {
  return (
    <div className="p-brutal-6 space-y-brutal-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-brutalist font-bold uppercase text-cyber-green">DASHBOARD</h1>
        <Button variant="outline">EXPORT DATA</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-brutal-6">
        <DashboardCard title="Total Users" value="12,847" change={8.2} icon={Users} />
        <DashboardCard title="Revenue" value="$84,394" change={-2.1} icon={DollarSign} />
        <DashboardCard title="Conversions" value="1,247" change={12.8} icon={TrendingUp} />
        <DashboardCard title="Active Sessions" value="847" change={3.4} icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-brutal-6">
        <Card className="p-brutal-6">
          <h3 className="text-lg font-brutalist font-bold uppercase mb-brutal-4">
            RECENT ACTIVITY
          </h3>
          <div className="space-y-brutal-3">
            {activities.map(activity => (
              <div key={activity.id} className="flex justify-between items-center">
                <span className="text-cyber-white">{activity.description}</span>
                <Badge variant="outline">{activity.time}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-brutal-6">
          <h3 className="text-lg font-brutalist font-bold uppercase mb-brutal-4">SYSTEM STATUS</h3>
          <div className="space-y-brutal-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>CPU Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Memory</span>
                <span>43%</span>
              </div>
              <Progress value={43} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Storage</span>
                <span>89%</span>
              </div>
              <Progress value={89} variant="warning" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
```

## E-commerce Patterns

### Product Card Grid

```tsx
import { Card, Button, Badge } from "./components/ui";

const ProductCard = ({ product }) => (
  <Card className="overflow-hidden">
    <div className="aspect-square bg-cyber-dark flex items-center justify-center">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
    </div>

    <div className="p-brutal-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-brutalist font-bold uppercase text-cyber-white">{product.name}</h3>
        {product.sale && <Badge variant="destructive">SALE</Badge>}
      </div>

      <p className="text-cyber-gray text-sm mb-brutal-3">{product.description}</p>

      <div className="flex justify-between items-center">
        <div>
          <span className="text-2xl font-brutalist font-bold text-cyber-green">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-cyber-gray line-through ml-2">${product.originalPrice}</span>
          )}
        </div>

        <Button variant="primary" size="sm">
          ADD TO CART
        </Button>
      </div>
    </div>
  </Card>
);

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-brutal-6">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
```

### Shopping Cart

```tsx
import { Card, Button, Input, Separator } from "./components/ui";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <div className="flex items-center gap-brutal-4 py-brutal-4">
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 object-cover border-brutal border-cyber-green"
    />

    <div className="flex-1">
      <h4 className="font-brutalist font-bold uppercase">{item.name}</h4>
      <p className="text-cyber-gray text-sm">{item.variant}</p>
    </div>

    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
      >
        -
      </Button>
      <Input
        type="number"
        value={item.quantity}
        className="w-16 text-center"
        onChange={e => onUpdateQuantity(item.id, parseInt(e.target.value))}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
      >
        +
      </Button>
    </div>

    <div className="text-right">
      <p className="font-brutalist font-bold text-cyber-green">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(item.id)}
        className="text-cyber-red"
      >
        REMOVE
      </Button>
    </div>
  </div>
);

const ShoppingCart = ({ items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-brutal-6">
        <h2 className="text-2xl font-brutalist font-bold uppercase text-cyber-green mb-brutal-6">
          SHOPPING CART
        </h2>

        <div className="space-y-brutal-2">
          {items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))}
        </div>

        <Separator className="my-brutal-6" />

        <div className="space-y-brutal-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-xl font-brutalist font-bold">
            <span>TOTAL:</span>
            <span className="text-cyber-green">${total.toFixed(2)}</span>
          </div>
        </div>

        <Button className="w-full mt-brutal-6" variant="primary" size="lg">
          PROCEED TO CHECKOUT
        </Button>
      </div>
    </Card>
  );
};
```

## Data Display Patterns

### User Management Table

```tsx
import { Table, Button, Badge, Avatar } from "./components/ui";

const UserManagementTable = ({ users, onEdit, onDelete }) => {
  const columns = [
    {
      header: "USER",
      accessorKey: "user",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.original.avatar} alt={row.original.name} />
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-sm text-cyber-gray">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "ROLE",
      accessorKey: "role",
      cell: ({ row }) => (
        <Badge variant={row.original.role === "admin" ? "destructive" : "default"}>
          {row.original.role.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: "STATUS",
      accessorKey: "status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "active" ? "success" : "secondary"}>
          {row.original.status.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: "LAST LOGIN",
      accessorKey: "lastLogin",
      cell: ({ row }) => (
        <span className="text-cyber-gray">
          {new Date(row.original.lastLogin).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "ACTIONS",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(row.original)}>
            EDIT
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(row.original.id)}>
            DELETE
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-brutal-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-brutalist font-bold uppercase text-cyber-green">
          USER MANAGEMENT
        </h2>
        <Button variant="primary">ADD USER</Button>
      </div>

      <Table data={users} columns={columns} />
    </div>
  );
};
```

## Navigation Patterns

### Sidebar Navigation

```tsx
import { useState } from "react";
import { Button } from "./components/ui";

const SidebarNav = ({ items, activeItem, onItemClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "bg-cyber-dark border-r border-cyber-green transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-brutal-4 border-b border-cyber-green">
        <Button variant="ghost" onClick={() => setCollapsed(!collapsed)} className="w-full">
          {collapsed ? "→" : "←"}
        </Button>
      </div>

      <nav className="p-brutal-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className={cn(
              "w-full text-left p-brutal-3 font-mono uppercase transition-colors",
              "hover:bg-cyber-green hover:text-cyber-black",
              activeItem === item.id && "bg-cyber-green text-cyber-black"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              {!collapsed && <span>{item.label}</span>}
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};
```

### Breadcrumb Navigation

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "./components/ui";

const PageBreadcrumbs = ({ path }) => (
  <Breadcrumb className="mb-brutal-6">
    {path.map((item, index) => (
      <BreadcrumbItem key={item.href}>
        {index < path.length - 1 ? (
          <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
        ) : (
          <span className="text-cyber-green font-bold">{item.label}</span>
        )}
      </BreadcrumbItem>
    ))}
  </Breadcrumb>
);
```

## Modal and Dialog Patterns

### Confirmation Dialog

```tsx
import { Modal, Button } from "./components/ui";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="p-brutal-6 max-w-md">
      <h3 className="text-xl font-brutalist font-bold uppercase text-cyber-red mb-brutal-4">
        {title}
      </h3>

      <p className="text-cyber-gray mb-brutal-6">{message}</p>

      <div className="flex gap-brutal-3 justify-end">
        <Button variant="ghost" onClick={onClose}>
          CANCEL
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          CONFIRM
        </Button>
      </div>
    </div>
  </Modal>
);
```

## Error Handling Patterns

### Error Boundary

```tsx
import { Alert, Button } from "./components/ui";

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen flex items-center justify-center p-brutal-6">
    <div className="max-w-md text-center">
      <Alert variant="destructive" className="mb-brutal-6">
        <h2 className="text-lg font-brutalist font-bold uppercase mb-2">SYSTEM ERROR</h2>
        <p className="text-sm">{error.message}</p>
      </Alert>

      <Button onClick={resetErrorBoundary} variant="primary">
        RETRY
      </Button>
    </div>
  </div>
);
```

These examples demonstrate how ChaoS/UI components work together to create functional, brutalist interfaces. The key is maintaining consistency in spacing, typography, and color usage while building complex layouts.

For more advanced patterns and component combinations, check out our [Customization Guide](./customization.md) and [Contributing Guidelines](./contributing.md).
