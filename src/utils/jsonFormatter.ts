export const formatJson = (jsonString: string, isExpanded = false): string => {
  try {
    // Kiểm tra xem chuỗi có phải là JSON hợp lệ không
    const jsonObj = JSON.parse(jsonString);
    
    // Nếu là object trống {} thì trả về ngay
    if (Object.keys(jsonObj).length === 0) {
      return "{}";
    }
    
    // Nếu không mở rộng, hiển thị phiên bản rút gọn
    if (!isExpanded) {
      // Lấy ra các key cấp cao nhất
      const keys = Object.keys(jsonObj);
      
      if (keys.length === 0) return "{}";
      
      // Nếu có ít hơn 3 key, hiển thị tất cả
      if (keys.length <= 3) {
        return JSON.stringify(jsonObj, null, 2);
      }
      
      // Nếu có nhiều hơn 3 key, chỉ hiển thị 2 key đầu tiên
      const abbreviated: Record<string, any> = {};
        keys.slice(0, 2).forEach(key => {
        abbreviated[key] = jsonObj[key];
        });
      return JSON.stringify(abbreviated, null, 2) + "\n..."; 
    }
    
    // Định dạng đẹp với 2 space indentation
    return JSON.stringify(jsonObj, null, 2);
  } catch (e) {
    // Nếu không phải JSON hợp lệ, trả về chuỗi gốc
    return jsonString;
  }
};

/**
 * Hàm isValidJson kiểm tra chuỗi có phải là JSON hợp lệ
 * @param str Chuỗi cần kiểm tra
 * @returns boolean
 */
export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Hàm truncateJson tạo bản tóm tắt ngắn của JSON
 * @param jsonString Chuỗi JSON
 * @param maxLength Chiều dài tối đa
 * @returns Chuỗi đã rút gọn
 */
export const truncateJson = (jsonString: string, maxLength: number = 50): string => {
  try {
    const jsonObj = JSON.parse(jsonString);
    
    // Nếu là object rỗng
    if (Object.keys(jsonObj).length === 0) {
      return "{}";
    }
    
    // Lấy key đầu tiên để hiển thị
    const firstKey = Object.keys(jsonObj)[0];
    const firstValue = 
      typeof jsonObj[firstKey] === 'object' 
        ? '{...}' 
        : String(jsonObj[firstKey]).substring(0, 20);
    
    const preview = `{ "${firstKey}": ${firstValue}${Object.keys(jsonObj).length > 1 ? ", ..." : ""} }`;
    
    return preview.length > maxLength 
      ? preview.substring(0, maxLength - 3) + "..." 
      : preview;
  } catch (e) {
    // Nếu không phải JSON hợp lệ, rút gọn text thông thường
    return jsonString.length > maxLength 
      ? jsonString.substring(0, maxLength - 3) + "..." 
      : jsonString;
  }
};