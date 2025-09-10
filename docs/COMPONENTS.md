# Components Specification

## SiteHeader
**File**: `/components/SiteHeader.js`

### Props
- None (uses internal state)

### Features
- Fixed position with backdrop blur
- Responsive navigation (desktop/mobile)
- User authentication state awareness
- Mobile hamburger menu

### Structure
```jsx
<header>
  <Logo />
  <Navigation />
  <Actions>
    {user ? <Dashboard CTA> : <Login + Demo CTA>}
  </Actions>
  <MobileMenu />
</header>
```

### Behavior
- Shows different CTAs based on auth state
- Mobile menu toggles on hamburger click
- Sticky on scroll with blur effect

---

## SiteFooter
**File**: `/components/SiteFooter.js`

### Props
- None

### Structure
```jsx
<footer>
  <Grid columns={4}>
    <BrandColumn />
    <QuickLinks />
    <Resources />
    <Connect />
  </Grid>
  <BottomBar />
</footer>
```

### Content
- 4-column grid on desktop, stacked on mobile
- Social media links
- Contact information
- Copyright and legal links

---

## Section
**File**: `/components/Section.js`

### Props
- `variant`: 'default' | 'modern' | 'elevated'
- `padding`: 'none' | 'small' | 'medium' | 'large'
- `className`: Additional CSS classes
- `children`: Section content

### Usage
```jsx
<Section variant="modern" padding="large">
  {content}
</Section>
```

### Styles
- Automatic container wrapper
- Responsive padding
- Background variants with gradients

---

## Card
**File**: `/components/Card.js`

### Props
- `hover`: boolean (default: true)
- `padding`: 'none' | 'small' | 'medium' | 'large'
- `className`: Additional CSS classes
- `children`: Card content

### Features
- Glass morphism effect
- Hover animations
- Gradient borders
- Shadow effects

### Usage
```jsx
<Card padding="medium" hover={true}>
  {content}
</Card>
```

---

## Button
**File**: `/components/Button.js`

### Props
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'small' | 'medium' | 'large'
- `className`: Additional CSS classes
- All native button props

### Variants
- **Primary**: Gradient background, white text
- **Secondary**: Transparent with border
- **Ghost**: Subtle background

### Usage
```jsx
<Button variant="primary" size="large" onClick={handler}>
  Get Started
</Button>
```

---

## Tabs
**File**: `/components/Tabs.js`

### Props
- `tabs`: Array of tab objects
  - `label`: Tab label text
  - `icon`: Optional Font Awesome icon class
  - `content`: Tab panel content
- `defaultTab`: Initial active tab index
- `className`: Additional CSS classes

### Features
- Horizontal tab navigation
- Active tab indicator
- Icon support
- Responsive layout

### Usage
```jsx
<Tabs 
  tabs={[
    { label: 'Overview', icon: 'fa-home', content: <Overview /> },
    { label: 'Settings', icon: 'fa-cog', content: <Settings /> }
  ]}
  defaultTab={0}
/>
```

---

## Forms

### ContactForm
**File**: `/components/Forms/ContactForm.js`

#### Props
- `onSubmit`: Form submission handler

#### Fields
- Name (required)
- Email (required)
- Phone (optional)
- Business Name (optional)
- Message (required)

#### Features
- Validation
- Responsive grid layout
- Error states (🟡 TODO)
- Success feedback (🟡 TODO)

### FreeChangeRequestForm
**File**: `/components/Forms/FreeChangeRequestForm.js`

#### Props
- `onSubmit`: Form submission handler

#### Fields
- Website URL
- Request Type (dropdown)
- Priority (radio buttons)
- Description (required)

#### Features
- Type categorization
- Priority levels
- File upload (🟡 TODO)

---

## StatCard
**File**: `/components/StatCard.js`

### Props
- `label`: Metric label
- `value`: Display value
- `icon`: Font Awesome icon class
- `iconColor`: Icon color class
- `change`: Change text (e.g., "+5%")
- `changeType`: 'positive' | 'negative' | 'neutral'
- `className`: Additional CSS classes

### Usage
```jsx
<StatCard 
  label="Total Users"
  value="523"
  icon="fa-users"
  iconColor="text-blue-400"
  change="+2.5% from last month"
  changeType="positive"
/>
```

### Features
- Icon positioning
- Change indicators with color coding
- Flexible value formatting

---

## Component Best Practices
- All components use CSS variables for theming
- Mobile-first responsive design
- Accessibility attributes (🟡 TODO - add ARIA labels)
- Loading states (🟡 TODO - implement)
- Error boundaries (🟡 TODO - add)
- TypeScript definitions (🟡 TODO - convert to TS)