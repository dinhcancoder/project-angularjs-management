export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Thêm '0' phía trước nếu tháng < 10
  const day = String(currentDate.getDate()).padStart(2, '0'); // Thêm '0' phía trước nếu ngày < 10
  return `${year}-${month}-${day}`;
};
