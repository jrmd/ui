export type SoundSettings = {
  tone: number;
  space: number;
  movement: number;
  waveform: OscillatorType;
};

/** A small, opt-in browser synth. No samples, remote audio, or autoplay. */
export function createInstrument() {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const overtone = context.createOscillator();
  const overtoneGain = context.createGain();
  const master = context.createGain();
  const delay = context.createDelay(1);
  const feedback = context.createGain();
  const wet = context.createGain();
  const lfo = context.createOscillator();
  const depth = context.createGain();
  master.gain.value = 0;
  overtoneGain.gain.value = 0.16;
  feedback.gain.value = 0.28;
  delay.delayTime.value = 0.31;
  oscillator.connect(master);
  overtone.connect(overtoneGain).connect(master);
  master.connect(context.destination);
  master.connect(delay).connect(wet).connect(context.destination);
  delay.connect(feedback).connect(delay);
  lfo.connect(depth).connect(oscillator.detune);
  depth.connect(overtone.detune);
  oscillator.start();
  overtone.start();
  lfo.start();
  let closed = false;
  return {
    async play() {
      await context.resume();
      if (!closed)
        master.gain.setTargetAtTime(0.055, context.currentTime, 0.08);
    },
    update(settings: SoundSettings) {
      if (closed) return;
      oscillator.type = settings.waveform;
      overtone.type = "sine";
      oscillator.frequency.setTargetAtTime(
        settings.tone,
        context.currentTime,
        0.05,
      );
      overtone.frequency.setTargetAtTime(
        settings.tone * 1.5,
        context.currentTime,
        0.05,
      );
      wet.gain.setTargetAtTime(settings.space / 120, context.currentTime, 0.05);
      lfo.frequency.setTargetAtTime(
        0.2 + settings.movement / 15,
        context.currentTime,
        0.05,
      );
      depth.gain.setTargetAtTime(
        settings.movement / 2,
        context.currentTime,
        0.05,
      );
    },
    close() {
      if (closed) return;
      closed = true;
      master.gain.setTargetAtTime(0, context.currentTime, 0.025);
      wet.gain.setTargetAtTime(0, context.currentTime, 0.025);
      // The short release avoids clicks. Closing releases every connected node.
      window.setTimeout(() => {
        void context.close();
      }, 180);
    },
  };
}
