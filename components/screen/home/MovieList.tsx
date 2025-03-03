import React from "react"
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native"

// Định nghĩa kiểu dữ liệu cho phim
interface Movie {
  id: number
  poster: string // URL của ảnh thumbnail
}

// Định nghĩa props cho component
interface MovieListHorizontalProps {
  title: string // Tiêu đề thể loại phim
  movies: Movie[] // Danh sách phim
  onViewMore: () => void // Hàm xử lý khi nhấn "Xem thêm"
}

// Component chính
export const MovieList: React.FC<MovieListHorizontalProps> = ({ title, movies, onViewMore }) => {
  // Render mỗi item trong danh sách phim
  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity style={styles.movieItem}>
      <Image source={{ uri: item.poster }} style={styles.movieImage} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {/* Tiêu đề và nút Xem thêm */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onViewMore}>
          <Text style={styles.viewMoreButton}>Xem thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách phim nằm ngang */}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  viewMoreButton: {
    color: "#007BFF",
    fontSize: 14,
    fontWeight: "500",
  },
  movieItem: {
    marginRight: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  movieImage: {
    width: 120,
    height: 180,
    resizeMode: "cover",
  },
  listContent: {
    paddingHorizontal: 16,
  },
})
