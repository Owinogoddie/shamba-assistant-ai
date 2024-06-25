import Image from 'next/image'
import React from 'react'

export const Empty = () => {
  return (
    <div className="flex flex-col items-center h-full justify-center space-y-6">
        <div className="w-72 h-72 relative ">
            <Image
            src="/Empty-pana.png"
            fill
            alt='Empty-png'
            priority
            />

        </div>
            <p className="font-semibold">No conversations </p>
    </div>
  )
}
