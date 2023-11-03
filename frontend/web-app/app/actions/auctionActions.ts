'use server'

import { Auction, PageResult } from "@/types";
import { getTokenWorkaround } from "./authAction";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";
import { revalidatePath } from "next/cache";

export async function getData(query: string): Promise<PageResult<Auction>> {

    return await fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest(){
    const data = {
        mileage: Math.floor(Math.random() * 100000) + 1
    }

    return await fetchWrapper.put('auctions/6a5011a1-fe1f-47df-9a32-b5346b289391', data);
}

export async function createAuction(data: FieldValues){
    return await fetchWrapper.post('auctions', data);
}

export async function getDetailViewData(id: string): Promise<Auction>{
    return await fetchWrapper.get(`auctions/${id}`)
}

export async function updateAuction(data: FieldValues, id: string ){
    const res = await fetchWrapper.put(`auctions/${id}`, data);
    revalidatePath(`/auctions/${id}`);
    return res;
}

export async function deleteAuction(id: string){
    return await fetchWrapper.del(`auctions/${id}`);
}