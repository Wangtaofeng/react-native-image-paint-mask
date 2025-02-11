import { SkImage, SkPath, SkRect } from "@shopify/react-native-skia";

export interface IMaskCanvasRef {
  generateMaskImageAsync: () => Promise<string | undefined>;
}

export interface IMaskCanvasProps {
  skiaPaths: SkPath[];
  layoutInfo: {
    width: number;
    height: number;
  };
  aspectRatio: number;
}
