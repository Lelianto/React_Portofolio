import createStore from 'unistore';
import axios from 'axios';

/**
 *
 * @version 1.0.1
 * @author [Lelianto Eko Pradana](https://github.com/Lelianto)
 * 
 * @param initialState
 * @param {boolean} isSignUp User doing sign up status
 * @param {string} typeText Type of input password (password or text)
 * @param {list} bookEmptyStock Contains books with empty stock
 * @param {string} remainingBook 
 * @param {string} addCartStatus Contains response message of stock status
 * @param {string} adminProductKeyword
 * @param {string} adminKeyword
 * @param {integer} lengthCart
 * @param {string} paymentId 
 * @param {string} cartId
 * @param {string} userId 
 * @param adminAllPayment
 * @param userAllCart
 * @param adminAllCart
 * @param userData
 * @param {integer} userCartId 
 * @param adminAllBook
 * @param allUser
 * @param bookOwn
 * @param {string} orderCode
 * @param {string} orderDate 
 * @param {integer} totalPayment
 * @param listResults
 * @param listCategory
 * @param {integer} shippingCost
 * @param {integer} totalPrice
 * @param carts
 * @param bookId
 * @param books
 * @param bookById
 * @param userById
 * @param id
 * @param {boolean} isLoading
 * @param token
 * @param photo
 * @param fullName
 * @param email
 * @param password
 * @param {boolean} isLogin
 * @param {string} Bearer
 * @param {string} title
 * @param {string} writer
 * @param {string} pageTitle
 * @param {integer} totalPage
 * @param {string} publishDate
 * @param {string} isbn
 * @param {string} genre
 * @param {string} bahasa
 * @param {string} penerbit
 * @param {integer} berat
 * @param {integer} lebar
 * @param {integer} panjang
 * @param {string} bookCover
 * @param {string} status
 * @param {integer} harga
 * @param totalBeli
 * @param stok
 * @param {string} bookPhoto
 * @param {string} keyword
 * @param {string} kategori
 * @param {boolean} disable
 * @param {boolean} address
 * @param {string} streetName
 * @param {string} rtRw
 * @param {string} village   
 * @param {string} region 
 * @param {string} cityState
 * @param {string} province 
 * @param {string} postalCode 
 * @param {string} phoneNumber
 * @param {boolean} validasiPostBuku
 * @param {boolean} validasiUpdateBuku
 * @param {boolean} cartContent
 * @param {integer} newSubTotal
 * @param newTotalPrice
 */

const initialState = {
  discount:'',
  isSignUp:false,
  typeText:'password',
  bookEmptyStock:[],
  baseUrl:'https://kutubuku.store',
  remainingBook:'',
  addCartStatus:'',
  adminProductKeyword:'',
  adminKeyword:'',
  lengthCart:0,
  paymentId:'', 
  cartId:'',
  userId:'', 
  adminAllPayment:[],
  userAllCart:[],
  adminAllCart:[],
  userData:[],
  userCartId:0, 
  adminAllBook:[],
  allUser:[],
  bookOwn:[],
  orderCode:'',
  orderDate:'', 
  totalPayment:'',
  listResults:[],
  listCategory:[],
  shippingCost:0,
  totalPrice:0,
  carts:[],
  bookId:'',
  books:[],
  bookById:[],
  userById:[],
  id:'',
  isLoading:true,
  token:'',
  photo:'',
  fullName:'',
  email:'',
  password:'',
  isLogin: false,
  Bearer:'',
  title:'',
  writer:'',
  pageTitle:'',
  totalPage:0,
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
  village:'',   
  region:'', 
  cityState:'',
  province:'', 
  postalCode:'', 
  phoneNumber:'',
  validasiPostBuku:false,
  validasiUpdateBuku:false,
  cartContent:true,
  newSubTotal:0,
  newTotalPrice:[] 
}

export const store = createStore(initialState)

export const actions = store => ({
  changeInput : async (state,e) => {
    await store.setState({ [e.target.name]: e.target.value});
  },

  changeInputDiscount : async (state,e) => {
    await store.setState({ [e.target.name]: e.target.value});
  },

  changeInputCart : async (state,e, index, price) => {
    if(`${e.target.value}`.length>0){
      store.setState({
        disable:false
      })
    } else{
      store.setState({
        disable:true
      })
    }
    const u = store.getState().newTotalPrice
    u[index] = e.target.value * 1 * price
    const sum = u.reduce((firstIndex, toLastIndex)=> firstIndex + toLastIndex ,0)

    store.setState({ newSubTotal : sum })
    await store.setState({ 
      'stok':{ id: e.target.id,
        [e.target.name]: e.target.value}
    });
    state.totalBeli.push(store.getState().stok)
  },

  /**
   * @function postSignUp user sign up
   *    a function to post user data to the database. 
   *    here, the user does the account registration. 
   * @method post
   * @returns response by API endpoint 
  */
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
                isSignUp: true
            });
        })
        .catch(error => {
          return false
      })
  },

  /**
   * @function postLogin user sign in
   *    a function to post user data to the database. 
   *    here, the user enters a personal account. 
   * @method post
   * @returns response by API endpoint (user login)
  */
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
        localStorage.setItem("isLogin", true);
        localStorage.setItem("token", response.data.token);
      })
      .catch(error => {
          return false
    })
  },

  /**
   * @function postBook 
   *    a function used by users to upload books. 
   * @method post
   * @returns response by API endpoint (user post a book)
  */
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

  /**
   * @function deleteItem 
   *    a function to delete books by user or admin. 
   * @method delete
   * @returns response by API endpoint (delete book by ID)
  */
  deleteItem : async (state) => {
    const req = {
      method: "delete",
      url: state.baseUrl+"/book/edit/"+state.bookId,
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };
    await axios(req)
      .then(response => {
        store.setState({
            bookId:''
        })
      })
      .catch(error => {
        return false
    })
  },

  /**
   * @function deleteCartItem 
   *    a function to delete cart by user or admin. 
   * @method delete
   * @returns response by API endpoint (delete cart by ID)
  */
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
            bookId:''
        })
    })
    .catch(error => {
        return false
    })
  },

  /**
   * @function updateBook 
   *    a function to update book by user. 
   * @method put
   * @returns response by API endpoint (update book by ID)
  */
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
      url: state.baseUrl+"/book/edit/"+state.bookId,
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

  /**
   * @function addCartItem 
   *    a function to add product to cart by user. 
   * @method post
   * @returns response by API endpoint (add product to cart database)
  */
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
        store.setState({
          'addCartStatus':response.data.message
        })
      })
      .catch(error => {
        return false
    })
  },

  /**
   * @function Calculate 
   *    a function for calculating total price. 
   * @method post
   * @returns response by API endpoint (add product to cart database)
  */
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

  /**
   * @function CalculateExpeditionPrice 
   *    a function for getting expedition price.
   * @method post
   * @returns response by API endpoint (add product to cart database)
  */
  CalculateExpeditionPrice : async (state) => {
    const nama_jalan = state.streetName
    const rt_rw = state.rtRw
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
    console.log('request ongkir',req)
    await axios(req)
      .then(response => {
        console.log('response ongkir',response.data)
        store.setState({
          'shippingCost':response.data
        })
        return response
      })
      .catch(error => {
        console.log(error)
        return false
    })
  },

  /**
   * @function FinalTransactionPayment 
   *    a function for getting final transaction price . 
   * @method post
   * @returns response by API endpoint (add product to cart database)
  */
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
          'totalPayment':state.totalPayment,
          'orderDate':response.data.tanggal_pemesanan,
          'orderCode':response.data.nomor_pemesanan
        })
        return response
      })
      .catch(error => {
        return false
    })
  },

  /**
   * @function searchBook 
   *    a function for searching book by title or writer. 
   * @method get
   * @returns response by API endpoint (list of books by searching keyword)
  */
  searchBook : async (state) => {
    const req = {
      method: "get",
      url: state.baseUrl+"/book/search?keyword="+store.getState().keyword,
    };
    console.log(req)
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

  /**
   * @function categoryBook 
   *    a function for searching and grouping user by category.
   * @method get
   * @returns response by API endpoint (list of books by category)
  */
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

  /**
   * @function updateBuy 
   *    a function for updating amount of buying item. 
   * @method put
   * @returns response by API endpoint (update cart by id)
  */
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
            const listInCart = store.getState().carts.filter(item => {
              if (item.id === product.id && item.email === localStorage.getItem('email') && item.foto_buku !== null && item.judul !== null && item.harga !== null && item.status_cart === false && item.berat !== null) {
                  return item;
              }
              return false
            })
            const listBooks = []
            for(const book of listInCart){
              if(response.data.message==='stok buku tidak mencukupi' && book.book_id){
                listBooks.push(book.judul)
              }
            }
            store.setState({
              bookEmptyStock:listBooks
            })
          })
          .catch(error => {
            return false
      })
    }
  },

  // Function for deleting user by admin
  /**
   * @function deleteUser 
   *    a function for deleting user by admin. 
   * @method delete
   * @returns response by API endpoint (delete user by id)
  */
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

  /**
   * @function deleteCart 
   *    a function for deleting cart on user side. 
   * @method delete
   * @returns response by API endpoint (delete product in cart by id)
  */
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
  },

  /**
   * @function searchPayment 
   *    a function for searching payment by admin. 
   * @method get
   * @returns response by API endpoint (get payment code or date by user)
  */
  searchPayment : async (state) => {
    const req = {
      method: "get",
      url: state.baseUrl+"/payment_confirm/code?keyword="+store.getState().keyword
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
  }

  });



