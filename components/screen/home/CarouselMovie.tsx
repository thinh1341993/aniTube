import { dimensionsWidth } from "@/constants/resize";
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { ExpoImage } from "@/components/ExpoImage";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "@/hooks/useColorScheme";

const Pagination = forwardRef(({ data }: { data: any }, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Expose setActiveIndex to parent component via ref
  useImperativeHandle(ref, () => ({
    setActiveIndex: (index: number) => {
      if (index >= 0 && index < data.length) {
        setActiveIndex(index);
      }
    },
  }));

  return (
    <View style={styles.pagination}>
      {data.map((_: any, index: number) => (
        <View
          key={index}
          style={[styles.dot, activeIndex === index && styles.activeDot]}
        />
      ))}
    </View>
  );
});

export function CarouselMovie() {
  const colorScheme = useColorScheme();

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

  const paginationRef = useRef<any>(null);
  const scrollViewRef = useRef(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    paginationRef.current?.setActiveIndex(index);
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
          </View>
        ))}
      </ScrollView>
      <Pagination ref={paginationRef} data={data} />
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
});
