import { ethers } from "ethers";

export default async (address) => {
     const balance = await window.ethereum.request({
        method:'eth_getBalance',
        params:[address,'latest']
    })
    return ethers.utils.formatEther(balance)
}