import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';
import photo from '../images/book.jpg'

const perulangan = ['1','2','3','4']

class CartDetail extends React.Component {
    render() {
        return (
            <div>
                <div className='container' style={{marginTop:'30px'}}>
                    <div className='row'>
                        {perulangan.map((number,i)=>
                        <div>
                            <div className='col-md-12 cart-book-detail'>
                                <div className='col-sm-3'>
                                    <img style={{width:'100%'}} src={photo}></img>
                                </div>
                                <div className='col-sm-5'>
                                    <div className='row'>
                                        <div className='col-sm-12 detail-book-cart'>
                                            Judul
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12 detail-book-cart'>
                                            Penulis
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12 detail-book-cart'>
                                            Jenis Cover
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-12 detail-book-cart'>
                                            Harga
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-3'>
                                    <div className='col-sm-12' style={{fontSize: '11px', marginBottom: '10px'}}>Tuliskan Jumlah Buku</div>
                                    <div>
                                    <textarea name="jumlah" pattern="[1-9]{1,30}" id="jumlah"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-1'>
                            </div>
                        </div>
                        )}
                        <div>
                            <div className='col-md-12' style={{ paddingTop:'25px', marginBottom: '25px'}}>
                                <label>
                                    <button type="button" class="btn btn-success">Finalisasi Jumlah Beli</button>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CartDetail;