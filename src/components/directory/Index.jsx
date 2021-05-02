import React from 'react'

import ShopMen from '../../assets/shopMens.jpg'
import ShopWomen from '../../assets/shopWomens.jpg'


export default function Directory() {
    return (
        <div className="directory">
            
            <div className="wrapper">
                <div className="item"
                    style={{backgroundImage: `url(${ShopMen})`, color:"red"}}
                >
                    kjf
                    <a href="">Shop Men</a>
                </div>
                <div className="item"
                    style={{backgroundImage: `url(${ShopWomen})`}}
                >
                    <a href="">Shop Women</a>
                </div>
            </div>

        </div>
    )
}
