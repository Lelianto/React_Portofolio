import createStore from 'unistore';
import axios from 'axios';
// https://kutubuku.store
// Initialization global state
const initialState = {
  baseUrl:'http://0.0.0.0:5000',
  addCartStatus:'',
  adminProductKeyword:'',
  adminKeyword:'',
  lengthCart:0,
  paymentId:'', //id_payment (n)
  cartId:'', //id_cart (n)
  userId:'', //id_user (ada)
  adminAllPayment:[],
  userAllCart:[],
  adminAllCart:[],
  userData:[],
  userCartId:0, //cart_id (ada)
  adminAllBook:[],
  allUser:[],
  bookOwn:[],
  orderCode:'', //kode_pemesanan (ada)
  orderDate:'', //tanggal_pemesanan
  totalPayment:'', //total_pembayaran  
  listResults:[],
  listCategory:[],
  shippingCost:0,//ongkos_kirim  
  totalPrice:0, //total_price  
  carts:[],
  bookId:'',//book_id  
  books:[],
  bookById:[],
  userById:[],
  id:'',
  isLoading:true,
  token:'',
  photo:'',
  fullName:'',//nama_lengkap  
  email:'',
  password:'',//kata_sandi  
  isLogin: false,//is_login (ada)
  Bearer:'',
  title:'',
  writer:'',
  pageTitle:'',//judul_halaman
  totalPage:0, //jumlah_halaman
  publishDate:'',
  isbn:'',
  genre:'',
  bahasa:'',
  penerbit:'',
  berat:0,
  lebar:0,
  panjang:0,
  bookCover:'',
  status:'',
  harga:0,
  totalBeli:[],
  stok:[],
  bookPhoto:'',
  keyword:'',
  kategori:'',
  disable:true,
  address: true,
  streetName:'',
  rtRw:'',
  village:'', // kelurahan     
  region:'', // kecamatan
  cityState:'', // kota_kabupaten 
  province:'', // provinsi
  postalCode:'', //kode_pos
  phoneNumber:'', // nomor_telepon
  validasiPostBuku:false,
  validasiUpdateBuku:false,
  cartContent:true // cart_content
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
      const fullName= state.fullName      
      const password= state.password      
      const email = state.email
      const mydata = {
          nama_lengkap: fullName,
          email: email,
          kata_sandi: password      
      };
      const req = {
        method: "post",
        url: state.baseUrl+"/user",
        headers: {
          "Content-Type": "application/json"
        },
        data: mydata
      };

      await axios(req)
          .then(response => {
                store.setState({
                    "is_Lgin": true
                });
          })
          .catch(error => {
              return false
      })
  },

  // Function for Login
  postLogin : async (state) => {
    const password= state.password    
    const email = state.email
    const mydata = {
        email: email,
        kata_sandi: password    };

    const req = {
      method: "post",
      url: state.baseUrl+"/token",
      headers: {
        "Content-Type": "application/json"
      },
      data: mydata
    };

    await axios(req)
      .then(response => {
        localStorage.setItem("email", email);
        localStorage.setItem("is_Lgin", true);
        localStorage.setItem("token", response.data.token);
      })
      .catch(error => {
          return false
    })
  },

  // Function for user upload book
  postBook : async (state) => {
    const judul = state.title
    const penulis = state.writer
    const jumlah_halaman= state.totalPage    
    const tanggal_terbit = state.publishDate
    const isbn = state.isbn
    const genre = state.genre
    const bahasa = state.bahasa
    const penerbit = state.penerbit
    const berat = state.berat * 1
    const lebar = state.lebar * 1
    const panjang = state.panjang * 1
    const jenis_cover = state.bookCover
    const status = state.status
    const harga = state.harga * 1
    const stok = state.stok * 1
    const foto_buku = state.bookPhoto
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
      url: state.baseUrl+"/book",
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
      url: state.baseUrl+"/book/edit/"+state.book_Id,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
            book_Id:''
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
      url: state.baseUrl+"/cart/product/"+state.userCartId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
            book_Id:''
        })
    })
    .catch(error => {
        return false
    })
  },

  // Function for update book by user
  updateBook : async (state) => {
    const judul = state.title
    const penulis = state.writer
    const totalPage = state.totalPage    
    const tanggal_terbit = state.publishDate
    const isbn = state.isbn
    const genre = state.genre
    const bahasa = state.bahasa
    const penerbit = state.penerbit
    const berat = state.berat * 1
    const lebar = state.lebar * 1
    const panjang = state.panjang * 1
    const jenis_cover = state.bookCover
    const status = state.status
    const harga = state.harga * 1
    const stok = state.stok * 1
    const foto_buku = state.bookPhoto
    const sinopsis = state.sinopsis
    const mybook = {
      judul : judul,
      penulis : penulis,
      jumlah_halaman : totalPage,
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
      url: state.baseUrl+"/book/edit/"+state.book_I,
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
      url: state.baseUrl+"/cart/add",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      data: buybook
    };
    await axios(req)
      .then(response => {
        console.log(response.data.message)
        store.setState({
          'addCartStatus':response.data.message
        })
        // return response.data.message
      })
      .catch(error => {
        return false
    })
  },

  // Function for calculating total price
  Calculate : async (state) => {
    const req = {
      method: "get",
      url: state.baseUrl+"/cart/total",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
        .then(response => {
          store.setState({
            "totalPrice": response.data,
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
    const nama_jalan = state.streetName
    const rt_rw = state.rt_rw
    const kelurahan = state.village
    const kecamatan = state.region
    const kota_kabupaten = state.cityState
    const provinsi = state.province
    const kode_pos = state.postalCode
    const nomor_telepon = state.phoneNumber
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
      url: state.baseUrl+"/payment/ongkir",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      },
      data: myaddress
    };
    await axios(req)
      .then(response => {
        store.setState({
          'shippingCost':response.data
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
      url: state.baseUrl+"/payment_confirm/bill",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
          'totalPayment':response.data.total_biaya,
          'orderDate':response.data.tanggal_pemesanan,
          'orderCode':response.data.nomor_pemesanan
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
      url: state.baseUrl+"/book/search?keyword="+store.getState().keyword,
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
      url: state.baseUrl+"/book/category?keyword="+store.getState().kategori
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
        url: state.baseUrl+"/cart/product/"+product.id,
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
      url: state.baseUrl+"/user/"+state.userId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
              userId:''
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
      url: state.baseUrl+"/cart/product/"+state.cartId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
          userId:''
          })
      })
      .catch(error => {
        return false
    })
  }

  });



