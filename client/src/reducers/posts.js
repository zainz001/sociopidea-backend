// Assign the arrow function to a variable with a name
import { DELETE,FETCH_ALL,CREATE,LIKE,UPDATE } from "../containers/container";
const postsReducer = (post = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...post, action.payload];
        case UPDATE:
        case LIKE:
            return post.map((post) => post._id === action.payload._id ? action.payload : post);/*ager id yahi ha tu update kery nahi tu wohi porani post parhi rhy*/
        case DELETE:
            return post.filter((post) => post._id !== action.payload);
        default:
            return post;
    }
};

// Export the named function as the default export
export default postsReducer;
