import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";
import { drain } from "@/shared/components/drain/model/timeline";
import { grow } from "@/shared/components/grow/model/timeline";
import { knockout } from "@/shared/components/knockout/model/timeline";
import { player } from "@/shared/components/player/model/timeline";

gsap.registerPlugin(Trigger);

const ledge = "top top";
const reach = "+=260%";

interface Parts {
  stage: HTMLElement;
  grower: HTMLElement;
  question: HTMLElement;
  mask: HTMLElement;
}

function frame(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>("[data-pin]");
  const grower = root.querySelector<HTMLElement>("[data-grow]");

  if (!stage || !grower) return undefined;
  return { stage, grower };
}

function collect(root: HTMLElement): Parts | undefined {
  const outer = frame(root);
  const question = root.querySelector<HTMLElement>("[data-drain]");
  const mask = root.querySelector<HTMLElement>("[data-knockout]");

  if (!outer || !question || !mask) return undefined;
  return { ...outer, question, mask };
}

function sequence({ stage, grower, question, mask }: Parts) {
  return gsap
    .timeline({
      scrollTrigger: { trigger: stage, start: ledge, end: reach, scrub: 1 },
    })
    .add(grow(grower), 0)
    .add(drain(question), 100)
    .add(knockout(mask), 185);
}

function film(root: HTMLElement, stage: HTMLElement) {
  const element = root.querySelector<HTMLElement>("[data-player]");
  if (!element) return;

  player(element, { trigger: stage, start: "top bottom", end: "+=460%" });
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
