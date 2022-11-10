import React from "react";
import { View, StyleSheet } from "react-native";
import { SkeletonContainer, Skeleton } from "@nlazzos/react-native-skeleton";

const ReportScreen = () => {
  return (
    <SkeletonContainer>
      <View style={styles.container}>
        <Skeleton style={styles.avatar} />
        <View style={styles.textContainer}>
          <Skeleton style={styles.title} />
          <Skeleton style={styles.subtitle} />
        </View>
        <Skeleton style={styles.icon} />
      </View>
    </SkeletonContainer>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar: { height: 40, width: 40, borderRadius: 0 },
  textContainer: { flex: 1, marginLeft: 16 },
  title: { width: "90%", height: 14, borderRadius: 7, marginBottom: 5 },
  subtitle: { width: "70%", height: 14, borderRadius: 7 },
  icon: { height: 16, width: 16, borderRadius: 4 },
});

export default ReportScreen;
