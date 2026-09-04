import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";
import { CustomEase as Ease } from "gsap/CustomEase";

gsap.registerPlugin(Trigger, Ease);

declare global {
  interface HTMLElementEventMap {
    "carousel:go": CustomEvent<number>;
    "carousel:toggle": CustomEvent;
    "carousel:ready": CustomEvent;
  }
}

const ended = "ended";
const glide = Ease.create("glide", "M0,0 C0,0 0.60,1 1,1");
const mode = "data-state";
const paused = "paused";
const playing = "playing";
const ready = "data-ready";

type Slide = (value: number) => void;

interface Parts {
  root: HTMLElement;
  track: HTMLElement;
  cards: HTMLElement[];
  gap: () => number;
}

function collect(root: HTMLElement): Parts | undefined {
  const track = root.querySelector<HTMLElement>("[data-track]");
  const cards = [...root.querySelectorAll<HTMLElement>("[data-card]")];
  const [first, second] = cards;

  if (!track || !first || !second) return undefined;
  return { root, track, cards, gap: gauge(cards) };
}

function gauge(cards: HTMLElement[]) {
  let span = 0;
  const take = () => {
    const [first, second] = cards;
    span = first && second ? second.offsetLeft - first.offsetLeft : 0;
  };

  take();
  Trigger.addEventListener("refreshInit", take);
  return () => span;
}

function spot(parts: Parts) {
  const gap = parts.gap();
  if (gap <= 0) return 0;
  return Math.round(parts.track.scrollLeft / gap);
}

function pulse(root: HTMLElement, beat: gsap.core.Tween) {
  root.setAttribute("data-beat", beat.paused() ? paused : playing);
}

function target(track: HTMLElement, card: HTMLElement) {
  const frame = track.getBoundingClientRect();
  const box = card.getBoundingClientRect();
  const slack = (frame.width - box.width) / 2;

  return track.scrollLeft + box.left - frame.left - slack;
}

function loosen(track: HTMLElement) {
  track.style.setProperty("scroll-snap-type", "none");
}

function tighten(track: HTMLElement) {
  track.style.removeProperty("scroll-snap-type");
}

function renew(parts: Parts, beat: gsap.core.Tween) {
  if (!live(parts.root)) return;
  beat.restart();
  pulse(parts.root, beat);
}

function land(parts: Parts, beat: gsap.core.Tween, dest: number) {
  const card = parts.cards[dest];
  if (!card) return;

  gsap.killTweensOf(parts.track);
  gsap.to(parts.track, {
    scrollLeft: target(parts.track, card),
    duration: 1,
    ease: glide,
    onStart: () => loosen(parts.track),
    onComplete: () => tighten(parts.track),
  });
  gsap.delayedCall(0.85, () => renew(parts, beat));
}

function idle(parts: Parts) {
  return live(parts.root) && !gsap.isTweening(parts.track);
}

function mirror(parts: Parts, beat: gsap.core.Tween) {
  const sync = () => {
    const near = String(spot(parts));
    const was = parts.root.getAttribute("data-current");

    if (was === near) return;

    parts.root.setAttribute("data-current", near);
    if (was === null || !idle(parts)) return;
    beat.restart();
    pulse(parts.root, beat);
  };

  parts.track.addEventListener("scroll", sync, { passive: true });
  sync();
}

function next(parts: Parts, beat: gsap.core.Tween) {
  const dest = spot(parts) + 1;

  if (dest >= parts.cards.length) {
    parts.root.setAttribute(mode, ended);
    beat.pause();
    pulse(parts.root, beat);
    return;
  }

  land(parts, beat, dest);
}

function clock(parts: Parts) {
  const counter = { pass: 0 };

  const beat: gsap.core.Tween = gsap.to(counter, {
    pass: 1,
    duration: 6.15,
    ease: "none",
    paused: true,
    onComplete: () => next(parts, beat),
  });

  return beat;
}

function jump(parts: Parts, beat: gsap.core.Tween, dest: number) {
  land(parts, beat, dest);
  parts.root.setAttribute(mode, playing);
  pulse(parts.root, beat);
}

function hush(parts: Parts, beat: gsap.core.Tween) {
  parts.root.setAttribute(mode, paused);
  beat.pause();
  pulse(parts.root, beat);
}

function carry(parts: Parts, beat: gsap.core.Tween) {
  parts.root.setAttribute(mode, playing);
  beat.play();
  pulse(parts.root, beat);
}

function toggle(parts: Parts, beat: gsap.core.Tween) {
  const now = parts.root.getAttribute(mode);

  if (now === ended) return jump(parts, beat, 0);
  if (now === playing) return hush(parts, beat);
  return carry(parts, beat);
}

function arm(parts: Parts, beat: gsap.core.Tween) {
  parts.root.setAttribute(ready, "");
  if (parts.root.getAttribute(mode) === playing) beat.restart();
  pulse(parts.root, beat);
}

function listen(parts: Parts, beat: gsap.core.Tween) {
  const { root } = parts;

  root.addEventListener("carousel:go", (event) =>
    jump(parts, beat, event.detail),
  );
  root.addEventListener("carousel:toggle", () => toggle(parts, beat));
  root.addEventListener("carousel:ready", () => arm(parts, beat));
}

function tap(parts: Parts, beat: gsap.core.Tween) {
  parts.cards.forEach((card, index) =>
    card.addEventListener("click", () => {
      if (index !== spot(parts)) jump(parts, beat, index);
    }),
  );
}

function live(root: HTMLElement) {
  return root.hasAttribute(ready) && root.getAttribute(mode) === playing;
}

function watch(parts: Parts, beat: gsap.core.Tween) {
  const wake = () => {
    if (live(parts.root)) beat.play();
    pulse(parts.root, beat);
  };
  const halt = () => {
    beat.pause();
    pulse(parts.root, beat);
  };

  const view = Trigger.create({
    trigger: parts.root,
    start: "top bottom",
    end: "bottom top",
    onEnter: wake,
    onEnterBack: wake,
    onLeave: halt,
    onLeaveBack: halt,
  });

  if (view.isActive) wake();
}

function drift(nav: HTMLElement, box: HTMLElement, slide: Slide) {
  const frame = box.getBoundingClientRect();
  const tall = nav.offsetHeight;
  const home = frame.bottom - 100 - tall;
  const reach = home - frame.top - 30;
  const want = window.innerHeight - 30 - tall - home;

  slide(gsap.utils.clamp(-reach, 0, want));
}

function trail(root: HTMLElement) {
  const box = root.querySelector<HTMLElement>("[data-control]");
  const nav = box?.firstElementChild;
  if (!box || !(nav instanceof HTMLElement)) return;

  const slide = gsap.quickSetter(nav, "y", "px") as Slide;
  const move = () => drift(nav, box, slide);

  Trigger.create({
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    onUpdate: move,
    onRefresh: move,
  });
}

function prime(parts: Parts, beat: gsap.core.Tween) {
  parts.root.style.setProperty("--dwell", "6.15s");
  parts.root.setAttribute(mode, playing);
  if (!parts.root.querySelector("[data-dotnav]")) arm(parts, beat);
  pulse(parts.root, beat);
}

export function carousel(root: HTMLElement) {
  const parts = collect(root);
  if (!parts) return;

  const beat = clock(parts);

  listen(parts, beat);
  tap(parts, beat);
  watch(parts, beat);
  mirror(parts, beat);
  trail(root);
  prime(parts, beat);
}
