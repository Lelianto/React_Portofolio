import React from 'react';
import '../styles/userUploadBook.css';
import '../styles/bootstrap.min.css'
import { store } from '../store'

const allGenres = ['Romantis','Sejarah','Teenlit','Drama','Fantasi','Chicklit','Komedi','Misteri','Songlit','Thriller','Fan-Fiction','Dewasa','Horor','Petualangan','Metropop']

class UserUpload extends React.Component {
    // Function for uploading book by user
    doAddBook = async () => {
        await this.props.postBook()
        if (store.getState().validasiPostBuku){
            this.props.history.push("/profile");
        }
    }
    
    render() {
        return (
            <div className="container wrapper-new fadeInDown" style={{paddingTop:'100px'}}>
            <div className='row'>
            <div id="">
                <div className="fadeIn first">
                    <h3 style={{ marginTop:'30px', marginBottom:'30px', textAlign:'center'}} id="icon" alt="User Icon">Selamat Menjadi Writerpreneur!</h3>
                </div>

                    {/* <!-- Login Form --> */}
                    <form onSubmit={e => e.preventDefault()}>
                        <input 
                        type="text" 
                        id="title"  
                        name="title" 
                        placeholder="Masukkan Judul Buku"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="writer"  
                        name="writer" 
                        placeholder="Masukkan Nama Penulis"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="totalPage"  
                        name="totalPage" 
                        placeholder="Masukkan Jumlah Halaman"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="publishDate"  
                        name="publishDate" 
                        placeholder="Masukkan Tanggal Terbit"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="isbn"  
                        name="isbn" 
                        placeholder="Masukkan Nomor ISBN"
                        onChange={e => this.props.changeInput(e)} required/>

                        <div class="form-group" style={{marginTop:'10px'}}>
                            <label for="exampleFormControlSelect1">Pilih Genre Bukumu</label>
                            <select class="form-control" id="exampleFormControlSelect1" name='genre' onChange={e => this.props.changeInput(e)}required>
                                <option value=''>Pilihan</option>
                                {allGenres.map((genre,i) =>
                                <option value={genre}>{genre}</option>
                                )}
                            </select>
                        </div>

                        <div class="form-group" style={{marginTop:'10px'}}>
                            <label for="exampleFormControlSelect1">Pilih Bahasa Bukumu</label>
                            <select class="form-control" id="exampleFormControlSelect1" name='bahasa' onChange={e => this.props.changeInput(e)} required>
                                <option value=''>Pilihan</option>
                                <option value='Bahasa Indonesia'>Bahasa Indonesia</option>
                                <option value='Bahasa Inggris'>Bahasa Inggris</option>
                            </select>
                        </div>

                        <input 
                        type="text" 
                        id="penerbit"  
                        name="penerbit" 
                        placeholder="Masukkan Penerbit Buku"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="berat"  
                        name="berat" 
                        placeholder="Masukkan Berat Buku (kg)"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="lebar"  
                        name="lebar" 
                        placeholder="Masukkan Lebar Buku (cm)"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="panjang"  
                        name="panjang" 
                        placeholder="Masukkan Panjang Buku (cm)"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="bookCover"  
                        name="bookCover" 
                        placeholder="Masukkan Jenis Sampul (Soft Cover atau Hard Cover)"
                        onChange={e => this.props.changeInput(e)} required/>

                        <div class="form-group" style={{marginTop:'10px'}}>
                            <label for="exampleFormControlSelect1">Pilih Status Bukumu</label>
                            <select class="form-control" id="exampleFormControlSelect1" name='status' onChange={e => this.props.changeInput(e)} required>
                                <option value=''>Pilihan</option>
                                <option value='Ready Stock' >Ready Stock</option>
                                <option value='Pre-Order'>Pre-Order</option>
                            </select>
                        </div>

                        <input 
                        type="text" 
                        id="harga"  
                        name="harga" 
                        placeholder="Masukkan Harga Buku"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="stok"  
                        name="stok" 
                        placeholder="Masukkan Stok Buku"
                        onChange={e => this.props.changeInput(e)} required/>

                        <input 
                        type="text" 
                        id="bookPhoto"  
                        name="bookPhoto" 
                        placeholder="Masukkan Foto Buku"
                        onChange={e => this.props.changeInput(e)} required/>

                        <textarea class="form-control" id="sinopsis" name='sinopsis' rows="3" placeholder='Masukkan Sinopsis Buku' onChange={e => this.props.changeInput(e)} required></textarea>

                        <input 
                        style={{marginTop:'20px'}}
                        type="submit" 
                        className="fadeIn fourth" 
                        value="Mulai Jual Buku" 
                        onClick={this.doAddBook}/>
                    </form>
            </div>
            </div>
            </div>
        )
    }
}

export default UserUpload;