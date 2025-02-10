import { FC } from "react";
import { Canvas, Image } from "@shopify/react-native-skia";
import { View, Text, StyleSheet } from "react-native";
import { IPreviewProps } from "./interface";

const Preview: FC<IPreviewProps> = ({ imageMask, layoutInfo }) => {
  return (
    <View style={styles.container}>
      <Text>Preview</Text>
      <Canvas
        style={[
          styles.canvas,
          {
            width: layoutInfo.width / 5,
            height: layoutInfo.height / 5,
          },
        ]}
      >
        {imageMask && (
          <Image x={0} y={0} width={layoutInfo.width / 5} height={layoutInfo.height / 5} image={imageMask} />
        )}
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
