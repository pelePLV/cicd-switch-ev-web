// Vehicle/Car Information from DEVICE_CARS API
export interface Vehicle {
  // Device Info
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
  batteryIds: string;
  batterySocs: string;
  bmsStatus: string;
  meterStatus: string;
  ecuStatus: string;
  ctrStatus: string;
  
  // Car Info
  carCreateTime: string;
  carUpdateTime: string;
  carMark: number;
  carId: string;
  userId: number;
  licensePlate: string;
  userBindTime: string;
  ridingMile: number;
  ridingTime: number;
  rentStatus: string;
  rentCreateBy: string;
  rentCreateTime: string;
  rentUpdateBy: string;
  rentUpdateTime: string;
  owner: string;
  rentMark: number;
  rentDeptId: number;
  rentDeptName: string;
  
  // User Info
  phoneNumber: string;
  password: string;
  salt: string;
  authStatus: string;
  balanceAccount: number;
  virtualAccount: number;
  depositAccount: number;
  depositOrderId: number;
  loginIp: string;
  loginDate: string;
  operationType: string;
  batteryOrderId: number;
  batteryLogId: number;
  userStatus: string;
  userCreateBy: string;
  userCreateTime: string;
  userUpdateBy: string;
  userUpdateTime: string;
  dealerId: number;
  userMark: number;
  userDeptId: number;
  userName: string;
  userDeptName: string;
  dgearType: string;
}

// API Response format based on Swagger
export interface VehicleResponse {
  cars: {
    total: number;
    list: Vehicle[];
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
  };
  count: number;
}

// Normalized response for our frontend
export interface VehicleListResponse {
  vehicles: Vehicle[];
  count: number;
}

// Legacy type for backward compatibility (used in current mock data)
export interface VehicleSimple {
  id: string;
  licensePlate: string;
  department: string;
  phoneNumber: string;
  userName: string;
  status: 'online' | 'offline';
  batteryStatus: string;
  onlineTime: string;
  offlineTime: string;
  loginTime: string;
  totalMile: string;
  totalCO2: string;
} 