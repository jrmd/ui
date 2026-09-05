export const screenVertex = `varying vec2 uvScreen; void main(){uvScreen=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const common = `
varying vec2 uvScreen; uniform float time; uniform float aspect; uniform vec2 pointer; uniform vec3 tint;
float hash(vec3 p){p=fract(p*.3183099+vec3(.1,.2,.3));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=noise(p)*a;p=p*2.02+13.1;a*=.5;}return v;}
vec3 studio(vec3 r){float band=pow(max(0.,sin(r.y*5.+r.x*2.)),12.);vec3 c=mix(vec3(.035,.04,.085),vec3(.85,.90,1.),smoothstep(-.3,.9,r.y));c+=vec3(1.,.8,.6)*band*1.2;c+=vec3(.26,.38,.8)*pow(max(0.,r.x),6.);return c;}
`;
export const orbFragment = common + `
float shape(vec3 p){return length(p)-.96-sin(p.y*3.+time*.3)*sin(p.x*2.5+time*.12)*.045;}
void main(){vec2 q=(uvScreen-.5)*vec2(aspect,1.);q-=pointer*.045;vec3 ro=vec3(0,0,3.5),rd=normalize(vec3(q*2.5,-3.));float t=0.;bool hit=false;for(int i=0;i<60;i++){float d=shape(ro+rd*t);if(d<.0015){hit=true;break;}t+=d*.85;if(t>6.)break;}
vec3 bg=mix(vec3(.055,.045,.075),vec3(.17,.115,.16),clamp(1.-length(q)*.65,0.,1.));
if(hit){vec3 p=ro+rd*t;float e=.002;vec3 n=normalize(vec3(shape(p+vec3(e,0,0))-shape(p-vec3(e,0,0)),shape(p+vec3(0,e,0))-shape(p-vec3(0,e,0)),shape(p+vec3(0,0,e))-shape(p-vec3(0,0,e))));vec3 r=reflect(rd,n);float fres=pow(1.-max(0.,dot(n,-rd)),3.);float flow=sin(n.y*3.+n.x*2.+time*.12);vec3 metal=mix(tint,vec3(.3,.33,.62),smoothstep(-.4,.8,flow));vec3 c=studio(r)*metal*1.55;c+=vec3(.55,.67,.9)*fres*.65;bg=c/(c+.65);}
float grain=(hash(vec3(gl_FragCoord.xy,time*.01))-.5)/180.;gl_FragColor=vec4(bg+grain,1.);}
`;
export const liquidFragment = common + `
float water(vec2 p){vec2 c=pointer*vec2(aspect,1.)*.6;float d=length(p-c);return sin(p.x*3.+p.y*2.+time*.45)*.15+sin(p.y*5.-p.x*1.4-time*.3)*.10+sin(d*10.-time*1.3)*exp(-d*2.)*.012;}
void main(){vec2 p=(uvScreen-.5)*vec2(aspect,1.)*3.;float e=.008;float dx=(water(p+vec2(e,0))-water(p-vec2(e,0)))/(2.*e);float dy=(water(p+vec2(0,e))-water(p-vec2(0,e)))/(2.*e);vec3 n=normalize(vec3(-dx,-dy,1.));vec3 r=reflect(normalize(vec3(p*.08,-1.)),n);float line=pow(.5+.5*sin((r.x+r.y)*9.+water(p)*8.),8.);vec3 c=mix(vec3(.055,.075,.17),tint*.65,clamp(r.y*.65+.45,0.,1.));c+=studio(r)*.4;c=mix(c,vec3(.94,.79,.60),line*.25);c*=1.-length(uvScreen-.5)*.3;gl_FragColor=vec4(c/(c+.65),1.);}
`;
export const distortionFragment = common + `
uniform sampler2D picture; uniform float imageAspect;
void main(){vec2 p=uvScreen;vec2 center=.5+pointer*.5;vec2 delta=(p-center)*vec2(aspect,1.);float d=length(delta);float lens=exp(-d*d*9.);vec2 offset=normalize(delta+vec2(.001))*sin(d*30.-time*1.1)*.018*lens;offset+=vec2(sin(p.y*7.+time*.3),cos(p.x*6.+time*.2))*.004;vec2 cover=vec2(min(1.,aspect/imageAspect),min(1.,imageAspect/aspect));vec2 sampleUv=(p-.5+offset)*cover+.5;float split=.008*lens;vec3 c=vec3(texture2D(picture,sampleUv+vec2(split,0)).r,texture2D(picture,sampleUv).g,texture2D(picture,sampleUv-vec2(split,0)).b);gl_FragColor=vec4(c,1.);}
`;
export const terrainVertex = `varying vec3 vPos;varying float elevation;uniform float time;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}float hills(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+3.1;a*=.5;}return v;}
void main(){vec3 p=position;float h=hills(p.xy*.85+vec2(time*.018,0));p.z=pow(h,2.)*2.-.5;elevation=p.z;vPos=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`;
export const terrainFragment = `varying vec3 vPos;varying float elevation;uniform vec3 tint;void main(){vec3 n=normalize(cross(dFdx(vPos),dFdy(vPos)));float light=.65+.35*abs(dot(n,normalize(vec3(-.5,.7,1.))));float contours=abs(fract(elevation*18.)-.5);float ink=1.-smoothstep(.018,.06,contours);vec3 c=mix(vec3(.07,.14,.13),tint,clamp(elevation*.9+.15,0.,1.));c=mix(c,vec3(.88,.88,.66),ink*.4);c*=light;gl_FragColor=vec4(c,1.);}`;
export const particleVertex = `attribute float seed;varying float brightness;uniform float time;uniform vec2 pointer;void main(){vec3 p=position;float a=time*.06+(length(p.xy))*.17;mat2 r=mat2(cos(a),-sin(a),sin(a),cos(a));p.xy=r*p.xy;p.z+=sin(seed*35.+time*.3)*.08;p.x+=pointer.x*.12;p.y+=pointer.y*.08;vec4 mv=modelViewMatrix*vec4(p,1.);brightness=.45+.55*seed;gl_PointSize=(1.2+seed*1.8)*(4./-mv.z);gl_Position=projectionMatrix*mv;}`;
export const particleFragment = `varying float brightness;uniform vec3 tint;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 c=mix(tint,vec3(.92,.94,1.),brightness*.7);gl_FragColor=vec4(c,(1.-smoothstep(.12,.5,d))*brightness);}`;
