// export default i18n
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Welcome Back": "Welcome Back",
      "Please sign in to your account.": "Please sign in to your account.",
      "Sign up as Brand now": "Sign up as Brand now",
      "Sign up as Influencer now": "Sign up as Influencer now",
      "No account": "No account",
      "Compare": "Compare",
      "Campaign": "Campaign",
      "Detail": "Detail",
      "Time": "Time",
      "Status": "Status",
      "Reactions": "Reactions",
      "Comments": "Comments",
      "Shares": "Shares",
      "Reaction": "Reaction",
      "Comment": "Comment",
      "Share": "Share",
      "Description": "Description",
      "Engagement": "Engagement",
      "Photos": "Photos",
      "Videos": "Videos",
      "Engagements": "Engagements",
      "Get Free Access": "Get Free Access",
      "Try this for free": "Try this for free",
      "Beautiful places for you": "Beautiful places for you",
      "Food":"Food",
      "Cosmetics":"Cosmetics",
      "Fashion":"Fashion",
      "Sport":"Sport",
      "Travel":"Travel",
      "Events-Entertaining":"Events-Entertaining",
      "HouseWife":"HouseWife",
      "Technology":"Technology",
      "Appliances":"Appliances",
      "Real Estate":"Real Estate",
      "Furniture":"Furniture",
      "Auto-Games":"Auto-Games",
      "Great! You have chosen":"Great! You have chosen",
      "Please choose an Influencer to create your Campaign":"Please choose an Influencer to create your Campaign",
      "Campaign Name":"Campaign Name",
      "Campaign Name is required":"Campaign Name is required",
      "Campaign Target":"Campaign Target",
      "Campaign Target is required":"Campaign Target is required",
      "Product Info":"Product Info",
      "Product Info is required":"Product Info is required",
      "Date Time":"Date Time",
      "Campaign Date is required":"Campaign Date is required",
      "From Age":"From Age",
      "Age is required":"Age is required",
      "To Age":"To Age",
      "Gender":"Gender",
      "Location":"Location",
      "Interestings":"Interestings",
      "Budget":"Budget",
      "Budget is required":"Budget is required",
      "Job Name":"Job Name",
      "Price":"Price",
      "Name of your job":"Name of your job",      
      "Job Name is required":"Job Name is required",
      "Job Description":"Job Description",
      "Description of your job":"Description of your job",
      "Job Description is required":"Job Description is required",
      "Job":"Job",
      "Job HashTag":"Job HashTag",
      "Job Keyword":"Job Keyword",
      "Job Link":"Job Link",
      "Link of your page":"Link of your page",
      "Submit":"Submit"
    }
  },
  vn: {
    translation: {
      "Welcome Back": "Chào mừng bạn trở lại,",
      "Please sign in to your account.": "Hãy đăng nhập vào tài khoản của bạn.",
      "Sign up as Brand now": "Đăng ký cho thương hiệu",
      "Sign up as Influencer now": "Đăng ký bạn là một Kol",
      "No account": "Bạn chưa có",
      "Compare": "So sánh",
      "Campaign": "Chiến dịch",
      "Detail": "Chi tiết",
      "Time": "Thời Gian",
      "Status": "Dòng trạng thái",
      "Reactions": "Số cảm xúc",
      "Comments": "Số bình luận",
      "Shares": "Số chia sẻ",
      "Reaction": "Cảm xúc",
      "Comment": "Bình luận",
      "Share": "Chia sẻ",
      "Description": "Mô tả",
      "Engagement": "Gắn Kết",
      "Photos": "Hình ảnh",
      "Videos": "Các đoạn phim ngắn",
      "Engagements": "Mức độ gắn kết",
      "Get Free Access": "Vào Miễn Phí",
      "Try this for free": "Vào xài thử miễn phí nào",
      "Beautiful places for you": "Nơi tuyệt vời cho bạn",
      "Food":"Ẩm Thực",
      "Cosmetics":"Mỹ Phẩm",
      "Fashion":"Thời Trang",
      "Sport":"Thể Thao",
      "Travel":"Du Lịch",
      "Events-Entertaining":"Sự Kiện - Giải Trí",
      "HouseWife":"Nội Trợ",
      "Technology":"Công Nghệ",
      "Appliances":"Gia Dụng",
      "Real Estate":"Bất Động Sản",
      "Furniture":"Nội Thất",
      "Auto-Games":"Ôtô - Game",
      "Great! You have chosen":"Tuyệt lắm! Bạn đã chọn",
      "Please choose an Influencer to create your Campaign":"Vui lòng chọn một Influencer để tạo chiến dịch",
      "Campaign Name":"Tên Chiến Dịch",
      "Campaign Name is required":"Phải có tên chiến dịch",
      "Campaign Target":"Mục Tiêu",
      "Campaign Target is required":"Phải có mục tiêu chiến dịch",
      "Product Info":"Thông Tin Sản Phẩm",
      "Product Info is required":"Phải có thông tin",
      "Date Time":"Ngày",
      "Campaign Date is required":"Phải ngày",
      "From Age":"Từ Tuổi",
      "Age is required":"Phải chọn tuổi",
      "To Age":"Đến Tuổi",
      "Gender":"Giới Tính",
      "Location":"Địa Điểm",
      "Interestings":"Quan Tâm Tới",
      "Budget":"Ngân Sách",
      "Budget is required":"Phải có ngân sách",
      "Job Name":"Tên Công Việc",
      "Price":"Giá Cả",
      "Name of your job":"Tên công việc bạn muốn KolViet làm",      
      "Job Name is required":"Phải có tên",
      "Job Description":"Mô Tả Công Việc",
      "Description of your job":"Mô tả chi tiết công việc cần phải làm",
      "Job Description is required":"Phải có mô tả",
      "Job":"Công Việc",
      "Job HashTag":"HashTag",
      "Job Keyword":"Từ khóa cho chiến dịch",
      "Job Link":"Link",
      "Link of your page":"Link của bạn cần chia sẻ",
      "Submit":"Duyệt"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vn",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;