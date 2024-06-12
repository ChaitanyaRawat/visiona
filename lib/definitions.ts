// The Argument types globally declared here are used at appropriate sections of the project to satisfy typescript :)


// USER SPECIFIC STUFF
export type CreateUserArguments = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  photo: string;
};

export type UpdateUserArguments = {
  firstName: string | null;
  lastName: string | null;
  username: string;
  photo: string;
};




// CLOUDINARY TRANSFORMATIONS SPECIFIC STUFF
export interface ImageDef extends Document {
  _id: any;
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  }
  createdAt?: Date;
  updatedAt?: Date;
  isPrivate: boolean;
}

export type CreateImageArguments = {
  image: {
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
  };
  userId: string;
  path: string;
};

export type UpdateImageArguments = {
  image: {
    _id: string;
    title: string;
    publicId: string;
    transformationType: string;
    width: number;
    height: number;
    config: any;
    secureURL: string;
    transformationURL: string;
    aspectRatio: string | undefined;
    prompt: string | undefined;
    color: string | undefined;
    isPrivate: boolean;
  };
  userId: string;
  path: string;
};

export type Transformations = {
  restore?: boolean;
  fillBackground?: boolean;
  remove?: {
    prompt: string;
    removeShadow?: boolean;
    multiple?: boolean;
  };
  recolor?: {
    prompt?: string;
    to: string;
    multiple?: boolean;
  };
  removeBackground?: boolean;
};

export type TransformationTypeKey = "restore" | "fill" | "remove" | "recolor" | "removeBackground";

export type TransformationFormProps = {
  action: "Add" | "Update";
  userId: string;
  type: TransformationTypeKey;

  data?: ImageDef | null;
  config?: Transformations | null;
};

export type TransformedImageProps = {
  image: any;
  type: string;
  title: string;
  transformationConfig: Transformations | null;
  isTransforming: boolean;
  hasDownload?: boolean;
  setIsTransforming?: React.Dispatch<React.SetStateAction<boolean>>;
};






// URL QUERY STUFF
export type CreateUrlArguments = {
  searchParams: string;
  key: string;
  value: string | number | null;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type DeleteUrlArguments = {
  searchParams: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string; type: TransformationTypeKey };
  searchParams: { [key: string]: string | string[] | undefined };
};