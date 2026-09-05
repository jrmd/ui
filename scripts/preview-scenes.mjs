// Usage compositions are part of the public examples, never replacement widgets.
export const sceneExamples = {
  button: `<div className="grid w-full max-w-lg gap-6"><div className="flex items-center justify-between border-b border-border pb-5"><div><h3 className="text-lg font-semibold">Project actions</h3><p className="mt-1 text-sm text-muted-foreground">Website refresh · Draft</p></div><Badge>Draft</Badge></div><div className="flex flex-wrap items-center gap-3"><Button loading={buttonBusy} onClick={()=>setButtonBusy(true)}><Plus size={16}/>Publish project</Button><Button variant="outline" onClick={()=>setNotice('Draft saved.')}>Save draft</Button><Button variant="ghost" onClick={()=>setNotice('Preview selected.')}>Preview <ArrowUpRight size={15}/></Button></div><div className="flex flex-wrap items-center gap-3"><Button size="sm" variant="secondary" onClick={()=>setNotice('Invitation link copied in this example.')}>Invite member</Button><Button size="sm" variant="danger" onClick={()=>setNotice('Archive action selected.')}>Archive</Button><Button size="sm" disabled>Up to date <Check size={14}/></Button></div></div>`,
  "icon-button": `<div className="flex items-center gap-5"><IconButton label="Add item" onClick={()=>setNotice('Item added')}><Plus size={18}/></IconButton><div><p className="font-medium">One small action.</p><p className="mt-1 text-sm text-muted-foreground">A new idea starts here.</p></div></div>`,
  badge: `<div className="grid max-w-md gap-7"><h3 className="text-2xl">A status worth noticing.</h3><div className="flex flex-wrap gap-3"><Badge tone="positive">● Live</Badge><Badge tone="accent">In review</Badge><Badge tone="warning">Needs attention</Badge><Badge>Draft</Badge></div><p className="text-sm text-muted-foreground">Small signals. Clear next steps.</p></div>`,
  avatar: `<div className="grid justify-items-center gap-6"><div className="flex -space-x-3">{['AM','JL','SK','RT'].map((person,i)=><Avatar key={person} alt={['Alex Morgan','Jamie Lee','Sam Kim','Rory Tate'][i]} fallback={person} className="size-14 border-4 border-background bg-muted text-base"/>)}</div><div className="text-center"><h3 className="text-2xl">Better, together.</h3><p className="mt-2 text-sm text-muted-foreground">Four people. One shared idea.</p></div></div>`,
  card: `<Card className="w-full max-w-sm overflow-hidden p-0"><div className="flex h-40 items-end justify-between bg-accent p-6 text-foreground"><span className="text-5xl font-medium tracking-tight">Field<br/>notes.</span><span className="text-3xl">↗</span></div><div className="p-6"><div className="flex items-center justify-between"><h3 className="text-xl">An idea taking shape</h3><Badge tone="positive">Active</Badge></div><p className="mt-3 text-sm leading-relaxed text-muted-foreground">A shared space for the discoveries, sketches, and small details that make the work better.</p><div className="mt-6 flex items-center justify-between border-t border-border pt-4"><span className="text-xs text-muted-foreground">Updated a moment ago</span><Button size="sm" variant="ghost" onClick={()=>setNotice('Project opened.')}>Open project ↗</Button></div></div></Card>`,
  separator: `<div className="grid w-full max-w-sm gap-5"><div className="flex justify-between"><h3 className="text-xl">Your workspace</h3><Badge>Personal</Badge></div><Separator/><div className="flex justify-between text-sm"><span>Projects</span><span className="text-muted-foreground">12</span></div><div className="flex justify-between text-sm"><span>Collaborators</span><span className="text-muted-foreground">4</span></div></div>`,
  skeleton: `<div className="grid w-full max-w-sm gap-5"><Skeleton className="h-40 rounded-xl"/><div className="flex items-center gap-4"><Skeleton className="size-11 rounded-full"/><div className="grid flex-1 gap-3"><Skeleton className="w-3/4"/><Skeleton className="w-1/2"/></div></div><p className="text-xs text-muted-foreground">Making room for the next good thing.</p></div>`,
  spinner: `<div className="flex items-center gap-5"><Spinner className="size-8"/><div><h3 className="text-xl">Bringing it together.</h3><p className="mt-1 text-sm text-muted-foreground">Your workspace is getting ready.</p></div></div>`,
  input: `<div className="grid w-full max-w-sm gap-6"><h3 className="text-2xl">Give it a name.</h3><FormField label="Project name" hint="You can change this whenever you like."><Input placeholder="e.g. The next chapter"/></FormField><FormField label="Workspace URL"><div className="flex items-center rounded-lg border border-border px-3"><span className="shrink-0 whitespace-nowrap text-sm text-muted-foreground">studio.app /</span><Input className="border-0 bg-transparent shadow-none focus-visible:ring-0" aria-label="Workspace slug" defaultValue="field-notes"/></div></FormField></div>`,
  textarea: `<div className="w-full max-w-lg"><div className="mb-4 flex items-center gap-3"><Avatar alt="Alex Morgan" fallback="AM" className="size-8"/><div><h3 className="text-sm font-semibold">Add a project update</h3><p className="text-xs text-muted-foreground">Shared with your team</p></div></div><div className="overflow-hidden rounded-xl border border-border focus-within:border-primary/50 focus-within:ring-3 focus-within:ring-primary/8"><Textarea aria-label="Project description" placeholder="What changed? What’s next?" maxLength={500} value={draft} onChange={e=>setDraft(e.target.value)} className="min-h-36 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"/><div className="flex items-center justify-between border-t border-border/50 bg-muted/20 px-3 py-2"><span className="text-xs text-muted-foreground tabular-nums">{draft.length} / 500</span><Button size="sm" disabled={!draft.trim()} onClick={()=>{setNotice('Update posted: '+draft);setDraft('');}}>Post update <ArrowUpRight size={14}/></Button></div></div></div>`,
  checkbox: `<div className="grid w-full max-w-sm gap-5"><h3 className="text-2xl">Before we go live.</h3>{['Add the finishing touches','Check the small screen','Share it with the team'].map((text,i)=><label key={text} className="flex items-center gap-3 border-b border-border pb-4 text-sm"><Checkbox defaultChecked={i===0}/>{text}</label>)}</div>`,
  switch: `<div className="grid w-full max-w-sm gap-6"><div><h3 className="text-2xl">Keep your focus.</h3><p className="mt-2 text-sm text-muted-foreground">A quieter workspace, on your terms.</p></div>{[{name:'Focus mode',hint:'Make a little room to think.',on:true},{name:'Project updates',hint:'Only the changes that matter.',on:true},{name:'Weekly roundup',hint:'The whole picture, once a week.',on:false}].map(o=><label key={o.name} className="flex items-center justify-between gap-6 border-b border-border pb-5"><div><span className="text-sm font-medium">{o.name}</span><p className="mt-1 text-xs text-muted-foreground">{o.hint}</p></div><Switch defaultChecked={o.on}/></label>)}</div>`,
  select: `<div className="grid w-full max-w-sm gap-6"><h3 className="text-2xl">Find your people.</h3><FormField label="Your discipline"><Select label="Choose a discipline" options={[{label:'Design',value:'design'},{label:'Engineering',value:'engineering'},{label:'Everything in between',value:'both'}]}/></FormField><p className="text-sm text-muted-foreground">Different perspectives make better work.</p></div>`,
  slider: `<div className="grid min-w-0 w-full max-w-sm gap-8"><div className="flex items-end justify-between"><h3 className="text-3xl">Set the tone.</h3><span className="text-xs text-muted-foreground">Ambient radio</span></div><div className="flex h-20 min-w-0 items-center justify-center gap-1 sm:gap-1.5" aria-hidden="true">{Array.from({length:32},(_,i)=><span key={i} className="w-1.5 rounded-full bg-primary" style={{height:12+Math.abs(Math.sin(i*.8))*55}}/>)}</div><Slider label="Volume" defaultValue={[65]}/><div className="flex justify-between text-xs text-muted-foreground"><span>A little quieter</span><span>Turn it up</span></div></div>`,
  tabs: `<div className="w-full max-w-md"><h3 className="mb-5 text-2xl">Room for the whole process.</h3><Tabs items={[{value:'design',label:'Design',content:<div className="py-5"><p className="text-3xl">Start with a question.</p><p className="mt-3 text-sm text-muted-foreground">Sketch the possibilities before you choose a direction.</p></div>},{value:'build',label:'Build',content:<div className="py-5"><p className="text-3xl">Give it a useful shape.</p><p className="mt-3 text-sm text-muted-foreground">Make the smallest version that tells you something.</p></div>},{value:'share',label:'Share',content:<div className="py-5"><p className="text-3xl">Let someone try it.</p><p className="mt-3 text-sm text-muted-foreground">The next good idea might come from them.</p></div>}]}/></div>`,
  "text-reveal": `<div className="w-full rounded-xl bg-accent px-7 py-14 text-foreground md:px-12 md:py-20"><TextReveal className="block max-w-xl font-display text-5xl font-medium leading-[1.03] tracking-tight md:text-7xl">Less noise. More feeling.</TextReveal><p className="mt-8 text-sm">A new perspective, one word at a time.</p></div>`,
  "split-text": `<div className="w-full rounded-xl bg-foreground px-7 py-14 text-background md:px-12 md:py-20"><SplitText className="block font-display text-5xl font-medium leading-none tracking-tight md:text-7xl">Stay curious.</SplitText><p className="mt-8 text-sm opacity-70">Good ideas start with a little movement.</p></div>`,
  "rotating-text": `<div className="w-full rounded-xl bg-muted p-8 md:p-14"><div className="font-display text-5xl font-medium leading-tight tracking-tight md:text-6xl">A place for<br/><RotatingText words={['bold ideas.','small details.','your next thing.']} className="text-primary"/></div><p className="mt-9 text-sm text-muted-foreground">Keep making room.</p></div>`,
  "scramble-text": `<div className="w-full rounded-xl bg-foreground p-8 text-accent md:p-14"><ScrambleText className="font-display text-4xl font-medium tracking-tight md:text-6xl">Expect the unexpected.</ScrambleText><div className="mt-10 flex justify-between border-t border-current pt-4 text-xs"><span>Order from a little chaos.</span><span>Jez / Motion</span></div></div>`,
  "number-ticker": `<div className="grid w-full max-w-md gap-7"><div className="flex items-center justify-between"><h3 className="text-2xl">A growing idea.</h3><Badge tone="positive">Live demo</Badge></div><NumberTicker value={count} className="font-display text-8xl tracking-tight"/><div className="flex items-center justify-between border-t border-border pt-5"><p className="text-sm text-muted-foreground">People on the list</p><Button variant="outline" onClick={()=>setCount(c=>c+17)}>Add 17 <Plus size={14}/></Button></div></div>`,
  "animated-counter": `<div className="w-full rounded-xl bg-accent p-9 text-foreground md:p-14"><AnimatedCounter target={2048} className="font-display text-7xl tracking-tight md:text-8xl"/><h3 className="mt-6 text-2xl">Small steps. Real progress.</h3><p className="mt-2 text-sm">Counts into view, once you're here.</p></div>`,
  "tilt-card": `<TiltCard className="w-full max-w-sm border-0 bg-primary p-0 text-primary-foreground"><div className="flex min-h-80 flex-col justify-between p-8"><div className="flex justify-between text-sm"><span>Jez Studio</span><span>↗</span></div><h3 className="text-5xl font-medium leading-[1.05] tracking-tight">A different<br/>perspective.</h3><div className="flex justify-between border-t border-white/30 pt-5 text-xs"><span>Move your pointer.</span><span>Make it yours.</span></div></div></TiltCard>`,
  "spotlight-card": `<SpotlightCard className="w-full max-w-sm border-0 bg-foreground p-8 text-background"><div className="flex min-h-64 flex-col justify-between"><Plus size={32}/><h3 className="text-4xl leading-tight tracking-tight">The detail<br/>is the difference.</h3><p className="text-xs opacity-70">Follow your curiosity. And the light.</p></div></SpotlightCard>`,
  "stagger-group": `<StaggerGroup className="w-full max-w-md">{['A thought worth keeping.','A shape worth exploring.','Something worth sharing.'].map((t,i)=><div key={t} className="flex items-center gap-5 border-b border-border py-5"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-lg text-foreground">{i+1}</span><p className="text-lg">{t}</p></div>)}</StaggerGroup>`,
};
const chartTitles = {
  "area-chart": ["The bigger picture.", "Audience over the last seven days"],
  "line-chart": ["A steady rhythm.", "Weekly publishing activity"],
  "bar-chart": ["Every day counts.", "Orders by day of the week"],
  "stacked-bar-chart": [
    "Better side by side.",
    "This week compared with the last",
  ],
  "donut-chart": ["Where it all goes.", "A week of studio time"],
  "radial-gauge": ["Almost there.", "Progress toward the weekly target"],
  heatmap: ["Keep showing up.", "A year of small, consistent steps"],
  sparkline: ["A good direction.", "The shape of this week"],
  "live-line-chart": ["In the moment.", "A simulated feed, updating live"],
  "scatter-chart": ["Find the pattern.", "The relationship behind the numbers"],
};
export function chartExample(slug, symbol) {
  const [heading, description] = chartTitles[slug];
  return `<div className="w-full max-w-2xl"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h3 className="text-3xl tracking-tight">${heading}</h3><p className="mt-2 text-sm text-muted-foreground">${description}</p></div><span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">Demo data</span></div><${symbol}/></div>`;
}
export function webglExample(slug, symbol) {
  return `<div className="w-full"><${symbol} paused={scenePaused} speed={sceneSpeed} color={sceneColor}${slug === "webgl-image-distortion" ? ' imageSrc="/assets/studio-lamp.png"' : ""}/><div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs"><button className="rounded-lg border border-border px-3 py-2" onClick={()=>setScenePaused(p=>!p)}>{scenePaused?'Play motion':'Pause motion'}</button><label className="flex items-center gap-2">Palette<select aria-label="Scene palette" className="rounded-lg border border-border bg-background px-2 py-2" value={sceneColor??''} onChange={e=>setSceneColor(e.target.value||undefined)}><option value="">Studio</option><option value="#a6c7cc">Glacier</option><option value="#df9e72">Copper</option><option value="#beb1eb">Iris</option></select></label><label className="flex items-center gap-2">Speed<input aria-label="Scene speed" type="range" min="0" max="2" step="0.1" value={sceneSpeed} onChange={e=>setSceneSpeed(Number(e.target.value))} className="w-20 accent-primary"/></label><span className="text-muted-foreground">Move your pointer to explore</span></div></div>`;
}

const productCopy = {
  combobox: [
    "Choose your starting point.",
    "The right tools for the way you work.",
  ],
  "command-palette": [
    "One shortcut away.",
    "Find your next action without losing your place.",
  ],
  calendar: ["Make a little time.", "A day for the next good idea."],
  "date-picker": [
    "Put it on the calendar.",
    "Set a launch date you can work toward.",
  ],
  "date-range-picker": [
    "See the whole stretch.",
    "Choose the window for your next project.",
  ],
  "time-picker": [
    "Meet in the morning.",
    "Find a time that works for everyone.",
  ],
  "file-upload": [
    "Bring your ideas.",
    "Drop in your reference images, sketches, or brief.",
  ],
  "otp-input": [
    "A quick check.",
    "Enter the six-digit code to continue this demo.",
  ],
  "password-input": [
    "Keep it between us.",
    "A strong password is a good place to start.",
  ],
  "search-input": [
    "Find the thing.",
    "Projects, notes, and the details you nearly forgot.",
  ],
  "tag-input": [
    "A little more organised.",
    "Give your next idea a few useful labels.",
  ],
  "form-field": [
    "Start something new.",
    "Give your workspace a name you will remember.",
  ],
  pagination: [
    "There is more to explore.",
    "Browse the whole collection, at your own pace.",
  ],
  "data-table": [
    "Work in motion.",
    "Three projects, from first thoughts to finished details.",
  ],
  "tree-view": [
    "Everything in its place.",
    "A clear path through your source.",
  ],
  "resizable-panels": [
    "Space that works for you.",
    "Adjust the balance with a pointer or the arrow keys.",
  ],
  stepper: [
    "One thing at a time.",
    "A few small steps to make yourself at home.",
  ],
  progress: ["Getting there.", "The next release is taking shape."],
};
export function productExample(slug, example) {
  const copy = productCopy[slug];
  if (!copy) return example;
  const wide = ["data-table", "resizable-panels"].includes(slug);
  return `<div className="w-full ${wide ? "max-w-2xl" : "max-w-sm"}"><div className="mb-7"><h3 className="text-2xl tracking-tight">${copy[0]}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">${copy[1]}</p></div>${example}</div>`;
}
const effectCopy = {
  "grain-overlay": ["Tactile, by nature.", "A quiet layer of texture."],
  "dot-grid": ["A starting point.", "Space to connect your ideas."],
  "animated-grid": ["Always in motion.", "An underlying rhythm."],
  "gradient-mesh": ["A softer edge.", "Colour, with room to breathe."],
  "aurora-background": ["After hours.", "A little light in the dark."],
  "spotlight-background": [
    "Find your focus.",
    "Let the important things come forward.",
  ],
  "border-beam": ["Worth a closer look.", "A detail that draws you in."],
  "cursor-trail": ["Leave your mark.", "Move around. See what follows."],
};
export function effectExample(slug, symbol) {
  const copy = effectCopy[slug];
  if (!copy) return null;
  return `<${symbol} className="min-h-[360px]"><div className="flex min-h-64 flex-col justify-between"><h3 className="max-w-md font-display text-5xl font-medium leading-[1.03] tracking-tight md:text-6xl">${copy[0]}</h3><p className="mt-8 text-sm">${copy[1]}</p></div></${symbol}>`;
}
