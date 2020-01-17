import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/carousel.css';
import { Link } from 'react-router-dom'
import promo1 from '../images/promo1.jpg';
import promo2 from '../images/promo2.jpg';
import promo3 from '../images/promo3.jpg';
import promo4 from '../images/promo4.jpg';
import promo5 from '../images/promo5.jpg';

class Carousel extends React.Component {

    render() {
        return (
            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" style={{paddingTop: '80px'}}>
                <div class="carousel-inner">
                    <div class="carousel-item active"><Link to='/discount'>
                        <img class="d-block w-100" src={promo1} alt="First slide" /></Link>
                    </div>
                    <div class="carousel-item"><Link to='/discount'>
                        <img class="d-block w-100" src={promo2} alt="Second slide" /></Link>
                    </div>
                    <div class="carousel-item"><Link to='/discount'>
                        <img class="d-block w-100" src={promo3} alt="Third slide"/></Link>
                    </div>
                    <div class="carousel-item"><Link to='/discount'>
                        <img class="d-block w-100" src={promo4} alt="Fourth slide"/></Link>
                    </div>
                    <div class="carousel-item"><Link to='/discount'>
                        <img class="d-block w-100" src={promo5} alt="Fifth slide"/></Link>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>
        )
    }
}

export default Carousel;