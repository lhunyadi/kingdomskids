import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";
import { SplitText as Text } from "gsap/SplitText";
import { DrawSVGPlugin as Draw } from "gsap/DrawSVGPlugin";
import { release } from "@/shared/motion/scroll";

gsap.registerPlugin(Trigger, Text, Draw);

interface Parts {
  root: HTMLElement;
  stage: HTMLElement;
  exordium: HTMLElement;
  passage: HTMLElement;
  reference: HTMLElement;
  drawing: SVGSVGElement;
}

function collect(root: HTMLElement): Parts | undefined {
  const stage = root.querySelector<HTMLElement>("[data-stage]");
  const exordium = root.querySelector<HTMLElement>("[data-exordium]");
  const passage = root.querySelector<HTMLElement>("[data-passage]");
  const reference = root.querySelector<HTMLElement>("[data-reference]");
  const drawing = root.querySelector<SVGSVGElement>("[data-drawing]");

  if (!stage || !exordium || !passage || !reference || !drawing)
    return undefined;
  return { root, stage, exordium, passage, reference, drawing };
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
    release();
  };

  return Text.create(exordium, {
    type: "words",
    aria: "auto",
    autoSplit: true,
    onSplit: (self) => (shown ? settle(self.words) : fade(self.words, done)),
  });
}

function ordered(drawing: SVGSVGElement) {
  return [...drawing.querySelectorAll("path")]
    .map((path) => ({ path, top: path.getBBox().y }))
    .sort((first, second) => first.top - second.top)
    .map((entry) => entry.path);
}

const ledge = "top 120px";

function drive({ root, stage }: Parts): ScrollTrigger.Vars {
  return {
    trigger: root,
    start: ledge,
    end: () => `+=${root.offsetHeight - stage.offsetHeight}`,
    scrub: 0.25,
  };
}

function sequence(parts: Parts, words: Element[]) {
  const { exordium, reference, drawing } = parts;

  return gsap
    .timeline({
      defaults: { ease: "none", duration: 0.5 },
      scrollTrigger: drive(parts),
    })
    .to(exordium, { "--offset": 0, ease: "power2.inOut" })
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
  return Text.create(parts.passage, {
    type: "words",
    mask: "words",
    aria: "auto",
    autoSplit: true,
    onSplit: (self) => sequence(parts, self.words),
  });
}

export function propositio(root: HTMLElement) {
  const parts = collect(root);
  if (!parts) return;

  greet(parts);
  recite(parts);
}
