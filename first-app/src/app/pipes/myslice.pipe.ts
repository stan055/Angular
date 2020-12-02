import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myslice',
    pure: false
})
export class MySlicePipe implements PipeTransform {
    transform(str: string, limit: number = 1): string {
        return str.slice(0, limit);
    }
}
