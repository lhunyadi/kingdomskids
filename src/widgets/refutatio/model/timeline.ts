import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";
import { SplitText as Text } from "gsap/SplitText";

gsap.registerPlugin(Trigger, Text);

const ledge = "top top";

interface Parts {
  stage: HTMLElement;
  passage: HTMLElement;
}

function collect(root: HTMLElement): Parts | undefined {
  const stage = root.querySelector<HTMLElement>("[data-pin]");
  const passage = root.querySelector<HTMLElement>("[data-passage]");

  if (!stage || !passage) return undefined;
  return { stage, passage };
}

function drive(stage: HTMLElement): ScrollTrigger.Vars {
  return {
    trigger: stage,
    start: ledge,
    end: "+=100%",
    scrub: 1,
    once: true,
    onLeave: (self: Trigger) => {
      self.animation?.progress(1);
    },
  };
}

function fall(stage: HTMLElement): ScrollTrigger.Vars {
  return {
    id: "toys",
    trigger: stage,
    start: ledge,
    end: "+=85%",
    scrub: 1,
  };
}

function settle(chars: Element[]) {
  gsap.set(chars, {
    rotation: () => gsap.utils.random(-4, 4),
    y: () => gsap.utils.random(-2, 2),
  });
}

function toys(passage: HTMLElement) {
  const word = passage.querySelector<HTMLElement>("[data-toy]");
  if (!word) return [];

  const chars = Text.create(word, { type: "chars", aria: "auto" }).chars;
  settle(chars);
  return chars;
}

function drop(line: gsap.core.Timeline, chars: Element[]) {
  return line.from(
    chars,
    {
      y: () => gsap.utils.random(-45, -15),
      rotation: () => gsap.utils.random(-40, 40),
      opacity: 0,
      ease: "back.out(2.5)",
      stagger: { amount: 0.5, from: "random" },
    },
    0.15,
  );
}

function tumble(stage: HTMLElement, chars: Element[]) {
  Trigger.getById("toys")?.kill();

  const line = gsap.timeline({
    defaults: { ease: "none", duration: 0.5 },
    scrollTrigger: fall(stage),
  });

  return drop(line, chars);
}

function sequence(parts: Parts, words: Element[]) {
  gsap
    .timeline({
      defaults: { ease: "none", duration: 0.5 },
      scrollTrigger: drive(parts.stage),
    })
    .from(words, { yPercent: 100, stagger: { amount: 1 } });

  return tumble(parts.stage, toys(parts.passage));
}

export function refutatio(root: HTMLElement) {
  const parts = collect(root);
  if (!parts) return;

  Text.create(parts.passage, {
    type: "words",
    mask: "words",
    aria: "auto",
    autoSplit: true,
    ignore: "[data-toy]",
    onSplit: (self) => sequence(parts, self.words),
  });
}
