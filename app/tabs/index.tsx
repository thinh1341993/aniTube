import { Image, StyleSheet, Platform, ScrollView } from "react-native"

import { HelloWave } from "@/components/HelloWave"
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { CarouselMovie } from "@/components/screen/home/CarouselMovie"
import { Colors } from "@/constants/Colors"
import { ScreenView } from "@/components"
import { HeaderHome } from "@/components/screen/home"
import { MovieList } from "@/components/screen/home/MovieList"
import { ChatHomeScreen } from "./chatHome"

export default function HomeScreen() {
  const data = [
    {
      id: "1",
      poster: "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
    {
      id: "2",
      poster: "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
    {
      id: "3",
      poster: "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
    {
      id: "5",
      poster: "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
    {
      id: "6",
      poster: "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
  ] as any
  return (
    <ScreenView preset="scroll">
      <ChatHomeScreen />
      {/* <HeaderHome /> */}
      {/* <CarouselMovie /> */}
      {/* <MovieList movies={data} title="BTV" onViewMore={() => {}} /> */}
    </ScreenView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
})
