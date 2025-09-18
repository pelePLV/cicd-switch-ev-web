'use client'

import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface DataTablePaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

/**
 * DataTablePagination Component
 * 
 * Handles pagination controls for DataTable component
 * Shows current page info, total items, and navigation buttons
 */
export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}) => {
  
  // ========== PAGINATION CALCULATIONS ==========
  // Calculate total pages, ensure minimum of 1 page
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  // ========== EVENT HANDLERS ==========
  // Navigate to previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  // Navigate to next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // ========== DISPLAY CALCULATIONS ==========
  // Calculate which items are being displayed (e.g., "1-10 of 50 items")
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const formatItemsRange = () => {
    if (totalItems === 0) return "0 items"
    return `${startItem}-${endItem} of ${totalItems} items`
  }

  // ========== RENDER ==========
  return (
    <div className="flex justify-end items-center py-4 border-t border-gray-200 gap-6">
      {/* Items range display */}
      <span className="text-sm text-gray-700 font-medium">
        {formatItemsRange()}
      </span>
      
      {/* Pagination controls */}
      <div className="flex items-center gap-3">
        {/* Previous page button */}
        <button 
          className="bg-white border border-gray-300 rounded-md p-1.5 cursor-pointer transition-all text-gray-800 min-w-[32px] h-[32px] flex items-center justify-center disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed" 
          disabled={currentPage <= 1}
          onClick={handlePrevPage}
        >
          <FaChevronLeft className="text-xs" />
        </button>
        
        {/* Current page indicator */}
        <span className="text-sm font-semibold text-gray-800 min-w-[20px] text-center">
          {currentPage}
        </span>
        <span className="text-sm text-gray-700 font-medium">of</span>
        <span className="text-sm font-semibold text-gray-800 min-w-[20px] text-center">
          {totalPages}
        </span>
        
        {/* Next page button */}
        <button 
          className="bg-white border border-gray-300 rounded-md p-1.5 cursor-pointer transition-all text-gray-800 min-w-[32px] h-[32px] flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
          disabled={currentPage >= totalPages}
          onClick={handleNextPage}
        >
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  )
} 