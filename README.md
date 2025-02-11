| Undo Redo                                                                                     | Preview Mask                                                                                     | Generate Image                                                                               |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| ![undo-redo](https://github.com/user-attachments/assets/c5bebe03-85c4-4469-bd9d-09c3666906a6) | ![preview-mask](https://github.com/user-attachments/assets/5b919861-c70d-4761-b3c6-0b2fdca518ae) | ![generate](https://github.com/user-attachments/assets/dcde43d2-f751-48d9-90dc-87479b2315cb) |

---

# Image Masking and AI Modification Demo

This project is a demo of how to apply brush strokes on an image, generate a mask image with just the brushing information, and use AI API calls to modify specific areas of the original image. The demo is built using **Expo**, **Supabase**, **fal-ai**, and **@shopify/react-native-skia**.

## Features

- **Brush Stroke on Image**: Users can draw on an image, and the path of the brush stroke is used to generate a mask image.
- **Undo and Redo**: The brush stroke actions can be undone or redone.
- **AI Image Modification**: The mask image is combined with an AI API call to modify specific regions of the original image in a natural way.

## Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the app:

   ```bash
   bunx expo start
   ```

3. The app can be tested on a development build, an Android emulator, an iOS simulator, or in Expo Go.

## Key Components

- **app/\_layout.ts**: This file contains the main implementation for handling brush strokes and generating mask images.
- **components/MaskCanvas**: Responsible for rendering the mask image based on the brush strokes applied to the canvas.

- **libs/operatImage**: Contains logic for making API calls to modify the image using AI, applying changes based on the generated mask image.

- **libs/storage**: Handles the storage of images and generates signed links for the stored images.

## Environment Variables

- Some environment variables are used for AI calls and storing images on a CDN. Ensure you configure the necessary keys and endpoints in your environment.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [fal-ai API Documentation](https://www.fal.ai/docs)
- [@shopify/react-native-skia](https://github.com/Shopify/react-native-skia)

---

You can copy this directly now! Let me know if you'd like to adjust anything.
