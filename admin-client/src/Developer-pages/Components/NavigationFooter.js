import React from "react";
import { Button } from "react-bootstrap";


const NavigationFooter = ({ prevLink, prevText, nextLink, nextText }) => {

    return (
        <div className="default-offset">
            <br /><br /><br />
            {
                prevLink !== undefined &&
                <span style={{float: "left"}}>
                    <button className="navfooter-button" onClick={() => { window.location.href = prevLink }}>&lt; <span>{prevText === undefined ? "Previous" : prevText}</span></button>
                </span>
            }
            {
                nextLink !== undefined &&
                <span style={{float: "right"}}>
                    <button className="navfooter-button" onClick={() => { window.location.href = nextLink }}><span>{nextText === undefined ? "Next" : nextText }</span> &gt;</button>
                </span>  
            } 
            <br /><br /><br />     
        </div>
    )
}

export default NavigationFooter;