import { UserReponse } from '@/types/customer-information.types';
import { formatPriceByDeptMark } from '@/lib/helpers/format';

type AuthStatus =
  | 'No Auth'
  | 'Authenticating'
  | 'Verified'
  | 'Auth Failed'
  | 'Unknown';

export interface CustomerInformationDto {
  userId: string;
  phoneNumber: string;
  name: string;
  balanceAccount: string;
  virtualAccount: string;
  authStatus: AuthStatus;
  department: string;
  monthlyAmount: string;
  totalAmount: string;
  lastLogin: string;
  totalKm: string;
}

export function mapToCustomerInformation(
  user: UserReponse
): CustomerInformationDto {
  const mapAuthStatus = (status: string | undefined): AuthStatus => {
    switch (status) {
      case '1':
        return 'No Auth';
      case '2':
        return 'Authenticating';
      case '3':
        return 'Verified';
      case '4':
        return 'Auth Failed';
      default:
        return 'Unknown';
    }
  };
  return {
    userId: user.userId,
    phoneNumber: user.phoneNumber,
    name: user.userName || 'Unknown',
    balanceAccount: `${formatPriceByDeptMark(user.balanceAccount, user.mark)}`,
    virtualAccount: `${formatPriceByDeptMark(user.virtualAccount, user.mark)}`,
    authStatus: mapAuthStatus(user.authStatus),
    department: user.deptName || 'Unknown',
    lastLogin: user.loginDate || '',
    monthlyAmount: `${formatPriceByDeptMark(user.totalCurrentMonthPrice, user.mark)}`,
    totalAmount: `${formatPriceByDeptMark(user.totalPrice, user.mark)}`,
    totalKm: user.totalMile ? `${user.totalMile.toLocaleString()} km` : '-',
  };
}
