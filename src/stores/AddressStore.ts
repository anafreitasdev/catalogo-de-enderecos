import { ref } from "vue"
import { defineStore } from "pinia"
import type { IAddress } from "@/models/AddressInterface"
import { useCatalogo } from "../database/composables/useCatalogo"

const { listar, adicionar, atualizar, remover, enderecos } = useCatalogo()

export const useAddressStore = defineStore('address', () => {
    const addresses = ref<IAddress[]>([])
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)
    
    function setAddresses(newAddresses: IAddress[]) {
        addresses.value = newAddresses
    }

    async function fetchAddresses() {
        loading.value = true
        error.value = null
        try {
            await listar()
            addresses.value = enderecos.value.map((end: any) => ({
                cep: end.cep,
                estado: end.estado,
                cidade: end.cidade,
                bairro: end.bairro,
                logradouro: end.logradouro,
                numero: end.numero
            }))
        } catch (err: any) {
            error.value = err?.message ?? String(err)
        } finally {
            loading.value = false
        }
    }

    async function addAddress(address: IAddress) {
        loading.value = true
        error.value = null
        try {
            await adicionar(
                address.cep,
                address.estado,
                address.cidade,
                address.bairro,
                address.logradouro,
                address.numero
            )
            await fetchAddresses()
        } catch (err: any) {
            error.value = err?.message ?? String(err)
        } finally {
            loading.value = false
        }
    }

    async function updateAddress(id: number, address: IAddress) {
        loading.value = true
        error.value = null
        try {
            await atualizar(
                id,
                address.cep,
                address.estado,
                address.cidade,
                address.bairro,
                address.logradouro,
                address.numero
            )
            await fetchAddresses()
        } catch (err: any) {
            error.value = err?.message ?? String(err)
        } finally {
            loading.value = false
        }
    }

    async function deleteAddress(id: number) {
        loading.value = true
        error.value = null
        try {
            await remover(id)
            await fetchAddresses()
        } catch (err: any) {
            error.value = err?.message ?? String(err)
        } finally {
            loading.value = false
        }
    }

    function clearError() {
        error.value = null
    }
    
    return { 
        addresses, 
        loading,
        error,
        setAddresses, 
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        clearError
    }
})