// Switch Cabinet Door Information
export interface IotSwitchCabDoor {
  id: number;
  devId: string;
  doorId: number;
  doorEnableStatus: string;
  doorOpenStatus: string;
  doorBatteryStatus: string;
  batteryId: string;
  batterySoc: number;
  createTime: string;
  updateTime: string;
  mark?: number;
}

// Switch Cabinet Information
export interface SwitchCabinet {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  devId: string;
  devType: string;
  serverIp: string;
  httpPort: string;
  tcpPort: string;
  imsi: string;
  imei: string;
  iccid: string;
  lteSq: number;
  onlineStatus: string;
  loginTime: string;
  onlineTime: string;
  offlineTime: string;
  hardVer: string;
  softVer: string;
  otaVer: string;
  protocolType: string;
  protocolVer: string;
  voltage: number;
  current: number;
  status: string;
  mark: number;
  deptId: number;
  deptName: string;
  switchCabStatus: string;
  temp: number;
  sop: number;
  enableStatus: string;
  batteryNum: number;
  doorNum: number;
  cabCreateTime: string;
  cabUpdateTime: string;
  cabMark: number;
  wgs84Lat: number;
  wgs84Lng: number;
  gcj02Lat: number;
  gcj02Lng: number;
  images?: string;
  address: string;
  openTime: string;
  rentStatus: string;
  rentOnlineStatus: string;
  rentBatteryNum: number;
  rentDoorNum: number;
  rentCreateBy: string;
  rentCreateTime: string;
  rentUpdateBy: string;
  rentUpdateTime: string;
  rentMark: number;
  rentDeptId: number;
  rentDeptName: string;
  totalPrice?: number;
  totalCurrentMonthPrice?: number;
  iotSwitchCabDoor: IotSwitchCabDoor[];
}

// Query Parameters
export interface SwitchCabinetQuery {
  searchText?: string;
  limit?: number;
  pageNumber?: number;
  switchStatus?: string;
  startingDate?: string;
  endDate?: string;
  deptId?: number;
}

// ===== Device Detail Types (Single Device API) =====

// Device Detail Door Information
export interface DeviceDetailDoor {
  createTime: string;
  updateTime: string;
  id: string;
  devId: string;
  doorId: number;
  doorEnableStatus: string;
  doorOpenStatus: string;
  doorBatteryStatus: string;
  batteryId: string;
  batterySoc: number;
}

// Device Detail Switch Cabinet Information
export interface DeviceDetailSwitchCab {
  createTime: string;
  updateTime: string;
  devId: string;
  switchCabStatus: string;
  temp: number;
  sop: number;
  enableStatus: string;
  batteryNum: number;
  doorNum: number;
  doors: DeviceDetailDoor[];
  mark: number;
}

// Switch Cabinet One Response (Single Device)
export interface SwitchCabinetOne {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  devId: string;
  devType: string;
  serverIp: string;
  httpPort: string;
  tcpPort: string;
  imsi: string;
  imei: string;
  iccid: string;
  lteSq: number;
  onlineStatus: string;
  loginTime: string;
  onlineTime: string;
  offlineTime: string;
  hardVer: string;
  softVer: string;
  otaVer: string;
  protocolType: string;
  protocolVer: string;
  voltage: number;
  current: number;
  status: string;
  switchCab: DeviceDetailSwitchCab;
  mark: number;
  deptId: number;
  deptName: string;
}

