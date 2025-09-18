'use client'

import { CustomerInformationTable } from '@/components/customer-information/customer-infomation-table'
import React from 'react'

const CustomerInformation = () => {
  return (
    <div className="w-full min-h-screen bg-white p-5">
      <CustomerInformationTable />
    </div>
  )
}

export default CustomerInformation