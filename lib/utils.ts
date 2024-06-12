import { CreateUrlArguments, DeleteUrlArguments } from "./definitions";
import { aspectRatioOptions } from "@/constants";
import * as qs from 'qs'
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";



/**
 * Throws an error if the provided value is an instance of Error,
 * or a string, or any other type.
 * @param {unknown} error - The value to check
 * @throws {Error} If the value is an instance of Error, or a string, or any other type.
 */
export const errorHandler = (error: unknown) => {

  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }

};

/**
 * Downloads a file from the provided URL with the specified filename.
 * @param {string} url - The URL of the file to download.
 * @param {string} filename - The name to give the downloaded file.
 * @throws {Error} If no URL is provided.
 */
export const download = (url: string, filename: string) => {

  if (!url) { throw new Error("URL not found ! You need to provide one"); }

  fetch(url).then((response) => response.blob()).then((blob) => {
    const blobURL = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobURL;

    if (filename && filename.length) { a.download = `${filename.replace(" ", "_")}.png`; }

    document.body.appendChild(a);
    a.click();
  })
    .catch((error) => console.log({ error }));
};

/**
 * Merges multiple CSS class names into a single string.
 * @param {...ClassValue[]} inputs - The class names to merge.
 * @returns {string} - The merged CSS class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}






/**
 * Creates a URL query string with the provided parameters.
 * @param {CreateUrlArguments} options - The options for creating the URL query string.
 * @returns {string} - The created URL query string.
 */
export const createUrlQuery = ({ searchParams, key, value, }: CreateUrlArguments) => {

  const params = { ...qs.parse(searchParams.toString()), [key]: value };
  return `${window.location.pathname}?${qs.stringify(params, { skipNulls: true, })}`;

};

/**
 * Reduces the URL query string by removing the specified keys.
 * @param {DeleteUrlArguments} options - The options for reducing the URL query string.
 * @returns {string} - The reduced URL query string.
 */
export function reduceUrlQuery({ searchParams, keysToRemove, }: DeleteUrlArguments) {

  const currentUrl = qs.parse(searchParams);
  keysToRemove.forEach((key) => { delete currentUrl[key]; });
  Object.keys(currentUrl).forEach((key) => currentUrl[key] == null && delete currentUrl[key]);
  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;

}

/**
 * Sets a delay before executing a function.
 * @param {(...args: any[]) => void} func - The function to execute.
 * @param {number} delay - The delay in milliseconds.
 * @returns {(...args: any[]) => void} - The function with the delay.
 */
export const setDelay = (func: (...args: any[]) => void, delay: number) => {

  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };

};

/**
 * The type for aspect ratio keys.
 */
export type AspectRatioKey = keyof typeof aspectRatioOptions;

/**
 * Finds the dimensions of an image based on its type and aspect ratio.
 * @param {string} type - The type of the image.
 * @param {any} image - The image object.
 * @param {"width" | "height"} dimension - The dimension to find.
 * @returns {number} - The dimension value.
 */
export const findImageDimensions = (type: string, image: any, dimension: "width" | "height"): number => {

  if (type === "fill") {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return image?.[dimension] || 1000;

};

/**
 * Integrates two objects by merging their properties.
 * @param {any} obj1 - The first object.
 * @param {any} obj2 - The second object.
 * @returns {any} - The merged object.
 */
export const integrateObjects = (obj1: any, obj2: any) => {

  if (obj2 === null || obj2 === undefined) { return obj1; }

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = integrateObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};

/**
 * Creates a shimmer effect SVG.
 * @param {number} w - The width of the SVG.
 * @param {number} h - The height of the SVG.
 * @returns {string} - The SVG code.
 */
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;


/**
 * Converts a string to a base64 encoded string.
 * @param {string} str - The string to convert.
 * @returns {string} - The base64 encoded string.
 */
const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/**
 * The data URL for the shimmer SVG.
 */
export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;

