import gsap from "gsap";
import { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Trigger);

interface Parts {
  root: HTMLElement;
  video: HTMLVideoElement;
  toggle: HTMLElement;
}

function collect(root: HTMLElement): Parts | undefined {
  const video = root.querySelector<HTMLVideoElement>("[data-video]");
  const toggle = root.querySelector<HTMLElement>("[data-toggle]");

  if (!video || !toggle) return undefined;
  return { root, video, toggle };
}

function show({ root, video, toggle }: Parts) {
  root.setAttribute("data-state", video.paused ? "paused" : "playing");
  toggle.setAttribute(
    "aria-label",
    video.paused ? "Play video" : "Pause video",
  );
}

function start(video: HTMLVideoElement) {
  video.play().catch(() => undefined);
}

function mirror(parts: Parts) {
  const sync = () => show(parts);

  parts.video.addEventListener("play", sync);
  parts.video.addEventListener("pause", sync);
}

function control(parts: Parts) {
  const { video, toggle } = parts;
  let held = false;

  toggle.addEventListener("click", () => {
    held = !video.paused;
    if (held) video.pause();
    else start(video);
  });

  return () => held;
}

function watch(parts: Parts, range: ScrollTrigger.Vars, held: () => boolean) {
  const wake = () => {
    if (!held()) start(parts.video);
  };
  const halt = () => parts.video.pause();

  const view = Trigger.create({
    ...range,
    onEnter: wake,
    onEnterBack: wake,
    onLeave: halt,
    onLeaveBack: halt,
  });

  if (view.isActive) wake();
}

export function player(root: HTMLElement, range: ScrollTrigger.Vars) {
  const parts = collect(root);
  if (!parts) return;

  mirror(parts);
  watch(parts, range, control(parts));
}
