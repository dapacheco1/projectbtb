import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    
    return items.filter((item:any) => {
      return item.username.toLocaleLowerCase().includes(filter);
    });
}

}
