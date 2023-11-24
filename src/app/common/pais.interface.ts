export interface Pais {
    id: string,
    nombre: string,
    ciudades: Ciudad[]
}

interface Ciudad {
    nombre: string,
    lugarTuristico: string
}