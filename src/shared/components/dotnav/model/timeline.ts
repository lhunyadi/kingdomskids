import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Trigger);

interface Spec {
  stiffness: number;
  damping: number;
  duration: number;
}

function overdamped(decay: number) {
  return (ratio: number) => 1 - Math.exp(-decay * ratio) * (1 + decay * ratio);
}

function underdamped(decay: number, wave: number) {
  return (ratio: number) =>
    1 -
    Math.exp(-decay * ratio) *
      (Math.cos(wave * ratio) + (decay / wave) * Math.sin(wave * ratio));
}

function curve({ stiffness, damping, duration }: Spec) {
  const freq = Math.sqrt(stiffness) * duration;
  const zeta = damping / (2 * Math.sqrt(stiffness));
  const decay = zeta * freq;

  if (zeta >= 1) return overdamped(decay);
  return underdamped(decay, freq * Math.sqrt(1 - zeta * zeta));
}

function spring(spec: Spec) {
  const raw = curve(spec);
  const span = raw(1);

  return (ratio: number) => raw(ratio) / span;
}

function responsive(response: number, bounce: number) {
  const freq = (2 * Math.PI) / response;
  const zeta = 1 - bounce;

  return {
    stiffness: freq * freq,
    damping: 2 * zeta * freq,
    duration: (zeta >= 1 ? 9.25 : 6.5) / freq,
  };
}

function paced(stiffness: number, damping: number, duration: number) {
  return { ease: spring({ stiffness, damping, duration }), duration };
}

function popped(response: number) {
  const spec = responsive(response, 0);
  return { ease: spring(spec), duration: spec.duration };
}

interface Bubble {
  element: HTMLElement;
  skin: HTMLElement;
}

interface Parts {
  lift: HTMLElement;
  seed: HTMLElement;
  carousel: HTMLElement;
  box: HTMLElement;
  blueprint: HTMLTemplateElement;
  toggle: HTMLElement;
  bubbles: Bubble[];
}

function anchor(parts: Parts) {
  const mid = parts.lift.getBoundingClientRect();

  return parts.bubbles.map((bubble) => {
    const box = bubble.element.getBoundingClientRect();
    return mid.left + mid.width / 2 - box.left - box.width / 2;
  });
}

function hide(parts: Parts, dots: HTMLButtonElement[]) {
  gsap.set(parts.lift, { y: 200 });
  gsap.set(parts.seed, {
    scale: 1.25,
    opacity: 0,
    width: 25,
    height: 70,
    xPercent: -50,
    yPercent: -50,
  });
  gsap.set(dots, { x: 35, opacity: 0 });
  gsap.set(parts.toggle, { opacity: 0, scale: 0.5 });
}

function curtain(parts: Parts, dots: HTMLButtonElement[]) {
  const [stadium, circle] = parts.bubbles;
  if (!stadium || !circle) return;

  gsap.set(stadium.element, { "--intro-progress": 0 });
  const shift = anchor(parts);

  hide(parts, dots);
  parts.bubbles.forEach((bubble, index) => {
    gsap.set(bubble.element, {
      x: shift[index] ?? 0,
      opacity: 0,
      ["--alpha"]: 0,
    });
    gsap.set(bubble.skin, { height: 30 });
  });
  gsap.set(stadium.skin, { ["--scale"]: 1.25, width: 35 });
  gsap.set(circle.skin, { ["--scale"]: 0, width: 70 });
}

function faces(parts: Parts) {
  return parts.bubbles.map((bubble) => bubble.element);
}

function arrive(show: gsap.core.Timeline, parts: Parts) {
  show
    .to(parts.lift, { y: 0, ...paced(100, 10, 1.25) }, 0)
    .set(faces(parts), { opacity: 1 }, 0.025)
    .set(parts.seed, { opacity: 1 }, 0.025)
    .to(parts.seed, { scale: 0.75, ...popped(0.25) }, 0.025)
    .to(parts.seed, { height: 50, ...paced(100, 8, 1.75) }, 0.15)
    .set(parts.seed, { opacity: 0 }, 0.5);
}

function spread(show: gsap.core.Timeline, parts: Parts, rest: number) {
  const [stadium, circle] = parts.bubbles;
  if (!stadium || !circle) return;

  show
    .to(stadium.skin, { ["--scale"]: 1, ...popped(0.25) }, 0.25)
    .to(stadium.element, { x: 0, ...paced(100, 20, 0.95) }, 0.5)
    .to(stadium.skin, { width: rest, ...paced(100, 10, 1.25) }, 0.5)
    .to(circle.element, { x: 0, ...paced(100, 20, 0.95) }, 0.55)
    .to(circle.skin, { ["--scale"]: 1, ...popped(0.65) }, 0.55)
    .to(stadium.skin, { height: 50, ...paced(100, 10, 1.25) }, 0.75)
    .to(circle.skin, { width: 50, height: 50, ...paced(100, 10, 1.25) }, 0.75);
}

function ready(parts: Parts) {
  parts.carousel.dispatchEvent(new CustomEvent("carousel:ready"));
}

function land(
  show: gsap.core.Timeline,
  parts: Parts,
  dots: HTMLButtonElement[],
) {
  const [stadium] = parts.bubbles;
  if (!stadium) return;

  show
    .to(dots, { x: 0, ...paced(200, 20, 0.75), stagger: 0.025 }, 0.75)
    .to(dots, { opacity: 1, duration: 0.1, ease: "power1.in" }, 0.75)
    .to(
      stadium.element,
      { "--intro-progress": 1, ...paced(200, 20, 0.75) },
      0.75,
    )
    .to(parts.toggle, { opacity: 1, duration: 0.1, ease: "power1.in" }, 0.95)
    .to(parts.toggle, { scale: 1, duration: 0.25, ease: "power1.out" }, 0.95)
    .to(faces(parts), { ["--alpha"]: 1, ...paced(100, 20, 0.95) }, 1)
    .call(() => ready(parts), undefined, 0.85);
}

function relax(parts: Parts) {
  gsap.set(parts.lift, { willChange: "auto" });
}

function bloom(parts: Parts, dots: HTMLButtonElement[]) {
  const [stadium] = parts.bubbles;
  const rest = stadium?.element.getBoundingClientRect().width ?? 0;

  curtain(parts, dots);

  const show = gsap.timeline({
    paused: true,
    onComplete: () => relax(parts),
  });
  arrive(show, parts);
  spread(show, parts, rest);
  land(show, parts, dots);
  return show;
}

function locate(nav: HTMLElement) {
  return {
    lift: nav.querySelector<HTMLElement>("[data-lift]"),
    seed: nav.querySelector<HTMLElement>("[data-seed]"),
    box: nav.querySelector<HTMLElement>("[data-dots]"),
    blueprint: nav.querySelector<HTMLTemplateElement>("[data-blueprint]"),
    toggle: nav.querySelector<HTMLElement>("[data-toggle]"),
  };
}

function pair(nav: HTMLElement) {
  const bubbles: Bubble[] = [];

  nav.querySelectorAll<HTMLElement>("[data-bubble]").forEach((element) => {
    const skin = element.querySelector<HTMLElement>("[data-skin]");
    if (skin) bubbles.push({ element, skin });
  });

  return bubbles;
}

function collect(nav: HTMLElement): Parts | undefined {
  const carousel = nav.closest<HTMLElement>("[data-carousel]");
  const { lift, seed, box, blueprint, toggle } = locate(nav);
  const bubbles = pair(nav);

  if (!carousel || !lift || !seed) return undefined;
  if (!box || !blueprint || !toggle) return undefined;
  if (bubbles.length < 2) return undefined;
  return { lift, seed, carousel, box, blueprint, toggle, bubbles };
}

function send(carousel: HTMLElement, name: string, detail: number) {
  carousel.dispatchEvent(new CustomEvent(name, { detail }));
}

function mint({ carousel, blueprint }: Parts, index: number) {
  const dot = blueprint.content.firstElementChild?.cloneNode(true);
  if (!(dot instanceof HTMLButtonElement)) return undefined;

  dot.setAttribute("data-dot", String(index));
  dot.setAttribute("aria-label", `Slide ${index + 1}`);
  dot.style.setProperty("--item-index", String(index));
  dot.addEventListener("click", () => send(carousel, "carousel:go", index));
  return dot;
}

function build(parts: Parts) {
  const count = parts.carousel.querySelectorAll("[data-card]").length;
  const dots = [...Array(count).keys()]
    .map((index) => mint(parts, index))
    .filter((dot) => dot !== undefined);

  parts.box.replaceChildren(...dots);
  return dots;
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

function wake(parts: Parts, show: gsap.core.Timeline) {
  Trigger.create({
    trigger: parts.carousel,
    start: "top 35%",
    once: true,
    onEnter: () => show.play(),
  });
}

export function dotnav(nav: HTMLElement) {
  const parts = collect(nav);
  if (!parts) return;

  const dots = build(parts);

  parts.toggle.addEventListener("click", () =>
    parts.carousel.dispatchEvent(new CustomEvent("carousel:toggle")),
  );

  mark(dots, parts.carousel);
  follow(parts, dots);
  wake(parts, bloom(parts, dots));
}
