import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Card(props){
    const apiHost = import.meta.env.VITE_API_HOST;
    const imageUrl= `${apiHost}/images/${props.produduct.image_filename}`

    return(
        <>

        </>
    )

}
