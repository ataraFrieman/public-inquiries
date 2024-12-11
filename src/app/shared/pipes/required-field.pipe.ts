import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requiredField'
})
export class RequiredFieldPipe implements PipeTransform {
  transform(value: string): string {
    return `${value} *`;
  }
}