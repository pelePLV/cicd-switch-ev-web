export interface SwitchStation {
  id: string
  departmentName: string
  onlineStation: 'online' | 'offline'
  temperature: string
  batteryCount: number
  availableBatteries: number
  batteryStatuses: ('high' | 'medium' | 'low' | 'empty')[]
  monthlyAmount: string
  totalAmount: string
  lastUpdate: string
}

export interface BatteryStatus {
  level: 'high' | 'medium' | 'low' | 'empty'
  count: number
} 