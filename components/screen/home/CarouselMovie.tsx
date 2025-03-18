import { dimensionsWidth } from "@/constants/Resize"
import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { useThemeColor } from "@/hooks/useThemeColor"
import { Extrapolation, interpolate, useSharedValue } from "react-native-reanimated"
import Carousel, {
  CarouselRenderItem,
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel"
import { SlideItem } from "@/components/ui/SlideItem"
import { hexToRgba } from "@/constants/Colors"

export function CarouselMovie() {
  const { themeColors } = useThemeColor()

  const data = [
    {
      id: "1",
      image: "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
    {
      id: "2",
      image: "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
    {
      id: "3",
      image: "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
  ]

  const progress = useSharedValue<number>(0)

  const renderItem = React.useCallback(
    ({ rounded = false } = {}): CarouselRenderItem<any> =>
      ({ item, index }: { item: any; index: number }) => (
        <SlideItem
          source={item.image}
          key={index}
          index={index}
          rounded={rounded}
          // style={styles.carouselImage}
        />
      ),
    [],
  )

  const ref = React.useRef<ICarouselInstance>(null)

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    })
  }

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={ref}
        autoPlay
        autoPlayInterval={3000}
        data={data}
        height={258}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={dimensionsWidth}
        style={{
          width: dimensionsWidth,
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={renderItem({ rounded: true })}
      />

      <Pagination.Custom
        progress={progress}
        data={data}
        size={15}
        dotStyle={{
          borderRadius: 16,
          backgroundColor: hexToRgba(themeColors.primaryAccent, 0.3),
        }}
        activeDotStyle={{
          borderRadius: 99,
          width: 30,
          height: 15,
          overflow: "hidden",
          backgroundColor: themeColors.primaryAccent,
        }}
        containerStyle={{
          gap: 5,
          alignItems: "center",
          // height: 10,
          // backgroundColor: "red",
        }}
        horizontal
        onPress={onPressPagination}
        customReanimatedStyle={(progress, index, length) => {
          let val = Math.abs(progress - index)
          if (index === 0 && progress > length - 1) {
            val = Math.abs(progress - length)
          }

          return {
            transform: [
              {
                translateY: interpolate(val, [0, 1], [0, 0], Extrapolation.CLAMP),
              },
            ],
          }
        }}
        // renderItem={(item) => (
        //   <View
        //     style={{
        //       backgroundColor: item.color,
        //       flex: 1,
        //     }}
        //   />
        // )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselItem: {
    width: dimensionsWidth,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  carouselImage: {
    width: dimensionsWidth - 32,
    height: 242,
    resizeMode: "cover",
    borderRadius: 8,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  gradientBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
  },
})
