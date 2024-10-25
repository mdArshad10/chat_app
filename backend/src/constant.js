/**
 * @type {{ PENDING:"PENDING",ACCEPTED:"ACCEPTED", REJECTED:"REJECTED" } as const}
 */
export const RequestStatusEnum = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

export const AvailableRequestStatusProviders = Object.values(RequestStatusEnum);

// ======== ENV VARIABLE ===========

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET_KEY = process.env.CLOUDINARY_API_SECRET_KEY;

export {
  NODE_ENV,
  PORT,
  MONGO_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
};