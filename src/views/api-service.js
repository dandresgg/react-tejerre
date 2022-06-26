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

    static get_user_id(token) {
        return fetch("http://127.0.0.1:8000/users/profile/get_id", {
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
        return fetch(`http://127.0.0.1:8000/users/profile/${user_id}/`, {
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
        return fetch("http://127.0.0.1:8000/users/profile/update_profile/", {
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
        return fetch("http://127.0.0.1:8000/users/profile/ask_superuser/", {
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

        return fetch("http://127.0.0.1:8000/machine/main/", {
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

        return fetch("http://127.0.0.1:8000/machine/main/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }


    static sector(body) {

        return fetch("http://127.0.0.1:8000/machine/sector/", {
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

        return fetch("http://127.0.0.1:8000/machine/sector/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static sectorDetail(m_id) {

        return fetch(`http://127.0.0.1:8000/machine/sector/machine_sector/?m_id=${m_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }


    static part(body) {

        return fetch("http://127.0.0.1:8000/machine/part/", {
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

        return fetch(`http://127.0.0.1:8000/machine/part/${part_id}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }


    static partDetail(s_id) {

        return fetch(`http://127.0.0.1:8000/machine/part/sector_part/?s_id=${s_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static getPartFromReference(ref, sector) {

        return fetch(`http://127.0.0.1:8000/machine/part/id_from_reference/?ref=${ref}&sector=${sector}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => resp.json())
            .catch(error => console.log(error))
    }

    static createOrder(token, body) {
        return fetch("http://127.0.0.1:8000/orders/manage/", {
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
        return fetch(`http://127.0.0.1:8000/orders/manage/get_orders/?u_id=${u_id}`, {
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
        return fetch(`http://127.0.0.1:8000/orders/manage/${order_id}/`, {
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
        return fetch(`http://127.0.0.1:8000/orders/manage/${order_id}/`, {
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

        return fetch("http://127.0.0.1:8000/users/create/send_msm/", {
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
