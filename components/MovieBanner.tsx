import React from "react";
import Image from 'next/image';

const MovieBanner: React.FC<{ img: string, title: string }> = ({img, title}) => {
    return (
        <article>
            <Image src={img} width={400} height={300}/>
            <h2 className={"text-2xl text-gray-300 font-semibold"}>{title}</h2>
        </article>
    )
}

export default MovieBanner