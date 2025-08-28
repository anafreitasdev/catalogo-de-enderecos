import { ref } from "vue"
import { defineStore } from "pinia"
import type { IAddress } from "@/models/AddressInterface"

export const useAddressStore = defineStore('address', () => {
    const addresses = ref<IAddress[]>([])
    
    function setAddresses(newAddresses: IAddress[]) {
        addresses.value = newAddresses
    }
    
    return { addresses, setAddresses }
})