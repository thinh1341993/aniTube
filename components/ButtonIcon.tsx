import * as React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { useThemeColor } from "@/hooks/useThemeColor";

interface ButtonIconProps extends React.ComponentProps<typeof MaterialIcons> {
  color?: string;
  onPress?: () => void;
}

export function ButtonIcon(props: ButtonIconProps) {
  const { color, ...res } = props;
  const { themeColors } = useThemeColor();
  const disableButton = React.useRef(false);
  const onToggle = React.useCallback(async () => {
    try {
      if (disableButton.current === false) {
        disableButton.current = true;
        props.onPress && (await props.onPress());
        disableButton.current = false;
      }
    } catch (e) {
      alert(e?.toString());
    }
  }, []);

  return (
    <MaterialIcons
      color={color || themeColors.icon}
      onPress={onToggle}
      {...res}
    />
  );
}
