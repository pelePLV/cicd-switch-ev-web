// Vehicle Tracking Types based on Spring Boot API response

export interface GpsPoint {
  createTime: string
  shardingKey: number
  logId: string
  devId: string
  locTime: string
  reportType: string
  course: number
  satelliteNum: number
  wgs84Lat: number
  wgs84Lng: number
  gcj02Lat: number
  gcj02Lng: number
  speed: number
}

export interface MapPath {
  path: Array<{
    lng: number
    lat: number
  }>
  endMarker: {
    lng: number
    lat: number
  }
  startMarker: {
    lng: number
    lat: number
  }
}

export interface VehicleTrack {
  createTime: string
  updateTime: string
  trackId: string
  devId: string
  startTime: string
  startWgs84Lat: number
  startWgs84Lng: number
  startGcj02Lat: number
  startGcj02Lng: number
  startTotalMile: number
  startBatterySoc: number
  endTime: string
  endWgs84Lat: number
  endWgs84Lng: number
  endGcj02Lat: number
  endGcj02Lng: number
  endTotalMile: number
  endBatterySoc: number
  maxCarSpeed: number
  avgCarSpeed: number
  gpsPointsList: GpsPoint[]
  mapPath: MapPath
}

export interface DeviceGps {
  createTime: string
  updateTime: string
  devId: string
  locTime: string
  locType: string
  reportType: string
  actualTimeStatus: string
  hdop: number
  course: number
  satelliteNum: number
  wgs84Lat: number
  wgs84Lng: number
  gcj02Lat: number
  gcj02Lng: number
  speed: number
  mark: number
  deptId: number
  deptName: string
}

export interface DeviceCar {
  createTime: string
  updateTime: string
  devId: string
  totalMile: number
  batterySoc: number
  remainMile: number
  accStatus: string
  defendStatus: string
  ecuBatterySoc: number
  ecuGpsStatus: string
  carPartsStatus: string
  carSpeed: number
  prndGearType: string
  dGearType: string
  batteryIds: string
  batterySocs: string
  bmsStatus: string
  meterStatus: string
  ecuStatus: string
  ctrStatus: string
  mark: number
  licensePlate: string
  username: string
  phoneNumber: string
}

export interface TrackingDevice {
  createBy: string
  createTime: string
  updateBy: string
  updateTime: string
  devId: string
  devType: string
  serverIp: string
  httpPort: string
  tcpPort: string
  imsi: string
  imei: string
  iccid: string
  lteSq: number
  onlineStatus: string
  loginTime: string
  onlineTime: string
  offlineTime: string
  hardVer: string
  softVer: string
  otaVer: string
  protocolType: string
  protocolVer: string
  voltage: number
  current: number
  status: string
  gps: DeviceGps
  car: DeviceCar
  mark: number
  deptId: number
  deptName: string
}

export interface PageInfo {
  total: number
  list: VehicleTrack[]
  pageNum: number
  pageSize: number
  size: number
  startRow: number
  endRow: number
  pages: number
  prePage: number
  nextPage: number
  isFirstPage: boolean
  isLastPage: boolean
  hasPreviousPage: boolean
  hasNextPage: boolean
  navigatePages: number
  navigatepageNums: number[]
  navigateFirstPage: number
  navigateLastPage: number
}

export interface VehicleTrackingData {
  pageInfo: PageInfo
  devId: string
  device: TrackingDevice
}

export interface VehicleTrackingResponse {
  msg: string
  code: number
  data: VehicleTrackingData
}

export interface VehicleTrackingListResponse {
  tracks: VehicleTrack[]
  count: number
  deviceInfo?: TrackingDevice
}
