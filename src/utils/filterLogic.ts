import {CpuMapping, GpuMapping, LaptopFilters, LaptopModel, RamMapping} from "@/models/models";

function extractUniqueAndSort(values, mappingFunction) {
    return [...new Set(values.map(mappingFunction))]
        .sort()
}

function extractAndSet(target, values, mappingFunction) {
    const filteredValues = extractUniqueAndSort(values, mappingFunction)
        .map(e => ({text: e}))

    target.splice(0, target.length)
    target.push(...filteredValues)
}

function findCpu(input: LaptopFilters, lm: LaptopModel): CpuMapping {
    let matchedCpuMapping = input.cpuMappings.find(cpuMapping => cpuMapping.name === lm.cpu);
    if (!matchedCpuMapping) {
        console.log(`Failed to map cpu ${lm.cpu}`);
        return {
            name: lm.cpu,
            family: lm.cpu,
            brand: lm.cpu,
            shortName: lm.cpu
        }
    }
    return matchedCpuMapping;
}

function findGpu(input: LaptopFilters, lm: LaptopModel): GpuMapping {
    let matchedGpuMapping = input.gpuMappings.find(cpuMapping => cpuMapping.name === lm.gpu);
    if (!matchedGpuMapping) {
        console.log(`Failed to map gpu ${lm.gpu}`);
        return {
            name: lm.gpu,
            family: lm.gpu,
            brand: lm.gpu
        }
    }
    return matchedGpuMapping;
}

function findRam(input: LaptopFilters, lm: LaptopModel): RamMapping {
    let matchedRamMapping = input.ramMappings.find(ramMapping => ramMapping.name === lm.ram);
    if (!matchedRamMapping) {
        console.log(`Failed to map ram ${lm.ram}`);
        return {
            name: lm.ram,
            summary: lm.ram

        }
    }
    return matchedRamMapping;
}

function findStorage(input: LaptopFilters, lm: LaptopModel): RamMapping {
    let searchedMapping = input.storageMappings.find(ramMapping => ramMapping.name === lm.storage);
    if (!searchedMapping) {
        console.log(`Failed to map storage ${lm.storage}`);
        return {
            name: lm.storage,
            summary: lm.storage

        }
    }
    return searchedMapping;
}

function setCpuBrandValues(items: LaptopModel[], allData, input: LaptopFilters) {
    extractAndSet(allData.cpuBrand, items, (lm: LaptopModel) => {
        return findCpu(input, lm).brand;
    })
}

function setGpuBrandValues(items: LaptopModel[], allData, input: LaptopFilters) {
    extractAndSet(allData.gpuBrand, items, (lm: LaptopModel) => {
        return findGpu(input, lm).brand;
    })
}

function setCpuFamilyValues(items: LaptopModel[], allData, input: LaptopFilters) {
    extractAndSet(allData.cpuFamily, items, (lm: LaptopModel) => {
        return findCpu(input, lm).family;
    })
}

function setGpuFamilyValues(items: LaptopModel[], allData, input: LaptopFilters) {
    extractAndSet(allData.gpuFamily, items, (lm: LaptopModel) => {
        return findGpu(input, lm).family;
    })
}

function setCpuModelValues(items: LaptopModel[], allData, input: LaptopFilters) {
    extractAndSet(allData.cpuModel, items, (lm: LaptopModel) => {
        return findCpu(input, lm).shortName;
    })
}

function setGpuModelValues(items: LaptopModel[], allData, input: LaptopFilters) {
    extractAndSet(allData.gpuModel, items, (lm: LaptopModel) => {
        return findGpu(input, lm).name;
    })
}

function setRamValues(items: LaptopModel[], allData, input: LaptopFilters) {
    extractAndSet(allData.ram, items, (lm: LaptopModel) => {
        return findRam(input, lm).summary;
    })
}

function setStorageValues(items: LaptopModel[], allData, input: LaptopFilters) {
    extractAndSet(allData.storage, items, (lm: LaptopModel) => {
        return findStorage(input, lm).summary;
    })
}

export const filterValueChanged = (input: LaptopFilters, filterValue, allData) => {
    let filtered = input.items;
    setCpuBrandValues(filtered, allData, input);
    setGpuBrandValues(filtered, allData, input);
    setRamValues(filtered, allData, input)
    setStorageValues(filtered, allData, input)
    allData.ram.sort((a, b) => Number.parseInt(b.text) - Number.parseInt(a.text))
    allData.storage.sort((a, b) => Number.parseInt(b.text) - Number.parseInt(a.text))

    const cpuBrandsFilter = filterValue['CPU Brand'] || [];
    const gpuBrandsFilter = filterValue['GPU Brand'] || [];

    filtered = filtered.filter(laptop => cpuBrandsFilter.length === 0 || cpuBrandsFilter.includes(findCpu(input, laptop).brand))
    filtered = filtered.filter(laptop => gpuBrandsFilter.length === 0 || gpuBrandsFilter.includes(findGpu(input, laptop).brand))

    setCpuFamilyValues(filtered, allData, input)
    setGpuFamilyValues(filtered, allData, input)

    const cpuFamilyFilter = filterValue['CPU Family'] || [];
    const gpuFamilyFilter = filterValue['GPU Family'] || [];
    let cpus = filtered.filter(laptop => cpuFamilyFilter.length === 0 || cpuFamilyFilter.includes(findCpu(input, laptop).family));
    let gpus = filtered.filter(laptop => gpuFamilyFilter.length === 0 || gpuFamilyFilter.includes(findGpu(input, laptop).family));
    setCpuModelValues(cpus, allData, input)
    setGpuModelValues(gpus, allData, input)

    filtered = cpus.filter(laptop => gpuFamilyFilter.length === 0 || gpuFamilyFilter.includes(findGpu(input, laptop).family));
    const ramFilter = filterValue['Memory'] || [];
    filtered = filtered.filter(laptop => ramFilter.length === 0 || ramFilter.includes(findRam(input, laptop).summary));

    const storageFilter = filterValue['Storage'] || [];
    filtered = filtered.filter(laptop => storageFilter.length === 0 || storageFilter.includes(findStorage(input, laptop).summary));

    let filteredData = allData.unfilteredItems;
    filteredData.splice(1, filteredData.length - 1);
    filtered.forEach(l => {
        let cpu = findCpu(input, l).shortName;
        filteredData.push([l.title, cpu, l.gpu, l.ram, l.storage, +l.priceAfterDiscount]);
    });
    return filteredData
}
