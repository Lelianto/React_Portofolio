import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/style.css';
import promo1 from '../images/promo1.jpg';
import promo2 from '../images/promo2.jpg';
import promo3 from '../images/promo3.jpg';
import promo4 from '../images/promo4.jpg';
import promo5 from '../images/promo5.jpg';
import swal from 'sweetalert';

const listPhoto = [promo1,promo2,promo3,promo4,promo5]

class PromoDiscount extends React.Component{
    checkDiscount = async (photo) =>{
        if (photo == promo1){
            swal("KODE PROMO: ABCD", "Dapatkan diskon 2% dari total pembelian!", "success");
        } else if (photo == promo2){
            swal("KODE PROMO: BCDE", "Dapatkan diskon 4% dari total pembelian!", "success");
        } else if (photo == promo3){
            swal("KODE PROMO: CDEF", "Dapatkan diskon 6% dari total pembelian!", "success");
        } else if (photo == promo4){
            swal("KODE PROMO: DEFG", "Dapatkan diskon 8% dari total pembelian!", "success");
        } else if (photo == promo5){
            swal("KODE PROMO: EFGH", "Dapatkan diskon 10% dari total pembelian!", "success");
        }
    }
    render () {
    return (
        <body>
            <div className="container">
                <div className='row' style={{marginBottom:'30px', paddingTop:'120px'}}>
                    <div className='col-md-12' style={{textAlign:'center', paddingBottom:'20px'}}>
                        <h1> Daftar Promo dan Diskon</h1>
                    </div>
                {listPhoto.map((photo,i)=>
                    <div className='col-md-6 imagepromo'>
                        <img onClick={()=>this.checkDiscount(photo)} style={{width:'100%'}} src={photo} alt=""/>
                    </div>
                    )}
                </div>
            </div>
        </body>
    )
    }
}

export default PromoDiscount
