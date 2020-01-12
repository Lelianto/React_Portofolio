import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/cartDetail.css';

class CartDetailTotalPrice extends React.Component {
    render() {
        return (
            <div>
                <div className='container' style={{paddingTop:'120px'}}>
                    <div className='col-md-12' style={{ backgroundColor: 'aliceblue', borderRadius: '5%', marginBottom:'250px' }}>
                        <div className='row' style={{ paddingTop:'25px', paddingLeft: '23px', paddingRight: '23px'}} >
                            <div className='col-md-6'>Subtotal</div>
                            <div className='col-md-6'>Rp 50000</div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12' style={{ paddingTop:'55px', marginBottom: '25px'}}>
                                <label>
                                    <button type="button" class="btn btn-success">Masukkan Ke Keranjang</button>
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default CartDetailTotalPrice;