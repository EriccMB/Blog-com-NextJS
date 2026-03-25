'use server'

import { asyncDelay } from "@/utils/async-delay";

export async function deletePostAction(id: string) {
    await asyncDelay(1000);
    console.log('adasd')
    return id;
}