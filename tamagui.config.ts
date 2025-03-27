import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

export const tamaguiConfig = createTamagui({
  ...defaultConfig,

  // Thêm custom tokens
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      primary: "#2575FC", // Màu xanh dương chủ đạo
      secondary: "#6A11CB", // Màu phụ (tím)
    },
  },

  // Tùy chỉnh themes (nếu cần)
  themes: {
    ...defaultConfig.themes,
    light: {
      ...defaultConfig.themes.light,
      primary: "#2575FC", // Ghi đè màu chủ đạo trong theme sáng
      primaryText: "#FFFFFF",
    },
    dark: {
      ...defaultConfig.themes.dark,
      primary: "#2575FC", // Ghi đè màu chủ đạo trong theme tối
      primaryText: "#FFFFFF",
    },
  },

  // Định nghĩa breakpoints
  media: {
    xs: { maxWidth: 640 }, // Điện thoại nhỏ
    sm: { maxWidth: 768 }, // Điện thoại lớn / Tablet nhỏ
    md: { maxWidth: 1024 }, // Tablet / Laptop nhỏ
    lg: { maxWidth: 1280 }, // Laptop lớn
    xl: { maxWidth: 1536 }, // Máy tính bàn lớn
    xxl: { minWidth: 1537 }, // TV hoặc màn hình lớn
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

// declare module "tamagui" {
//   interface TamaguiCustomConfig extends Conf {}
// }
