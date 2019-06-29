import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class CustomValidators {
  static invalidProjectName(control: FormControl): { [s: string]: boolean } {
    if ('Test' === control.value) {
      return {'invalidProjectName': true};
    }
    return null;
  }

  static emailAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      ((resolve, reject) => {
        setTimeout(() => {
          !control.value
            ? resolve({'emailAsync': true})
            : resolve(null);
        }, 1500);
      })
    );
    return promise;
  }
}
