'use client'

import { useEffect as effect} from 'react'
import Lenis from 'lenis'
import { cn } from '@/lib/utils'

export default function Scroll({ 
  children,
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={cn(className)}>{children}</main>
}