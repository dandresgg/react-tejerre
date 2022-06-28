// const REACT_APP_API_URL = "http://127.0.0.1:8000"
const REACT_APP_API_URL = "https://knitting-api.herokuapp.com"

export class Api {

    static loginUser(body) {
        return fetch(`${REACT_APP_API_URL}/auth/`, {
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
        return fetch(`${REACT_APP_API_URL}/users/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static get_user_id(token) {
        return fetch(`${REACT_APP_API_URL}/users/profile/get_id`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static profile(token, user_id) {
        return fetch(`${REACT_APP_API_URL}/users/profile/${user_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static update_profile(token, body) {
        return fetch(`${REACT_APP_API_URL}/users/profile/update_profile/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static ask_superuser(token, body) {
        return fetch(`${REACT_APP_API_URL}/users/profile/ask_superuser/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static machine(body) {

        return fetch(`${REACT_APP_API_URL}/machine/main/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static machineList() {

        return fetch(`${REACT_APP_API_URL}/machine/main/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }


    static sector(body) {

        return fetch(`${REACT_APP_API_URL}/machine/sector/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static sectorList() {

        return fetch(`${REACT_APP_API_URL}/machine/sector/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static sectorDetail(m_id) {

        return fetch(`${REACT_APP_API_URL}/machine/sector/machine_sector/?m_id=${m_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }


    static part(body) {

        return fetch(`${REACT_APP_API_URL}/machine/part/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static partDetailPopup(part_id) {

        return fetch(`${REACT_APP_API_URL}/machine/part/${part_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }


    static partDetail(s_id) {

        return fetch(`${REACT_APP_API_URL}/machine/part/sector_part/?s_id=${s_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static getPartFromReference(ref, sector) {

        return fetch(`${REACT_APP_API_URL}/machine/part/id_from_reference/?ref=${ref}&sector=${sector}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static createOrder(token, body) {
        return fetch(`${REACT_APP_API_URL}/orders/manage/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }


    static getOrders(token, u_id) {
        return fetch(`${REACT_APP_API_URL}/orders/manage/get_orders/?u_id=${u_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static deleteOrder(token, order_id) {
        return fetch(`${REACT_APP_API_URL}/orders/manage/${order_id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static updateOrder(token, order_id, body) {
        return fetch(`${REACT_APP_API_URL}/orders/manage/${order_id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
            },
            body: body
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static sendMsm(body) {

        return fetch(`${REACT_APP_API_URL}/users/create/send_msm/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

}
