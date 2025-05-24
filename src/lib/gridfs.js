import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

let bucket;

export const getGridFSBucket = () => {
  if (!bucket && mongoose.connection.readyState === 1) {
    bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "presentations",
    });
  }
  return bucket;
};
