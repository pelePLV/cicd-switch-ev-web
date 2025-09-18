import { formatPriceByDeptMark } from '@/lib/helpers/format';
import { BatteryTransactionLog } from '@/types/battery-transaction.types';

export interface BatteryTransactionDto {
  logId: string;
  orderId: string;
  userId: number;
  userName: string;
  phoneNumber: string;
  department: string;
  switchCabId: string;
  price: string;
  getBatteryId: string;
  putBatteryId: string;
  successTime?: string;
}

export function mapToBatteryTransactionDto(
  log: BatteryTransactionLog
): BatteryTransactionDto {
  return {
    logId: log.logId,
    orderId: log.orderId,
    userId: log.userId,
    getBatteryId: log.getBatteryId,
    switchCabId: log.switchCabId,
    putBatteryId: log.putBatteryId,
    department: log.deptName,
    phoneNumber: log.phoneNumber,
    price: formatPriceByDeptMark(log.virtualAccount, log.mark),
    successTime: log.successTime,
    userName: log.userName,
  };
}
