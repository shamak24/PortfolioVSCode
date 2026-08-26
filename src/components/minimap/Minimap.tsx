import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { portfolio } from '@/data'

const SECTION_ACCENTS: Record<string, string> = {
  home: '--blue',
  about: '--purple',
  skills: '--green',
  projects: '--amber',
  education: '--blue',
  contact: '--purple',
}

export function Minimap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [viewportHeight, setViewportHeight] = useState(18)
  const dragY = useMotionValue(0)

  const getScale = useCallback(() => {
    const el = containerRef.current
    if (!el) return 0
    const docHeight = document.documentElement.scrollHeight
    if (docHeight === 0 || el.clientHeight === 0) return 0
    return el.clientHeight / docHeight
  }, [])

  const drawMinimap = useCallback(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas || container.clientWidth === 0) return

    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, rect.width, rect.height)

    const docHeight = document.documentElement.scrollHeight
    if (docHeight === 0) return
    const s = rect.height / docHeight

    const rootStyles = getComputedStyle(document.documentElement)
    const dimColor = rootStyles.getPropertyValue('--text-dim').trim() || '#6e7681'

    const sectionRanges = portfolio.sections.map((section) => {
      const el = document.getElementById(section.id)
      const varName = SECTION_ACCENTS[section.id] || '--text-dim'
      return {
        top: el?.offsetTop ?? 0,
        bottom: (el?.offsetTop ?? 0) + (el?.offsetHeight ?? 0),
        color: rootStyles.getPropertyValue(varName).trim() || dimColor,
      }
    })

    const colorForY = (y: number) => {
      for (const r of sectionRanges) {
        if (y >= r.top && y < r.bottom) return r.color
      }
      return dimColor
    }

    let seed = 1337
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }

    const step = 8
    ctx.globalAlpha = 0.5
    for (let y = 0; y < docHeight; y += step) {
      const scaledY = y * s
      if (scaledY > rect.height) break
      const lineWidth = 10 + pseudoRandom() * (rect.width - 24)
      const xOffset = 7 + pseudoRandom() * 3
      ctx.fillStyle = colorForY(y)
      ctx.fillRect(xOffset, scaledY, lineWidth, 2)
    }
    ctx.globalAlpha = 1
  }, [])

  const updateViewport = useCallback(() => {
    const s = getScale()
    if (s === 0) return
    const top = window.scrollY * s
    const height = Math.max(window.innerHeight * s, 18)
    setViewportHeight(height)
    dragY.set(top)
  }, [getScale, dragY])

  const scrollToMinimapY = useCallback(
    (clickY: number) => {
      const s = getScale()
      if (s === 0) return
      const targetY = clickY / s - window.innerHeight / 2
      window.scrollTo({ top: Math.max(0, targetY), behavior: 'auto' })
    },
    [getScale],
  )

  useEffect(() => {
    const scheduleRedraw = () => {
      window.setTimeout(drawMinimap, 120)
    }

    updateViewport()
    drawMinimap()

    window.addEventListener('scroll', updateViewport, { passive: true })
    window.addEventListener('resize', scheduleRedraw)
    window.addEventListener('resize', updateViewport)

    const observer = new ResizeObserver(() => {
      scheduleRedraw()
      updateViewport()
    })
    observer.observe(document.body)

    return () => {
      window.removeEventListener('scroll', updateViewport)
      window.removeEventListener('resize', scheduleRedraw)
      window.removeEventListener('resize', updateViewport)
      observer.disconnect()
    }
  }, [drawMinimap, updateViewport])

  const onDrag = (_: unknown, info: { point: { y: number } }) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const y = info.point.y - rect.top
    scrollToMinimapY(y)
  }

  return (
    <div
      ref={containerRef}
      className="app-minimap"
      aria-hidden="true"
      onMouseDown={(e) => {
        if ((e.target as HTMLElement).dataset.viewport) return
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        scrollToMinimapY(e.clientY - rect.top)
        e.preventDefault()
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
      <motion.div
        data-viewport="true"
        drag="y"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={onDrag}
        style={{
          y: dragY,
          height: viewportHeight,
          top: 0,
        }}
        className="absolute left-0 right-0 cursor-grab border-y border-amber bg-[color-mix(in_srgb,var(--amber)_14%,transparent)] hover:bg-[color-mix(in_srgb,var(--amber)_22%,transparent)] active:cursor-grabbing"
      />
    </div>
  )
}
