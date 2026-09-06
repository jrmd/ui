import ts from "typescript";
import fs from "node:fs";
import {
  sceneExamples,
  chartExample,
  webglExample,
  productExample,
  effectExample,
} from "./preview-scenes.mjs";
import { groups, slugify } from "./catalogue-data.mjs";
const examples = {
  "webgl-image-distortion": `<WebGLImageDistortion imageSrc="/assets/studio-lamp.png"/>`,
  button: `<Button>Make something good →</Button>`,
  "icon-button": `<IconButton label="Add item"><Plus size={18}/></IconButton>`,
  badge: `<Badge>Ready to make</Badge>`,
  avatar: `<Avatar alt="Alex Morgan" fallback="AM"/>`,
  card: `<Card><h3 className="text-2xl">A little room to think.</h3><p className="mt-3 text-sm text-muted-foreground">A considered surface for whatever comes next.</p></Card>`,
  separator: `<div className="grid w-full gap-5"><span>Ideas above.</span><Separator/><span>Possibilities below.</span></div>`,
  skeleton: `<div className="grid w-64 gap-3"><Skeleton className="h-32"/><Skeleton/><Skeleton className="w-2/3"/></div>`,
  spinner: `<Spinner/>`,
  input: `<Input aria-label="Project name" placeholder="Your next big idea"/>`,
  textarea: `<Textarea aria-label="Project description" placeholder="Tell us what you’re thinking…"/>`,
  label: `<div className="grid gap-2"><Label htmlFor="example-label">Project name</Label><input id="example-label" className="rounded border border-border p-2" placeholder="Field notes"/></div>`,
  checkbox: `<label className="flex items-center gap-3"><Checkbox defaultChecked/>Keep a little room for play</label>`,
  "radio-group": `<RadioGroup defaultValue="balanced" aria-label="Density" options={[{label:'Comfortable',value:'comfortable'},{label:'Balanced',value:'balanced'},{label:'Compact',value:'compact'}]}/>`,
  switch: `<label className="flex items-center gap-3"><Switch defaultChecked/>Notifications</label>`,
  select: `<Select><SelectTrigger aria-label="Choose a discipline"><SelectValue placeholder="Choose a discipline"/></SelectTrigger><SelectContent><SelectItem value="design">Design</SelectItem><SelectItem value="engineering">Engineering</SelectItem><SelectItem value="both">Everything in between</SelectItem></SelectContent></Select>`,
  slider: `<Slider label="Volume"/>`,
  "toggle-group": `<ToggleGroup type="single" defaultValue="week" aria-label="Period" options={[{label:'Day',value:'day'},{label:'Week',value:'week'},{label:'Month',value:'month'}]}/>`,
  tabs: `<Tabs defaultValue="design"><TabsList aria-label="Workflow">{tabs.map(t=><TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}</TabsList>{tabs.map(t=><TabsContent key={t.value} value={t.value}>{t.content}</TabsContent>)}</Tabs>`,
  accordion: `<Accordion type="single" collapsible items={[{value:'one',title:'What makes a good component?',content:'A clear purpose, thoughtful defaults, and room to make it yours.'},{value:'two',title:'Can I change it?',content:'The source is yours to adapt under your distribution licence.'}]}/>`,
  collapsible: `<div className="w-full max-w-md"><Collapsible title="Changed files · 3" defaultOpen>{["components/button.tsx","styles/theme.css","tests/controls.spec.ts"].map((file,i)=><div key={file} className="flex items-center gap-2 py-2 text-sm"><FileCode2 size={15} className="shrink-0 text-muted-foreground"/><span className="min-w-0 flex-1 truncate font-mono text-xs">{file}</span><span className="text-xs text-primary">+{[24,8,16][i]}</span></div>)}</Collapsible></div>`,
  dialog: `<Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent showClose={false}><DialogHeader><DialogTitle>Make it yours.</DialogTitle><DialogDescription>Give your project a name before you begin.</DialogDescription></DialogHeader><FormField label="Project name"><Input placeholder="Field notes"/></FormField><DialogFooter><DialogClose asChild><Button variant="outline">Close</Button></DialogClose></DialogFooter></DialogContent></Dialog>`,
  "alert-dialog": `<AlertDialog trigger={<Button variant="danger">Delete draft</Button>} title="Delete this draft?" description="This example asks for confirmation. No real data is deleted."/>`,
  sheet: `<Sheet trigger={<Button variant="outline">Open details</Button>} title="Project details" description="Website refresh · PRJ-102"><div className="grid gap-6"><FormField label="Project name"><Input defaultValue="Website refresh"/></FormField><FormField label="Status"><Select label="Status" defaultValue="progress" options={[{label:"In progress",value:"progress"},{label:"In review",value:"review"},{label:"Complete",value:"complete"}]}/></FormField><FormField label="Notes"><Textarea defaultValue="Explore a clearer homepage direction and bring the component previews up to date."/></FormField><Button onClick={()=>setNotice("Project details saved.")}>Save changes</Button></div></Sheet>`,
  popover: `<Popover><PopoverTrigger asChild><Button variant="outline">Project notes</Button></PopoverTrigger><PopoverContent><PopoverHeader><PopoverTitle>A small reminder</PopoverTitle><PopoverDescription>Leave room for the unexpected.</PopoverDescription></PopoverHeader></PopoverContent></Popover>`,
  tooltip: `<Tooltip content="Save your current work"><Button variant="outline">Hover or focus me</Button></Tooltip>`,
  "dropdown-menu": `<DropdownMenu trigger={<Button variant="outline">Project actions ↓</Button>} items={actions}/>`,
  "context-menu": `<ContextMenu trigger={<div tabIndex={0} className="rounded-xl border border-dashed border-border p-10 text-sm">Right-click for actions</div>} items={actions}/>`,
  "navigation-menu": `<NavigationMenu items={[{label:'Components',href:'/components'},{label:'Blocks',href:'/blocks'},{label:'Templates',href:'/templates'}]}/>`,
  breadcrumb: `<Breadcrumb items={[{label:'Library',href:'/components'},{label:'Foundations',href:'/components?category=foundations'},{label:'Breadcrumb'}]}/>`,
  toast: `<Toast title="Changes saved" description="Your project is ready for its next chapter."/>`,
  combobox: `<Combobox options={[{label:'React',value:'react',description:'Build interactive interfaces'},{label:'Next.js',value:'next',description:'React with server rendering'},{label:'Vite',value:'vite',description:'A fast development toolchain'},{label:'Astro',value:'astro',description:'Content-driven websites'},{label:'Remix',value:'remix',description:'Full-stack web applications'}]} label="Choose framework"/>`,
  "command-palette": `<CommandPalette items={[{label:"Create a project",group:"Workspace",shortcut:"⌘ N",onSelect:()=>setNotice("Create project selected.")},{label:"Find a teammate",group:"Workspace",onSelect:()=>setNotice("Team search selected.")},{label:"Open settings",group:"Navigation",shortcut:"⌘ ,",onSelect:()=>setNotice("Settings selected.")},{label:"View archive",group:"Navigation",onSelect:()=>setNotice("Archive selected.")}]}/>`,
  calendar: `<Calendar defaultValue="2026-09-08"/>`,
  "date-picker": `<DatePicker/>`,
  "date-range-picker": `<DateRangePicker/>`,
  "time-picker": `<TimePicker defaultValue="09:30"/>`,
  "file-upload": `<FileUpload accept="image/*,.pdf" multiple/>`,
  "otp-input": `<OtpInput/>`,
  "password-input": `<PasswordInput placeholder="Your password"/>`,
  "search-input": `<div><SearchInput value={searchTerm} onValueChange={setSearchTerm} placeholder="Search projects…"/><div className="mt-3 overflow-hidden rounded-lg border border-border">{["Website refresh","Brand guidelines","Component library"].filter(t=>t.toLowerCase().includes(searchTerm.toLowerCase())).map(t=><button key={t} onClick={()=>setNotice(t+" opened.")} className="flex w-full items-center gap-3 border-b border-border/50 px-3 py-3 text-left text-sm last:border-0 hover:bg-muted"><Folder size={15} className="text-muted-foreground"/>{t}<ArrowUpRight size={13} className="ml-auto text-muted-foreground"/></button>)}{!["Website refresh","Brand guidelines","Component library"].some(t=>t.toLowerCase().includes(searchTerm.toLowerCase()))&&<p className="p-5 text-sm text-muted-foreground">No projects found.</p>}</div></div>`,
  "tag-input": `<TagInput defaultValue={['Design','Play']}/>`,
  "form-field": `<FormField label="Project name" hint="Something you’ll recognise later."><Input placeholder="Field notes"/></FormField>`,
  pagination: `<Pagination totalPages={8}/>`,
  "data-table": `<DataTable selectable data={[{name:'Field notes',status:'Active',tasks:12},{name:'New perspective',status:'In review',tasks:8},{name:'Little things',status:'Done',tasks:24}]} columns={[{accessorKey:'name',header:'Project'},{accessorKey:'status',header:'Status',cell:c=><Badge tone={c.getValue()==='Done'?'positive':c.getValue()==='Active'?'accent':'neutral'}>{String(c.getValue())}</Badge>},{accessorKey:'tasks',header:'Tasks'}]}/>`,
  "tree-view": `<TreeView nodes={[{id:'src',label:'Source',children:[{id:'components',label:'Components',children:[{id:'button',label:'button.tsx'},{id:'card',label:'card.tsx'}]},{id:'theme',label:'theme.css'}]}]} onSelect={n=>setNotice(n.label+' selected')}/>`,
  "resizable-panels": `<ResizablePanels left={<p className="text-sm">Drag the divider, or focus it and use arrow keys.</p>} right={<p className="text-sm">Room for your work.</p>}/>`,
  stepper: `<Stepper steps={['Your details','Workspace','Ready']} current={1}/>`,
  "empty-state": `<EmptyState action={<Button onClick={()=>setNotice('Your first idea starts here.')}>Create an idea</Button>}/>`,
  alert: `<Alert title="Everything is up to date.">Your changes have been saved on this device.</Alert>`,
  progress: `<div className="grid gap-4"><div className="flex items-center justify-between text-sm"><span>{progress===100?"Export complete":progressRunning?"Preparing export…":progress>0?"Export paused":"Ready to export"}</span><span className="font-mono tabular-nums">{progress}%</span></div><Progress value={progress} label="Export progress" showLabel={false}/><div className="flex gap-2"><Button size="sm" disabled={progress===100} onClick={()=>setProgressRunning(v=>!v)}>{progressRunning?<Pause size={14}/>:<Play size={14}/>} {progressRunning?"Pause":progress>0?"Resume":"Start export"}</Button><Button size="sm" variant="ghost" aria-label="Reset progress" onClick={()=>{setProgressRunning(false);setProgress(0);}}><RotateCcw size={14}/></Button></div><p className="text-xs text-muted-foreground">Simulated export · try pausing halfway through.</p></div>`,
  "text-reveal": `<TextReveal className="font-display text-4xl">A fresh perspective.</TextReveal>`,
  "split-text": `<SplitText className="font-display text-4xl">Good things take shape.</SplitText>`,
  "rotating-text": `<div className="font-display text-4xl">Made for <RotatingText words={['ideas.','makers.','you.']}/></div>`,
  "scramble-text": `<ScrambleText className="font-display text-4xl">A little unexpected</ScrambleText>`,
  "number-ticker": `<div className="grid justify-items-center gap-5"><NumberTicker value={count} className="font-display text-6xl"/><Button variant="outline" onClick={()=>setCount(c=>c+17)}>Add 17</Button></div>`,
  "animated-counter": `<AnimatedCounter target={2048} className="font-display text-6xl"/>`,
  marquee: `<Marquee><span className="font-display text-4xl">MAKE ROOM.</span><span className="font-display text-4xl">MAKE SOMETHING.</span><span className="font-display text-4xl">MAKE IT YOURS.</span></Marquee>`,
  "scroll-reveal": `<ScrollReveal><Card><h3 className="text-3xl">Here when you arrive.</h3></Card></ScrollReveal>`,
  "stagger-group": `<StaggerGroup>{['A thought.','A sketch.','A new direction.'].map(t=><p key={t} className="rounded-lg bg-muted p-4">{t}</p>)}</StaggerGroup>`,
  "magnetic-button": `<MagneticButton>Come a little closer →</MagneticButton>`,
  "tilt-card": `<TiltCard><h3 className="text-3xl">A different angle.</h3><p className="mt-4 text-sm">Move your pointer around.</p></TiltCard>`,
  "spotlight-card": `<SpotlightCard><h3 className="text-3xl">Your moment.</h3><p className="mt-4 text-sm">Follow the light.</p></SpotlightCard>`,
  "animated-tabs-indicator": `<AnimatedTabsIndicator items={tabs}/>`,
  "shared-layout-transition": `<SharedLayoutTransition items={[{id:'one',title:'Explore the idea',description:'Open a little space for the unexpected. This panel expands while its neighbours move naturally.'},{id:'two',title:'Find the next step',description:'A small, clear action is often all you need.'}]}/>`,
  "scroll-progress": `<div className="h-96"><ScrollProgress/><h3 className="text-2xl">A sense of where you are.</h3><p className="mt-4 text-sm">The thin line at the top tracks this page as you scroll.</p></div>`,
  "application-shell": `<ApplicationShell brand="Acme" currentPath="#overview"><div className="mb-7"><p className="mb-2 text-xs text-muted-foreground">Tuesday, 8 September</p><h2 className="font-display text-2xl">Good morning, Alex.</h2><p className="mt-2 text-sm text-muted-foreground">Here’s what needs your attention.</p></div><div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]"><div><h3 className="mb-4 text-sm font-semibold">Your tasks</h3><TaskList/></div><ActivityFeed/></div></ApplicationShell>`,
};
let imports = [
    `import {Plus,ArrowUpRight,Check,FileCode2,Folder,Play,Pause,RotateCcw} from 'lucide-react';`,
  ],
  cases = [],
  entries = [];
for (const [group, names] of Object.entries(groups))
  for (const title of names.split(",")) {
    const slug = slugify(title),
      kind = ["marketing", "workspace"].includes(group) ? "block" : "component",
      folder = kind === "block" ? "blocks" : "ui",
      file = `registry/${folder}/${slug}.tsx`,
      source = fs.readFileSync(file, "utf8");
    const exported = [
      ...source.matchAll(/export (?:function|const) (\w+)/g),
    ].map((m) => m[1]);
    const symbol =
      exported.find(
        (name) =>
          name.toLowerCase() === title.replace(/[^a-z0-9]/gi, "").toLowerCase(),
      ) ?? exported.at(-1);
    imports.push(
      `const ${symbol}=lazy(()=>import('../../../${file.replace(".tsx", "")}').then(m=>({default:m.${symbol}})));`,
    );
    for (const part of exported.filter(
      (name) =>
        /^[A-Z]/.test(name) && name !== symbol && !name.endsWith("Copy"),
    ))
      imports.push(
        `import {${part}} from '../../../${file.replace(".tsx", "")}';`,
      );
    let ex = sceneExamples[slug] ?? examples[slug];
    if (slug === "sidebar")
      ex = `<SidebarProvider className="overflow-hidden rounded-xl border border-border"><Sidebar><SidebarHeader><span className="block truncate px-3 py-2 font-semibold">North Studio</span></SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarMenu><SidebarMenuItem><SidebarMenuButton asChild isActive><a href="#overview"><Folder/><span>Overview</span></a></SidebarMenuButton></SidebarMenuItem><SidebarMenuItem><SidebarMenuButton asChild><a href="#projects"><FileCode2/><span>Projects</span></a></SidebarMenuButton><SidebarMenuSub>{["Website refresh","Design system","Mobile app"].map(name=><SidebarMenuSubItem key={name}><SidebarMenuSubButton asChild><a href={"#"+name.toLowerCase().replaceAll(" ","-")}><span>{name}</span></a></SidebarMenuSubButton></SidebarMenuSubItem>)}</SidebarMenuSub></SidebarMenuItem></SidebarMenu></SidebarGroup><SidebarGroup><SidebarGroupLabel>Resources</SidebarGroupLabel><SidebarMenu>{["Documentation","Team","Settings"].map(name=><SidebarMenuItem key={name}><SidebarMenuButton asChild><a href={"#"+name.toLowerCase()}><Folder/><span>{name}</span></a></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroup></SidebarContent><SidebarFooter><span className="block truncate px-3 text-xs">alex@north.example</span></SidebarFooter></Sidebar><SidebarInset><header className="flex items-center gap-3 border-b border-border p-4"><SidebarTrigger/><span className="text-sm">Workspace</span></header><div className="p-6"><h1 className="text-2xl">Built from your own pieces.</h1><p className="mt-3 text-sm text-muted-foreground">Add groups, nested links, custom headers, and account controls using children.</p></div></SidebarInset></SidebarProvider>`;

    if (["tabs", "select"].includes(slug)) ex = examples[slug];
    if (slug === "dropdown-menu")
      ex = `<DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Project actions ↓</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Project</DropdownMenuLabel>{actions.map(action=><DropdownMenuItem key={action.label} onSelect={action.onSelect}>{action.label}</DropdownMenuItem>)}<DropdownMenuSeparator/><DropdownMenuCheckboxItem checked={showArchived} onCheckedChange={setShowArchived}>Show archived</DropdownMenuCheckboxItem><DropdownMenuSub><DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger><DropdownMenuSubContent><DropdownMenuItem onSelect={()=>setNotice("Moved to Personal.")}>Personal</DropdownMenuItem><DropdownMenuItem onSelect={()=>setNotice("Moved to Team.")}>Team</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub></DropdownMenuContent></DropdownMenu>`;
    if (slug === "resizable-panels")
      ex = `<ResizablePanelGroup><ResizablePanel defaultSize={25} minSize={15}>Navigation</ResizablePanel><ResizableHandle aria-label="Resize navigation"/><ResizablePanel defaultSize={50} minSize={20}>Your workspace. Drag a divider or focus it and use arrow keys.</ResizablePanel><ResizableHandle aria-label="Resize inspector"/><ResizablePanel defaultSize={25} minSize={15}>Inspector</ResizablePanel></ResizablePanelGroup>`;
    if (slug === "card")
      ex = `<Card><CardHeader><CardTitle>A little room to think.</CardTitle><CardDescription>A considered surface for whatever comes next.</CardDescription><CardAction><Badge>Draft</Badge></CardAction></CardHeader><CardContent><FormField label="Project name"><Input placeholder="Field notes"/></FormField></CardContent><CardFooter><Button onClick={()=>setNotice("Project created.")}>Create project</Button><Button variant="outline">Cancel</Button></CardFooter></Card>`;
    if (group === "charts") ex = chartExample(slug, symbol);
    if (kind === "component" && slug.startsWith("webgl-"))
      ex = webglExample(slug, symbol);
    if (!ex) {
      if (
        group === "effects" &&
        !slug.startsWith("webgl") &&
        slug !== "ripple-field"
      )
        ex = `<${symbol}><h3 className="text-3xl">A little atmosphere.</h3></${symbol}>`;
      else ex = `<${symbol}/>`;
    }
    if (group === "product") ex = productExample(slug, ex);
    if (group === "effects" && !slug.startsWith("webgl-"))
      ex = effectExample(slug, symbol) ?? ex;
    if (slug === "chat-workspace")
      ex = `<ChatWorkspace onSend={async (prompt) => "Demo response: define a clear outcome for “" + prompt + "”, then try a small version."}/>`;
    const customizable =
      source.includes("HeroProps") || source.includes("LoginPresentation");
    const copyMatch = source.match(/export const \w+Copy = (\{[\s\S]*?\});/);
    const copyDefaults = {};
    if (copyMatch) {
      const ast = ts.createSourceFile(
        "copy.ts",
        `const copy=${copyMatch[1]}`,
        ts.ScriptTarget.Latest,
        true,
      );
      const init =
        ast.statements[0].declarationList.declarations[0].initializer;
      for (const prop of init.properties)
        if (
          ts.isPropertyAssignment(prop) &&
          ts.isStringLiteral(prop.initializer)
        )
          copyDefaults[prop.name.getText(ast).replaceAll('"', "")] =
            prop.initializer.text;
    }
    const parameterSource =
      source.match(/(?:export )?function \w+\(\{([\s\S]*?)\}\s*:/)?.[1] ?? "";
    const customization = customizable
      ? [
          "artworkText",
          "title",
          "description",
          "actionLabel",
          "brand",
          "secondaryImageSrc",
          "secondaryImageAlt",
          "imageSrc",
          "imageAlt",
          "artwork",
        ].filter((key) => new RegExp("\\b" + key + "\\b").test(parameterSource))
      : [];
    const live = customizable
      ? ex.replace(`<${symbol}`, `<${symbol} {...customization}`)
      : ex;
    cases.push(`case '${slug}': return ${live};`);
    entries.push({
      slug,
      title,
      group,
      kind,
      file,
      symbol,
      customization,
      copyDefaults,
      example: ex,
    });
  }
fs.mkdirSync("apps/catalogue/components", { recursive: true });
fs.writeFileSync(
  "apps/catalogue/components/demo.tsx",
  `"use client";\nimport * as React from 'react';import {lazy,Suspense} from 'react';\n${imports
    .filter(
      (line) =>
        !line.startsWith("const ") ||
        new RegExp("<" + line.match(/const (\w+)/)[1] + "(?:[\\s/>])").test(
          cases.join("\n"),
        ),
    )
    .filter(
      (line) =>
        !line.startsWith("import {") ||
        !line.includes("../../../") ||
        new RegExp("<" + line.match(/import \{(\w+)/)[1] + "(?:[\\s/>])").test(
          cases.join("\n"),
        ),
    )
    .join(
      "\n",
    )}\nexport function Demo({slug,customization={}}:{slug:string;customization?:{secondaryImageSrc?:string;secondaryImageAlt?:string;copy?:Record<string,string>;artworkText?:string;title?:string;description?:string;actionLabel?:string;brand?:string;imageSrc?:string;imageAlt?:string;artwork?:{color?:string;speed?:number}}}){const [showArchived,setShowArchived]=React.useState<boolean|"indeterminate">(true);const [notice,setNotice]=React.useState('');const [scenePaused,setScenePaused]=React.useState(false);const [sceneSpeed,setSceneSpeed]=React.useState(1);const [sceneColor,setSceneColor]=React.useState<string|undefined>(undefined);const [count,setCount]=React.useState(128);const [draft,setDraft]=React.useState('');const [searchTerm,setSearchTerm]=React.useState('');const [buttonBusy,setButtonBusy]=React.useState(false);const [progress,setProgress]=React.useState(0);const [progressRunning,setProgressRunning]=React.useState(false);React.useEffect(()=>{if(!buttonBusy)return;const timer=setTimeout(()=>{setButtonBusy(false);setNotice('Project published.');},900);return()=>clearTimeout(timer);},[buttonBusy]);React.useEffect(()=>{if(!progressRunning)return;if(progress>=100){setProgressRunning(false);return;}const timer=setTimeout(()=>setProgress(v=>Math.min(100,v+4)),200);return()=>clearTimeout(timer);},[progressRunning,progress]);const actions=[{label:'Duplicate',onSelect:()=>setNotice('A copy is ready.')},{label:'Archive',onSelect:()=>setNotice('Moved to archive.')}];const tabs=[{value:'design',label:'Design',content:'Make it feel like something.'},{value:'build',label:'Build',content:'Give a good idea a useful shape.'},{value:'share',label:'Share',content:'Put it into the world.'}];function render(){switch(slug){${cases.join("\n")}default:return <p>Example not found.</p>}}return <Suspense fallback={<p className="p-8 text-sm">Loading example…</p>}><div className="w-full min-w-0">{render()}{notice&&<p role="status" className="mt-4 text-sm">{notice}</p>}</div></Suspense>}`,
);
fs.writeFileSync(
  "packages/catalogue/items.json",
  JSON.stringify(entries, null, 2),
);
console.log(`Authored ${entries.length} live examples`);
