import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { IMaskCanvasProps, IMaskCanvasRef } from "./interface";
import { Canvas, Fill, ImageFormat, PaintStyle, Path, Skia, StrokeCap, useCanvasRef } from "@shopify/react-native-skia";
import { WEBP } from "@/constants/mimeType";

const MaskCanvas = forwardRef<IMaskCanvasRef, IMaskCanvasProps>((props, ref) => {
  const { skiaPaths, aspectRatio, layoutInfo } = props;
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
    const originalWidth = snapshot?.width();
    const originalHeight = snapshot?.height();

    const targetWidth = layoutInfo.width;
    const targetHeight = layoutInfo.height;

    const scale = Math.min(targetWidth / originalWidth, targetHeight / originalHeight);
    // const scaledWidth = originalWidth * (targetWidth / originalWidth);
    // const scaledHeight = originalHeight * (targetHeight / originalHeight);
    const scaledWidth = originalWidth * scale;
    const scaledHeight = originalHeight * scale;
    const surface = Skia.Surface.MakeOffscreen(scaledWidth, scaledHeight);
    if (!surface) return;
    const canvas = surface.getCanvas();
    const paint = Skia.Paint();
    canvas.save();
    canvas.scale(scale, scale);
    canvas.drawImage(snapshot, 0, 0, paint);
    canvas.restore();
    const scaledSkImage = surface.makeImageSnapshot();
    const base64 = scaledSkImage?.encodeToBase64(ImageFormat.WEBP, 100);
    if (base64) {
      const fullBaseString = `data:${WEBP};base64,${base64}`;
      return fullBaseString;
    }
  };

  useEffect(() => {
    paint.current.setStrokeWidth(20);
    paint.current.setStyle(PaintStyle.Stroke);
    paint.current.setStrokeCap(StrokeCap.Round);
    paint.current.setColor(Skia.Color("white"));
  }, []);

  if (!aspectRatio) return null;
  return (
    <Canvas
      style={{
        position: "absolute",
        borderRadius: 20,
        overflow: "hidden",
        width: 300,
        height: 300 / aspectRatio,
      }}
      ref={canvasRef}
    >
      <Fill color="black" />
      {skiaPaths.map((path) => (
        <Path key={path.toSVGString()} path={path} paint={paint.current} />
      ))}
    </Canvas>
  );
});

export default MaskCanvas;
