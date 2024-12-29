"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"

export default function DealingAnimation({ onComplete }) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    const cards = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      position: Math.floor(i / 12)
    }))
    
    const cardElements = cards.map(card => {
      const div = document.createElement('div')
      div.className = 'absolute w-14 h-20 bg-white rounded-lg border border-black shadow-md'
      div.innerHTML = '<div class="absolute inset-1 bg-[url(/image/cardBackground.svg)]  bg-no-repeat bg-cover bg-center rounded"></div>'
      div.style.left = '50%'
      div.style.top = '30%'
      div.style.transform = 'translate(-50%, -50%)'
      containerRef.current.appendChild(div)
      return div
    })

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300)
      }
    })

    tl.to(cardElements, {
      duration: 0.5,
      y: (i) => {
        const position = Math.floor(i / 12)
        return position === 1 ? 350 : 80
      },
      x: (i) => {
        const position = Math.floor(i / 12)
        return position === 0 ? -420 : position === 2 ? 420 : 0
      },
      rotation: () => gsap.utils.random(-5, 5),
      ease: "power3.out",
      stagger: {
        each: 0.01,
        from: "center",
      }
    })
    .to(cardElements, {
      duration: 0.3,
      opacity: 0,
      delay: 0.2,
      stagger: 0.01,
    }, "+=0.5")

    return () => {
      tl.kill()
      cardElements.forEach(card => card.remove())
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none" ref={containerRef}>
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 2xl:w-24 h-24 2xl:h-28 bg-[url(/image/cardBackground.svg)]  bg-no-repeat bg-cover bg-center rounded-lg shadow-xl" />
      </div>
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
        <path
          d="M 50% 50% Q 25% 30% 20% 80%"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M 50% 50% Q 50% 30% 50% 80%"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M 50% 50% Q 75% 30% 80% 80%"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  )
}

