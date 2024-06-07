export const navLinks = [
    {
      label: "Home",
      route: "/",
      icon: "/assets/icons/home.svg",
    },
    {
      label: "Image Restore",
      route: "/transformations/add/restore",
      icon: "/assets/icons/magicwand.png",
    },
    {
      label: "Generative Fill",
      route: "/transformations/add/fill",
      icon: "/assets/icons/pencil.png",
    },
    {
      label: "Object Remove",
      route: "/transformations/add/remove",
      icon: "/assets/icons/eraser.png",
    },
    {
      label: "Object Recolor",
      route: "/transformations/add/recolor",
      icon: "/assets/icons/paint-brush.png",
    },
    {
      label: "Background Remove",
      route: "/transformations/add/removeBackground",
      icon: "/assets/icons/scissor.png",
    },
    {
      label: "Profile",
      route: "/profile",
      icon: "/assets/icons/profile.svg",
    },
    {
      label: "Buy Credits",
      route: "/credits",
      icon: "/assets/icons/bag.svg",
    },
  ];
  
  export const plans = [
    {
      _id: 1,
      name: "Free",
      icon: "/assets/icons/free-plan.svg",
      price: 0,
      credits: 20,
      inclusions: [
        {
          label: "20 Free Credits",
          isIncluded: true,
        },
        {
          label: "Basic Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: false,
        },
        {
          label: "Priority Updates",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 2,
      name: "Pro Package",
      icon: "/assets/icons/free-plan.svg",
      price: 40,
      credits: 120,
      inclusions: [
        {
          label: "120 Credits",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: true,
        },
        {
          label: "Priority Updates",
          isIncluded: false,
        },
      ],
    },
    {
      _id: 3,
      name: "Premium Package",
      icon: "/assets/icons/free-plan.svg",
      price: 199,
      credits: 2000,
      inclusions: [
        {
          label: "2000 Credits",
          isIncluded: true,
        },
        {
          label: "Full Access to Services",
          isIncluded: true,
        },
        {
          label: "Priority Customer Support",
          isIncluded: true,
        },
        {
          label: "Priority Updates",
          isIncluded: true,
        },
      ],
    },
  ];
  
  export const transformationTypes = {
    fill: {
      type: "fill",
      title: "Automated Image Expansion",
      subTitle: "AI outpainting for enlarging an image's scope",
      config: { fillBackground: true },
      icon: "pencil.png",
    },
   
    removeBackground: {
      type: "removeBackground",
      title: "Background Removal",
      subTitle: "Utilizes AI to eliminate the image's background",
      config: { removeBackground: true },
      icon: "scissor.png",
    },
    remove: {
      type: "remove",
      title: "Erase Object",
      subTitle: "Specify and Remove elements that are not needed in the picture",
      config: {
        remove: { prompt: "", removeShadow: true, multiple: true },
      },
      icon: "eraser.png",
    },

    restore: {
      type: "restore",
      title: "Image Enhancement",
      subTitle: "Enhances images by eliminating unwanted noise and imperfections ",
      config: { restore: true },
      icon: "magicwand.png",
    },
    
   
    recolor: {
      type: "recolor",
      title: "Object Recolor",
      subTitle: "Detect and change color of objects in the image",
      config: {
        recolor: { prompt: "", to: "", multiple: true },
      },
      icon: "paint-brush.png",
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
  
  export const creditFee = -1;