import { dimensionsWidth } from "@/constants/resize";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { ExpoImage } from "@/components/ExpoImage";
import { LinearGradient } from "expo-linear-gradient";

export function CarouselMovie() {
  const data = [
    {
      id: "1",
      image:
        "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
    {
      id: "2",
      image:
        "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
    {
      id: "3",
      image:
        "https://image.tmdb.org/t/p/original/rdN2CW2SuTEPZ7i6RqpZUpRQQ5X.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveIndex(index);
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{
          width: dimensionsWidth,
        }}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.carouselItem}>
            <ExpoImage source={item.image} style={styles.carouselImage} />
            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
              style={styles.gradientBottom}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0.7 }}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
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
  },
  carouselImage: {
    // maxWidth: 430,
    width: dimensionsWidth,
    height: 250,
    resizeMode: "cover",
    // borderRadius: 8,
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
});
