import { combineReducers } from "redux";

import post from './posts'
import Auth from './auth'

export default combineReducers({
        post,Auth
})