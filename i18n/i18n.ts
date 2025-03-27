import { I18n, TranslateOptions } from "i18n-js";
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
i18n.locale = Localization.getLocales()[0]?.languageCode || "en"; // Lấy ngôn ngữ từ thiết bị
i18n.enableFallback = true; // Fallback nếu không tìm thấy ngôn ngữ

// Tạo kiểu dữ liệu đệ quy
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: TObj[TKey] extends object
    ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
    : `${TKey}`;
}[keyof TObj & (string | number)];

// Ánh xạ tất cả các keys từ file bản dịch
type TranslationKeys = RecursiveKeyOf<typeof en>;

export const tx = (key: TranslationKeys, options?: TranslateOptions) => {
  return i18n.translate(key, options);
};

export default i18n;
