export default interface Checkout {
    type: string,
    price: number,
    status: string,
    firstname: string,
    lastname: string,
    address: string,
    postal: string,
    email: string,
    phone: number
}