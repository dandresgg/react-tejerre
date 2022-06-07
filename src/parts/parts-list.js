import React from 'react';
import '../css/img.css'
import '../css/list.css'

function PartList(props) {
    const tableTitles = ['descripcion', 'codigo', 'precio', 'imagen', 'inventario']
    function TitlesGroup() {
        return (
            <div className='list-parts d-flex space-a center bg-lightb'>
                {tableTitles.map(title => (
                    <div className='mayus bold white center' key={title}>
                        <h6>{title}</h6>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div className='main-img display-list'>
            <div className='center fit ' id="parts-list" >
                <TitlesGroup></TitlesGroup>
                <div className="ls-components" >
                    {props.parts && props.parts.map(part => {
                        return (
                            <div key={part.code}>
                                <div className='list-parts' key={part.id}>
                                    <h6>{part.description}</h6>
                                    <h6>{part.code}</h6>
                                    <h6>$ {part.price}</h6>
                                    <img src={part.img_url} alt="" />
                                    <h6>inventario</h6>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PartList;
