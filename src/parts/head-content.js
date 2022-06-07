import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faClose} from "@fortawesome/free-solid-svg-icons";

function HeadContent() {
    let searchBar = document.getElementById('search-bar');
    let closeSearch = document.getElementById('close-s');
    let iconSearch = document.getElementById('search-icon');
    const activeSearchBar = evt => {
        searchBar.style.display = "block"
        closeSearch.style.display = "block"
        iconSearch.style.display = "none"
    }
    const closeSearchBar = evt => {
        searchBar.style.display = "none"
        closeSearch.style.display = "none"
        iconSearch.style.display = "block"
    }
    return (
        <div className='mayus p-btn'>
            <div className='title'>
                <div className="d-flex">
                    <div className="fix w-100 d-flex">
                        <input type="textarea" className='search hide'
                            placeholder='Buscar repuesto' id="search-bar" />
                        <div className="close-search">
                            <FontAwesomeIcon icon={faClose} className="hide" id="close-s"
                                onClick={closeSearchBar} />
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fix fix-icon-search"
                        onClick={activeSearchBar} id="search-icon" />
                </div>
                <h1 className='center mt-1 ll-size'>
                    kh-860
                </h1>
            </div>
        </div>
    )
}
export default HeadContent;
