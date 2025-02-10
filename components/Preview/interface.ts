import { SkImage } from "@shopify/react-native-skia";

export interface IPreviewProps {
  imageMask: SkImage | undefined;
  layoutInfo: {
    width: number;
    height: number;
  };
}
