'use client';

import { useState as state} from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [search, $search] = state('');

  return (
    <>
      <div className={cn(
                      'fixed inset-0 bg-black/50 z-40 transition-opacity duration-500',
                      search ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    )}
           onClick={() => { $search('closing'); setTimeout(() => $search(''), 300); }}></div>

      <header className="w-full 
                         py-5">
        <div className="relative mx-auto w-fit z-50">
          <div className="grid
                          grid-cols-[auto_auto_auto_auto]
                          p-2.5
                          gap-2.5
                          bg-off-white
                          border
                          border-transparent
                          rounded-lg
                          transition-all duration-250">

            <button
              onClick={() => $search('active')}
              className="flex-shrink-0
                         p-2.5
                         text-black hover:text-orange active:text-orange
                         transition-colors duration-250">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <a
              href=""
              className="flex-shrink-0
                         px-5 py-1.5
                         text-xl font-bold text-black hover:text-orange active:text-orange
                         border-y 
                         border-black hover:border-orange active:border-orange
                         transition-colors duration-250">
              Kingdom's Kids
            </a>

            <div className={cn(
                            'flex items-center justify-end w-150 transition-all duration-250',
                            search === 'active' ? 'gap-0' : 'gap-2.5'
                          )}>
              <nav className={cn(
                              'flex items-center gap-2.5 transition-all duration-500',
                              search ? 'w-0 opacity-0' : 'w-auto opacity-100'
                            )}>
                <a
                  href=""
                  className="select-none inline-block whitespace-nowrap
                             px-5 py-2.5
                             font-medium text-black hover:text-orange active:text-orange
                             bg-transparent hover:bg-transparent active:bg-transparent
                             transition-colors duration-250"
                >
                  Testimonies
                </a>
                <a
                  href=""
                  className="select-none inline-block whitespace-nowrap
                             px-5 py-2.5
                             font-medium text-black hover:text-orange active:text-orange
                             bg-transparent hover:bg-transparent active:bg-transparent
                             transition-colors duration-250"
                >
                  Gallery
                </a>
              </nav>

              <div className={cn(
                              'relative transition-all duration-250 group',
                              search === 'active' ? 'w-full' : 'w-[390px]'
                            )}>
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-hover:text-orange transition-colors duration-250 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search"
                  onFocus={() => $search('active')}
                  className="w-full pl-10 pr-5 py-2.5
                             placeholder:text-black
                             caret-orange
                             text-black
                             selection:bg-orange selection:text-white
                             bg-white
                             rounded-lg
                             focus:outline-1 focus:outline-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="https://www.paypal.com/donate?token=LGQXzy0rkm5Lv11xVwj8b71nxnbIZg5UgIo15muoPzl-fXQe-BBOgLUOy7a7QPCIAKNKNNx6-3mmp9do"
                target="_blank"
                rel="noopener noreferrer"
                className="select-none inline-block
                           px-5 py-2.5
                           font-medium text-white hover:text-orange active:text-orange
                           bg-black hover:bg-transparent active:bg-transparent
                           border 
                           border-black hover:border-orange active:border-orange 
                           rounded-lg
                           transition-colors duration-250"
              >
                Donate
              </a>

              <a
                href=""
                className="select-none
                           px-5 py-2.5
                           font-medium text-black hover:text-white active:text-white
                           bg-transparent hover:bg-orange active:bg-orange
                           border 
                           border-black hover:border-transparent active:border-transparent
                           rounded-lg
                           transition-colors duration-250"
              >
                Volunteer
              </a>
            </div>

            <div className="contents">
                <div className={cn(
                                'col-start-3 justify-self-start',
                                search === 'active'
                                  ? 'opacity-100 transition-opacity delay-100 duration-300'
                                  : search === 'closing'
                                  ? 'opacity-0 transition-opacity pointer-events-none duration-300'
                                  : 'opacity-0 transition-none pointer-events-none'
                              )}>
                  <input type="radio" name="dropdown" id="lessons" defaultChecked className="peer/lessons hidden" />
                  <label
                    htmlFor="lessons"
                    className="block
                               relative
                               select-none
                               w-30 pl-10 pr-5 py-2.5
                               font-medium peer-checked/lessons:font-bold text-black
                               bg-transparent peer-checked/lessons:bg-white
                               hover:bg-white
                               transition-colors duration-250
                               rounded-lg
                               cursor-pointer
                               group">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-hover:text-orange transition-colors duration-250 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    Lessons
                  </label>
                </div>

                <div className={cn(
                                'col-start-3 justify-self-start',
                                search === 'active'
                                  ? 'opacity-100 delay-100 duration-300 transition-opacity'
                                  : search === 'closing'
                                  ? 'opacity-0 transition-opacity pointer-events-none duration-300'
                                  : 'opacity-0 pointer-events-none transition-none'
                              )}>
                  <input type="radio" name="dropdown" id="songs" className="peer/songs hidden" />
                  <label
                    htmlFor="songs"
                    className="block
                               relative
                               select-none
                               w-30 pl-10 pr-5 py-2.5
                               font-medium peer-checked/songs:font-bold text-black
                               bg-transparent peer-checked/songs:bg-white
                               hover:bg-white
                               transition-colors duration-250
                               rounded-lg
                               cursor-pointer
                               group">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-hover:text-orange transition-colors duration-250 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                    </svg>
                    Songs
                  </label>
                </div>

                <div className={cn(
                                'col-start-3 justify-self-start',
                                search === 'active'
                                  ? 'opacity-100 delay-100 duration-300 transition-opacity'
                                  : search === 'closing'
                                  ? 'opacity-0 transition-opacity pointer-events-none duration-300'
                                  : 'opacity-0 pointer-events-none transition-none'
                              )}>
                  <input type="radio" name="dropdown" id="games" className="peer/games hidden" />
                  <label
                    htmlFor="games"
                    className="block
                               relative
                               select-none
                               w-30 pl-10 pr-5 py-2.5
                               font-medium peer-checked/games:font-bold text-black
                               bg-transparent peer-checked/games:bg-white
                               hover:bg-white
                               transition-colors duration-250
                               rounded-lg
                               cursor-pointer
                               group">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-hover:text-orange transition-colors duration-250 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/>
                    </svg>

                    Games
                  </label>
                </div>

                <div className={cn(
                                'col-start-3 justify-self-start',
                                search === 'active'
                                  ? 'opacity-100 delay-100 duration-300 transition-opacity'
                                  : search === 'closing'
                                  ? 'opacity-0 transition-opacity pointer-events-none duration-300'
                                  : 'opacity-0 pointer-events-none transition-none'
                              )}>
                  <input type="radio" name="dropdown" id="resources" className="peer/resources hidden" />
                  <label
                    htmlFor="resources"
                    className="block
                               relative
                               select-none
                               w-30 pl-10 pr-5 py-2.5
                               font-medium peer-checked/resources:font-bold text-black
                               bg-transparent peer-checked/resources:bg-white
                               hover:bg-white
                               transition-colors duration-250
                               rounded-lg
                               cursor-pointer
                               group">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black group-hover:text-orange transition-colors duration-250 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/>
                    </svg>
                    Resources
                  </label>
                </div>
              </div>

          </div>

        </div>
      </header>
    </>
  );
}
