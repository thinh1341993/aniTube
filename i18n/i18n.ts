import { I18n } from "i18n-js";
import * as Localization from "expo-localization";
import { en } from "./translations/en";
import { vi } from "./translations/vi";

// Định nghĩa các bản dịch
const translations = {
  en,
  vi,
};

// Khởi tạo i18n
const i18n = new I18n(translations);
i18n.defaultLocale = "en";
i18n.locale = Localization.getLocales()[0].languageCode || "en"; // Lấy ngôn ngữ từ thiết bị
i18n.enableFallback = true; // Fallback nếu không tìm thấy ngôn ngữ

export default i18n;
