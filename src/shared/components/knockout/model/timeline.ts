import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Trigger);

interface Parts {
  stage: HTMLElement;
  source: HTMLElement;
  mask: HTMLElement;
}

function collect(root: HTMLElement): Parts | undefined {
  const stage = root.querySelector<HTMLElement>("[data-pin]");
  const source = root.querySelector<HTMLElement>("[data-source]");
  const mask = root.querySelector<HTMLElement>("[data-mask]");

  if (!stage || !source || !mask) return undefined;
  return { stage, source, mask };
}

function sequence(parts: Parts) {
  return gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: parts.stage,
        start: "top top",
        end: "+=250%",
        scrub: 1,
      },
    })
    .to(parts.mask, { scale: 1, duration: 1, ease: "expo.out" }, 1)
    .to(parts.source, { opacity: 0, duration: 0.5 }, 1);
}

export function knockout(root: HTMLElement) {
  const parts = collect(root);
  if (!parts) return;

  Trigger.create({
    trigger: parts.stage,
    start: "top top",
    end: "+=250%",
    pin: true,
  });
  sequence(parts);
}
