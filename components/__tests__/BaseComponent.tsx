import { forwardRef, useImperativeHandle } from "react"
import { View, StyleSheet } from "react-native"

type ExampleProps = {}
type ExampleRef = {}

const Example = forwardRef(({}: ExampleProps, ref: React.ForwardedRef<ExampleRef>) => {
  // Expose to parent component via ref
  useImperativeHandle(ref, () => ({}))

  return <View></View>
})

const styles = StyleSheet.create({})
