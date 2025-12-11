"use client";

import { useCallback as Callback, useEffect as Effect, useRef as Ref, useState as State } from "react";
import { flushSync as Sync } from 'react-dom';
import { useTheme as Themes } from "next-themes";
import * as Primitive from "@radix-ui/react-switch";
import { Moon, Sun } from "@/components/icons";
import { cn } from "@/lib/utils"


export function Theme({ className, ...props }: React.ComponentProps<typeof Primitive.Root>) {

  type Theme = 'light' | 'dark' | 'system';
  function system(): Resolved {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  type Resolved = 'light' | 'dark';
  const { theme: theme, setTheme: $theme, resolvedTheme: resolved } = Themes();
  const [dark, $dark] = State(theme === 'dark')

  type Phase = 'unactive' | 'active' | 'engaged' | 'disengaged'
  const [phase, $phase] = State<Phase>('unactive')

  type Direction = 'up' | 'down' | 'right' | 'left';
  const Keyframes: Record<Direction, [string, string]> = {
    left: ['inset(0 100% 0 0)', 'inset(0 0 0 0)'],
    right: ['inset(0 0 0 100%)', 'inset(0 0 0 0)'],
    up: ['inset(100% 0 0 0)', 'inset(0 0 0 0)'],
    down: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'],
  } as const;

  function keyframes(direction: Direction): [string, string] {
    return Keyframes[direction];
  }


  const toggle = Callback(async (theme: Theme, direction?: Direction) => {
    const dir = direction ?? 'right';
    const [initial, final] = keyframes(dir);
    const applied = theme === 'system' ? system() : theme;

    if (theme === 'system' && applied === resolved) {
      $theme(theme);
      return;
    }

    if (!document.startViewTransition) {
      $theme(theme);
      return;
    }

    await document.startViewTransition(() => {
      Sync(() => {
        $theme(theme);
      });
    }).ready;

    document.documentElement.animate(
      {clipPath: [initial, final]},
      {duration: 1000, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)'}
    ).finished.finally(() => $theme(theme));
  }, [resolved, $theme])

  const change = Callback((dark: boolean) => {
    if (phase !== 'active') return;

    $phase('disengaged');
    $dark(dark);
    const target: Theme = dark ? 'dark' : 'light';
    const next: Resolved = target as Resolved;
    const direction = (resolved === 'light' && next === 'dark') ? 'right' : (resolved === 'dark' && next === 'light') ? 'left' : 'right';
    toggle(target, direction);
  }, [phase, resolved]);

  const timeout = Ref<NodeJS.Timeout | null>(null);

  return (
    <Primitive.Root
      checked={dark}
      onCheckedChange={(dark) => change(dark)}
      onMouseEnter={() => {
        if (phase === 'unactive') {
          $phase('engaged')
          timeout.current = setTimeout(() => $phase('active'), 300)
        }
      }}
      onMouseLeave={() => {
        if (timeout.current) {
          clearTimeout(timeout.current)
          timeout.current = null
        }
        $phase('unactive')
      }}
      className={cn(className)}
      {...props}
    >
      <div
        className={cn(
          "relative w-5 h-5 transition-transform ease-in-out [transform-style:preserve-3d]",
          (phase === 'engaged' || phase === 'active') ? (dark ? '[transform:rotateY(-180deg)]' : '[transform:rotateY(180deg)]') : '',
          phase === 'disengaged' ? 'duration-0' : 'duration-500'
        )}
        style={{
          backfaceVisibility: 'hidden',
          willChange: 'transform'
        }}
      >
        {!dark ? (
          <>
            <Sun
              variant= "solid"
              className= "absolute inset-0 w-5 h-5 [backface-visibility:hidden]"
            />
            <Moon
              variant= "solid"
              className= "absolute inset-0 w-5 h-5 [backface-visibility:hidden] [transform:rotateY(180deg)]"
            />
          </>
        ) : (
          <>
            <Moon
              variant= "outline"
              className= "absolute inset-0 w-5 h-5 [backface-visibility:hidden]"  
            />
            <Sun
              variant= "outline"
              className= "absolute inset-0 w-5 h-5 [backface-visibility:hidden] [transform:rotateY(-180deg)]"
            />
          </>
        )}
      </div>
      <style>{"::view-transition-old(root), ::view-transition-new(root){animation:none;mix-blend-mode:normal;}"}</style>
    </Primitive.Root>
  )
}