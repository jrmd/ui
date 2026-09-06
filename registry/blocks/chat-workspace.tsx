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
import { useControllable } from "../ui/use-controllable";
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
const initial: Message[] = [];
export type ChatWorkspaceOptions = {
  className?: string;
  conversationId?: string;
  onSend?: (
    prompt: string,
    context: { messages: Message[]; signal: AbortSignal },
  ) => Promise<string>;
  value?: Message[];
  defaultValue?: Message[];
  onValueChange?: (value: Message[]) => void;
  items?: typeof ChatWorkspaceDefaultItems;
  heading?: React.ReactNode;
  description?: React.ReactNode;
};
export type ChatWorkspaceProps = Omit<
  React.ComponentProps<"section">,
  keyof ChatWorkspaceOptions
> &
  ChatWorkspaceOptions;
const ChatWorkspaceDefaultItems = [
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
];
function useChatWorkspaceModel({
  items = ChatWorkspaceDefaultItems,
  heading = "What are we working on?",
  description = "Simulated responses. Conversations stay on this device.",
  className,
  conversationId = "default",
  onSend,
  value: controlledValue,
  defaultValue = initial,
  onValueChange,
  children,
  ...rootProps
}: ChatWorkspaceProps) {
  const [messages, setMessages] = useControllable<Message[]>(
    controlledValue,
    defaultValue,
    onValueChange,
  );
  const reset = () => setMessages(defaultValue);
  const [draft, setDraft] = React.useState("");
  const [running, setRunning] = React.useState(false);
  const request = React.useRef<AbortController | null>(null);
  const [error, setError] = React.useState<string>();
  React.useEffect(() => () => request.current?.abort(), []);
  const previousConversation = React.useRef(conversationId);
  React.useEffect(() => {
    if (previousConversation.current === conversationId) return;
    previousConversation.current = conversationId;
    request.current?.abort();
    setRunning(false);
    if (controlledValue === undefined) setMessages(defaultValue);
    // Changing the conversation starts a fresh local history. Controlled history belongs to the caller.
  }, [conversationId]);
  function stop() {
    request.current?.abort();
    setRunning(false);
  }
  async function respond(prompt: string, retry = false) {
    stop();
    setError(undefined);
    if (!onSend) {
      setError("Connect an onSend handler to receive a response.");
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    const history: Message[] = retry
      ? messages.filter(
          (m, index) => index !== messages.length - 1 || m.role !== "assistant",
        )
      : [
          ...messages,
          { id: crypto.randomUUID(), role: "user", content: prompt },
        ];
    setMessages(history);
    setRunning(true);
    try {
      const content = await onSend(prompt, {
        messages: history,
        signal: controller.signal,
      });
      if (!controller.signal.aborted)
        setMessages([
          ...history,
          { id: crypto.randomUUID(), role: "assistant", content },
        ]);
    } catch (error) {
      if (!controller.signal.aborted)
        setError(
          error instanceof Error
            ? error.message
            : "The response failed. Please try again.",
        );
    } finally {
      if (request.current === controller) setRunning(false);
    }
  }
  return {
    items,
    heading,
    description,
    className,
    conversationId,
    onSend,
    controlledValue,
    defaultValue,
    onValueChange,
    children,
    rootProps,
    messages,
    setMessages,
    reset,
    draft,
    setDraft,
    running,
    setRunning,
    request,
    error,
    setError,
    previousConversation,
    stop,
    respond,
  };
}
const ChatWorkspaceCompositionContext = React.createContext<ReturnType<
  typeof useChatWorkspaceModel
> | null>(null);
function useChatWorkspaceComposition() {
  const context = React.useContext(ChatWorkspaceCompositionContext);
  if (!context)
    throw new Error("ChatWorkspace parts must be inside ChatWorkspace.");
  return context;
}
export function ChatWorkspace(props: ChatWorkspaceProps) {
  const model = useChatWorkspaceModel(props);
  const { className, rootProps, children } = model;
  return (
    <ChatWorkspaceCompositionContext.Provider value={model}>
      <section
        {...rootProps}
        className={cn(
          "mx-auto flex min-h-[620px] max-w-3xl flex-col gap-5",
          className,
        )}
      >
        {children !== undefined ? (
          children
        ) : (
          <>
            <ChatWorkspaceError />
            <ChatWorkspaceToolbar />
            <ChatWorkspaceMessages />
            <ChatWorkspaceControls />
            <ChatWorkspaceComposer />
            <ChatWorkspaceFooter />
          </>
        )}
      </section>
    </ChatWorkspaceCompositionContext.Provider>
  );
}

export function ChatWorkspaceHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-workspace-header"
      className={cn("flex items-center justify-between gap-3", className)}
      {...props}
    />
  );
}
export function ChatWorkspaceContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-workspace-content"
      className={cn("flex-1 space-y-5", className)}
      {...props}
    />
  );
}
export function ChatWorkspaceTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="chat-workspace-title"
      className={cn(
        "font-display text-3xl tracking-tight sm:text-4xl",
        className,
      )}
      {...props}
    />
  );
}
export function ChatWorkspaceForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="chat-workspace-form"
      className={cn(
        "flex items-end gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm focus-within:border-primary/40 focus-within:ring-3 focus-within:ring-primary/8",
        className,
      )}
      {...props}
    />
  );
}
export function ChatWorkspaceDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="chat-workspace-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

export function ChatWorkspaceItem({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="chat-workspace-item"
      className={cn(
        "rounded-xl border border-border p-4 text-left transition-colors hover:border-primary/40 hover:bg-muted/40",
        className,
      )}
      {...props}
    />
  );
}

export function ChatWorkspaceError({ children }: React.PropsWithChildren) {
  const { error } = useChatWorkspaceComposition();
  return children === undefined
    ? error && <p role="alert">{error}</p>
    : children;
}
export function ChatWorkspaceToolbar({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ChatWorkspaceHeader>> & {
  children?: React.ReactNode;
}) {
  const { reset, stop } = useChatWorkspaceComposition();
  return (
    <ChatWorkspaceHeader {...props}>
      {children === undefined ? (
        <>
          <span className="flex items-center gap-2 text-sm font-medium">
            <Feather size={17} />
            Margin{" "}
            <span className="font-normal text-muted-foreground">
              / Personal
            </span>
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
        </>
      ) : (
        children
      )}
    </ChatWorkspaceHeader>
  );
}
export function ChatWorkspaceMessages({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ChatWorkspaceContent>> & {
  children?: React.ReactNode;
}) {
  const { items, heading, messages, setDraft, running } =
    useChatWorkspaceComposition();
  return (
    <ChatWorkspaceContent
      role="log"
      aria-label="Conversation"
      aria-live={running ? "off" : "polite"}
      {...props}
    >
      {children === undefined ? (
        <>
          {!messages.length && (
            <div className="mx-auto max-w-xl py-10 sm:py-16">
              <span className="mb-6 inline-flex rounded-xl border border-border p-3">
                <Feather size={25} strokeWidth={1.4} />
              </span>
              <ChatWorkspaceTitle>{heading}</ChatWorkspaceTitle>
              <p className="mb-8 mt-3 text-sm leading-relaxed text-muted-foreground">
                A rough draft. A difficult decision. The beginning of something.
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {items.map((item) => (
                  <ChatWorkspaceItem
                    key={item.title}
                    onClick={() => setDraft(item.prompt)}
                  >
                    <item.icon
                      size={18}
                      className="mb-4 text-muted-foreground"
                    />
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                      {item.prompt}
                    </span>
                  </ChatWorkspaceItem>
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
                {m.role === "user" ? "You" : "Assistant"}
              </p>
              {m.content || "Thinking…"}
            </article>
          ))}
        </>
      ) : (
        children
      )}
    </ChatWorkspaceContent>
  );
}
export function ChatWorkspaceControls({ children }: React.PropsWithChildren) {
  const { messages, running, stop, respond } = useChatWorkspaceComposition();
  return children === undefined ? (
    running ? (
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
              [...messages].reverse().find((m) => m.role === "user")?.content ??
                "Hello",
              true,
            )
          }
        >
          <RotateCcw size={14} />
          Retry response
        </Button>
      )
    )
  ) : (
    children
  );
}
export function ChatWorkspaceComposer({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ChatWorkspaceForm>> & {
  children?: React.ReactNode;
}) {
  const { draft, setDraft, running, respond } = useChatWorkspaceComposition();
  const defaultonSubmit: NonNullable<
    React.ComponentProps<typeof ChatWorkspaceForm>["onSubmit"]
  > = (e) => {
    e.preventDefault();
    if (draft.trim()) {
      respond(draft.trim());
      setDraft("");
    }
  };
  return (
    <ChatWorkspaceForm
      {...props}
      onSubmit={(event) => {
        props.onSubmit?.(event);
        if (!event.defaultPrevented) defaultonSubmit(event);
      }}
    >
      {children === undefined ? (
        <>
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
        </>
      ) : (
        children
      )}
    </ChatWorkspaceForm>
  );
}
export function ChatWorkspaceFooter({
  children,
  ...props
}: Partial<React.ComponentProps<typeof ChatWorkspaceDescription>> & {
  children?: React.ReactNode;
}) {
  const { description } = useChatWorkspaceComposition();
  return (
    <ChatWorkspaceDescription {...props}>
      {children === undefined ? description : children}
    </ChatWorkspaceDescription>
  );
}
