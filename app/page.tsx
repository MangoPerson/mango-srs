'use client';
import { useEffect, useState } from "react";
import { pb } from "./environment";
import { getReviews } from "@/functions/dbfunctions";

export default function Home() {

    const [ data, setData ] = useState([{}]);

    useEffect(() => {
        pb.collection('users').authWithPassword('thomasayoubwinder@gmail.com', '12345678');
        console.log(pb.authStore.token);

        getReviews(pb)
            .then(reviews => setData(reviews));
    }, []);

    console.log(data);

    return (
        <>
        </>
    )
}