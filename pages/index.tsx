import type {NextPage} from 'next'
import Head from 'next/head'

import {Suspense} from 'react'

import {useState} from "react";
import axios from "axios";
import MovieBanner from "../components/MovieBanner";


interface MovieProps {
    id: string
    image: string
    title: string
}


const Home: NextPage = () => {

    const [term, setTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const [data, setData] = useState<MovieProps[] | []>([])

    const SearchFilms = async () => {
        const url = `https://imdb-api.com/en/API/SearchMovie/k_9y5dhdas/${term}`

        if (term.length == 0) {
            setError("you didn't type anything")
        } else {
            setLoading(true)
            setData([])
            const res = await axios.get(url.split(' ').join(''))
            setData(res.data.results)

        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#0c0c0c]">
            <Head>
                <title>MovieSearch</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={"flex items-center flex-col"}>
                <h2 className="text-white font-semibold text-4xl text-center py-8">MovieSearch</h2>
                <div className={"space-x-4"}>
                    <input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="search anything"
                           className={"w-[800px] bg-black text-slate-200  placeholder-amber-50 py-2 px-6 rounded-md outline outline-red-500"}
                           type="text"/>
                    <button onClick={SearchFilms} className={"bg-red-500 px-8 h-full text-white rounded-md"}>Search
                    </button>
                </div>
                {error && <p className={"text-red-500 text-sm py-2 text-bold"}>{error}</p>}

                {loading && <h2 className={"text-slate-200 py-8 text-center text-2xl"}>Loading....</h2>}

                <div className={"grid grid-cols-3 gap-4 py-6"}>
                    <Suspense fallback={<h2>Loading...</h2>}>
                        {data.map(item => (
                            <MovieBanner key={item.id} title={item.title} img={item.image}/>
                        ))}
                    </Suspense>
                </div>
            </main>
        </div>
    )
}

export default Home
