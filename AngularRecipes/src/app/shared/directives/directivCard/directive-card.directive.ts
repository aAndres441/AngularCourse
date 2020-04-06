import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

enum CardType { VISA = 'visa' , MASTERCARD = 'mastercard' , AMERICAN_EXPRESS = 'american-express' , UNKNOWN = 'unknown' } 


@Directive({
  selector: '[appDirectiveCard]'
})
export class DirectiveCardDirective implements OnChanges{

  @HostBinding ( 'src' ) imageSource ;

  @Input ()  cardNumber: string ;

  cosas = [{type: '', name: '', description: ''}];
 
  otrasCosas = [{ type: 'hola', cardNumber: 2, cardimg: Image}];

   
  constructor() { }

  // Enlace de ciclo de vida implementado aquí para actualizar imageSource siempre que  el número de tarjeta cambie

   ngOnChanges () { 
    this . imageSource = 'assets / card-types /' + this .getCardTypeFromNumber () + '.png' ; 
  }

  getCardTypeFromNumber (): CardType { 
    if ( this . cardNumber ) { 
      if ( this . cardNumber .startsWith ( '37' )) { 
        return CardType. AMERICAN_EXPRESS ; 
      } else if ( this . cardNumber .startsWith ( '4' )) { 
        return CardType. VISA ; 
      } else if ( this . cardNumber .startsWith ( '5')) { 
        return CardType. MASTERCARD ; 
      } 
    } 
    return CardType.UNKNOWN ; 
  }

  
}
