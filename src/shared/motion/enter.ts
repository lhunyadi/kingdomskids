import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Trigger);

function gather(parts: HTMLElement[]) {
  const families = new Map<Element, HTMLElement[]>();

  parts.forEach((part) => {
    const kin = part.parentElement;
    if (!kin) return;

    const family = families.get(kin);
    if (family) family.push(part);
    else families.set(kin, [part]);
  });

  return families;
}

function group(parts: HTMLElement[]) {
  const [first] = parts;
  if (!first) return;

  gsap
    .timeline({
      defaults: { ease: "power1.inOut", stagger: 0.15 },
      scrollTrigger: { trigger: first, start: "top 75%", once: true },
    })
    .from(parts, { y: 25, duration: 0.75 }, 0)
    .from(parts, { opacity: 0, duration: 1 }, 0);
}

export function enter() {
  const parts = [...document.querySelectorAll<HTMLElement>("[data-enter]")];
  gather(parts).forEach(group);
}
