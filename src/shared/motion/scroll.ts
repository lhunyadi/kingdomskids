import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Trigger);

export function release() {
  document.documentElement.style.removeProperty("overflow");
}

export function scroll() {
  Trigger.clearScrollMemory("manual");
  window.scrollTo(0, 0);

  if (!document.querySelector("[data-lock]")) return;

  document.documentElement.style.setProperty("overflow", "hidden");
  gsap.delayedCall(4, release);
}
