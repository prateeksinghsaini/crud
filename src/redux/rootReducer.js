import { combineReducers } from "redux";
import { usersReducers } from "./reducers";

const rootReducer = combineReducers({
    data: usersReducers
})

export default rootReducer