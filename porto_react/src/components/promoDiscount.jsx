import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/style.css';
import promo1 from '../images/promo1.jpg';
import promo2 from '../images/promo2.jpg';
import promo3 from '../images/promo3.jpg';
import promo4 from '../images/promo4.jpg';
import promo5 from '../images/promo5.jpg';

const listPhoto = [promo1,promo2,promo3,promo4,promo5]

const PromoDiscount = () =>{
    return (
        <body>
            <div className="container">
                <div className='row' style={{marginBottom:'30px', paddingTop:'120px'}}>
                    <div className='col-md-12' style={{textAlign:'center', paddingBottom:'20px'}}>
                        <h1> Daftar Promo dan Diskon</h1>
                    </div>
                {listPhoto.map((photo,i)=>
                    <div className='col-md-6 imagepromo'>
                        <img style={{width:'100%'}} src={photo} alt=""/>
                    </div>
                    )}
                </div>
            </div>
        </body>
    )
}

export default PromoDiscount
