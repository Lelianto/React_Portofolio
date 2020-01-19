import createStore from 'unistore';
import axios from 'axios';

// Initialization global state
const initialState = {
  length_cart:0,
  id_payment:'',
  id_cart:'',
  id_user:'',
  adminAllPayment:[],
  userAllCart:[],
  adminAllCart:[],
  userData:[],
  cart_id:0,
  adminAllBook:[],
  allUser:[],
  bookOwn:[],
  kode_pemesanan:'',
  tanggal_pemesanan:'',
  total_pembayaran:'',
  userId:'',
  listResults:[],
  listCategory:[],
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
  totalBeli:[],
  stok:[],
  foto_buku:'',
  keyword:'',
  kategori:'',
  disable:true,
  address: true,
  nama_jalan:'',
  rt_rw:'',
  kelurahan:'',     
  kecamatan:'',
  kota_kabupaten:'', 
  provinsi:'',
  kode_pos:'',
  nomor_telepon:'',
  validasiPostBuku:false,
  validasiUpdateBuku:false,
  cart_content:true
}

export const store = createStore(initialState)

export const actions = store => ({
  changeInput : async (state,e) => {
    await store.setState({ [e.target.name]: e.target.value});
  },

  changeInputCart : async (state,e) => {
    await store.setState({ 
      'stok':{ id: e.target.id,
        [e.target.name]: e.target.value}
    });
    state.totalBeli.push(store.getState().stok)
  },

  // Function for Sign Up
  postSignUp : async (state) => {
      const nama_lengkap = state.nama_lengkap
      const kata_sandi = state.kata_sandi
      const email = state.email
      const mydata = {
          nama_lengkap: nama_lengkap,
          email: email,
          kata_sandi: kata_sandi
      };
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
          })
          .catch(error => {
              return false
      })
  },

  // Function for Login
  postLogin : async (state) => {
    const kata_sandi = state.kata_sandi
    const email = state.email
    const mydata = {
        email: email,
        kata_sandi: kata_sandi
    };

    const req = {
      method: "post",
      url: "http://0.0.0.0:1250/token",
      headers: {
        "Content-Type": "application/json"
      },
      data: mydata
    };

    await axios(req)
      .then(response => {
        localStorage.setItem("email", email);
        localStorage.setItem("is_login", true);
        localStorage.setItem("token", response.data.token);
      })
      .catch(error => {
          return false
    })
  },

  // Function for user upload book
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

    const req = {
      method: "post",
      url: "http://0.0.0.0:1250/book",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      data: mybook
    };
    await axios(req)
        .then(response => {
          store.setState({
            'validasiPostBuku':true
          })
          return response
        })
        .catch(error => {
          return false
    })
  },

  // Function for deleting Book
  deleteItem : async (state) => {
    const req = {
      method: "delete",
      url: "http://0.0.0.0:1250/book/edit/"+state.book_id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
            book_id:''
        })
      })
      .catch(error => {
        return false
    })
  },

  // Function for delete cart by user
  deleteCartItem : async (state) => {
    const req = {
      method: "delete",
      url: "http://0.0.0.0:1250/cart/product/"+state.cart_id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
            book_id:''
        })
    })
    .catch(error => {
        return false
    })
  },

  // Function for update book by user
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
    const req = {
      method: "put",
      url: "http://0.0.0.0:1250/book/edit/"+state.book_id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      data: mybook
    };
    await axios(req)
      .then(response => {
        localStorage.setItem('user_id', response.data.user_id)
        store.setState({
          'validasiUpdateBuku':true
        })
        return response
      })
      .catch(error => {
        return false
    })
  },

  // Function for add book to cart
  addCartItem : async (state) => {
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
    await axios(req)
      .then(response => {
        return response
      })
      .catch(error => {
        return false
    })
  },

  // Function for calculating total price
  Calculate : async (state) => {
    const req = {
      method: "get",
      url: "http://0.0.0.0:1250/cart/total",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
        .then(response => {
          store.setState({
            "total_price": response.data,
            "disable": false
          })
          return response
        })
        .catch(error => {
          return false
    })


  },

  // Function for getting expedition price
  CalculateExpeditionPrice : async (state) => {
    const nama_jalan = state.nama_jalan
    const rt_rw = state.rt_rw
    const kelurahan = state.kelurahan
    const kecamatan = state.kecamatan
    const kota_kabupaten = state.kota_kabupaten
    const provinsi = state.provinsi
    const kode_pos = state.kode_pos
    const nomor_telepon = state.nomor_telepon
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
    const req = {
      method: "post",
      url: "http://0.0.0.0:1250/payment/ongkir",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      data: myaddress
    };
    await axios(req)
      .then(response => {
        store.setState({
          'ongkos_kirim':response.data
        })
        return response
      })
      .catch(error => {
        return false
    })
  },

  // Function for getting final transaction price 
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
        store.setState({
          'total_pembayaran':response.data.total_biaya,
          'tanggal_pemesanan':response.data.tanggal_pemesanan,
          'kode_pemesanan':response.data.nomor_pemesanan
        })
        return response
      })
      .catch(error => {
        return false
    })
  },

  // Function for searching book by title or writer
  searchBook : async (state) => {
    const req = {
      method: "get",
      url: "http://0.0.0.0:1250/book/search?keyword="+store.getState().keyword,
    };
    await axios(req)
      .then(response => {
        store.setState({
          'listResults':response.data
        })
        return response
      })
      .catch(error => {
        return false
    })
  },

  // Function for searching and grouping user by category
  categoryBook : async (state,e) => {
    store.setState({ [e.target.name]: e.target.value });
    const req = {
      method: "get",
      url: "http://0.0.0.0:1250/book/category?keyword="+store.getState().kategori
    };

    await axios(req)
        .then(response => {
          store.setState({
            'listCategory':response.data
          })
        })
        .catch(error => {
          return false
    })
  },

  // Function for updating amount of buying item
  updateBuy : async (state) => {
    
    const listBuy = state.totalBeli
    for (const product of listBuy) {
      const buybook = {
        stok : product.stok
      };
      const req = {
        method: "put",
        url: "http://0.0.0.0:1250/cart/product/"+product.id,
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        },
        data: buybook
      };
      await axios(req)
          .then(response => {
            return response
          })
          .catch(error => {
            return false
      })
    }
  },

  // Function for deleting user by admin
  deleteUser : async (state,e) => {
    const req = {
      method: "delete",
      url: "http://0.0.0.0:1250/user/"+state.id_user,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
              id_user:''
          })
    })
      .catch(error => {
        return false
    })
  },

  // Function for deleting cart on user side
  deleteCart : async (state,e) => {
    const req = {
      method: "delete",
      url: "http://0.0.0.0:1250/cart/product/"+state.id_cart,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
          id_user:''
          })
      })
      .catch(error => {
        return false
    })
  }

  });



