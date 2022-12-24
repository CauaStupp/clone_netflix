import {React, useState} from 'react';

import './MovieRow.css';

const MovieRow = ({title, items}) => {

    const [scrollX, setScrollX] = useState(0);

    const moveToLeft = () => {
        let scrollLeft = scrollX + Math.round(window.innerWidth / 2);

        if (scrollLeft > 0) {
            scrollLeft = 0;
        }
        setScrollX(scrollLeft);
    }

    const moveToRight = () => {
        let scrollRight = scrollX - Math.round(window.innerWidth / 2);
        let widthMax = items.results.length * 150;

        if ((window.innerWidth - widthMax) > scrollRight) {
            scrollRight = (window.innerWidth - widthMax) - 100;
        }
        setScrollX(scrollRight);
    }

    


    return (
        <div className='movieRow'>
            <h2>{title}</h2>

            <div className='movieRow--left' onClick={moveToLeft}> ◄ </div>
            <div className='movieRow--right' onClick={moveToRight}> ► </div>

            <div className='movieRow--listArea'>
                <div className='movieRow--list' style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className='movieRow--item'>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}></img>
                        </div> 
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieRow;