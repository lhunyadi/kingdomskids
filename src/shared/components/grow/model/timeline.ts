import gsap from "gsap";

export function grow(root: HTMLElement) {
  return gsap.to(root, {
    "--grow": 0,
    duration: 100,
    ease: "power1.inOut",
  });
}
