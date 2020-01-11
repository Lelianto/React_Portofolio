import React from 'react';
import '../styles/bootstrap.min.css';
import '../styles/bookDetail.css';
import bookphoto from '../images/book.jpg'


class BookDetail extends React.Component {
    render() {
        return (
            <div>
                <div className='container' style={{marginTop:'30px'}}>
                    <div className='row'>
                        <div className='col-md-4 book-photo'>
                            <img style={{width:'100%'}} src={bookphoto}></img>
                        </div>
                        <div className='col-md-5'>
                            <div className='row'>
                                <div className='col-sm-12 book-title'>Nanti Kita Cerita Tentang Hari Ini</div>
                                <div className='col-sm-12 book-status'>STATUS</div>
                                <div className='col-sm-12 book-writer'>MARCHELLA FP</div>
                                <div className='col-sm-12'>
                                    <div className='row list-detail'>
                                        <div className='col-sm-5 book-detail-content'>Jumlah Halaman</div>
                                        <div className='col-sm-7 book-detail-content'>255</div>
                                        <div className='col-sm-5 book-detail-content'>Tanggal Terbit</div>
                                        <div className='col-sm-7 book-detail-content'>16-09-2019</div>
                                        <div className='col-sm-5 book-detail-content'>ISBN</div>
                                        <div className='col-sm-7 book-detail-content'>9723792340029347</div>
                                        <div className='col-sm-5 book-detail-content'>Genre</div>
                                        <div className='col-sm-7 book-detail-content'>Romantis</div>
                                        <div className='col-sm-5 book-detail-content'>Bahasa</div>
                                        <div className='col-sm-7 book-detail-content'>Indonesia</div>
                                        <div className='col-sm-5 book-detail-content'>Penerbit</div>
                                        <div className='col-sm-7 book-detail-content'>Gramedia</div>
                                        <div className='col-sm-5 book-detail-content'>Berat</div>
                                        <div className='col-sm-7 book-detail-content'>0.215 kg</div>
                                        <div className='col-sm-5 book-detail-content'>Lebar</div>
                                        <div className='col-sm-7 book-detail-content'>14.0 cm</div>
                                        <div className='col-sm-5 book-detail-content'>Panjang</div>
                                        <div className='col-sm-7 book-detail-content'>20.0 cm</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3' style={{ backgroundColor: 'aliceblue', borderRadius: '5%', marginBottom:'250px' }}>
                            <div className='row' style={{ paddingTop:'25px', paddingLeft: '10px', paddingRight: '10px'}} >
                                <div className='col-md-6'>Soft-Cover</div>
                                <div className='col-md-6'>Rp 50000</div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12' style={{ paddingTop:'55px'}}>
                                    <label>
                                        <button type="button" class="btn btn-success">Masukkan Ke Keranjang</button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 book-description'>Deskripsi</div>
                        <div className='col-md-12 book-description-content'>"Nanti kita cerita tentang hari ini... Besok kita buat yang lebih baik lagi." @nkcthi

Buku visual grafis, yang menceritakan tentang perempuan bernama Awan (27th) yang takut akan lupa rasanya menjadi muda, jadi dia membuat surat yang dia kirim untuk masa depan. Sebagai pengingat untuk dia dan anaknya kelak.

Berisikan kumpulan pesan dan cerita dari yang ia hadapi dan lihat. Awan mencoba sederhanakan dari pelajaran yang dia hadapin di masa mudanya.

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookDetail;