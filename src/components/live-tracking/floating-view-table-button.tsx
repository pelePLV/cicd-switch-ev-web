'use client'

import React from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface FloatingViewTableButtonProps {
  isFullMap: boolean
  onToggleFullMap: (isFullMap: boolean) => void
  className?: string
}

export const FloatingViewTableButton: React.FC<FloatingViewTableButtonProps> = ({
  isFullMap,
  onToggleFullMap,
  className = ''
}) => {
  const handleViewFullMap = () => {
    onToggleFullMap(true)
  }

  const handleExit = () => {
    onToggleFullMap(false)
  }

  return (
    <div className={`
      absolute top-7 right-10 z-[20] w-fit min-h-[40px] bg-white/70 border border-[#f4f5f5] rounded-full shadow-sm 
      flex items-center transition-all duration-200 hover:bg-white/40
      ${className}
    `}>
      {/* View Full Map Button */}
      {!isFullMap && (
        <button
          onClick={handleViewFullMap}
          className="bg-transparent border-none rounded-full px-4 py-2 cursor-pointer flex items-center gap-2 font-normal"
        >
          <FaEye className="text-sm text-[#4B5563]" />
          <span className="text-xs font-normal text-[#4B5563]">View Full Map</span>
        </button>
      )}

      {/* Exit Button */}
      {isFullMap && (
        <button
          onClick={handleExit}
          className="bg-transparent border-none rounded-full px-4 py-2 cursor-pointer flex items-center gap-2 font-normal"
        >
          <FaEyeSlash className="text-sm text-[#4B5563]" />
          <span className="text-xs font-normal text-[#4B5563]">Exit</span>
        </button>
      )}
    </div>
  )
}