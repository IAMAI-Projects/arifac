
'use client'

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Page } from '@/payload-types'

type HeroBlockData = Extract<NonNullable<Page['layout']>[number], { blockType: 'hero' }>

interface HeroProps {
  data: HeroBlockData
}

export default function Hero({ data }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = 0
    let height = 0

    const nodes: { x: number; y: number; vx: number; vy: number }[] = []
    let nodeCount = 80
    let connectionDistance = 200

    function resize() {
      width = canvas!.offsetWidth
      height = canvas!.offsetHeight
      canvas!.width = width * window.devicePixelRatio
      canvas!.height = height * window.devicePixelRatio
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)

      // Scale density with screen area so desktop isn't sparse
      const area = width * height
      nodeCount = Math.round(area / 8000)
      nodeCount = Math.max(30, Math.min(nodeCount, 100))
      connectionDistance = Math.min(260, 140 + width * 0.06)
    }

    function initNodes() {
      nodes.length = 0
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        })
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      // Update positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.25
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.strokeStyle = `rgba(218, 33, 40, ${opacity})`
            ctx!.lineWidth = 1
            ctx!.stroke()
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx!.beginPath()
        ctx!.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.15)'
        ctx!.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    initNodes()
    draw()

    window.addEventListener('resize', () => { resize(); initNodes() })
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', () => { resize(); initNodes() })
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#0f172a] flex items-end">
      {/* Layered atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#131d33] to-[#0c1322]" />
        <div className="absolute inset-0 bg-grid-subtle opacity-[0.04]" />
        <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      </div>

      {/* Network node animation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />

      {/* Geometric accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-bl from-brand/[0.07] to-transparent" />
        <div className="absolute top-0 right-0 w-full h-full border-l border-b border-white/[0.03] origin-top-right -skew-x-12" />
      </div>

      {/* Accent glows */}
      <div className="absolute -right-32 top-1/3 w-[400px] h-[400px] bg-brand/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute -left-20 bottom-0 w-[300px] h-[300px] bg-brand/[0.03] blur-[80px] pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

      <div className="max-w-[1240px] mx-auto px-6 relative z-10 w-full pt-20 pb-16 lg:pt-28 lg:pb-20">

        {/* Tagline — full width */}
        <div className="flex items-center gap-3 mb-8 lg:mb-10 animate-in">
          <span className="w-10 h-[2px] bg-brand flex-shrink-0" />
          <span className="text-[11px] lg:text-[12px] font-bold text-brand uppercase tracking-[0.3em]">
            {data.tagline}
          </span>
        </div>

        {/* Heading — spans full width, editorial scale */}
        <h1 className="text-[34px] md:text-[48px] lg:text-[58px] xl:text-[64px] font-extrabold text-white leading-[1.06] tracking-tight mb-10 lg:mb-14 animate-in delay-100">
          {data.heading}{' '}
          {data.headingHighlight && (
            <span className="text-brand">
              {data.headingHighlight}
            </span>
          )}
          {data.headingTrail && (
            <span className="text-slate-300"> {data.headingTrail}</span>
          )}
        </h1>

        {/* Bottom row: description left, CTAs right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16 animate-in delay-200">

          {/* Description */}
          <p className="text-slate-400 text-[15px] lg:text-[16px] leading-[1.8] max-w-[520px] lg:mb-0">
            {data.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center flex-shrink-0">
            {data.primaryButton && (
              <Link
                href={data.primaryButton.link}
                className="bg-brand text-white px-7 py-3.5 lg:px-9 lg:py-4 text-[13px] font-bold hover:bg-[#b91c22] transition-all flex items-center gap-3 group"
              >
                {data.primaryButton.label}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}
            {data.secondaryButton && (
              <Link
                href={data.secondaryButton.link}
                className="text-slate-300 font-bold text-[13px] px-7 py-3.5 lg:px-9 lg:py-4 border border-slate-600 hover:border-slate-400 hover:text-white transition-all flex items-center gap-2"
              >
                {data.secondaryButton.label}
              </Link>
            )}
          </div>
        </div>

        {/* Divider line at bottom */}
        <div className="mt-14 lg:mt-18 h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
      </div>
    </section>
  );
}
