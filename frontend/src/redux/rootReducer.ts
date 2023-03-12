import authReducer from "./auth/slice";
import todoReducer from "./todo/slice";

export const rootReducer = { auth: authReducer, todo: todoReducer };
