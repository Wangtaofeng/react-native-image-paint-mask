import { FC, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, Path, Skia, useImage, Image, PaintStyle, StrokeCap, SkImage } from "@shopify/react-native-skia";
import { PanResponder, Pressable, Text, View, StyleSheet } from "react-native";
import MaskCanvas from "@/components/MaskCanvas";
import { IMaskCanvasRef } from "@/components/MaskCanvas/interface";
import Preview from "@/components/Preview";

const RootLayout: FC = () => {
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const maskCanvasRef = useRef<IMaskCanvasRef>(null);
  const [history, setHistory] = useState<{ x: number; y: number }[][]>([]);
  const [imageMask, setImageMask] = useState<SkImage | undefined>();

  const image = useImage(require("@/assets/images/style.png")); // replace with your image

  const undo = () => {
    const currentPaths = [...paths];
    const currentPath = currentPaths.pop();
    if (!currentPath) return;
    setPaths(currentPaths);
    setHistory((prev) => [...prev, currentPath]);
  };

  const redo = () => {
    const currentHistory = [...history];
    const currentPath = currentHistory.pop();
    if (!currentPath) return;
    setPaths((prev) => [...prev, currentPath]);
    setHistory(currentHistory);
  };

  const paint = useRef(Skia.Paint());

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      const { locationX: x, locationY: y } = e.nativeEvent;
      setCurrentPath([{ x, y }]);
    },
    onPanResponderMove: (e) => {
      const { locationX: x, locationY: y } = e.nativeEvent;
      if (currentPath.length === 0) {
        setCurrentPath((prev) => [...prev, { x, y }]);
      } else if (
        Math.abs(currentPath[currentPath.length - 1].x - x) > 1 ||
        Math.abs(currentPath[currentPath.length - 1].y - y) > 1
      ) {
        setCurrentPath((prev) => [...prev, { x, y }]);
      }
    },
    onPanResponderRelease: () => {
      setPaths((prev) => [...prev, currentPath]);
      setHistory([]);
      setCurrentPath([]);
    },
  });

  const skiaPaths = useMemo(() => {
    return paths.map((path) => {
      const skPath = Skia.Path.Make();
      skPath.moveTo(path[0].x, path[0].y);
      path.forEach((point) => skPath.lineTo(point.x, point.y));
      return skPath;
    });
  }, [paths]);

  const renderCurrentPath = useMemo(
    () =>
      currentPath.reduce((acc, point, idx) => {
        if (idx === 0) acc.moveTo(point.x, point.y);
        else acc.lineTo(point.x, point.y);
        return acc;
      }, Skia.Path.Make()),
    [currentPath],
  );

  const layoutInfo = useMemo(() => {
    if (!image) return { width: 0, height: 0 };
    return {
      width: image.width(),
      height: image.height(),
    };
  }, [image]);

  const handleConfirm = async () => {
    const skImage = await maskCanvasRef.current?.generateMaskImageAsync();
    setImageMask(skImage);
  };

  const handleClear = () => {
    setCurrentPath([]);
    setPaths([]);
    setHistory([]);
    setImageMask(undefined);
  };

  useEffect(() => {
    paint.current.setStrokeWidth(20);
    paint.current.setStyle(PaintStyle.Stroke);
    paint.current.setStrokeCap(StrokeCap.Round);
    paint.current.setColor(Skia.Color("red"));
  }, []);

  if (!image) return null;
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "relative",
          width: layoutInfo.width,
          height: layoutInfo.height,
        }}
        {...panResponder.panHandlers}
      >
        <MaskCanvas ref={maskCanvasRef} skiaPaths={skiaPaths} layoutInfo={layoutInfo} />

        <Canvas style={styles.canvas}>
          {/* original image */}
          {image && <Image image={image} x={0} y={0} {...layoutInfo} />}
          {/* all drawn paths */}
          {skiaPaths.map((path, index) => (
            <Path key={index} path={path} paint={paint.current} />
          ))}

          {/* current drawing path */}
          {currentPath.length > 0 && <Path path={renderCurrentPath} paint={paint.current} />}
        </Canvas>
      </View>

      {/* actions */}
      <View style={styles.actions}>
        <Pressable onPress={undo}>
          <Text>prev</Text>
        </Pressable>
        <Pressable onPress={redo}>
          <Text>next</Text>
        </Pressable>
        <Pressable onPress={handleConfirm}>
          <Text>confirm</Text>
        </Pressable>
        <Pressable onPress={handleClear}>
          <Text>clear</Text>
        </Pressable>
      </View>

      {/* mask preview, only for show case, cna delete it */}
      <Preview imageMask={imageMask} layoutInfo={layoutInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  canvas: {
    flex: 1,
    borderRadius: 20,
  },
});

export default RootLayout;
