import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setWidth(pct)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-0.5 transition-[width] duration-100 linear"
      style={{
        width: `${width}%`,
        background: 'linear-gradient(90deg, var(--amber), var(--purple))',
      }}
      aria-hidden="true"
    />
  )
}
