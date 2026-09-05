"use client";
import * as React from "react";
import { cn } from "../ui/utils";
import {
  ArrowUp,
  Feather,
  Lightbulb,
  ListChecks,
  PenLine,
  RotateCcw,
} from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useDemoState } from "./demo-state";
type Message = { id: string; role: "user" | "assistant"; content: string };
const initial: Message[] = [];
export function ChatWorkspace({
  className,
  conversationId = "default",
}: {
  className?: string;
  conversationId?: string;
}) {
  const [messages, setMessages, reset] = useDemoState(
    "chat-" + conversationId,
    initial,
  );
  const [draft, setDraft] = React.useState("");
  const [running, setRunning] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setInterval> | null>(null);
  React.useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );
  function stop() {
    if (timer.current) clearInterval(timer.current);
    setRunning(false);
  }
  function respond(prompt: string, retry = false) {
    stop();
    const id = crypto.randomUUID();
    const answer = `Let’s give “${prompt}” a clearer shape.\n\n1. Define what a good outcome looks like in one sentence.\n2. Identify the decision that would unlock the most progress.\n3. Make a small version you can put in front of someone.\n\nStart with the outcome. What should someone be able to do when the work is finished?`;
    setMessages((m) => [
      ...(retry
        ? m.filter((_, i) => i !== m.length - 1)
        : [
            ...m,
            { id: crypto.randomUUID(), role: "user" as const, content: prompt },
          ]),
      { id, role: "assistant", content: "" },
    ]);
    let i = 0;
    setRunning(true);
    timer.current = setInterval(() => {
      i += 5;
      setMessages((m) =>
        m.map((x) => (x.id === id ? { ...x, content: answer.slice(0, i) } : x)),
      );
      if (i >= answer.length) stop();
    }, 24);
  }
  return (
    <section
      className={cn(
        "mx-auto flex min-h-[620px] max-w-3xl flex-col gap-5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-medium">
          <Feather size={17} />
          Margin{" "}
          <span className="font-normal text-muted-foreground">/ Personal</span>
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            stop();
            reset();
          }}
        >
          New conversation
        </Button>
      </div>
      <div
        className="flex-1 space-y-5"
        role="log"
        aria-label="Conversation"
        aria-live={running ? "off" : "polite"}
      >
        {!messages.length && (
          <div className="mx-auto max-w-xl py-10 sm:py-16">
            <span className="mb-6 inline-flex rounded-xl border border-border p-3">
              <Feather size={25} strokeWidth={1.4} />
            </span>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              What are we working on?
            </h2>
            <p className="mb-8 mt-3 text-sm leading-relaxed text-muted-foreground">
              A rough draft. A difficult decision. The beginning of something.
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                {
                  title: "Find the words",
                  prompt: "Help me explain a complicated idea clearly",
                  icon: PenLine,
                },
                {
                  title: "Make a plan",
                  prompt: "Break a website launch into practical steps",
                  icon: ListChecks,
                },
                {
                  title: "Think it through",
                  prompt: "Help me weigh the tradeoffs in a decision",
                  icon: Lightbulb,
                },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => setDraft(item.prompt)}
                  className="rounded-xl border border-border p-4 text-left transition-colors hover:border-primary/40 hover:bg-muted/40"
                >
                  <item.icon size={18} className="mb-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                    {item.prompt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => (
          <article
            key={m.id}
            className={cn(
              "max-w-[90%] whitespace-pre-wrap rounded-xl p-4 text-sm leading-relaxed",
              m.role === "user" ? "ml-auto bg-muted" : "",
            )}
          >
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              {m.role === "user" ? "You" : "Demo assistant"}
            </p>
            {m.content || "Thinking…"}
          </article>
        ))}
      </div>
      {running ? (
        <Button variant="outline" className="self-start" onClick={stop}>
          Stop response
        </Button>
      ) : (
        messages.length > 0 && (
          <Button
            variant="ghost"
            className="self-start"
            onClick={() =>
              respond(
                [...messages].reverse().find((m) => m.role === "user")
                  ?.content ?? "Hello",
                true,
              )
            }
          >
            <RotateCcw size={14} />
            Retry response
          </Button>
        )
      )}
      <form
        className="flex items-end gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm focus-within:border-primary/40 focus-within:ring-3 focus-within:ring-primary/8"
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.trim()) {
            respond(draft.trim());
            setDraft("");
          }
        }}
      >
        <Textarea
          aria-label="Message"
          placeholder="What’s on your mind?"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="min-h-20 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          required
        />
        <Button
          type="submit"
          aria-label="Send"
          className="mb-1 mr-1 size-9 shrink-0 p-0"
          disabled={running || !draft.trim()}
        >
          <ArrowUp size={18} />
          <span className="sr-only">Send</span>
        </Button>
      </form>
      <p className="text-xs text-muted-foreground">
        Simulated responses. Conversations stay on this device.
      </p>
    </section>
  );
}
