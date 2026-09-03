import gsap from "gsap";

interface Parts {
  veil: HTMLElement;
  links: HTMLElement[];
}

interface Hues {
  backgroundColor: string;
  color: string;
}

interface Rest {
  veil: Hues;
  link: string;
}

function collect(root: HTMLElement): Parts | undefined {
  const veil = root.querySelector<HTMLElement>("[data-veil]");
  const links = [...root.querySelectorAll<HTMLElement>("[data-link]")];

  if (!veil) return undefined;
  return { veil, links };
}

function token(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function resting(parts: Parts): Rest {
  const [link] = parts.links;
  const style = getComputedStyle(parts.veil);

  return {
    veil: { backgroundColor: style.backgroundColor, color: style.color },
    link: link ? getComputedStyle(link).color : "",
  };
}

function opening(): Hues {
  return {
    backgroundColor: token("--color-accent"),
    color: token("--color-background"),
  };
}

function dress(parts: Parts, hues: Hues) {
  gsap.set(parts.veil, { yPercent: -100, ...hues });
  gsap.set(parts.links, { color: hues.color });
}

function entry(parts: Parts, rest: Rest) {
  gsap
    .timeline({ defaults: { ease: "power1.inOut" } })
    .to(parts.veil, { yPercent: 0, duration: 1 }, 0)
    .to(parts.veil, { ...rest.veil, duration: 1 }, 2)
    .to(parts.links, { color: rest.link, duration: 1 }, 2);
}

export function ribbon(root: HTMLElement) {
  const parts = collect(root);
  if (!parts) return;

  const rest = resting(parts);

  dress(parts, opening());
  entry(parts, rest);
}
