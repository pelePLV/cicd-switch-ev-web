const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:7002';

class ApiRoutes {
  // Login APIs
  static LOGIN = `${BACKEND_URL}/ms-admin/login?lang=en_US`;

  // Battery Transaction APIs
  static BATTERY_TRANSACTION_FLOW = `${BACKEND_URL}/ms-admin/api/v1/batteryTransaction/flow`; // [getBatteryTransactionsApi()]
  static BATTERY_TRANSACTION_LIST = `${BACKEND_URL}/ms-admin/api/v1/batteryTransaction/list`;
  static BATTERY_TRANSACTION_BY_SWITCH = `${BACKEND_URL}/ms-admin/api/v1/batteryTransaction/switch/`; // Add {switchCabId}
  static BATTERY_TRANSACTION_BY_USER = `${BACKEND_URL}/ms-admin/api/v1/batteryTransaction/user/`; // Add {userId}
  static BATTERY_TRANSACTION_EXPORT = `${BACKEND_URL}/ms-admin/api/v1/batteryTransaction/export`;

  // Device APIs
  static DEVICE_BY_ID = `${BACKEND_URL}/ms-admin/api/v1/devices/`; // Add {devId}
  static DEVICE_CMD = `${BACKEND_URL}/ms-admin/api/v1/devices/cmd`;
  static DEVICE_CARS = `${BACKEND_URL}/ms-admin/api/v1/devices/devCars`; // [getVehiclesApi()]
  static VEHICLE_EXPORT = `${BACKEND_URL}/ms-admin/api/v1/devices/devCars/export`;
  static SWITCH_CABINETS = `${BACKEND_URL}/ms-admin/api/v1/devices/switchCabs`; // [getSwitchsApi()]
  static SWITCH_EXPORT = `${BACKEND_URL}/ms-admin/api/v1/devices/switchCabs/export`;
  static SWITCH_CABINET_BY_ID = `${BACKEND_URL}/ms-admin/api/v1/devices/switchCabs/`; // Add {devId}

  // Tracking APIs
  static TRACKING_CAR_LOG = `${BACKEND_URL}/ms-admin/api/v1/tracking/carLog`;
  static TRACKING_CAR_TRACK = `${BACKEND_URL}/ms-admin/api/v1/tracking/carTrack`; // Add {devId} [getVehicleTrackingByVehicleIdApi()]
  static TRACKING_CAR_TRACK_EXPORT = `${BACKEND_URL}/ms-admin/api/v1/tracking/carTrack/export`; // Add {devId} [getVehicleTrackingByVehicleIdApi()]
  static TRACKING_SWITCH = `${BACKEND_URL}/ms-admin/api/v1/tracking/switch`;

  // User APIs
  static USERS = `${BACKEND_URL}/ms-admin/api/v1/users`;
  static USERS_EXPORT = `${BACKEND_URL}/ms-admin/api/v1/users/export`;
  static USER_BY_ID = `${BACKEND_URL}/ms-admin/api/v1/users/`; // Add {userId}
  static SWAP_COST = `${BACKEND_URL}/ms-admin/api/v1/users/swapCost`;
  static TOTAL_RIDDEN = `${BACKEND_URL}/ms-admin/api/v1/users/totalRidden/`;
  static OVERVIEW = `${BACKEND_URL}/ms-admin/api/v1/users/overview`;
}

export default ApiRoutes;
