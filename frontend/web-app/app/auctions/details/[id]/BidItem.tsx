import { numberWithCommas } from '@/app/lib/numberWithComma';
import { Bid } from '@/types'
import { formatISO, formatRFC7231 } from 'date-fns';
import React from 'react'
import { format } from 'util';

type Props = {
    bid: Bid
}

export default function BidItem({bid}: Props) {
    
    

    function getBidInfo(){
        let bgColor = '';
        let text = '';
        switch(bid.bidStatus){
            case 'Accepted':
                bgColor = 'bg-green';
                text = 'Bid accepted';
                break;
            case 'AcceptedBelowReserve':
                bgColor = 'bg-amber-500';
                text = 'Reserve not met';
                break;
            case 'TooLow':
                bgColor = 'bg-red-200';
                text = 'Bid was too low';
                break;
            default:
                bgColor='bg-red-200';
                text = 'Bid placed after auction finished';
                break;
        }
        return {bgColor, text};
    }
  
    return (
    <div className={`
        border-gray-300 border-2 px-3 py-2 rounded-lg
        flex justify-between items-center mb-2 
        ${getBidInfo().bgColor}
    `}>
        <div className='flex flex-col'>
            <span>Bidder: {bid.bidder}</span>
            <span className='text-gray-700 text-sm'>
                Time: {formatRFC7231(new Date(bid.bidTime))}</span>
        </div>
        <div className='flex flex-col text-right'>
            <div className='text-xl font-semibold'>${numberWithCommas(bid.amount)}</div>
            <div className='flex flex-row items-center'>
                <span>{getBidInfo().text}</span>
            </div>
        </div>
    </div>
  )
}
