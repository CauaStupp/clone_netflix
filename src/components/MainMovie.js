import React from "react";

import './MainMovie.css';

const MainMovie = ({item}) => {

    const styles = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
    }

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for (let i in item.genres) {
        genres.push(item.genres[i].name);
    }

    let desc = item.overview;

    if (desc.length > 200) {
        desc = desc.substring(0, 200) + '...';
    }

    let point = item.vote_average;


    return (
        <section className="main" style={styles}>
            <div className="main--vertical">
                <div className="main--horizontal">
                    <div className="main--name">{item.original_name}</div>
                    <div className="main--info">
                        <div className="main--point">Nota {point.toFixed(1)}/10</div>
                        <div className="main--year">{firstDate.getFullYear()}</div>
                        <div className="main--seasons">
                            {item.number_of_seasons > 1 ? `${item.number_of_seasons} Temporadas` : `${item.number_of_seasons} Temporada`}
                        </div>
                    </div>
                    <div className="main--desc">{desc}</div>
                    <div className="main--btns">
                        <a href={`/watch/${item.id}`} className="main--btns-white">▶ Assistir</a>
                        <a href={`/list/add/${item.id}`} className="main--btns-dark">+ Minha Lista</a>
                    </div>
                    <div className="main--genres">
                        <strong>Gêneros:</strong> {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    );
}


export default MainMovie;