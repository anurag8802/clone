import React, { useEffect } from 'react'
import Header from './Header';
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from './MainContainer';
import MovieContainer from './MovieContainer';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import SearchMovie from './SearchMovie';

const Browse = () => {
    const user = useSelector(store => store.app.user);
    //This toggle value might be used to switch between different views on the page (e.g., between the search results and movie lists).
    const toggle = useSelector(store => store.movie.toggle);
    const navigate = useNavigate();

    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    useEffect(() => {
        if (!user) {
            navigate("/"); //If there is no user, it redirects the user to the login page.
        }
    }, []); //The empty dependency array ([]) means this effect runs only once when the component mounts.
    return (
        <div >
            <Header />
            <div>
                {
                    toggle ? <SearchMovie /> : (
 // The use of <>...</> (React Fragment) around <MainContainer /> and <MovieContainer /> 
//  allows these elements to be grouped together without adding an extra node to the DOM.
                        <>
                            <MainContainer />
                            <MovieContainer />
                        </>

                    )
                }

            </div>
        </div>
    )
}

export default Browse