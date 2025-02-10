import { SkImage, SkPath } from "@shopify/react-native-skia";

export interface IMaskCanvasRef {
  generateMaskImageAsync: () => Promise<SkImage | undefined>;
}

export interface IMaskCanvasProps {
  skiaPaths: SkPath[];
  layoutInfo: {
    width: number;
    height: number;
  };
}
