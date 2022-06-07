export class Api {
    static loginUser(body) {
        return fetch("http://127.0.0.1:8000/auth/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }


    static singUpUser(body) {
        return fetch("http://127.0.0.1:8000/users/create/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static profile(token) {
        return fetch("http://127.0.0.1:8000/users/profile/details", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static getReplacementsList() {

        return fetch("http://127.0.0.1:8000/machines/parts/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }
}
