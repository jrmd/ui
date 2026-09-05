"use client";
import * as React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
export type AtmosphereKind = "silk" | "eclipse" | "tunnel" | "constellation";
const fragments: Record<AtmosphereKind, string> = {
  silk: `float v=0.; for(int i=0;i<7;i++){float f=float(i);float y=p.y+.19*sin(p.x*2.8+t*.3+f*.42)+.08*sin(p.x*6.-t*.2);v+=.006/(abs(y-f*.075+.24)+.007);} col=tint*v*.45;`,
  eclipse: `float r=length(p);float a=atan(p.y,p.x);float ring=exp(-abs(r-.49)*55.);float corona=exp(-abs(r-.5)*9.)*.18*(.6+.4*sin(a*9.+t*.25));col=tint*(ring+corona);col+=vec3(1.,.82,.5)*exp(-length(p-vec2(.35,.35))*23.);col*=smoothstep(.455,.48,r);`,
  tunnel: `float r=max(length(p),.015);float a=atan(p.y,p.x);float z=1./r+t*.4;float rings=pow(.5+.5*cos(z*5.),24.);float rays=pow(.5+.5*cos(a*14.+sin(z)*.3),34.);col=tint*(rings*.65+rays*.3)*smoothstep(.03,.35,r)*(.7+.3*sin(a+t*.15));`,
  constellation: `for(int i=0;i<30;i++){float f=float(i);vec2 q=vec2(sin(f*19.1+t*.025),cos(f*7.7+t*.035))*.72;float d=length(p-q);col+=tint*.00055/(d*d+.0004);vec2 q2=vec2(sin((f+1.)*19.1+t*.025),cos((f+1.)*7.7+t*.035))*.72;vec2 pa=p-q,ba=q2-q;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);col+=tint*.012*exp(-length(pa-ba*h)*300.);}`,
};
export function AtmosphereScene({
  kind,
  color,
  speed,
}: {
  kind: AtmosphereKind;
  color: string;
  speed: number;
}) {
  const { size, invalidate } = useThree();
  const material = React.useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `varying vec2 uv0;void main(){uv0=uv;gl_Position=vec4(position.xy,0.,1.);}`,
        fragmentShader: `precision highp float; varying vec2 uv0; uniform float time; uniform float aspect; uniform vec3 tint; uniform vec2 pointer;void main(){vec2 p=(uv0-.5)*2.;p.x*=aspect;p-=pointer*.08;float t=time;vec3 col=vec3(.012,.016,.02);${fragments[kind]}gl_FragColor=vec4(col,1.);}`,
        uniforms: {
          time: { value: 0 },
          aspect: { value: 1 },
          tint: { value: new THREE.Color(color) },
          pointer: { value: new THREE.Vector2() },
        },
      }),
    [kind, color],
  );
  React.useEffect(() => () => material.dispose(), [material]);
  React.useEffect(() => {
    material.uniforms.aspect.value = size.width / Math.max(size.height, 1);
    invalidate();
  }, [material, size, invalidate]);
  useFrame(({ pointer }, delta) => {
    material.uniforms.time.value += Math.min(delta, 0.05) * speed;
    material.uniforms.pointer.value.lerp(pointer, 0.035);
  });
  return (
    <mesh material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}
