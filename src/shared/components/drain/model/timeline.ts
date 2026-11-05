import gsap from "gsap";
import { CustomEase as Ease } from "gsap/CustomEase";

gsap.registerPlugin(Ease);

const swell = Ease.create("swell", "M0,0 L0.5,1 L0.75,1 L0.95,0 L1,0");

export function drain(root: HTMLElement) {
  const select = gsap.utils.selector(root);

  return gsap.to(select("[data-layer]"), {
    opacity: 1,
    duration: 100,
    ease: swell,
  });
}
