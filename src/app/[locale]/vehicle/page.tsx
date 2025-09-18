'use client'

import { VehicleTable } from '@/components/vehicle/vehicle-table'
import React from 'react'

const Vehicle = () => {
  return (
    <div className="w-full min-h-screen bg-white p-5">
      <VehicleTable />
    </div>
  )
}

export default Vehicle