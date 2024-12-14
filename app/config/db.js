import { connect } from "mongoose";
export const initializeDBConnection = (URI) => {
  connect(URI)
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error(err));
};
