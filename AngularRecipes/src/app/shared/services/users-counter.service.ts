
/*
Se lo saco pues no se le va a injectar nada, aunque si sera injectado en el servicio user
@Injectable({
  providedIn: 'root'
}) */
export class UsersCounterService {

  activeToInactivCount = 0;
  inActiveToActivCount = 0;

  constructor() { }

  incrementActToInact(status: string) {
    if (status === 'inactive') {
      this.activeToInactivCount++;
      console.log('COUNT to inactive: ' + this.activeToInactivCount);
    } else {
      this.inActiveToActivCount++;
      console.log('COUNT to active: ' + this.inActiveToActivCount);
    }
  }

}

