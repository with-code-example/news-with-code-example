import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'striphtml'
})

export class StripHtmlPipe implements PipeTransform {
    transform(value: string): any {
        return value.replace(/<.*?>/g, ''); // replace tags
    }
}

@Pipe({
    name: 'shorten'
  })
  export class ShortenPipe implements PipeTransform {
    transform(val:string , length?: any): string {
      return (val.length>length)? val.slice(0, length)+'...':val
    }
}