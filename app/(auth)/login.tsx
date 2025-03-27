// app/(auth)/login.tsx
import React from "react";
import { YStack, Input, Button, Text, H3, useMedia, XStack } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { tx } from "../../i18n/i18n";
import { useStores } from "@/stores/storeProvider";
// import { Image } from "expo-image"; // Import Expo Image

// Validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(tx("errors.invalidEmail")) // Dịch lỗi
    .required(tx("errors.requiredField")),
  password: Yup.string()
    .min(6, tx("errors.minLength", { count: 6 })) // Dịch lỗi với biến
    .required(tx("errors.requiredField")),
});

export default function LoginScreen() {
  const router = useRouter();
  const media = useMedia(); // Lấy thông tin về kích thước màn hình
  const { panelsStore, authStore } = useStores();
  console.log("login render");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: { email: string; password: string }) => {
    panelsStore.setLoading(true);
    const error = await authStore.login(data.email, data.password);
    panelsStore.setLoading(false);
    if (error) {
      panelsStore.showAlertDialog({ content: error });
    } else {
      router.replace("/(tabs)/tabOne"); // Chuyển hướng đến màn hình chính
    }
    panelsStore.setLoading(false);
  };

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center" // Căn giữa nội dung theo chiều ngang và dọc
      padding={media.xs ? "$4" : media.xxl ? "$10" : "$6"} // Padding thay đổi theo kích thước màn hình
      gap={media.xs ? "$5" : media.xxl ? "$8" : "$6"}
      maxWidth={media.xxl ? 800 : undefined} // Giới hạn chiều rộng trên màn hình lớn
    >
      {/* Background Image */}
      {/* <Image
        source={
          "data:image/jpeg;base64,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"
        } // Đường dẫn đến hình ảnh
        contentFit="cover" // Phủ kín toàn bộ container
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1, // Đặt hình ảnh ở dưới cùng
        }}
      /> */}

      {/* Title */}
      <H3
        textAlign="center"
        marginBottom="$3"
        color="$color"
        fontSize={media.xs ? "$8" : media.xxl ? "$12" : "$10"} // Font size thay đổi theo kích thước màn hình
      >
        ✨ {tx("auth.signIn")}
      </H3>

      {/* Form */}
      <YStack width="80%" gap={media.xs ? "$3" : media.xxl ? "$5" : "$4"}>
        {/* Width cố định là 80% */}
        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <YStack gap="$1">
              <Input
                placeholder={tx("placeholders.email")}
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                borderColor={errors.email ? "$red10" : "$borderColor"}
                borderRadius="$3"
                padding={media.xs ? "$3" : media.xxl ? "$5" : "$4"}
                fontSize={media.xs ? "$4" : media.xxl ? "$6" : "$5"}
                width="100%" // Rộng toàn bộ container cha (80%)
              />
              {errors.email && (
                <Text color="$red10" fontSize="$2">
                  {errors.email.message}
                </Text>
              )}
            </YStack>
          )}
        />
        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <YStack gap="$1">
              <Input
                placeholder={tx("placeholders.password")}
                value={value}
                onChangeText={onChange}
                secureTextEntry
                borderColor={errors.password ? "$red10" : "$borderColor"}
                borderRadius="$3"
                padding={media.xs ? "$3" : media.xxl ? "$5" : "$4"}
                fontSize={media.xs ? "$4" : media.xxl ? "$6" : "$5"}
                width="100%" // Rộng toàn bộ container cha (80%)
              />
              {errors.password && (
                <Text color="$red10" fontSize="$2">
                  {errors.password.message}
                </Text>
              )}
            </YStack>
          )}
        />
      </YStack>

      {/* Submit button */}
      <Button
        backgroundColor="$primary" // Màu nền đơn giản
        color="$primaryText" // Màu chữ trắng
        borderRadius="$3"
        padding={media.xs ? "$3" : media.xxl ? "$5" : "$4"}
        onPress={handleSubmit(onSubmit)}
        width="80%" // Rộng 80% so với container cha
      >
        {tx("buttons.signIn")}
      </Button>

      {/* Sign Up link */}
      <XStack justifyContent="center" marginTop={media.xs ? "$3" : "$4"}>
        <Text
          color="$color"
          fontSize={media.xs ? "$3" : media.xxl ? "$5" : "$4"}
        >
          {tx("auth.noAccount")}{" "}
        </Text>
        <Text
          color="$primary"
          onPress={() => router.push("/register")}
          textDecorationLine="underline"
          cursor="pointer"
          fontSize={media.xs ? "$3" : media.xxl ? "$5" : "$4"}
        >
          {tx("buttons.signUp")}
        </Text>
      </XStack>
    </YStack>
  );
}
