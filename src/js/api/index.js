import Promise from 'promise'

let store = {
    votes:0,
    users: [
        {email:'matej@visionect.com',password:'1234',token:'token1234'}
    ]
};

export class Api {

    constructor() {
        this.auth = window.localStorage.getItem("auth");
    }

    login(val) {
        return new Promise((resolve,reject) => {
            window.setTimeout(()=> {

                let user = store.users.find((o)=>{
                    return (o.email===val.email && o.password === val.password);
                });

                if (!user) {
                    reject(new Error('User does not exist'));
                    return;
                }


                this.auth = user.token;
                window.localStorage.setItem("auth", this.auth)
                resolve({
                    token:store.auth
                })
            },1000)
        })
    }

    register(val) {
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                let userExist = store.users.find((o) => {
                   return (o.email===val.email)
                });
                if (!userExist) {
                    store.users.push(
                        {email:val.email, password:val.password, token:val.password+'1234'}
                    )
                } else {
                    reject(new Error('User with this email already exists!'))
                }
            },1000)
        })
    }

    logout() {
        return new Promise((resolve,reject) => {
            window.setTimeout(()=> {

                this.auth = null;
                window.localStorage.setItem("auth", this.auth)


                resolve()
            },1000)
        })
    }


    isAuthenticated() {
        return this.auth !== null;
    }

    voteUp(id) {
        return new Promise((resolve,reject) => {
            window.setTimeout(()=> {
                store.votes ++;
                resolve({
                    votes:store.votes
                })
            },1000)
        })
    }
}

const api = new Api();
export default api;