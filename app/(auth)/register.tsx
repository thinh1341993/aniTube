// app/(auth)/register.tsx
import React from "react";
import { YStack, Input, Button, Text, H3, useMedia, XStack } from "tamagui";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { tx } from "../../i18n/i18n";
import { useStores } from "@/stores/storeProvider";

// Validation schema
const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email(tx("errors.invalidEmail")) // Dịch lỗi
    .required(tx("errors.requiredField")),
  password: Yup.string()
    .min(6, tx("errors.minLength", { count: 6 })) // Dịch lỗi với biến
    .required(tx("errors.requiredField")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], tx("errors.passwordMismatch")) // Dịch lỗi
    .required(tx("errors.requiredField")),
});

export default function RegisterScreen() {
  const router = useRouter();
  const media = useMedia(); // Lấy thông tin về kích thước màn hình
  const { panelsStore, authStore } = useStores();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: { email: string; password: string }) => {
    panelsStore.setLoading(true);
    const error = await authStore.register(data.email, data.password);
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
      padding={media.xs ? "$4" : "$6"} // Padding nhỏ hơn trên điện thoại
      gap={media.xs ? "$5" : "$8"} // Khoảng cách giữa các phần tử
      maxWidth={media.xxl ? 800 : undefined} // Giới hạn chiều rộng trên màn hình lớn
      marginHorizontal="auto" // Căn giữa nội dung
    >
      {/* Title */}
      <H3
        textAlign="center"
        marginBottom="$3"
        color="$color"
        fontSize={media.xs ? "$8" : "$10"} // Font size lớn hơn trên màn hình lớn
      >
        ✨ {tx("welcome")}
      </H3>

      {/* Form */}
      <YStack width="100%" gap={media.xs ? "$3" : "$4"}>
        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <YStack gap="$1">
              <Input
                placeholder={tx("placeholders.email")} // Dịch placeholder
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                borderColor={errors.email ? "$red10" : "$borderColor"}
                borderRadius="$3"
                padding={media.xs ? "$3" : "$4"} // Padding lớn hơn trên màn hình lớn
                fontSize={media.xs ? "$4" : "$5"} // Font size lớn hơn trên màn hình lớn
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
                placeholder={tx("placeholders.password")} // Dịch placeholder
                value={value}
                onChangeText={onChange}
                secureTextEntry
                borderColor={errors.password ? "$red10" : "$borderColor"}
                borderRadius="$3"
                padding={media.xs ? "$3" : "$4"}
                fontSize={media.xs ? "$4" : "$5"}
              />
              {errors.password && (
                <Text color="$red10" fontSize="$2">
                  {errors.password.message}
                </Text>
              )}
            </YStack>
          )}
        />

        {/* Confirm Password */}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <YStack gap="$1">
              <Input
                placeholder={tx("placeholders.confirmPassword")} // Dịch placeholder
                value={value}
                onChangeText={onChange}
                secureTextEntry
                borderColor={errors.confirmPassword ? "$red10" : "$borderColor"}
                borderRadius="$3"
                padding={media.xs ? "$3" : "$4"}
                fontSize={media.xs ? "$4" : "$5"}
              />
              {errors.confirmPassword && (
                <Text color="$red10" fontSize="$2">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </YStack>
          )}
        />
      </YStack>

      {/* Submit button */}
      <Button
        backgroundColor="$primary"
        color="$primaryText" // Màu chữ trắng
        borderRadius="$3"
        padding={media.xs ? "$3" : "$4"}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? tx("buttons.signingUp") : tx("buttons.signUp")}
      </Button>

      {/* Login link */}
      <XStack justifyContent="center" marginTop={media.xs ? "$3" : "$4"}>
        <Text color="$color" fontSize={media.xs ? "$3" : "$4"}>
          {tx("auth.alreadyHaveAccount")}{" "}
        </Text>
        <Text
          color="$primary"
          onPress={() => router.push("/login")}
          textDecorationLine="underline"
          cursor="pointer"
          fontSize={media.xs ? "$3" : "$4"}
        >
          {tx("buttons.login")}
        </Text>
      </XStack>
    </YStack>
  );
}
