'use client';

import { useState as State, useRef as Ref, useEffect as Effect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Book, Briefcase, Burger, Chat, Document, Music, Search, Users } from '@/components/icons';
import { Command, Input } from '@/components/ui/command';
import { Collapsible, Content } from './ui/collapsible';

export default function Header({ className }: { className?: string }) {
  const [burger, $burger] = State(false);
  const [search, $search] = State(false);
  const [dropdown, $dropdown] = State(false);
  
  Effect(() => {
    if (burger || search) {
      $dropdown(true);
    }
  }, [burger, search]);

  return (
    <header className={cn("w-full", className)}>
        <div className="mx-auto max-w-7xl p-5">
          <Collapsible open={burger || search}>
            <div className="grid grid-cols-[auto_1fr_auto]">
              <div className={cn(
                  "col-span-3 grid grid-cols-subgrid",
                  "gap-4",
                  "p-5",
                  "transition-colors duration-300",
                  "bg-transparent hover:bg-gray",
                  dropdown ? "bg-gray rounded-t-lg" : "rounded-lg",
                )}>
                <div className="flex flex-shrink-0 items-center gap-4">
                  <div className="flex-shrink-0">
                    <Button
                      variant="burger"
                      size="burger"
                      onFocus={() => $burger(true)}
                      onClick={() => $burger(true)}
                      onBlur={() => $burger(false)}
                    >
                      <Burger />
                    </Button>
                  </div>

                  <div className="flex-shrink-0">
                    <Button
                      variant="logo"
                      size="logo"
                      asChild
                    >
                      <a href="/">Kingdom&apos;s Kids</a>
                    </Button>
                  </div>
                </div>

                <div className={cn(
                  "flex flex-1 items-center",
                  (search) ? "gap-0" : "gap-4"
                )}>
                  <motion.nav
                    className="flex items-center gap-4 overflow-hidden"
                    animate={{
                      width: (search) ? 0 : 'auto',
                      opacity: (search) ? 0 : 1
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Button
                      variant="tertiary"
                      size="tertiary"
                      asChild
                    >
                      <a href="/testimonies">Testimonies</a>
                    </Button>
                    <Button
                      variant="tertiary"
                      size="tertiary"
                      asChild
                    >
                      <a href="/gallery">Gallery</a>
                    </Button>
                  </motion.nav>

                  <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2
                                      w-5 h-5
                                      text-black group-hover:text-orange
                                      transition-colors duration-300
                                      pointer-events-none z-10" />
                    <Command className="border-0 shadow-none">
                      <Input
                        placeholder="Search"
                        variant="primary"
                        className="pl-10"
                        onFocus={() => $search(true)}
                        onClick={() => $search(true)}
                        onBlur={() => $search(false)}
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
                    <a href="/volunteer">Volunteer</a>
                  </Button>
                </div>

              </div>

              <Content forceMount asChild>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ 
                    height: (burger || search) ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onAnimationComplete={() => {
                    if (!burger && !search) {
                      $dropdown(false);
                    }
                  }}
                  className="col-span-3 grid grid-cols-subgrid gap-4 overflow-hidden bg-gray rounded-b-lg"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <nav className="col-start-2 grid grid-cols-2 grid-flow-col grid-rows-3 gap-4 pb-4">
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/Lessons" className='group'>
                        <Book className="w-5 h-5 text-black group-hover:text-orange transition-colors duration-300" />
                        Lessons
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/verses" className='group'>
                        <Chat className="w-5 h-5 text-black group-hover:text-orange transition-colors duration-300" />
                        Verses
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/songs" className='group'>
                        <Music className="w-5 h-5 text-black group-hover:text-orange transition-colors duration-300" />
                        Music
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/games" className="group">
                        <Users className="w-5 h-5 text-black group-hover:text-orange transition-colors duration-300" />
                        Games
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/resources" className='group'>
                        <Document className="w-5 h-5 text-black group-hover:text-orange transition-colors duration-300" />
                        Resources
                      </a>
                    </Button>
                    <Button variant="quaternary" size="quaternary" asChild>
                      <a href="/baggage" className='group'>
                        <Briefcase className="w-5 h-5 text-black group-hover:text-orange transition-colors duration-300" />
                        Baggage
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