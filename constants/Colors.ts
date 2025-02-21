/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  accentOverlay9: "rgba(255, 69, 0, 0.5)",
};

export const Colors = {
  light: {
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,

    // Background colors
    background: "#1E1E1E", // Slightly lighter dark
    gradientStart: "#333333", // Gradient start color
    gradientEnd: "#000000", // Gradient end color

    // Text colors
    text: "#11181C",
    primaryText: "#FFFFFF", // White text
    secondaryText: "#CCCCCC", // Light gray text
    disabledText: "#666666", // Disabled text

    // Accent colors
    primaryAccent: "#FF4500", // Orange for buttons or highlights
    gradientAccent: "#FF6347", // Màu gradient từ #FF4500 (cam) đến #FF6347 (đỏ cam)
    secondaryAccent: "#00BFFF", // Blue for secondary actions

    // Status colors
    success: "#28A745", // Green for success messages
    error: "#DC3545", // Red for errors
    warning: "#FFC107", // Yellow for warnings
  },
  dark: {
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,

    // Background colors
    background: "#121212", // Dark background
    gradientStart: "#333333", // Gradient start color
    gradientEnd: "#000000", // Gradient end color

    // Text colors
    text: "#ECEDEE",
    primaryText: "#FFFFFF", // White text
    secondaryText: "#CCCCCC", // Light gray text
    disabledText: "#666666", // Disabled text

    // Accent colors
    primaryAccent: "#FF4500", // Orange for buttons or highlights
    gradientAccent: "#FF6347", // Màu gradient từ #FF4500 (cam) đến #FF6347 (đỏ cam)
    secondaryAccent: "#03dac6", // Blue for secondary actions

    // Status colors
    success: "#28A745", // Green for success messages
    error: "#DC3545", // Red for errors
    warning: "#FFC107", // Yellow for warnings
  },
};

/**
 * Chuyển đổi mã HEX sang RGBA.
 * @param {string} hex - Mã màu HEX (ví dụ: "#FF4500" hoặc "#F40").
 * @param {number} alpha - Độ trong suốt (từ 0 đến 1, mặc định là 1).
 * @returns {string} - Chuỗi RGBA (ví dụ: "rgba(255, 69, 0, 1)").
 */
export function hexToRgba(hex: string, alpha = 1) {
  // Loại bỏ dấu '#' nếu có
  hex = hex.replace(/^#/, "");

  // Xử lý mã HEX 3 ký tự thành 6 ký tự
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Chuyển đổi HEX sang RGB
  const r = parseInt(hex.slice(0, 2), 16); // Lấy 2 ký tự đầu (Red)
  const g = parseInt(hex.slice(2, 4), 16); // Lấy 2 ký tự tiếp theo (Green)
  const b = parseInt(hex.slice(4, 6), 16); // Lấy 2 ký tự cuối (Blue)

  // Trả về chuỗi RGBA
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
