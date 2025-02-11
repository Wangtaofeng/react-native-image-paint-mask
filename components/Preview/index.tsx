import { FC } from "react";
import { Canvas, Image, useImage } from "@shopify/react-native-skia";
import { View, Text, StyleSheet } from "react-native";
import { IPreviewProps } from "./interface";

const Preview: FC<IPreviewProps> = ({ layoutInfo, base64 }) => {
  const image = useImage(base64);
  return (
    <View style={styles.container}>
      <Text>Preview Mask (can delete it)</Text>
      <Canvas
        style={[
          styles.canvas,
          {
            width: layoutInfo.width / 5,
            height: layoutInfo.height / 5,
          },
        ]}
      >
        {image && <Image x={0} y={0} width={layoutInfo.width / 5} height={layoutInfo.height / 5} image={image} />}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    backgroundColor: "black",
    borderRadius: 4,
  },
});

export default Preview;
