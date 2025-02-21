import { Button } from "@/components/Button";
import { $styles } from "@/constants/Styles";
import i18n, { tx } from "@/i18n/i18n";
import { forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";

type HeaderHomeProps = {};
export type HeaderHomeRef = {};

export const HeaderHome = forwardRef(
  ({}: HeaderHomeProps, ref: React.ForwardedRef<HeaderHomeRef>) => {
    // Expose to parent component via ref
    useImperativeHandle(ref, () => ({}));

    return (
      <View style={$styles.row}>
        <Button>{tx("login")}</Button>
      </View>
    );
  }
);

const styles = StyleSheet.create({});
