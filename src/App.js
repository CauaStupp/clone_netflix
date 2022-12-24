import { React, useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import MainMovie from './components/MainMovie';
import Header from './components/Header';

import './App.css';


function App() {

    const [movieList, setMovieList] = useState([]);
    const [mainData, setMainData] = useState(null);
    const [blackHeader, setBlackheader] = useState(false);

    useEffect(() => {
        const loadApi = async () => {
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            let originals = list.filter(i => i.slug === 'originals');
            let random = Math.floor(Math.random() * (originals[0].items.results.length -1));
            let chosen = originals[0].items.results[random];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setMainData(chosenInfo);
           
        }

        

        loadApi();
    }, [])

    useEffect(() => {
        const scrollListener = () => {
            if (window.scrollY > 200) {
                setBlackheader(true);
            } else {
                setBlackheader(false);
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, [])


    return (
        <div className='page'>

            <Header black={blackHeader} />

            {mainData && 
                <MainMovie item={mainData}/>
            }
            

            <section className='list'>
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items}/>
                ))}
            </section>


            <footer>
                Feito por min Cauã apenas para estudo. <br/>
                Filmes foram pegos do TheMoviedb.org
            </footer>
            
            {movieList.length <= 0 && 
                <div className='loading'>
                    <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando'/>
                </div>
            }
            
        </div>
    );
}

export default App;