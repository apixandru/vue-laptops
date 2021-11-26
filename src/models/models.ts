export interface RamMapping {
    name: string
    summary: string
}

export interface StorageMapping {
    name: string
    summary: string
}

export interface GpuMapping {
    name: string
    brand: string
    family: string
}

export interface CpuMapping {
    name: string
    brand: string
    shortName: string
    family: string
}

export interface LaptopModel {

    url: string
    title: string
    priceAfterDiscount: number
    priceBeforeDiscount: number
    discount: number
    model: string
    cpu: string
    ram: string
    gpu: string
    storage: string

}

export interface LaptopFilters {

    items: LaptopModel[]

    cpuMappings: CpuMapping[]
    gpuMappings: GpuMapping[]
    ramMappings: RamMapping[]
    storageMappings: StorageMapping[]

}
