import { panelsStore } from "@/stores/panelsStore";
import React from "react";
import { YStack, Spinner } from "tamagui";
import { observer } from "mobx-react-lite";

export const GlobalSpinner = observer(() => {
  return (
    panelsStore.isLoading && (
      <YStack
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(0, 0, 0, 0.5)" // Nền mờ
      >
        <Spinner size="large" color="$primary" />
      </YStack>
    )
  );
});
