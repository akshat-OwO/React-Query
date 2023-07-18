import axios from 'axios';

type Geolocation = {
    lat: number;
    lng: number;
};

type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geolocation;
};

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
}

export function getUser(id: number) {
    return axios
        .get(`http://localhost:3000/users/${id}`)
        .then((response) => response.data as User);
}
