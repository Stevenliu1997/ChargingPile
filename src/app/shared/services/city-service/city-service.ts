
import {Injectable} from "@angular/core";
import {province_object} from "./cityInfo/province_object";
import {city} from "./cityInfo/city";
import {province} from "./cityInfo/province";
import {city_object} from "./cityInfo/city_object";
import {area} from "./cityInfo/area";

@Injectable()
export class CityService {

    constructor(){}

    getProvince(){
        return province;
    }

    getCity(provinceName: string) {
        let proId = this.getProvinceId(provinceName);
        return city[proId]
    }

    getArea(cityName: string){
        let cityId = this.getCityId(cityName);
        return area[cityId];
    }

    private getProvinceId(provinceName: string): string{
        for(let i in province){
            if(province[i].name == provinceName)
                return province[i].id;
        }
    }

    private getCityId(cityName: string): string{
        for(let i in city_object){
            if(city_object[i].name == cityName)
                return city_object[i].id;
        }
    }

}
