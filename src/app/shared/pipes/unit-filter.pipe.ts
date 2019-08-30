import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from '../models/unit.model';


@Pipe({
  name: 'unitFilter'
})
export class UnitFilterPipe implements PipeTransform {

  transform(units: Unit[], search: string): Unit[] | null {
    console.log('seearch' + search);
    console.log(units);
    if (!search) {
      return units;
    } else {
      return units.filter( r => r.name.toLowerCase().includes(search.toLowerCase()));
    }
  }

}
