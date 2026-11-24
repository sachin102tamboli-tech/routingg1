import { Observable } from "rxjs"


export interface Iprod {
    pid : string,
    pname : string,
    pstatus : 'In=Progress' | 'Dispatched' | 'Delivered',
    canReturn : 0 | 1
}

export interface IRes<T> {
    msg : string,
    data : T
}

 
export interface IprodRes {
    name : string
}
export interface IprodData {
    action : string ,
    data : Iprod
}

export interface ICanDeactivate {
    CanDeactivate () : boolean | Promise <boolean> | Observable <boolean>
}