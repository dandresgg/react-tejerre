import React, {useState, useEffect} from 'react';
import HeadContent from '../parts/head-content';
import PartList from '../parts/parts-list.js'
import Sectors from '../parts/sector';
import {Api} from './api-service';

function Replacements() {
    const [parts, setParts] = useState([]);
    useEffect(() => {
        Api.getReplacementsList().then((resp => setParts(resp)))
    }, [])
    return (
        <div>
            <HeadContent></HeadContent>
            <Sectors></Sectors>
            <PartList parts={parts} />
        </div>
    )
}
export default Replacements;
