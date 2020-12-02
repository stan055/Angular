import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'euro',
    pure: false
})
export class EuroPipe implements PipeTransform {
    transform(v: number, currency: number = 0.85323): string {
        return '€' + (v * currency).toFixed(2);
    }
}
