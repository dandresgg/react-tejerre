// const REACT_APP_API_URL = "http://127.0.0.1:8000"
const REACT_APP_API_URL = "https://knitting-api.herokuapp.com"

export class Api {

    static async loginUser(body) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async singUpUser(body) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/users/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async get_user_id(token) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/users/profile/get_id`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async profile(token, user_id) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/users/profile/${user_id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async update_profile(token, body) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/users/profile/update_profile/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(body)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async ask_superuser(token, body) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/users/profile/ask_superuser/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(body)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async machine(body) {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/machine/main/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async machineList() {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/machine/main/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }


    static async sector(body) {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/machine/sector/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async sectorList() {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/machine/sector/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async sectorDetail(m_id) {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/machine/sector/machine_sector/?m_id=${m_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }


    static async part(body) {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/machine/part/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async partDetailPopup(part_id) {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/machine/part/${part_id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }


    static async partDetail(s_id) {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/machine/part/sector_part/?s_id=${s_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async getPartFromReference(ref, sector) {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/machine/part/id_from_reference/?ref=${ref}&sector=${sector}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async createOrder(token, body) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/orders/manage/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(body)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }


    static async getOrders(token, u_id) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/orders/manage/get_orders/?u_id=${u_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async deleteOrder(token, order_id) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/orders/manage/${order_id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(order_id)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async updateOrder(token, order_id, body) {
        try {
            const resp = await fetch(`${REACT_APP_API_URL}/orders/manage/${order_id}/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: body
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

    static async sendMsm(body) {

        try {
            const resp = await fetch(`${REACT_APP_API_URL}/users/create/send_msm/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            return await resp.json()
        } catch (error) {
            return console.log(error)
        }
    }

}
