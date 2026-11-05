import gsap from "gsap";

export function knockout(root: HTMLElement) {
  const select = gsap.utils.selector(root);

  return gsap
    .timeline()
    .to(
      select("[data-mask]"),
      { scale: 1, duration: 75, ease: "power2.out" },
      0,
    )
    .to(select("[data-floor]"), { opacity: 1, duration: 5, ease: "none" }, 0);
}
