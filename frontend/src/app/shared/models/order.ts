import { LatLng } from "leaflet";
import { cartItem } from "./cartItem";

export class Order{
  id!: number;
  name!: string;
  price!: number;
  items!:cartItem[];
  address!:string;
  addressLng!:LatLng;
  paymentId!:string;
  createdAt!:string;
  status!:string;
}
