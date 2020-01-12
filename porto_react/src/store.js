import createStore from 'unistore';
import axios from 'axios';

const initialState = {
    bookById:[],
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
    await console.warn('berat',state.berat)
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
          // console.log('cek token', response.data.token)
              // store.setState({
              //     "is_login": true,
              //     "token":response.data.token
              // });
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
          return response
        })
        .catch(error => {
          return false
    })
  },

  getItem: state => {
    axios
      .get("http://api.raden.top/barang/barangpelapak")
      .then(response => {
        store.setState({ data: response.data });
        console.log(response);
      })
      .catch(error => {
        console.log("terdapat eror ini :", error);
      });
  },


  });



