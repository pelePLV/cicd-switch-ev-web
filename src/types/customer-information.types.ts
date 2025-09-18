export interface UserReponse {
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;

  userId: string;
  phoneNumber: string;
  password: string;
  salt: string;
  authStatus: string;

  balanceAccount: number;
  virtualAccount: number;
  depositAccount: number;
  depositOrderId: string;

  loginIp: string;
  loginDate: string;

  operationType: string;

  batteryOrderId: string;
  batteryLogId: string;

  status: string;
  dealerId: number;
  mark?: number;
  deptId?: number;
  userName?: string;
  deptName?: string;

  totalPrice?: number;
  totalCurrentMonthPrice?: number;
  totalMile?: number;
}