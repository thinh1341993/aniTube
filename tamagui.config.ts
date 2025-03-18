// tamagui.config.ts
import { createTamagui } from "tamagui"
import { defaultConfig } from "@tamagui/config/v4" // Cấu hình mặc định của Tamagui

// const tamaguiConfig = createTamagui({
//   ...defaultConfig,
//   themes: {
//     light: {
//       background: "#FFFFFF",
//       color: "#000000",
//     },
//     dark: {
//       background: "#1C1C1E",
//       color: "#FFFFFF",
//     },
//   },
// })

const tamaguiConfig = createTamagui(defaultConfig)

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
