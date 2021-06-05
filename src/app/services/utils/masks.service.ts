import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasksService {

  constructor() { }

  private tel(value) {
    if (value.length > 13) {
      value = value.substring(0, 13);
    }

    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1 $2')
      .replace(/(\d{5})(\d)/, '$1 $2');
  }

  private cpf(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

  private cep(value) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  }

  convertTel(input: Element) {
    (<HTMLInputElement>input).value = this.tel((<HTMLInputElement>input).value);
  }

  convertCPF(input: Element) {
    (<HTMLInputElement>input).value = this.cpf((<HTMLInputElement>input).value);
  }

  convertCEP(input: Element) {
    (<HTMLInputElement>input).value = this.cep((<HTMLInputElement>input).value);
  }
}
