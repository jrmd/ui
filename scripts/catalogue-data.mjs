export const groups = {
  foundations:
    "Button,Icon Button,Badge,Avatar,Card,Separator,Skeleton,Spinner,Input,Textarea,Label,Checkbox,Radio Group,Switch,Select,Slider,Toggle Group,Tabs,Accordion,Collapsible,Dialog,Alert Dialog,Sheet,Popover,Tooltip,Dropdown Menu,Context Menu,Navigation Menu,Breadcrumb,Toast",
  product:
    "Combobox,Command Palette,Calendar,Date Picker,Date Range Picker,Time Picker,File Upload,OTP Input,Password Input,Search Input,Tag Input,Form Field,Pagination,Data Table,Tree View,Resizable Panels,Stepper,Empty State,Alert,Progress",
  motion:
    "Text Reveal,Split Text,Rotating Text,Scramble Text,Number Ticker,Animated Counter,Marquee,Scroll Reveal,Stagger Group,Magnetic Button,Tilt Card,Spotlight Card,Animated Tabs Indicator,Shared Layout Transition,Scroll Progress",
  effects:
    "Grain Overlay,Dot Grid,Animated Grid,Gradient Mesh,Aurora Background,Spotlight Background,Border Beam,Ripple Field,Cursor Trail,WebGL Particle Field,WebGL Ribbon Field,WebGL Liquid Surface,WebGL Orb,WebGL Terrain,WebGL Image Distortion",
  charts:
    "Area Chart,Line Chart,Bar Chart,Stacked Bar Chart,Donut Chart,Radial Gauge,Heatmap,Sparkline,Live Line Chart,Scatter Chart",
  marketing:
    "Editorial Hero,Product Demo Hero,WebGL Hero,Logo Wall,Feature Grid,Alternating Feature Story,Product Comparison,Metrics Strip,Testimonial Grid,Testimonial Carousel,Pricing Table,Pricing Comparison,FAQ,Newsletter Signup,Contact Form,CTA Section,Marketing Navigation,Mega Navigation,Floating Navigation,Terrain Hero,Marketing Footer,Particle Hero,Liquid Hero,Orb Hero,Silk Hero,Eclipse Hero,Tunnel Hero,Constellation Hero,Distortion Hero,Media Hero,Typographic Hero,Shape Hero,Studio Hero,Journal Hero,Poster Hero,Portfolio Hero,Collage Hero,Editorial Navigation,Commerce Navigation,Studio Navigation",
  workspace:
    "Application Shell,Workspace Navigation,Analytics Overview,Activity Feed,Searchable Records Screen,Record Detail Panel,Kanban Board,Task List,Calendar Schedule,Onboarding Wizard,Sign In Form,Sign Up Form,Password Reset Form,Profile Settings,Team Management,Billing Settings,Notification Centre,Command Search,Chat Workspace,Workspace Sidebar,Rail Sidebar,Inset Sidebar,User Switcher,Organization Switcher,SSO Login,Split Login,Workspace Login",
};
export const slugify = (s) => s.toLowerCase().replaceAll(" ", "-");
export const templateSpecs = [
  {
    slug: "saas",
    name: "Forma",
    title: "SaaS marketing",
    description: "A bright, confident home for a thoughtful product.",
    color: "#36483e",
    routes: ["", "features", "pricing", "contact", "sign-in"],
  },
  {
    slug: "analytics",
    name: "Metric",
    title: "Analytics dashboard",
    description: "A clear view of the numbers that move your business.",
    color: "#78867a",
    routes: ["", "reports", "reports/weekly", "customers", "settings"],
  },
  {
    slug: "projects",
    name: "Common",
    title: "Project workspace",
    description: "A warmer place for teams to plan and make.",
    color: "#b9774c",
    routes: ["", "board", "list", "task/1", "team", "settings"],
  },
  {
    slug: "ai-chat",
    name: "Margin",
    title: "AI chat workspace",
    description: "A quiet space for questions, drafts, and new directions.",
    color: "#8879ac",
    routes: ["", "conversation/demo", "library", "settings"],
  },
  {
    slug: "agency",
    name: "OTHER",
    title: "Creative agency",
    description: "Big type. Strong opinions. Work with a little more bite.",
    color: "#ff632b",
    routes: [
      "",
      "work",
      "work/fieldwork",
      "work/new-frequencies",
      "work/common-ground",
      "studio",
      "contact",
    ],
  },
  {
    slug: "portfolio",
    name: "Alex Rivers",
    title: "Developer portfolio",
    description: "Show the thinking as well as the finished thing.",
    color: "#405746",
    routes: [
      "",
      "projects",
      "projects/field-notes",
      "projects/frequency",
      "projects/common-ground",
      "about",
      "contact",
    ],
  },
  {
    slug: "editorial",
    name: "Still",
    title: "Editorial publication",
    description: "Good stories, given the space they deserve.",
    color: "#a35e45",
    routes: [
      "",
      "category/design",
      "article/a-slower-internet",
      "article/the-shape-of-a-good-question",
      "article/objects-that-stay",
      "search",
      "author/rowan",
    ],
  },
  {
    slug: "storefront",
    name: "Objects",
    title: "Ecommerce storefront",
    description: "Considered objects. A considered shopping experience.",
    color: "#b9a471",
    routes: ["", "collection", "product/studio-lamp", "cart", "checkout"],
  },
];
export const descriptions = {
  "particle-hero":
    "A constellation of points beneath a centred headline, with a quiet split footer.",
  "liquid-hero":
    "A tall editorial headline beside a slowly moving liquid surface.",
  "orb-hero":
    "An illuminated, shader-shaped orb paired with an asymmetric headline.",
  "silk-hero":
    "Fine flowing waves behind restrained typography and a single invitation.",
  "eclipse-hero":
    "A luminous eclipse with pointer response, warm typography, and a split composition.",
  "tunnel-hero":
    "A perspective tunnel, oversized event typography, and a centred call to action.",
  "constellation-hero":
    "An animated network of connections beside a community-focused introduction.",
  "distortion-hero":
    "Interactive chromatic distortion turns a typographic wordmark into the main artwork.",
  "media-hero":
    "A full-height product photograph with editorial copy and a collection link.",
  "typographic-hero":
    "Oversized, staggered typography on a vivid vermilion canvas.",
  "shape-hero": "Bold geometric objects balance a playful studio introduction.",
  "studio-hero":
    "A project-led studio introduction with a wide identity study and supporting copy.",
  "journal-hero":
    "An editorial cover, serif headline, and spacious introduction to a publication.",
  "poster-hero":
    "Poster-scale typography and a compact programme introduction in citrus and ink.",
  "portfolio-hero":
    "An independent practice introduction with a tilted project image.",
  "collage-hero": "An image collage surrounds a centred, expressive headline.",
  "workspace-sidebar":
    "Organisation switching, pinned projects, collapsible navigation, and a bottom account menu.",
  "rail-sidebar": "A compact icon rail with workspace and account popouts.",
  "inset-sidebar":
    "A framed workspace canvas beside softly recessed navigation and account controls.",
  "user-switcher":
    "Keyboard-accessible account switching, profile settings, and sign-out adapters.",
  "organization-switcher":
    "Switch organisations with plan context and a workspace creation adapter.",
  "sso-login":
    "A compact sign-in card with Google, GitHub, and email authentication adapters.",
  "split-login":
    "A full-screen split layout with a brand panel and social or email sign-in.",
  "workspace-login":
    "A focused enterprise sign-in screen with email-based SAML and social providers.",
  "editorial-navigation":
    "A publication masthead with numbered sections and a compact mobile menu.",
  "commerce-navigation":
    "A shop announcement, centred wordmark, collection links, and shopping bag.",
  "studio-navigation":
    "A restrained header opens a full-height navigation sheet with oversized links.",
  "testimonial-carousel":
    "Sliding customer stories with touch gestures, direct pagination, and reduced-motion support.",

  "product-demo-hero":
    "A full project preview with task details, completion, search, and timeline views.",
  "feature-grid":
    "Explore project conversations, handoffs, and briefs in a selectable feature section.",
  "alternating-feature-story":
    "Project updates and activity history, composed around realistic work.",
  "application-shell":
    "A responsive workspace with current-page navigation, page search, and a collapsible sidebar.",
  "pricing-table":
    "Compare plan features and monthly or annual billing in one view.",
  "webgl-hero":
    "Flowing ribbons, deliberate typography, and a pause control in a full-width hero.",
  "cursor-trail":
    "A tapered pointer stroke that fades with time and draws only while active.",
  "tilt-card":
    "A bounded spring tilt with stable pointer tracking and reduced-motion support.",
  "magnetic-button":
    "A spring-driven action with a stable hit area and bounded displacement.",
  button: "A dependable action, with clear emphasis and loading states.",
  dialog: "A focus-managed conversation with a clear way back.",
  "data-table":
    "Search, sort, and paginate your records without losing context.",
  "webgl-orb": "A living, shader-shaped surface in three dimensions.",
  "webgl-ribbon-field":
    "Seven flowing surfaces with continuous folds, directional light, and pointer response.",
  "webgl-particle-field":
    "A deep field of points arranged in a sunflower spiral.",
  "webgl-liquid-surface":
    "A continuously displaced surface with soft wave interference.",
  "webgl-terrain": "A tessellated landscape shaped by layered waves.",
  "webgl-image-distortion": "An image plane with a flowing distortion shader.",
  "kanban-board":
    "Editable tasks, drag and drop, and keyboard-accessible status changes.",
  "chat-workspace":
    "A complete local chat journey with stop, retry, and history.",
  "number-ticker": "Smoothly interpolate between supplied numeric values.",
  "animated-counter": "Count toward a target the first time it enters view.",
};
