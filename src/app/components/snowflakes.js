'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const SnowAnimation = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.offsetWidth
    const height = container.offsetHeight

    // Create snowflakes
    const snowflakes = Array.from({ length: 50 }, (_, i) => {
      const snowflake = document.createElement('div')
      snowflake.className = 'snowflake'
      snowflake.style.left = `${Math.random() * width}px`
      snowflake.style.top = `${Math.random() * height}px`
      snowflake.style.opacity = `${Math.random()}`
      snowflake.style.width = `${Math.random() * 20 + 2}px`
      snowflake.style.height = snowflake.style.width
      container.appendChild(snowflake)
      return snowflake
    })

    // Animate snowflakes
    snowflakes.forEach((snowflake) => {
      gsap.to(snowflake, {
        y: height,
        x: `+=${Math.random() * 100 - 50}`,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 5,
      })
    })

    // Clean up
    return () => {
      snowflakes.forEach((snowflake) => snowflake.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
    />
  )
}

export default SnowAnimation

