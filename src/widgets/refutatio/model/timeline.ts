import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";
import { drain } from "@/shared/components/drain/model/timeline";
import { grow } from "@/shared/components/grow/model/timeline";
import { knockout } from "@/shared/components/knockout/model/timeline";
import { fade, player } from "@/shared/components/player/model/timeline";

gsap.registerPlugin(Trigger);

interface Parts {
  grower: HTMLElement;
  question: HTMLElement;
  mask: HTMLElement;
}

function collect(root: HTMLElement): Parts | undefined {
  const grower = root.querySelector<HTMLElement>("[data-grow]");
  const question = root.querySelector<HTMLElement>("[data-drain]");
  const mask = root.querySelector<HTMLElement>("[data-knockout]");

  if (!grower || !question || !mask) return undefined;
  return { grower, question, mask };
}

function sequence({ grower, question, mask }: Parts) {
  return gsap
    .timeline({
      scrollTrigger: {
        trigger: grower,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.25,
      },
    })
    .add(grow(grower), 0)
    .add(drain(question), 100)
    .add(knockout(mask), 185);
}

function film(
  root: HTMLElement,
  grower: HTMLElement,
  story: gsap.core.Timeline,
) {
  const element = root.querySelector<HTMLElement>("[data-player]");
  if (!element) return;

  story.add(fade(element), 260);
  player(element, {
    trigger: grower,
    start: "top bottom",
    end: "bottom bottom",
  });
}

export function refutatio(root: HTMLElement) {
  const parts = collect(root);
  if (!parts) return;

  film(root, parts.grower, sequence(parts));
}
