// Assign the arrow function to a variable with a name
const postsReducer = (post = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...post, action.payload];
        default:
            return post;
    }
};

// Export the named function as the default export
export default postsReducer;
