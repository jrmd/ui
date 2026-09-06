import { SlotContracts } from "./slot-contracts";
import { RecipeBrowser } from "./recipes";
import MediaComposition from "../../../examples/blocks/media-aside";
import FeatureComposition from "../../../examples/blocks/feature-grid";
import PricingComposition from "../../../examples/blocks/pricing-table";
import TaskComposition from "../../../examples/blocks/task-list";
import CtaComposition from "../../../examples/blocks/cta-section";
import * as React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { BlockConsumers } from "./blocks";
import { TaskList } from "../../../registry/blocks/task-list";
import { SearchInput } from "../../../registry/ui/search-input";
import { PasswordInput } from "../../../registry/ui/password-input";
import { DataTable } from "../../../registry/ui/data-table";
import {
  MediaAside,
  MediaAsideTitle,
  MediaAsideContent,
  MediaAsideMedia,
} from "../../../registry/blocks/media-aside";
import { PricingTable } from "../../../registry/blocks/pricing-table";
import { FeatureComparison } from "../../../registry/blocks/feature-comparison";
import { CalendarSchedule } from "../../../registry/blocks/calendar-schedule";
import { ProfileSettings } from "../../../registry/blocks/profile-settings";
import { ChatWorkspace } from "../../../registry/blocks/chat-workspace";
import { OnboardingWizard } from "../../../registry/blocks/onboarding-wizard";
import { TreeView } from "../../../registry/ui/tree-view";
import { RippleField } from "../../../registry/ui/ripple-field";
import { Button } from "../../../registry/ui/button";

const tasks = [{ id: "own", title: "Caller task", status: "To do" }];
function App() {
  const [value, setValue] = React.useState(tasks);
  const [rows, setRows] = React.useState([
    { id: "a", name: "First" },
    { id: "b", name: "Second" },
  ]);
  const [selected, setSelected] = React.useState("");
  const search = React.useRef<HTMLInputElement>(null);
  const [nativeEvent, setNativeEvent] = React.useState("");
  const [saveFails, setSaveFails] = React.useState(true);
  const mode = new URLSearchParams(location.search).get("mode");
  if (mode === "slots") return <SlotContracts />;
  if (mode === "recipe") return <RecipeBrowser />;
  if (mode === "compound")
    return (
      <main className="mx-auto grid max-w-5xl gap-8 p-6">
        <MediaComposition />
        <FeatureComposition />
        <PricingComposition />
        <TaskComposition />
        <CtaComposition />
      </main>
    );
  if (mode === "onboarding")
    return (
      <main>
        <OnboardingWizard
          onComplete={async (value) => {
            setNativeEvent(value.workspace);
          }}
        />
        <output>{nativeEvent}</output>
      </main>
    );
  if (mode === "native")
    return (
      <main>
        <TreeView
          nodes={[{ id: "node", label: "Own node" }]}
          ref={(node) => {
            if (node) node.dataset.refConnected = "true";
          }}
        />
        <RippleField
          onClick={(event) => {
            event.preventDefault();
            setNativeEvent("pointer delivered");
          }}
        >
          Click surface
        </RippleField>
        <ProfileSettings
          onSubmit={(event) => {
            event.preventDefault();
            setNativeEvent("submit delivered");
          }}
        >
          <Button type="submit">Custom submit</Button>
        </ProfileSettings>
        <output>{nativeEvent}</output>
      </main>
    );
  if (mode === "blocks") return <BlockConsumers />;
  return (
    <main className="mx-auto grid max-w-5xl gap-8 p-6">
      <h1 className="text-3xl">Consumer composition</h1>
      <MediaAside
        id="composed-media"
        className="rounded-none"
        aria-label="Custom article"
      >
        <MediaAsideContent>
          <MediaAsideTitle className="text-2xl">
            A <em>different</em> order
          </MediaAsideTitle>
          <a href="#tasks">Read our story</a>
        </MediaAsideContent>
        <MediaAsideMedia
          alt="Custom artwork"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%23d9e3cd'/%3E%3C/svg%3E"
        />
      </MediaAside>
      <section id="tasks">
        <h2>Caller state</h2>
        <TaskList
          data-testid="controlled"
          value={value}
          onValueChange={setValue}
        />
        <Button
          onClick={() =>
            setValue([
              {
                id: "replacement",
                title: "Replaced externally",
                status: "Done",
              },
            ])
          }
        >
          Replace tasks
        </Button>
        <TaskList data-testid="independent" defaultValue={tasks} />
      </section>
      <section className="grid gap-4">
        <SearchInput
          ref={search}
          defaultValue="Find me"
          inputClassName="bg-muted h-12"
        />
        <PasswordInput
          aria-label="Custom password"
          inputClassName="bg-muted h-12"
        />
      </section>
      <section>
        <DataTable
          data={rows}
          columns={[{ accessorKey: "name", header: "Name" }]}
          selectable
          options={{ getRowId: (row) => row.id }}
          onSelectionChange={(selected) =>
            setSelected(selected.map((row) => row.id).join(","))
          }
          toolbar={(table) => (
            <Button onClick={() => table.setGlobalFilter("missing")}>
              Custom filter
            </Button>
          )}
          emptyState={<strong>Caller empty state</strong>}
          footer={(table) => <span>{table.getRowCount()} custom rows</span>}
        />
        <output aria-label="Selected IDs">{selected}</output>
        <Button onClick={() => setRows([...rows].reverse())}>
          Reverse records
        </Button>
      </section>
      <PricingTable
        plans={[
          {
            name: "Custom",
            price: 7,
            annualPrice: 5,
            text: "Our plan",
            features: [<em key="one">Rich feature</em>],
          },
        ]}
        formatPrice={(amount) => `$${amount}`}
        renderAction={(plan) => <a href="#buy">Buy {plan.name}</a>}
      />
      <FeatureComparison
        plans={[
          { id: "one", name: "One", price: "$4" },
          { id: "two", name: "Two", price: "$8" },
          { id: "three", name: "Three", price: "$12" },
        ]}
        rows={[
          {
            id: "row",
            label: "Own feature",
            values: { one: "A", two: "B", three: "C" },
          },
        ]}
      />
      <CalendarSchedule
        defaultValue="2027-02-01"
        events={[{ id: "event", date: "2027-02-01", content: "Our own event" }]}
      />
      <ProfileSettings
        defaultValue={{ name: "Custom Person", email: "person@example.com" }}
        onSave={async () => {
          if (saveFails) throw new Error("Save rejected");
        }}
      />
      <Button onClick={() => setSaveFails(false)}>Allow save</Button>
      <ChatWorkspace
        onSend={async (prompt, { signal }) => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          if (signal.aborted) throw new Error("Cancelled");
          return `Own provider: ${prompt}`;
        }}
      />
    </main>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
