import React from "react";
import { XStack, Text, Button, Adapt } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons"; // Thư viện icon
import { Popover } from "@tamagui/popover";

// Định nghĩa kiểu dữ liệu cho các tùy chọn
interface Option {
  label: string;
  icon?: string; // Icon name (tùy chọn)
  onPress: () => void; // Hàm xử lý khi tùy chọn được chọn
}

interface DropdownProps {
  triggerLabel?: string; // Label của nút trigger (tùy chọn)
  options: Option[]; // Danh sách các tùy chọn
  icon?: string; // Icon cho nút trigger (tùy chọn)
}

export default function Dropdown({
  triggerLabel,
  options,
  icon,
}: DropdownProps) {
  return (
    <Popover allowFlip stayInFrame offset={4} resize>
      {/* Trigger */}
      <Popover.Trigger asChild>
        <Button
          icon={
            icon ? (
              <Ionicons name={icon as any} size={24} color="$primary" />
            ) : undefined
          }
          backgroundColor="transparent"
        >
          {triggerLabel && <Text>{triggerLabel}</Text>}
        </Button>
      </Popover.Trigger>

      {/* Adapt Content */}
      <Adapt when={"sm" as any} platform="touch">
        <Popover.Sheet
          modal={false}
          snapPoints={[30]}
          animation="medium"
          dismissOnSnapToBottom
        >
          <Popover.Sheet.Frame padding="$4">
            <Popover.ScrollView>
              <Adapt.Contents />
            </Popover.ScrollView>
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>

      {/* Content */}
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        backgroundColor="$background"
        padding="$4"
        gap="$3"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        elevation="$4" // Thêm shadow bằng cách sử dụng elevation
        shadowColor="$shadowColor" // Màu shadow
        shadowRadius={8} // Bán kính shadow
        shadowOffset={{ width: 0, height: 4 }} // Vị trí shadow
        shadowOpacity={0.1} // Độ mờ của shadow
        marginHorizontal="$2" // Thêm margin để tránh sát màn hình
        maxWidth="90%" // Giới hạn chiều rộng tối đa
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        {options.map((option, index) => (
          <XStack
            key={index}
            alignItems="center"
            alignSelf="flex-start"
            gap="$3"
            onPress={() => {
              option.onPress();
            }}
            hoverStyle={{ backgroundColor: "$backgroundHover" }}
            pressStyle={{ backgroundColor: "$backgroundPress" }}
            padding="$3"
            borderRadius="$4"
          >
            {option.icon && (
              <Ionicons name={option.icon as any} size={24} color="$color" />
            )}
            <Text fontSize="$5">{option.label}</Text>
          </XStack>
        ))}
      </Popover.Content>
    </Popover>
  );
}
