export interface VehicleGps {
  createTime: string;
  updateTime: string;
  devId: string;
  locTime: string;
  locType: string;
  reportType: string;
  actualTimeStatus: string;
  hdop: number;
  course: number;
  satelliteNum: number;
  wgs84Lat: number;
  wgs84Lng: number;
  gcj02Lat: number;
  gcj02Lng: number;
  speed: number;
  mark: number;
  deptId: number;
  deptName: string;
}

export interface VehicleCar {
  createTime: string;
  updateTime: string;
  devId: string;
  totalMile: number;
  batterySoc: number;
  remainMile: number;
  accStatus: string;
  defendStatus: string;
  ecuBatterySoc: number;
  ecuGpsStatus: string;
  carPartsStatus: string;
  carSpeed: number;
  prndGearType: string;
  dGearType: string;
  batteryIds: string;
  batterySocs: string;
  bmsStatus: string;
  meterStatus: string;
  ecuStatus: string;
  ctrStatus: string;
  mark: number;
  licensePlate: string;
  username: string;
  phoneNumber: string;
}

export interface VehicleDetail {
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
  gps: VehicleGps;
  car: VehicleCar;
  mark: number;
  deptId: number;
  deptName: string;
}

// Parsed battery data for easier consumption
export interface VehicleBattery {
  id: string;
  soc: number;
  number: number;
}

// Processed vehicle data with parsed batteries
export interface ProcessedVehicleDetail extends VehicleDetail {
  batteries: VehicleBattery[];
  isOnline: boolean;
}
