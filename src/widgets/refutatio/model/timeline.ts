import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";
import { grow } from "@/shared/components/grow/model/timeline";
import { knockout } from "@/shared/components/knockout/model/timeline";
import { player } from "@/shared/components/player/model/timeline";

gsap.registerPlugin(Trigger);

const ledge = "top top";
const reach = "+=200%";

interface Parts {
  stage: HTMLElement;
  grower: HTMLElement;
  mask: HTMLElement;
}

function collect(root: HTMLElement): Parts | undefined {
  const stage = root.querySelector<HTMLElement>("[data-pin]");
  const grower = root.querySelector<HTMLElement>("[data-grow]");
  const mask = root.querySelector<HTMLElement>("[data-knockout]");

  if (!stage || !grower || !mask) return undefined;
  return { stage, grower, mask };
}

function sequence({ stage, grower, mask }: Parts) {
  return gsap
    .timeline({
      scrollTrigger: { trigger: stage, start: ledge, end: reach, scrub: 1 },
    })
    .add(grow(grower), 0)
    .add(knockout(mask), 125);
}

function film(root: HTMLElement, stage: HTMLElement) {
  const element = root.querySelector<HTMLElement>("[data-player]");
  if (!element) return;

  player(element, { trigger: stage, start: "top bottom", end: "+=400%" });
}

export function refutatio(root: HTMLElement) {
  const parts = collect(root);
  if (!parts) return;

  Trigger.create({
    trigger: parts.stage,
    start: ledge,
    end: reach,
    pin: true,
  });

  sequence(parts);
  film(root, parts.stage);
}
