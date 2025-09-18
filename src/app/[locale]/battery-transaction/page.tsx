'use client'

import { BatteryTransactionTable } from '@/components/battery-transaction/battery-transaction-table'
import React from 'react'

const BatteryTransaction = () => {
  return (
    <div className="w-full min-h-screen bg-white p-5">
      <BatteryTransactionTable />
    </div>
  )
}

export default BatteryTransaction