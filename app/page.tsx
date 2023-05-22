'use client';
import { useEffect, useState } from "react";
import { pb } from "./environment";
import { ReviewSession } from "@/functions/dbfunctions";

export default function Home() {

    const [ data, setData ] = useState([{}]);

    const doStuff = async () => {
        pb.authStore.clear();

        await pb.collection('users').authWithPassword('thomasayoubwinder@gmail.com', '12345678');

        const session = new ReviewSession(pb);

        await session.fetch(2);

        console.table(session.current);

        console.log(session.checkNextMeaning('eye'));
        console.log(session.checkNextMeaning('water'));
        console.log(session.checkNextMeaning('mizu'));

        session.next();

        console.table(session.current);
        console.log(session.checkNextMeaning('eye'));
        console.log(session.checkNextMeaning('water'));
        console.log(session.checkNextMeaning('mizu'));
    }

    return (
        <>
            <button onClick={doStuff}>Do Stuff!</button>
        </>
    )
}