'use client';

import { useState as State, useRef as Ref, useEffect as Effect } from 'react';
import { Popover, PopoverTrigger as Trigger, PopoverContent as Content } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Globe } from '@/components/icons/globe';
import { Money } from '@/components/icons/money';
import { Photo } from '@/components/icons/photo';

const search = {
    selected: 'selected',
    unselected: 'unselected',
} as const;

type Search = typeof search[keyof typeof search];

const burger = {
    selected: 'selected',
    unselected: 'unselected',
} as const;

type Burger = typeof burger[keyof typeof burger];

const dropdown = {
    collapsed: 'collapsed',
    collapsing: 'collapsing',
    expanded: 'expanded',
    expanding: 'expanding',
} as const;

type Dropdown = typeof dropdown[keyof typeof dropdown];

export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn("w-full", className)}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between gap-6 py-5">
          
          {/* Left Section: Logo + Burger */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Burger button */}
            <div className="flex-shrink-0">
            </div>
            
            {/* Logo */}
            <div className="flex-shrink-0">
            </div>
          </div>
          
          {/* Center Section: Navigation + Search */}
          <div className="flex items-center justify-end gap-4 flex-1 min-w-0">
            {/* Navigation links */}
            <nav className="flex items-center gap-2.5 flex-shrink-0">
              <Button variant="tertiary" size="tertiary" asChild>
                <a href="/testimonies">
                  Testimonies</a>
              </Button>
              <Button variant="tertiary" size="tertiary" asChild>
                <a href="/gallery">
                  <Photo />
                  Gallery</a>
              </Button>
            </nav>
            
            {/* Search with Popover trigger */}
            <Popover>
              <Trigger asChild>
                <div className="relative w-full max-w-[375px] flex-shrink min-w-0">
                </div>
              </Trigger>
              
              {/* Dropdown Content (Portal) */}
              <Content 
                align="start"
                sideOffset={8}
                className="w-[300px] p-2.5 bg-off-white border-none rounded-lg shadow-lg"
              >
                {/* Category items - Flexbox aligned, no grid needed */}
                <div className="flex flex-col items-start gap-2.5">
                </div>
              </Content>
            </Popover>
          </div>
          
          {/* Right Section: CTAs */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <Button
              variant="primary"
              size="primary"
              asChild
            >
              <a
                href="https://www.paypal.com/donate?token=LGQXzy0rkm5Lv11xVwj8b71nxnbIZg5UgIo15muoPzl-fXQe-BBOgLUOy7a7QPCIAKNKNNx6-3mmp9do"
                target="_blank"
                rel="noopener noreferrer">
                <Money />
                Donate
              </a>
            </Button>
            <Button
              variant="secondary"
              size="secondary"
              asChild
            >
              <a href="/volunteer">
                <Globe />
                Volunteer
              </a>
            </Button>
          </div>
          
        </div>
      </div>
    </header>
  );
}