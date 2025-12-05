'use client';

import { useEffect as Effect, useState as State } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Book, Burger, Chat, Document, Music, Search, User, Users } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Command, Input } from '@/components/ui/command';
import { Collapsible, Content } from './ui/collapsible';

export default function Header({ className }: { className?: string }) {
  const [state, $state] = State({
    burger: false,
    search: false,
    dropdown: false,
  });
  
  Effect(() => {
    const Escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (state.burger || state.search)) {
        $state(prev => ({ ...prev, burger: false, search: false }));
      }
    };
    
    document.addEventListener('keydown', Escape);
    return () => document.removeEventListener('keydown', Escape);
  }, [state.burger, state.search]);

  return (
    <header className={cn("w-full", className)}>
        <div className="mx-auto max-w-7xl p-4">
          <Collapsible open={state.burger || state.search}>
            <div className="grid grid-cols-[auto_1fr_auto]">
              <div className={cn(
                  "col-span-3 grid grid-cols-subgrid",
                  "gap-4",
                  "p-4",
                  "transition-colors duration-300",
                  "bg-transparent hover:bg-primary",
                  state.dropdown ? "bg-primary rounded-t-lg" : "rounded-lg",
                )}>
                <div className="flex flex-shrink-0 items-center gap-4">
                    <Button
                      variant="icon"
                      size="icon"
                      onFocus={() => $state(prev => ({ ...prev, burger: true }))}
                      onClick={() => $state(prev => ({ ...prev, burger: true }))}
                      onBlur={() => $state(prev => ({ ...prev, burger: false }))}
                    >
                      <Burger />
                    </Button>

                    <Button
                      variant="logo"
                      size="logo"
                      asChild
                    >
                      <a href="/">
                        Kingdom&apos;s Kids
                      </a>
                    </Button>
                </div>

                <div className={cn(
                  "flex flex-1 items-center",
                  (state.search || state.burger) ? "gap-0" : "gap-4"
                )}>
                  <motion.nav
                    className="flex items-center gap-4 overflow-hidden"
                    animate={{
                      width: (state.search || state.burger) ? 0 : 'auto',
                      opacity: (state.search || state.burger) ? 0 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Button
                      variant="tertiary"
                      size="tertiary"
                      asChild
                    >
                      <a href="/testimonies">
                        Testimonies
                      </a>
                    </Button>
                    <Button
                      variant="tertiary"
                      size="tertiary"
                      asChild
                    >
                      <a href="/gallery">
                        Gallery
                      </a>
                    </Button>
                  </motion.nav>

                  <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2
                                      w-5 h-5
                                      text-text group-hover:text-accent
                                      transition-colors duration-300
                                      pointer-events-none z-10" />
                    <Command className="border-0 shadow-none">
                      <Input
                        placeholder="Search"
                        variant="primary"
                        className="pl-10"
                        onFocus={() => $state(prev => ({ ...prev, search: true }))}
                        onClick={() => $state(prev => ({ ...prev, search: true }))}
                        onBlur={() => $state(prev => ({ ...prev, search: false }))}
                      />
                    </Command>
                  </div>
                </div>

                <div className="flex flex-shrink-0 items-center gap-4">
                  <Button
                    variant="primary"
                    size="primary"
                    asChild
                  >
                    <a
                      href="https://www.paypal.com/donate?token=LGQXzy0rkm5Lv11xVwj8b71nxnbIZg5UgIo15muoPzl-fXQe-BBOgLUOy7a7QPCIAKNKNNx6-3mmp9do"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Donate
                    </a>
                  </Button>
                  <Button
                    variant="secondary"
                    size="secondary"
                    asChild
                  >
                    <a href="/volunteer">
                      Volunteer
                    </a>
                  </Button>
                </div>

              </div>

              <Content forceMount asChild>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ 
                    height: (state.burger || state.search) ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onAnimationStart={() => {
                    if (state.burger || state.search) {
                      $state(prev => ({ ...prev, dropdown: true }));
                    }
                  }}
                  onAnimationComplete={() => {
                    if (!state.burger && !state.search) {
                      $state(prev => ({ ...prev, dropdown: false }));
                    }
                  }}
                  className="col-span-3 grid grid-cols-subgrid gap-4 overflow-hidden bg-primary rounded-b-lg"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <nav className="col-start-2 grid grid-cols-2 grid-flow-col grid-rows-3 gap-4 pb-4">
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/Lessons" className='group'>
                        <Book className="text-text group-hover:text-accent transition-colors duration-300" />
                        Lessons
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/verses" className='group'>
                        <Chat className="text-text group-hover:text-accent transition-colors duration-300" />
                        Verses
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/songs" className='group'>
                        <Music className="text-text group-hover:text-accent transition-colors duration-300" />
                        Music
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/games" className="group">
                        <Users className="text-text group-hover:text-accent transition-colors duration-300" />
                        Games
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/resources" className='group'>
                        <Document className="text-text group-hover:text-accent transition-colors duration-300" />
                        Resources
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/contact" className='group'>
                        <User className="text-text group-hover:text-accent transition-colors duration-300" />
                        Contact
                      </a>
                    </Button>
                  </nav>
                </motion.div>
              </Content>
            </div>
          </Collapsible>
        </div>
    </header>
  );
}