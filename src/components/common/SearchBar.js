import React from 'react'
import "../../css/search_bar.css"
const SearchBar = ({ filters }) => {

    async function myF() {

    }

    return (
        <div id="search-bar">
            <div className='search'>
                <input type="text" placeholder='Search...'></input>
                <div type="button" className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={myF}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div className='filters' style={{ marginTop: "10px" }}>
                <div type="button" className="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#demo">Filters</div>
                <div id="demo" className="collapse">
                    {
                        filters.map((el, index) => (
                            <div className="form-check" key={index}>
                                <input type="checkbox" className="form-check-input" id={`check-${index}`} name="option1" value="something" />
                                <label className="form-check-label" htmlFor={`check-${index}`}>{el}</label>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div >
    )
}

export default SearchBar