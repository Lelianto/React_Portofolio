import createStore from 'unistore';
import axios from 'axios';

const initialState = {
    ongkos_kirim:0,
    total_price:0,
    carts:[],
    book_id:'',
    books:[],
    bookById:[],
    userById:[],
    id:'',
    isLoading:true,
    token:'',
    photo:'',
    nama_lengkap:'',
    email:'',
    kata_sandi:'',
    is_login: false,
    Bearer:'',
    judul:'',
    penulis:'',
    jumlah_halaman:'',
    tanggal_terbit:'',
    isbn:'',
    genre:'',
    bahasa:'',
    penerbit:'',
    berat:0,
    lebar:0,
    panjang:0,
    jenis_cover:'',
    status:'',
    harga:0,
    stok:0,
    foto_buku:'',
}

export const store = createStore(initialState)

export const actions = store => ({
  changeInput : async (state,e) => {
    await store.setState({ [e.target.name]: e.target.value });
    // await console.warn('name',[e.target.name])
    // await console.warn('value',e.target)
  },

  postSignUp : async (state) => {
      const nama_lengkap = state.nama_lengkap
      const kata_sandi = state.kata_sandi
      const email = state.email
      const mydata = {
          nama_lengkap: nama_lengkap,
          email: email,
          kata_sandi: kata_sandi
      };
    //   console.warn('isi nama lengkap', nama_lengkap)

      const req = {
        method: "post",
        url: "http://0.0.0.0:1250/user",
        headers: {
          "Content-Type": "application/json"
        },
        data: mydata
      };

      await axios(req)
          .then(response => {
                store.setState({
                    "is_login": true
                });
            //   return response
          })
          .catch(error => {
              return false
      })
  },

  postLogin : async (state) => {
    const kata_sandi = state.kata_sandi
    const email = state.email
    const mydata = {
        email: email,
        kata_sandi: kata_sandi
    };
    console.warn('isi email', email)

    const req = {
      method: "post",
      url: "http://0.0.0.0:1250/token",
      headers: {
        "Content-Type": "application/json"
      },
    //   params: {

    //   }
      data: mydata
    };

    await axios(req)
        .then(response => {
          console.log('cek token', response.data)
              // localStorage.setItem("id", response.data.id);
              localStorage.setItem("email", email);
              localStorage.setItem("is_login", true);
              localStorage.setItem("token", response.data.token);
          // console.log('cek state token', store.getState().token)
        })
        .catch(error => {
            return false
    })
  },

  postBook : async (state) => {
    const judul = state.judul
    const penulis = state.penulis
    const jumlah_halaman = state.jumlah_halaman
    const tanggal_terbit = state.tanggal_terbit
    const isbn = state.isbn
    const genre = state.genre
    const bahasa = state.bahasa
    const penerbit = state.penerbit
    const berat = state.berat * 1
    const lebar = state.lebar * 1
    const panjang = state.panjang * 1
    const jenis_cover = state.jenis_cover
    const status = state.status
    const harga = state.harga * 1
    const stok = state.stok * 1
    const foto_buku = state.foto_buku
    const sinopsis = state.sinopsis
    const mybook = {
      judul : judul,
      penulis : penulis,
      jumlah_halaman : jumlah_halaman,
      tanggal_terbit : tanggal_terbit,
      isbn : isbn,
      genre : genre,
      bahasa : bahasa,
      penerbit : penerbit,
      berat : berat,
      lebar : lebar,
      panjang : panjang,
      jenis_cover : jenis_cover,
      status : status,
      harga : harga,
      stok : stok,
      foto_buku : foto_buku,
      sinopsis : sinopsis
    };
    console.log('isi berat', typeof(berat))

    const req = {
      method: "post",
      url: "http://0.0.0.0:1250/book",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      data: mybook
    };
    console.warn('isi local token',localStorage.getItem('token'))
    console.warn('isi mybook', mybook)
    await axios(req)
        .then(response => {
          console.log('user id', response.data.user_id)
          // localStorage.setItem('user_id', response.data.user_id)
          return response
        })
        .catch(error => {
          return false
    })
  },

  deleteItem : async (state) => {
    const req = {
      method: "delete",
      url: "http://0.0.0.0:1250/book/edit/"+state.book_id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    console.log('isi req delete', req)
    await axios(req)
        .then(response => {
          console.log('cek token', response.data)
              // localStorage.setItem("id", response.data.id);
              store.setState({
                  book_id:''
              })
          // console.log('cek state token', store.getState().token)
        })
        .catch(error => {
            return false
    })
  },

  updateBook : async (state) => {
    const judul = state.judul
    const penulis = state.penulis
    const jumlah_halaman = state.jumlah_halaman
    const tanggal_terbit = state.tanggal_terbit
    const isbn = state.isbn
    const genre = state.genre
    const bahasa = state.bahasa
    const penerbit = state.penerbit
    const berat = state.berat * 1
    const lebar = state.lebar * 1
    const panjang = state.panjang * 1
    const jenis_cover = state.jenis_cover
    const status = state.status
    const harga = state.harga * 1
    const stok = state.stok * 1
    const foto_buku = state.foto_buku
    const sinopsis = state.sinopsis
    const mybook = {
      judul : judul,
      penulis : penulis,
      jumlah_halaman : jumlah_halaman,
      tanggal_terbit : tanggal_terbit,
      isbn : isbn,
      genre : genre,
      bahasa : bahasa,
      penerbit : penerbit,
      berat : berat,
      lebar : lebar,
      panjang : panjang,
      jenis_cover : jenis_cover,
      status : status,
      harga : harga,
      stok : stok,
      foto_buku : foto_buku,
      sinopsis : sinopsis
    };
    console.log('isi berat', typeof(berat))

    const req = {
      method: "put",
      url: "http://0.0.0.0:1250/book/edit/"+state.book_id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      data: mybook
    };
    console.warn('isi local token',localStorage.getItem('token'))
    console.warn('isi mybook', mybook)
    await axios(req)
        .then(response => {
          console.log('user id', response.data.user_id)
          localStorage.setItem('user_id', response.data.user_id)
          return response
        })
        .catch(error => {
          return false
    })
  },

  addCartItem : async (state) => {
    console.log('ISI STATE ADD CART', state.bookById)
    const book_id = state.bookById.id
    const judul = state.bookById.judul
    const penulis = state.bookById.penulis
    const jenis_cover = state.bookById.jenis_cover
    const foto_buku = state.bookById.foto_buku
    const harga = state.bookById.harga
    const stok = 1
    const berat = state.bookById.berat
    const status_jual = state.bookById.status
    const buybook = {
      book_id : book_id,
      judul : judul,
      penulis : penulis,
      berat : berat,
      jenis_cover : jenis_cover,
      harga : harga,
      stok : stok,
      foto_buku : foto_buku,
      status_jual : status_jual
    };
    const req = {
      method: "post",
      url: "http://0.0.0.0:1250/cart/add",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      data: buybook
    };
    console.log('CEK ISI BUY BOOK', buybook)
    await axios(req)
        .then(response => {
          console.log('data di CART', response.data)
          return response
        })
        .catch(error => {
          return false
    })
  },

  Calculate : async (state) => {
    const req = {
      method: "get",
      url: "http://0.0.0.0:1250/cart/total",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    console.log(req)
    await axios(req)
        .then(response => {
          store.setState({
            "total_price": response.data
          })
          console.log('isi', response.data)
          return response
        })
        .catch(error => {
          return false
    })


  },

  CalculateExpeditionPrice : async (state) => {
    const nama_jalan = state.nama_jalan
    const rt_rw = state.rt_rw
    const kelurahan = state.kelurahan
    const kecamatan = state.kecamatan
    const kota_kabupaten = state.kota_kabupaten
    const provinsi = state.provinsi
    const kode_pos = state.kode_pos
    const nomor_telepon = state.nomor_telepon
    console.log('KOTA', kota_kabupaten)
    const myaddress = {
      nama_jalan: nama_jalan,
      rt_rw: rt_rw,
      kelurahan: kelurahan,
      kecamatan : kecamatan,
      kota_kabupaten : kota_kabupaten,
      provinsi : provinsi,
      kode_pos : kode_pos,
      nomor_telepon : nomor_telepon
    };
    console.log('isi my address', myaddress)

    const req = {
      method: "post",
      url: "http://0.0.0.0:1250/payment/ongkir",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      data: myaddress
    };
    console.warn('isi local token',localStorage.getItem('token'))
    console.warn('isi mybook', myaddress)
    await axios(req)
        .then(response => {
          console.log('ongkir', response.data)
          store.setState({
            'ongkos_kirim':response.data
          })
          // localStorage.setItem('user_id', response.data.user_id)
          return response
        })
        .catch(error => {
          return false
    })
  },

  FinalTransactionPayment : async (state) => {
    const req = {
      method: "post",
      url: "http://0.0.0.0:1250/payment_confirm/bill",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };

    await axios(req)
        .then(response => {
          console.log('isi final payment',response.data)
          return response
        })
        .catch(error => {
          return false
    })
  },

  });



