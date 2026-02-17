import React from 'react'
import { useEffect, useRef } from 'react'; 

export  default function RightAnimationForward({ children }) {
    const ref = useRef(null);
    useEffect(()=>{
      const observer = new IntersectionObserver(([entry])=>{
           if(entry.isIntersecting && ref.current){
                ref.current.classList.add("animate-forwardright")
           }
           else{
            ref.current.classList.remove("animate-forwardright")
           }

      }, {threshold: 0.2})
      if(ref.current)observer.observe(ref.current)
        return ()=>{
          observer.disconnect
        }
    })
  return (
    <div ref={ref}className='opacity-0 -translate-x-4'>{children}</div>
  )
}
