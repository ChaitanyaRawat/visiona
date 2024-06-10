
  export const transformationTypes = {
    fill: {
      type: "fill",
      title: "Automated Image Expansion",
      subTitle: "AI outpainting for enlarging an image's scope",
      config: { fillBackground: true },
      icon: "/pencil.png",
    },
   
    removeBackground: {
      type: "removeBackground",
      title: "Background Removal",
      subTitle: "Utilizes AI to eliminate the image's background",
      config: { removeBackground: true },
      icon: "/scissor.png",
    },
    remove: {
      type: "remove",
      title: "Erase Object",
      subTitle: "Specify and Remove elements that are not needed in the picture",
      config: {
        remove: { prompt: "", removeShadow: true, multiple: true },
      },
      icon: "/eraser.png",
    },

    restore: {
      type: "restore",
      title: "Image Enhancement",
      subTitle: "Enhances images by eliminating unwanted noise and imperfections ",
      config: { restore: true },
      icon: "/magicwand.png",
    },
    
   
    recolor: {
      type: "recolor",
      title: "Object Recolor",
      subTitle: "Detect and change color of objects in the image",
      config: {
        recolor: { prompt: "", to: "", multiple: true },
      },
      icon: "/paint-brush.png",
    },
  };
  
  export const aspectRatioOptions = {
    "1:1": {
      aspectRatio: "1:1",
      label: "Square (1:1)",
      width: 1000,
      height: 1000,
    },
    "3:4": {
      aspectRatio: "3:4",
      label: "Standard Portrait (3:4)",
      width: 1000,
      height: 1334,
    },
    "9:16": {
      aspectRatio: "9:16",
      label: "Phone Portrait (9:16)",
      width: 1000,
      height: 1778,
    },
  };
  
  export const defaultValues = {
    title: "",
    aspectRatio: "",
    color: "",
    prompt: "",
    publicId: "",
  };
  
