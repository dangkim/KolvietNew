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
      "Engagements": "Engagements"
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
      "Engagements": "Mức độ gắn kết"
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