import { notFound } from "next/navigation";
import { Shell } from "../../../components/shell";
import { CodeBox, InstallCommand } from "../../../components/detail";
const pages = {
  composition: {
    title: "Build from styled parts.",
    intro:
      "Use complete defaults, compose with children, and override only what your project needs.",
  },
  installation: {
    title: "A good place to start.",
    intro:
      "Jez UI gives you source code you can adapt. Start with a React 19 and Tailwind 4 project, then install only what you need.",
  },
  theming: {
    title: "Make it feel like you.",
    intro:
      "Semantic tokens keep components coherent while leaving room for a different personality.",
  },
  accessibility: {
    title: "Good for more people.",
    intro:
      "The useful details should work for everyone. Accessibility and performance are part of the component, not a finishing touch.",
  },
  changelog: {
    title: "What’s taking shape.",
    intro: "The initial Jez UI collection.",
  },
  licensing: {
    title: "Source, with clear terms.",
    intro:
      "Jez UI is currently a private collection. Public distribution terms have not been selected.",
  },
};
export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  if (!page) notFound();
  return (
    <Shell>
      <main className="docs-copy">
        <nav
          className="mb-10 flex flex-wrap gap-5 text-sm"
          aria-label="Documentation"
        >
          {Object.keys(pages).map((s) => (
            <a href={"/docs/" + s} key={s} className="capitalize">
              {s}
            </a>
          ))}
        </nav>
        <h1>{page.title}</h1>
        <p>{page.intro}</p>
        {slug === "composition" && (
          <>
            <h2>Styled defaults, optional overrides</h2>
            <p>
              Install Card once to get every Card part. Content, typography,
              spacing, and actions already have styles. Native props and
              className pass through to each part.
            </p>
            <InstallCommand slug="card" />
            <CodeBox
              code={`import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/jez-ui/ui/card";
import {Button} from "@/components/jez-ui/ui/button";

<Card>
  <CardHeader>
    <CardTitle>Your workspace</CardTitle>
    <CardDescription>A shared home for your projects.</CardDescription>
  </CardHeader>
  <CardContent>Invite your team when you are ready.</CardContent>
  <CardFooter><Button>Invite teammates</Button></CardFooter>
</Card>`}
            />
            <h2>Choose a shortcut or compose children</h2>
            <p>
              Tabs, Accordion, Select, menus, overlays, and other structural
              components include named child parts. Existing items, options, and
              trigger shortcuts still work. A component’s page lists every
              export included in its install.
            </p>
            <CodeBox
              code={`<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Your overview</TabsContent>
  <TabsContent value="activity">Your activity</TabsContent>
</Tabs>`}
            />
            <h2>Forms without spacing utilities</h2>
            <p>
              FormField connects a label, hint, and error to one input
              automatically. FieldGroup spaces several fields. FieldRow aligns a
              checkbox or switch with its label. For custom layouts use Field,
              FieldLabel, FieldDescription, and FieldError with matching IDs.
            </p>
            <CodeBox
              code={`<FieldGroup>
  <FormField label="Project" hint="Choose a memorable name.">
    <Input name="project" />
  </FormField>
  <FieldRow><Switch name="notifications" /> Email notifications</FieldRow>
</FieldGroup>`}
            />
            <h2>Sidebars with your own hierarchy</h2>
            <p>
              Use SidebarHeader for an organisation switcher, SidebarContent for
              groups and nested menus, and SidebarFooter for an account popout.
              Menu buttons accept asChild so your router links keep their
              behaviour. Add as many SidebarMenuItem and SidebarMenuSubItem
              children as needed.
            </p>
            <CodeBox
              code={`<SidebarProvider>
  <Sidebar>
    <SidebarHeader>Your organisation switcher</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild><a href="/projects">All projects</a></SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild><a href="/projects/design">Design system</a></SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>Your account menu</SidebarFooter>
  </Sidebar>
  <SidebarInset><SidebarTrigger />Your page</SidebarInset>
</SidebarProvider>`}
            />
            <h2>Every hero’s words are yours</h2>
            <p>
              All twenty heroes expose their headings, descriptions, action
              labels, and supporting copy. Use the exported Copy defaults to
              discover a hero’s named slots. Distortion Hero’s artworkText
              changes its rendered wordmark, including its static fallback.
              Product Demo Hero accepts children to replace the sample product
              interface.
            </p>
            <CodeBox
              code={`<DistortionHero title="Make a mark." description="An independent studio." actionLabel="Our work" artworkText="NORTH" copy={{brand:"NORTH STUDIO",meta:"EST. 2026"}} />`}
            />
          </>
        )}
        {slug === "composition" ? null : slug === "installation" ? (
          <>
            <h2>Prepare your project</h2>
            <p>
              Use Node 22.12 or newer. Configure Tailwind 4 and initialise
              shadcn so its CLI knows your stylesheet and component aliases.
            </p>
            <CodeBox code="pnpm dlx shadcn@4.0.8 init" />
            <h2>Install a component</h2>
            <InstallCommand slug="button" />
            <p>
              The registry copies source into components/jez-ui, installs its
              declared dependencies, and adds the shared theme. Keep your
              existing theme under version control before adding a new registry.
            </p>
            <CodeBox
              code={`import { Button } from '@/components/jez-ui/ui/button';\n\nexport default function Example() {\n  return <Button>Make something good</Button>;\n}`}
            />
            <h2>Prefer the manual route?</h2>
            <p>
              Open any component’s Source section. Copy every listed file while
              preserving the ui/ and blocks/ folders, install the listed
              dependencies, and add the Jez theme variables and keyframes from
              /r/jez-theme.json to your Tailwind stylesheet. The registry source
              is the source used by the preview.
            </p>
            <h2>Fonts</h2>
            <p>
              The catalogue and template downloads bundle Instrument Sans.
              Component installations inherit your app’s fonts; install
              @fontsource-variable/instrument-sans or use your own display and
              interface faces.
            </p>
            <h2>Start with a template</h2>
            <p>
              Download an archive, extract it, run pnpm install, then pnpm dev.
              Each template includes its own components, assets, theme, and
              integration README.
            </p>
          </>
        ) : slug === "theming" ? (
          <>
            <h2>One vocabulary, many personalities.</h2>
            <p>
              background, foreground, muted, border, primary,
              primary-foreground, accent, and danger describe purpose rather
              than a specific colour. Apply a .dark ancestor to switch component
              themes.
            </p>
            <CodeBox
              code={`:root {\n  --primary: #405746;\n  --primary-foreground: #ffffff;\n  --accent: #d7e0c4;\n  --font-heading: 'Instrument Sans Variable', system-ui, sans-serif;\n  --font-interface: 'Instrument Sans Variable', system-ui, sans-serif;\n}`}
            />
            <h2>Keep the relationships</h2>
            <p>
              Check text contrast after changing tokens, including disabled
              states, focus rings, and chart labels. Each template intentionally
              supplies its own default identity.
            </p>
          </>
        ) : slug === "accessibility" ? (
          <>
            <h2>Keyboard and focus</h2>
            <p>
              Radix manages focus and keyboard behaviour for complex primitives.
              Supply a useful label to every control. Dialogs require a title
              and description. Test your composed flows with Tab, Shift+Tab,
              Escape, and the relevant arrow keys.
            </p>
            <h2>Motion that knows when to stop</h2>
            <p>
              Motion components respond to prefers-reduced-motion. WebGL falls
              back to a static composition when reduced motion is requested or
              rendering is unavailable. Decorative effects never replace
              essential text.
            </p>
            <h2>Load what you use</h2>
            <p>
              WebGL examples load on demand. Scenes mount near the viewport,
              stop offscreen, cap device pixel ratio, and dispose their shader
              material. Keep a pause control alongside long-running animation.
            </p>
            <h2>Data and demo boundaries</h2>
            <p>
              Charts provide a textual data representation. Template data is
              fictional. Forms, chat, billing, and checkout demonstrate frontend
              states; connect real services at the documented boundaries.
            </p>
          </>
        ) : slug === "changelog" ? (
          <>
            <h2>0.1.0 · Initial collection</h2>
            <ul>
              <li>
                90 components across foundations, product controls, motion,
                effects, and charts.
              </li>
              <li>36 composed marketing and product blocks.</li>
              <li>Eight standalone multipage Next.js templates.</li>
              <li>
                Source registry, searchable documentation, isolated previews,
                and template archives.
              </li>
            </ul>
            <p>
              See the repository’s verification report for the checks performed
              and any remaining release limitations.
            </p>
          </>
        ) : (
          <>
            <h2>Original source</h2>
            <p>
              All rights reserved. Repository access and a visible download
              button do not grant public redistribution or resale rights. Select
              distribution terms before publishing this collection.
            </p>
            <h2>Third-party work</h2>
            <p>
              Dependencies and fonts retain their own licences. Template
              archives include notices. Illustrative identities, geometric
              artwork, and generated product imagery are identified as demo
              assets; no customer endorsements are implied.
            </p>
            <h2>Commercial features</h2>
            <p>
              Checkout, customer accounts, entitlements, paid downloads, and
              real business backends are deliberately outside this release.
            </p>
          </>
        )}
      </main>
    </Shell>
  );
}
