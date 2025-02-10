import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { IMaskCanvasProps, IMaskCanvasRef } from "./interface";
import { Canvas, PaintStyle, Path, Skia, StrokeCap, useCanvasRef } from "@shopify/react-native-skia";

const MaskCanvas = forwardRef<IMaskCanvasRef, IMaskCanvasProps>((props, ref) => {
  const { skiaPaths, layoutInfo } = props;
  const paint = useRef(Skia.Paint());
  const canvasRef = useCanvasRef();

  useImperativeHandle(ref, () => ({
    generateMaskImageAsync: async () => {
      return await generateMask();
    },
  }));

  const generateMask = async () => {
    const snapshot = await canvasRef.current?.makeImageSnapshotAsync();
    if (!snapshot) return;
    return snapshot;

    // can also encode to base64
    // const base64 = snapshot.encodeToBase64(ImageFormat.WEBP, 80);
    // return base64
  };

  useEffect(() => {
    paint.current.setStrokeWidth(20);
    paint.current.setStyle(PaintStyle.Stroke);
    paint.current.setStrokeCap(StrokeCap.Round);
    paint.current.setColor(Skia.Color("white"));
  }, []);

  return (
    <Canvas style={{ ...layoutInfo, position: "absolute" }} ref={canvasRef}>
      {skiaPaths.map((path) => (
        <Path key={path.toSVGString()} path={path} paint={paint.current} />
      ))}
    </Canvas>
  );
});

export default MaskCanvas;
