import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

//export redux store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


//export all of the actions
export * from './admin/adminActions'
export * from './candidates/candidatesActions'