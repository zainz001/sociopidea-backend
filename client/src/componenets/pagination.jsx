import React,{useEffect} from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab'

import useStyle from './styles.js'
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getPosts } from '../action/posts.js';

const Paginate = ({page}) => {
    const classes = useStyle();
    const {numberOfPages}=useSelector((state) => state.posts   )
    const dispatch=useDispatch();
    useEffect(()=>{
        if(page) dispatch(getPosts(page));//getpost(post) means jis post ka andar jana chahty ha
    },[page])//[] known as dependancy array mean ka jab os state ma kaam ho ga tu wo chezz load ho ge hamesha
    return (
        <>
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page)||1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page }`} />
            )}

        />
        <Link to="/report">Report</Link>
        </>
    );
};
export default Paginate;