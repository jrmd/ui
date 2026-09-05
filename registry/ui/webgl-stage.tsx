"use client";
import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { WebGLScene, type SceneKind } from "./webgl-scenes";
import { RibbonPoster } from "./webgl-ribbons";
import { cn } from "./utils";
export type WebGLProps = {
  className?: string;
  color?: string;
  speed?: number;
  paused?: boolean;
  label?: string;
  imageSrc?: string;
  composition?: "fold" | "orbit";
};
class Boundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export function WebGLStage({
  kind,
  className,
  color: suppliedColor,
  speed = 1,
  paused = false,
  imageSrc,
  composition = "fold",
  label = "Interactive WebGL artwork",
}: WebGLProps & { kind: SceneKind }) {
  const colors = {
    particles: "#b9a4f8",
    ribbons: "#8daed1",
    liquid: "#737fd7",
    orb: "#eab89d",
    terrain: "#b2c08b",
    distortion: "#d7dfcf",
  };
  const backgrounds = {
    particles: "#10101c",
    ribbons: "#10151d",
    liquid: "#1c2945",
    orb: "#241c2b",
    terrain: "#14221e",
    distortion: "#d7dfcf",
  };
  const color = suppliedColor ?? colors[kind];
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [lost, setLost] = React.useState(false);
  const [reduce, setReduce] = React.useState(true);
  React.useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduce(media.matches);
    change();
    media.addEventListener("change", change);
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    setReady(!!gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", change);
    };
  }, []);
  const fallback = (
    <div
      className="absolute inset-0 grid place-items-center"
      data-webgl-fallback
    >
      {kind === "ribbons" ? (
        <RibbonPoster color={color} />
      ) : kind === "terrain" ? (
        <svg
          viewBox="0 0 900 400"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          aria-hidden="true"
        >
          {Array.from({ length: 34 }, (_, row) => {
            const points = Array.from({ length: 80 }, (_, col) => {
              const x = (col / 79) * 1000 - 50;
              const z = row / 33;
              const h =
                90 * Math.exp(-(((x - 310) / 150) ** 2)) +
                65 * Math.exp(-(((x - 610) / 110) ** 2));
              const y =
                140 +
                z * 230 -
                h * Math.sin(z * Math.PI) * 1.5 +
                Math.sin(x * 0.013 + z * 5) * 12;
              return `${x.toFixed(2)},${y.toFixed(2)}`;
            });
            return (
              <polyline
                key={row}
                points={points.join(" ")}
                fill="none"
                stroke={color}
                strokeWidth={1}
                opacity={0.2 + row / 55}
              />
            );
          })}
        </svg>
      ) : kind === "distortion" && imageSrc ? (
        <img src={imageSrc} alt="" className="h-full w-full object-cover" />
      ) : (
        <svg viewBox="0 0 600 400" className="h-full w-full" aria-hidden="true">
          {kind === "particles" ? (
            Array.from({ length: 700 }, (_, i) => {
              const a = i * 2.399963,
                r = 65 + Math.sqrt(i / 700) * 165;
              return (
                <circle
                  key={i}
                  cx={(300 + Math.cos(a) * r).toFixed(3)}
                  cy={(200 + Math.sin(a) * r * 0.52).toFixed(3)}
                  r={0.5 + (i % 4) * 0.3}
                  fill={color}
                  opacity={0.4 + (i % 6) * 0.1}
                />
              );
            })
          ) : kind === "orb" ? (
            <>
              <defs>
                <radialGradient id="jez-orb-poster" cx="30%" cy="22%">
                  <stop stopColor="#fff4e4" />
                  <stop offset=".35" stopColor={color} />
                  <stop offset=".7" stopColor="#695786" />
                  <stop offset="1" stopColor="#1f2035" />
                </radialGradient>
              </defs>
              <circle cx="300" cy="200" r="128" fill="url(#jez-orb-poster)" />
            </>
          ) : (
            Array.from({ length: 32 }, (_, i) => (
              <path
                key={i}
                d={`M 0 ${70 + i * 9} Q 150 ${-30 + i * 13} 300 ${130 + i * 7} T 600 ${95 + i * 10}`}
                fill="none"
                stroke={color}
                strokeWidth={1.1}
                opacity={0.3 + (i % 5) * 0.13}
              />
            ))
          )}
        </svg>
      )}
    </div>
  );
  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      style={{ background: backgrounds[kind] }}
      className={cn(
        "relative h-[400px] w-full overflow-hidden rounded-xl",
        className,
      )}
    >
      {ready && !lost && !reduce && visible ? (
        <Boundary fallback={fallback}>
          <Canvas
            dpr={[1, 1.5]}
            frameloop={paused ? "demand" : "always"}
            camera={{ position: [0, 0, 5], fov: 48 }}
            gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener(
                "webglcontextlost",
                () => setLost(true),
                { once: true },
              );
            }}
          >
            <WebGLScene
              kind={kind}
              color={color}
              speed={speed}
              imageSrc={imageSrc}
              composition={composition}
            />
          </Canvas>
        </Boundary>
      ) : (
        fallback
      )}
    </div>
  );
}
