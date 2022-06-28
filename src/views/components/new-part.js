import React, {useEffect, useState} from "react";
import {ButtonSign, InputSign, Selector} from '../../css/btn';
import {Api} from "../api-service";

export const NewPart = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [sectors, setSectors] = useState([]);
    const [sector, setSector] = useState('');

    useEffect(() => {
        Api.sectorList().then(resp => setSectors(resp));
        Api.sectorList().then(resp => setSector(resp[0]['id']));
    }, [])

    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [img, setImg] = useState('');
    const [photo, setPhoto] = useState('');
    const [seller, setSeller] = useState('');

    const handleDescription = () => evt => {setDescription(evt.target.value);}
    const handleCode = () => evt => {setCode(evt.target.value);}
    const handlePrice = () => evt => {setPrice(evt.target.value);}
    const handleStock = () => evt => {setStock(evt.target.value);}
    const handleImg = () => evt => {setImg(evt.target.value);}
    const handlePhoto = () => evt => {setPhoto(evt.target.value);}
    const handleSeller = () => evt => {setSeller(evt.target.value);}

    function handleError(resp) {
        for (let e in resp) {
            setErrorMessage(e + ':' + resp[e])
        }

    }

    function createPart() {
        Api.part({
            sector: sector,
            description: description,
            code: code,
            price: price,
            stock: stock,
            img: img,
            photo: photo,
            url_seller: seller,
        }).then(resp => handleError(resp))
    }

    return (
        <div>
            <h3 className='mayus gray'>nuevo repuesto</h3>
            {errorMessage && <div className="alert-danger">{errorMessage}</div>}
            <h5 className='m-0 gray mayus'>sector</h5>
            <Selector
                onChange={(e) => setSector(e.target.value)}
            >
                {sectors.map(elem => (
                    <option key={elem.kind} value={elem.id}>
                        {elem.kind}
                    </option>
                ))}
            </Selector>
            <br />
            <InputSign type="text" placeholder="Descripcion" id="description"
                defaultValue="" onChange={handleDescription()} />
            <br />
            <InputSign type="number" placeholder="Codigo" id="code"
                defaultValue="" onChange={handleCode()} />
            <br />
            <InputSign type="number" placeholder="Price" id="price"
                defaultValue="" onChange={handlePrice()} />
            <br />
            <InputSign type="number" placeholder="Stock" id="stock"
                defaultValue="" onChange={handleStock()} />
            <br />
            <InputSign type="text" placeholder="Imagen" id="img"
                defaultValue="" onChange={handleImg()} />
            <br />
            <InputSign type="text" placeholder="Photo" id="photo"
                defaultValue="" onChange={handlePhoto()} />
            <br />
            <InputSign type="text" placeholder="Seller" id="photo"
                defaultValue="" onChange={handleSeller()} />
            <br />
            <ButtonSign onClick={createPart}>crear</ButtonSign>
        </div>
    )
}
