import createStore from 'unistore';
import axios from 'axios';

const initialState = {
    isLoading:true,
    photo:'',
    nama_lengkap:'',
    email:'',
    kata_sandi:'',
    is_login: false,
    Bearer:''
}

export const store = createStore(initialState)

export const actions = store => ({
  changeInput : (state,e) => {
    store.setState({ [e.target.name]: e.target.value });
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
              store.setState({
                  "is_login": true
              });
          //   return response
        })
        .catch(error => {
            return false
    })
}
  });



