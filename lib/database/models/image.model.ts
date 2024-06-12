import { Schema, model, models } from "mongoose";

// Define the image schema
const ImageSchema = new Schema({
  // Title of the image
  title: { type: String, required: true },
  // Type of transformation applied to the image
  transformationType: { type: String, required: true },
  // Public ID of the image
  publicId: { type: String, required: true },
  // Secure URL of the image
  secureURL: { type: String, required: true },
  // Width of the image
  width: { type: Number },
  // Height of the image
  height: { type: Number },
  // Additional configuration for the image
  config: { type: Object },
  // URL of the transformed image
  transformationUrl: { type: String },
  // Aspect ratio of the image
  aspectRatio: { type: String },
  // Color of the image
  color: { type: String },
  // Prompt for the transformed image
  prompt: { type: String },
  // User who created the image
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  // Created at timestamp
  createdAt: { type: Date, default: Date.now },
  // Updated at timestamp
  updatedAt: { type: Date, default: Date.now },
  // Private flag for the image
  isPrivate: { type: Boolean, default: true }
});

// Create or retrieve the Image model from MongoDB
const Image = models?.Image || model('Image', ImageSchema);

// Export the Image model for use in other parts of the application
export default Image;
