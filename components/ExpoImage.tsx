import { Image, ImageProps } from "expo-image"
import { StyleSheet, View } from "react-native"

export type ExpoImageProps = ImageProps & {}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["

export function ExpoImage({ ...rest }: ExpoImageProps) {
  return (
    <Image source="https://picsum.photos/seed/696/3000/2000" placeholder={{ blurhash }} {...rest} />
  )
}

const styles = StyleSheet.create({})
