import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";
import { SplitText as Text } from "gsap/SplitText";
import { ScrollSmoother as Smoother } from "gsap/ScrollSmoother";
import { DrawSVGPlugin as Draw } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(Trigger, Text, Smoother, Draw);

interface Parts {
  stage: HTMLElement;
  line: HTMLElement;
  exordium: HTMLElement;
  passage: HTMLElement;
  reference: HTMLElement;
  drawing: SVGSVGElement;
}

function collect(root: HTMLElement): Parts | undefined {
  const stage = root.querySelector<HTMLElement>("[data-pin]");
  const line = root.querySelector<HTMLElement>("[data-line]");
  const exordium = root.querySelector<HTMLElement>("[data-exordium]");
  const passage = root.querySelector<HTMLElement>("[data-passage]");
  const reference = root.querySelector<HTMLElement>("[data-reference]");
  const drawing = root.querySelector<SVGSVGElement>("[data-drawing]");

  if (!stage || !line || !exordium || !passage || !reference || !drawing)
    return undefined;
  return { stage, line, exordium, passage, reference, drawing };
}

function centre({ line, exordium }: Parts) {
  gsap.set(exordium, {
    x: (line.clientWidth - exordium.offsetWidth) / 2,
  });
}

function settle(words: Element[]) {
  return gsap.set(words, { opacity: 1, filter: "blur(0px)" });
}

function fade(words: Element[], done: () => void) {
  return gsap.fromTo(
    words,
    { opacity: 0, filter: "blur(10px)" },
    {
      opacity: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
      stagger: 0.25,
      onComplete: done,
    },
  );
}

function greet({ exordium }: Parts) {
  let shown = false;
  const done = () => {
    shown = true;
    Smoother.get()?.paused(false);
  };

  return Text.create(exordium, {
    type: "words",
    aria: "auto",
    autoSplit: true,
    onSplit: (self) => (shown ? settle(self.words) : fade(self.words, done)),
  });
}

function ordered(drawing: SVGSVGElement) {
  return [...drawing.querySelectorAll("path")].sort(
    (first, second) => first.getBBox().y - second.getBBox().y,
  );
}

const ledge = "top 120px";

function drive(stage: HTMLElement, onSettled: () => void) {
  return {
    trigger: stage,
    start: ledge,
    end: "+=250%",
    scrub: 1,
    once: true,
    onLeave: (self: Trigger) => {
      self.animation?.progress(1);
      onSettled();
    },
  };
}

function sequence(parts: Parts, words: Element[], onSettled: () => void) {
  const { stage, exordium, reference, drawing } = parts;

  return gsap
    .timeline({
      defaults: { ease: "none", duration: 0.5 },
      scrollTrigger: drive(stage, onSettled),
    })
    .to(exordium, { x: 0, ease: "power2.inOut" })
    .addLabel("passage")
    .from(words, { yPercent: 100, stagger: { amount: 1 } })
    .from(reference, { yPercent: -100, duration: 1 }, ">-0.1")
    .from(
      ordered(drawing),
      { drawSVG: 0, duration: 1, stagger: { amount: 1.5 } },
      "passage",
    );
}

function recite(parts: Parts) {
  let settled = false;

  return Text.create(parts.passage, {
    type: "words",
    mask: "words",
    aria: "auto",
    autoSplit: true,
    onSplit: (self) => {
      if (!settled) centre(parts);

      return sequence(parts, self.words, () => {
        settled = true;
      });
    },
  });
}

export function propositio(root: HTMLElement) {
  const parts = collect(root);
  if (!parts) return;

  Trigger.create({
    trigger: parts.stage,
    start: ledge,
    end: "+=250%",
    pin: true,
  });

  greet(parts);
  recite(parts);
}
