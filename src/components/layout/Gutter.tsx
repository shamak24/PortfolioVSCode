import { useEffect, useState } from 'react'

export function Gutter() {
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    const update = () => {
      const lineHeight = 24
      const total = Math.ceil(document.body.scrollHeight / lineHeight) + 5
      setLineCount(total)
    }

    update()
    window.addEventListener('resize', update)
    const observer = new ResizeObserver(update)
    observer.observe(document.body)

    return () => {
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="app-gutter" aria-hidden="true">
      <div className="app-gutter-inner">
        {Array.from({ length: lineCount }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}
      </div>
    </div>
  )
}
