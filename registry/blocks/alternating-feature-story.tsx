"use client";
import * as React from "react";
import { ArrowDown, Check, GitPullRequest, MessageSquare } from "lucide-react";
import { cn } from "../ui/utils";
export function AlternatingFeatureStory({ className }: { className?: string }) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <section className={cn("grid gap-16 py-14 md:gap-24 md:py-24", className)}>
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="max-w-md text-3xl leading-tight md:text-4xl">
            A project update
            <br />
            that answers the question.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            What changed? What’s blocked? What’s next? A short, structured
            update gives everyone enough context to act.
          </p>
        </div>
        <article className="border-y border-border py-6">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-medium">Workspace launch</span>
            <span className="rounded-full bg-primary/10 px-2 py-1 text-primary">
              On track
            </span>
          </div>
          <h3 className="mt-6 text-xl">Ready for the final review.</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The project switcher is built. Jo is checking keyboard navigation
            today; release notes are next.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-4 text-xs">
            <div className="text-muted-foreground">
              Next milestone
              <p className="mt-1.5 font-medium text-foreground">
                Release review
              </p>
            </div>
            <div className="text-muted-foreground">
              Due date
              <p className="mt-1.5 font-medium text-foreground">12 September</p>
            </div>
          </div>
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
            className="mt-5 flex items-center gap-2 text-xs font-medium"
          >
            {expanded ? "Hide" : "Read"} the full update{" "}
            <ArrowDown size={13} className={expanded ? "rotate-180" : ""} />
          </button>
          {expanded && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              No blockers this week. The team agreed to show the five most
              recent projects and pin the active project. Search covers archived
              projects too. The release is waiting on the final keyboard review.
            </p>
          )}
        </article>
      </div>
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
        <div className="md:order-2">
          <h2 className="max-w-md text-3xl leading-tight md:text-4xl">
            Follow the work,
            <br />
            without chasing it.
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A readable activity history keeps the handoffs visible. See the
            change, who made it, and the conversation behind it.
          </p>
        </div>
        <ol className="border-y border-border py-3">
          {[
            {
              icon: Check,
              name: "Sam completed the project switcher",
              detail: "Implementation · FRM-25",
              time: "10:42",
            },
            {
              icon: MessageSquare,
              name: "Jo requested a keyboard review",
              detail: "Design · FRM-26",
              time: "10:18",
            },
            {
              icon: GitPullRequest,
              name: "Alex updated the release criteria",
              detail: "Project brief",
              time: "09:30",
            },
          ].map(({ icon: Icon, name, detail, time }) => (
            <li
              key={name}
              className="flex gap-4 border-b border-border py-6 last:border-0"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted">
                <Icon size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{name}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{detail}</p>
              </div>
              <time className="text-[11px] tabular-nums text-muted-foreground">
                {time}
              </time>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
