"use client";
import * as React from "react";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  Download,
  Menu,
  Pause,
  Play,
  X,
} from "lucide-react";
import { TunnelHero } from "@registry/blocks/tunnel-hero";
import { createInstrument, type SoundSettings } from "./sound";

const presets: {
  name: string;
  description: string;
  settings: SoundSettings;
}[] = [
  {
    name: "Low orbit",
    description: "A rounded, slow-moving foundation.",
    settings: { tone: 110, space: 65, movement: 12, waveform: "sine" },
  },
  {
    name: "Glass tide",
    description: "A bright edge with room to drift.",
    settings: { tone: 220, space: 80, movement: 36, waveform: "triangle" },
  },
  {
    name: "Night signal",
    description: "A restless pulse, just off centre.",
    settings: { tone: 164, space: 30, movement: 72, waveform: "sawtooth" },
  },
];
function Wave({ settings }: { settings: SoundSettings }) {
  return (
    <svg viewBox="0 0 900 230" preserveAspectRatio="none" aria-hidden="true">
      <line
        x1="0"
        y1="115"
        x2="900"
        y2="115"
        stroke="currentColor"
        opacity=".18"
      />
      {Array.from({ length: 7 }, (_, layer) => (
        <path
          key={layer}
          fill="none"
          stroke="currentColor"
          opacity={1 - layer * 0.12}
          strokeWidth={layer === 0 ? 2 : 1}
          d={Array.from({ length: 361 }, (_, n) => {
            const x = n * 2.5;
            const envelope = Math.sin((n / 360) * Math.PI) ** 1.3;
            const phase = (n * settings.tone) / 3000;
            const y =
              115 +
              (Math.sin(phase + layer * 0.17) * 57 +
                Math.sin(phase * 1.5 + settings.movement / 20) * 17) *
                envelope *
                (1 - layer * 0.065);
            return `${n ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
          }).join(" ")}
        />
      ))}
    </svg>
  );
}
function Instrument() {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);
  const [selected, setSelected] = React.useState(0);
  const [settings, setSettings] = React.useState(presets[0].settings);
  const [playing, setPlaying] = React.useState(false);
  const [error, setError] = React.useState("");
  const instrument = React.useRef<ReturnType<typeof createInstrument> | null>(
    null,
  );
  const starting = React.useRef(false);
  React.useEffect(() => {
    instrument.current?.update(settings);
  }, [settings]);
  React.useEffect(() => {
    const stop = () => {
      instrument.current?.close();
      instrument.current = null;
      setPlaying(false);
    };
    const hidden = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", hidden);
    window.addEventListener("pagehide", stop);
    return () => {
      instrument.current?.close();
      instrument.current = null;
      document.removeEventListener("visibilitychange", hidden);
      window.removeEventListener("pagehide", stop);
    };
  }, []);
  async function toggle() {
    if (starting.current) return;
    if (instrument.current) {
      instrument.current.close();
      instrument.current = null;
      setPlaying(false);
      return;
    }
    starting.current = true;
    setError("");
    try {
      const sound = createInstrument();
      instrument.current = sound;
      sound.update(settings);
      await sound.play();
      if (instrument.current === sound) setPlaying(true);
    } catch {
      instrument.current?.close();
      instrument.current = null;
      setError(
        "Audio couldn’t start. Try again in a browser with Web Audio support.",
      );
    } finally {
      starting.current = false;
    }
  }
  function save() {
    const url = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            {
              instrument: "Afterhours",
              version: 1,
              preset: presets[selected].name,
              ...settings,
            },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "afterhours-preset.json";
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <section
      className="after-instrument-section"
      id="instrument"
      aria-labelledby="instrument-title"
    >
      <div className="after-section-heading">
        <h2 id="instrument-title">
          Less setup.
          <br />
          <span>More getting lost.</span>
        </h2>
        <p>
          Start with a texture. Turn a dial. Follow it somewhere unexpected.
          This little instrument is yours to play, right here.
        </p>
      </div>
      <div className="after-instrument">
        <div className="after-instrument-top">
          <span>
            <AudioLines size={20} /> AFTERHOURS <small>PLAYGROUND</small>
          </span>
          <span className="after-live" data-playing={playing}>
            {playing ? "Sound on" : "Sound off"}
          </span>
        </div>
        <div className="after-preset-list" aria-label="Sound presets">
          {presets.map((preset, index) => (
            <button
              type="button"
              key={preset.name}
              disabled={!ready}
              aria-pressed={selected === index}
              onClick={() => {
                setSelected(index);
                setSettings(preset.settings);
              }}
            >
              <span>0{index + 1}</span>
              {preset.name}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <div className="after-wave">
          <div>
            <span>{presets[selected].name}</span>
            <span>
              {settings.tone} Hz <i>/</i> {settings.waveform}
            </span>
          </div>
          <Wave settings={settings} />
          <p>{presets[selected].description}</p>
        </div>
        <div className="after-controls">
          {(
            [
              {
                key: "tone",
                name: "Tone",
                min: 55,
                max: 440,
                unit: "Hz",
                hint: "Find your frequency",
              },
              {
                key: "space",
                name: "Space",
                min: 0,
                max: 100,
                unit: "%",
                hint: "Let the echoes linger",
              },
              {
                key: "movement",
                name: "Movement",
                min: 0,
                max: 100,
                unit: "%",
                hint: "Add a little instability",
              },
            ] as const
          ).map((control) => (
            <label key={control.key}>
              <span>
                {control.name}
                <output>
                  {settings[control.key]} {control.unit}
                </output>
              </span>
              <input
                disabled={!ready}
                type="range"
                min={control.min}
                max={control.max}
                value={settings[control.key]}
                aria-label={control.name}
                onChange={(e) =>
                  setSettings((current) => ({
                    ...current,
                    [control.key]: Number(e.target.value),
                  }))
                }
              />
              <small>{control.hint}</small>
            </label>
          ))}
        </div>
        <div className="after-transport">
          <button
            className="after-button"
            onClick={() => void toggle()}
            disabled={!ready}
            aria-pressed={playing}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? "Stop sound" : "Play sound"}
          </button>
          <span>Start with your volume low.</span>
          <button
            className="after-text-button"
            disabled={!ready}
            onClick={save}
          >
            <Download size={15} />
            Save preset
          </button>
        </div>
        {error && (
          <p className="after-error" role="alert">
            {error}
          </p>
        )}
      </div>
      <p className="after-fine-print">
        Live browser synth · Three oscillator textures · No account needed
      </p>
    </section>
  );
}
function AccessForm() {
  const [done, setDone] = React.useState(false);
  return (
    <div className="after-access-form">
      {done ? (
        <div className="after-confirmation" role="status">
          <Check size={30} />
          <h2>You’re on the demo list.</h2>
          <p>
            That’s the signup flow. No email was sent and your address hasn’t
            been stored.
          </p>
          <button className="after-text-button" onClick={() => setDone(false)}>
            Try another signup <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
        >
          <h2>Be here for what’s next.</h2>
          <p>
            A place for your next unexpected sound. Leave your email to try the
            early-access flow.
          </p>
          <label htmlFor="after-email">Email address</label>
          <input
            type="email"
            autoComplete="email"
            id="after-email"
            placeholder="you@example.com"
            required
          />
          <button className="after-button" type="submit">
            Join early access <ArrowRight size={17} />
          </button>
          <small>
            This is a template demo. Your email stays in this form and is not
            submitted.
          </small>
        </form>
      )}
    </div>
  );
}
export function TemplateView({
  route = "",
  basePath = "",
}: {
  route?: string;
  basePath?: string;
  assetBase?: string;
}) {
  const [menu, setMenu] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => setReady(true), []);
  const href = (path = "") => `${basePath}/${path}`;
  return (
    <div className="after-launch template-design">
      <a className="after-skip" href="#after-main">
        Skip to content
      </a>
      <header className="after-nav">
        <a className="after-brand" href={href()} aria-label="Afterhours home">
          <AudioLines size={26} />
          afterhours
        </a>
        <button
          disabled={!ready}
          className="after-menu"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav aria-label="Main navigation" data-open={menu}>
          <a href={`${href()}#instrument`} onClick={() => setMenu(false)}>
            The instrument
          </a>
          <a href={href("release-notes")}>Release notes</a>
          <a className="after-nav-access" href={href("early-access")}>
            Get early access <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main id="after-main">
        {route === "" ? (
          <>
            <TunnelHero
              className="after-hero"
              title={
                <>
                  Sound,
                  <br />
                  unbound.
                </>
              }
              href="#instrument"
              actionLabel="Play the instrument"
              copy={{
                brand: "A NEW INSTRUMENT FOR CURIOUS EARS",
                meta: "BROWSER EDITION",
                eyebrow: "",
                footerNote: "Synthesis, with room for the unexpected.",
                artworkLabel: "Moving ice-blue tunnel of sound",
                pauseLabel: "Pause hero animation",
                playLabel: "Play hero animation",
              }}
              artwork={{ speed: 0.28 }}
            />
            <div className="after-intro">
              <p>
                A sound-design instrument
                <br />
                for the hours that are yours.
              </p>
              <p>
                Afterhours turns a single tone into a place to explore. Shape
                the frequency, give it space, then set it in motion.
              </p>
              <a href="#instrument" aria-label="Explore the instrument below">
                <ArrowRight size={24} />
              </a>
            </div>
            <Instrument />
            <section className="after-story" aria-labelledby="story-title">
              <div>
                <h2 id="story-title">
                  One good sound.
                  <br />
                  <span>A hundred directions.</span>
                </h2>
                <p>
                  You don’t need a wall of controls to find something worth
                  keeping. Just a few that invite you to listen.
                </p>
                <a className="after-text-button" href="#instrument">
                  Find your sound <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="after-story-rows">
                <article>
                  <span>01</span>
                  <div>
                    <h3>Begin with a feeling.</h3>
                    <p>
                      Rounded, bright or restless. Three starting textures give
                      your next idea somewhere to begin.
                    </p>
                  </div>
                </article>
                <article>
                  <span>02</span>
                  <div>
                    <h3>Take the long way round.</h3>
                    <p>
                      Move between low and high frequencies, soften the edges
                      with echoes, or let the pitch wander.
                    </p>
                  </div>
                </article>
                <article>
                  <span>03</span>
                  <div>
                    <h3>Keep the happy accident.</h3>
                    <p>
                      Download your settings as a small preset file. A record of
                      the exact place you found.
                    </p>
                  </div>
                </article>
              </div>
            </section>
            <section className="after-access-band">
              <div>
                <h2>
                  Your next sound
                  <br />
                  is still out there.
                </h2>
                <p>Come see what happens after hours.</p>
              </div>
              <a className="after-button" href={href("early-access")}>
                Get early access <ArrowUpRight size={18} />
              </a>
            </section>
            <section className="after-faq">
              <h2>
                A few things
                <br />
                before you play.
              </h2>
              <div>
                {[
                  [
                    "What is Afterhours?",
                    "A fictional product-launch concept with a real, playable browser synthesizer. The audio is generated on your device; there are no prerecorded samples.",
                  ],
                  [
                    "Do I need to install anything?",
                    "No. The playground runs in a modern browser with Web Audio support. Press Play sound to start; audio is never started automatically.",
                  ],
                  [
                    "What does Save preset download?",
                    "A JSON file containing the selected texture, frequency, echo amount and movement. It records settings, not an audio recording.",
                  ],
                  [
                    "Is early access available?",
                    "The signup is a frontend demonstration. No email is sent or stored, and no release date or paid product is promised.",
                  ],
                ].map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </section>
          </>
        ) : route === "early-access" ? (
          <section className="after-access-page">
            <div>
              <a className="after-back" href={href()}>
                Back to the instrument <ArrowUpRight size={16} />
              </a>
              <h1>
                Good things
                <br />
                happen
                <br />
                <span>after hours.</span>
              </h1>
              <p>
                For the curious ears. The one-more-take people. The ideas that
                arrive when everything else gets quiet.
              </p>
              <AudioLines className="after-access-art" aria-hidden="true" />
            </div>
            <AccessForm />
          </section>
        ) : (
          <section className="after-releases">
            <a className="after-back" href={href()}>
              Back to Afterhours <ArrowUpRight size={16} />
            </a>
            <h1>
              A little more
              <br />
              <span>possibility.</span>
            </h1>
            <p>What’s inside this edition of the instrument.</p>
            <article>
              <div>
                <span>PLAYGROUND</span>
                <strong>Edition 01</strong>
              </div>
              <div>
                <h2>The first frequency.</h2>
                <p>
                  A small instrument with somewhere to go. This first browser
                  edition brings three distinct starting textures and three
                  controls to shape them.
                </p>
                <ul>
                  <li>Sine, triangle and sawtooth textures.</li>
                  <li>Continuous tone control from 55 to 440 Hz.</li>
                  <li>Echo mix and pitch movement.</li>
                  <li>Preset settings exported as JSON.</li>
                  <li>Optional WebGL artwork with a static alternative.</li>
                </ul>
                <a className="after-button" href={`${href()}#instrument`}>
                  Play this edition <Play size={16} />
                </a>
              </div>
            </article>
            <p className="after-fine-print">
              Illustrative release notes for the Afterhours template. No
              commercial release is implied.
            </p>
          </section>
        )}
      </main>
      <footer className="after-footer">
        <a className="after-brand" href={href()}>
          <AudioLines size={22} />
          afterhours
        </a>
        <span>Made for the unexpected.</span>
        <a href={href("release-notes")}>
          Edition 01 <ArrowUpRight size={14} />
        </a>
        <small>A fictional product. A playable idea.</small>
      </footer>
    </div>
  );
}
