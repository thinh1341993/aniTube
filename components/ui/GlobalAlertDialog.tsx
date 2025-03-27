// components/GlobalAlertDialog.tsx
import { tx } from "@/i18n/i18n";
import { panelsStore } from "@/stores/panelsStore";
import { observer } from "mobx-react-lite";
import React from "react";
import { AlertDialog, Button, Text, XStack, YStack } from "tamagui";

// Provider để bọc toàn bộ ứng dụng
export const GlobalAlertDialog = observer(() => {
  return (
    <AlertDialog open={panelsStore.alertDialog.isVisible}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap="$4">
            <AlertDialog.Title>
              {panelsStore.alertDialog.title || tx("errors.error")}
            </AlertDialog.Title>
            <AlertDialog.Description>
              {panelsStore.alertDialog.content}
            </AlertDialog.Description>
            <XStack justifyContent="flex-end" gap="$2">
              <AlertDialog.Cancel asChild>
                <Button
                  onPress={() => panelsStore.hideAlertDialog()}
                  backgroundColor="transparent"
                  borderWidth={1}
                  borderColor="$borderColor"
                  padding="$2"
                >
                  <Text color="$color">{tx("buttons.close")}</Text>
                </Button>
              </AlertDialog.Cancel>
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
});
