import { useAuctionStore } from '@/hooks/useAuctionStore';
import { useBidStore } from '@/hooks/useBidStore';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import React,{ ReactNode, useState, useEffect} from 'react'

type Props = {
    children: ReactNode
}

export default function SignalRProvider({children}: Props) {

    const [connection, setConnection] = useState<HubConnection | null>(null);

    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);

    const addBid = useBidStore(state => state.addBid);

    useEffect(()=>{

        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:6001/notifications')
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    },[]);

    useEffect(()=>{

        if(connection){
            connection.start().then(()=> console.log('connection to notification hub'));   
        }


    },[connection]);


  return (
    children
  )
}
