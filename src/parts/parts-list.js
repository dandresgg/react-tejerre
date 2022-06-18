import React from 'react';
import '../css/img.css';
import '../css/list.css';

function PartList(props) {
    const tableTitles = ['descripcion', 'referencia', 'precio', 'imagen', 'inventario']
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
    const clickedPart = part_id => {
        props.clickedPart(part_id)
    }
    return (
        <div className='main-img display-list'>
            <div className='center fit ' id="parts-list" >
                <TitlesGroup></TitlesGroup>
                <div className="ls-components" >
                    {props.parts && props.parts.map(part => {
                        return (
                            <div key={part.code} onClick={() => clickedPart(part.id)}
                                className='tab-list-parts'>
                                <div className='list-parts' key={part.id}>
                                    <h6>{part.description}</h6>
                                    <h6>{part.reference}</h6>
                                    <h6>$ {part.price}</h6>
                                    <img src={part.img} alt="" />
                                    <h6>{part.stock}</h6>
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
