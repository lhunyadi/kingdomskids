import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";
import { CustomEase as Ease } from "gsap/CustomEase";

gsap.registerPlugin(Trigger, Ease);

const MIN = 50;
const GAP = 15;
const MARGIN = 30;
const SHIFT = GAP / 2 + MIN / 2;

const INACTIVE = "data-inactive";
const RANGE = "data-range";
const BUSY = "data-busy";

type Curve = (ratio: number) => number;

function damped(mass: number, stiffness: number, damping: number): Curve {
  const freq = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  if (zeta >= 1) {
    return (ratio) => 1 - (1 + freq * ratio) * Math.exp(-ratio * freq);
  }

  const wave = freq * Math.sqrt(1 - zeta * zeta);
  const skew = (zeta * freq) / wave;

  return (ratio) =>
    1 -
    Math.exp(-ratio * zeta * freq) *
      (Math.cos(wave * ratio) + skew * Math.sin(wave * ratio));
}

function settle(solve: Curve) {
  const step = 1 / 6;
  let time = 0;
  let hits = 0;

  while (hits < 16) {
    time += step;
    hits = solve(time) === 1 ? hits + 1 : 0;
  }

  return time * step;
}

function spring(mass: number, stiffness: number, damping: number): Curve {
  const solve = damped(mass, stiffness, damping);
  const span = settle(solve);

  return (ratio) => (ratio === 0 || ratio === 1 ? ratio : solve(ratio * span));
}

const SPRING = spring(100, 1, 15);
const BEZIER = Ease.create("dismiss", "M0,0 C0.8,0 0.4,1 1,1");

interface Parts {
  nav: HTMLElement;
  lift: HTMLElement;
  stadium: HTMLElement;
  circle: HTMLElement;
  dots: HTMLElement;
  icons: HTMLElement;
  carousel: HTMLElement;
  blueprint: HTMLTemplateElement;
  toggle: HTMLElement;
}

interface Stage {
  parts: Parts;
  show: gsap.core.Timeline;
  hide: gsap.core.Timeline;
}

function frame(nav: HTMLElement) {
  const carousel = nav.closest<HTMLElement>("[data-carousel]");
  const lift = nav.querySelector<HTMLElement>("[data-lift]");
  const [stadium, circle] = nav.querySelectorAll<HTMLElement>("[data-bubble]");

  if (!carousel || !lift || !stadium || !circle) return undefined;
  return { nav, carousel, lift, stadium, circle };
}

function guts(nav: HTMLElement) {
  const dots = nav.querySelector<HTMLElement>("[data-dots]");
  const icons = nav.querySelector<HTMLElement>("[data-icons]");
  const blueprint = nav.querySelector<HTMLTemplateElement>("[data-blueprint]");
  const toggle = nav.querySelector<HTMLElement>("[data-toggle]");

  if (!dots || !icons || !blueprint || !toggle) return undefined;
  return { dots, icons, blueprint, toggle };
}

function collect(nav: HTMLElement): Parts | undefined {
  const outer = frame(nav);
  const inner = guts(nav);

  if (!outer || !inner) return undefined;
  return { ...outer, ...inner };
}

function send(carousel: HTMLElement, name: string, detail: number) {
  carousel.dispatchEvent(new CustomEvent(name, { detail }));
}

function mint({ carousel, blueprint }: Parts, index: number) {
  const dot = blueprint.content.firstElementChild?.cloneNode(true);
  if (!(dot instanceof HTMLButtonElement)) return undefined;

  dot.setAttribute("data-dot", String(index));
  dot.setAttribute("aria-label", `Slide ${index + 1}`);
  dot.addEventListener("click", () => send(carousel, "carousel:go", index));
  return dot;
}

function build(parts: Parts) {
  const count = parts.carousel.querySelectorAll("[data-card]").length;
  const made = [...Array(count).keys()]
    .map((index) => mint(parts, index))
    .filter((dot) => dot !== undefined);

  parts.dots.replaceChildren(...made);
  return made;
}

function mark(dots: HTMLButtonElement[], carousel: HTMLElement) {
  const current = Number(carousel.getAttribute("data-current"));

  dots.forEach((dot, index) => {
    const active = index === current;
    dot.toggleAttribute("data-active", active);
    dot.setAttribute("aria-current", String(active));
  });
}

function follow(parts: Parts, dots: HTMLButtonElement[]) {
  const watcher = new MutationObserver(() => mark(dots, parts.carousel));

  watcher.observe(parts.carousel, {
    attributes: true,
    attributeFilter: ["data-current"],
  });
}

function populate(parts: Parts) {
  const dots = build(parts);

  mark(dots, parts.carousel);
  follow(parts, dots);
}

function raise(show: gsap.core.Timeline, parts: Parts) {
  const drop = parts.lift.offsetHeight + MARGIN;

  show.fromTo(parts.lift, { y: drop }, { y: 0, duration: 0.8, ease: SPRING }, 0);
}

function pop(show: gsap.core.Timeline, parts: Parts) {
  const both = [parts.stadium, parts.circle];

  show.fromTo(both, { scale: 0.01 }, { scale: 1, duration: 0.8, ease: SPRING }, 0);
}

function spread(show: gsap.core.Timeline, parts: Parts, rest: number) {
  show
    .fromTo(
      parts.stadium,
      { width: MIN, x: 0 },
      { width: rest, x: -SHIFT, duration: 0.6, ease: SPRING },
      0.7,
    )
    .fromTo(
      parts.circle,
      { x: 0 },
      { x: rest - MIN + SHIFT, duration: 0.6, ease: SPRING },
      0.7,
    );
}

function reveal(show: gsap.core.Timeline, parts: Parts) {
  const face = [parts.dots, parts.icons];

  show.fromTo(face, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "none" }, 1);
}

function conceal(hide: gsap.core.Timeline, parts: Parts) {
  const face = [parts.dots, parts.icons];

  hide.fromTo(
    face,
    { opacity: 1 },
    { opacity: 0, duration: 0.25, ease: "none" },
    0,
  );
}

function merge(hide: gsap.core.Timeline, parts: Parts, rest: number) {
  hide
    .fromTo(
      parts.stadium,
      { width: rest, x: -SHIFT },
      { width: MIN, x: 0, duration: 0.5, ease: BEZIER },
      0,
    )
    .fromTo(
      parts.circle,
      { x: rest - MIN + SHIFT },
      { x: 0, duration: 0.5, ease: BEZIER },
      0,
    );
}

function shrink(hide: gsap.core.Timeline, parts: Parts) {
  const both = [parts.stadium, parts.circle];

  hide.fromTo(both, { scale: 1 }, { scale: 0.01, duration: 0.5, ease: BEZIER }, 0.5);
}

function ready(parts: Parts) {
  if (parts.carousel.hasAttribute("data-ready")) return;
  parts.carousel.dispatchEvent(new CustomEvent("carousel:ready"));
}

function stopped() {
  return gsap.timeline({ paused: true, defaults: { immediateRender: false } });
}

function opening(parts: Parts, rest: number) {
  const show = stopped();

  raise(show, parts);
  pop(show, parts);
  spread(show, parts, rest);
  reveal(show, parts);
  show.call(() => ready(parts), undefined, 1);
  return show;
}

function closing(parts: Parts, rest: number) {
  const hide = stopped();

  conceal(hide, parts);
  merge(hide, parts, rest);
  shrink(hide, parts);
  return hide;
}

function enter(stage: Stage) {
  stage.parts.nav.removeAttribute(INACTIVE);
  stage.hide.pause();
  stage.show.progress(0, true);
  stage.show.play();
}

function leave(stage: Stage) {
  stage.show.pause();
  stage.hide.progress(0, true);
  stage.hide.play();
}

function settled(stage: Stage) {
  const { nav } = stage.parts;

  nav.removeAttribute(BUSY);
  if (nav.hasAttribute(RANGE)) return;
  nav.setAttribute(BUSY, "");
  leave(stage);
}

function cleared(stage: Stage) {
  const { nav } = stage.parts;

  nav.removeAttribute(BUSY);
  nav.setAttribute(INACTIVE, "");
  if (!nav.hasAttribute(RANGE)) return;
  nav.setAttribute(BUSY, "");
  enter(stage);
}

function arrive(stage: Stage) {
  const { nav } = stage.parts;

  nav.setAttribute(RANGE, "");
  if (nav.hasAttribute(BUSY)) return;
  nav.setAttribute(BUSY, "");
  enter(stage);
}

function depart(stage: Stage) {
  const { nav } = stage.parts;

  nav.removeAttribute(RANGE);
  if (nav.hasAttribute(BUSY)) return;
  nav.setAttribute(BUSY, "");
  leave(stage);
}

function park(stage: Stage) {
  const { nav } = stage.parts;

  nav.removeAttribute(RANGE);
  nav.removeAttribute(BUSY);
  nav.setAttribute(INACTIVE, "");
  stage.show.pause();
  stage.hide.pause();
  stage.show.progress(0, true);
  stage.hide.progress(1, true);
}

function stay(stage: Stage) {
  const zone = Trigger.create({
    trigger: stage.parts.carousel,
    start: "60% bottom",
    end: "bottom 75%",
    onEnter: () => arrive(stage),
    onEnterBack: () => arrive(stage),
    onLeave: () => depart(stage),
    onLeaveBack: () => depart(stage),
  });

  if (zone.isActive) arrive(stage);
}

function reset(stage: Stage) {
  Trigger.create({
    trigger: stage.parts.carousel,
    start: "top bottom",
    end: "bottom top",
    onLeave: () => park(stage),
    onLeaveBack: () => park(stage),
  });
}

function wire(stage: Stage) {
  const { parts, show, hide } = stage;

  parts.toggle.addEventListener("click", () =>
    parts.carousel.dispatchEvent(new CustomEvent("carousel:toggle")),
  );
  show.eventCallback("onComplete", () => settled(stage));
  hide.eventCallback("onComplete", () => cleared(stage));
}

export function dotnav(nav: HTMLElement) {
  const parts = collect(nav);
  if (!parts) return;

  populate(parts);

  const rest = parts.stadium.getBoundingClientRect().width;
  const stage: Stage = {
    parts,
    show: opening(parts, rest),
    hide: closing(parts, rest),
  };

  wire(stage);
  park(stage);
  stay(stage);
  reset(stage);
}
