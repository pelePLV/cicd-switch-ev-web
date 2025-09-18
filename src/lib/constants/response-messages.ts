// ===================================
// RESPONSE MESSAGES - Consistent API response messages
// ===================================

export const SMessage = {
  login: "Login Success",
  register: "Register Success", 
  insert: "Insert Success",
  update: "Update Success",
  delete: "Delete Success",
  selectOne: "SelectOne Success",
  selectAll: "SelectAll Success",
  retrieve: "Data Retrieved Successfully",
  operation: "Operation Completed Successfully",
};

export const EMessage = {
  // Validation Errors
  validation: "Validation Failed",
  invalidParams: "Invalid Parameters",
  pleaseInput: "Please Input Required Fields",
  
  // Authentication & Authorization Errors  
  unauthorized: "Unauthorized",
  forbidden: "Forbidden", 
  authRequired: "Authentication Required",
  accessDenied: "Access Denied",
  
  // CRUD Operation Errors
  errorInsert: "Error Insert",
  errorUpdate: "Error Update", 
  errorDelete: "Error Delete",
  errorSelect: "Error Select",
  
  // Common HTTP Errors
  notFound: "Not Found",
  badRequest: "Bad Request",
  server: "Server Error Internal",
  apiError: "API Error",
  
  // Generic Errors
  already: "Already Exists",
  errorUpload: "Error Upload File",
};