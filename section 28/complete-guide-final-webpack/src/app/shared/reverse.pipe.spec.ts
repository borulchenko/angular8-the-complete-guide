import { TestBed, async } from '@angular/core/testing';

import {ReversePipe} from './reverse.pipe';

describe('Reverse Pipe', () => {
  it('should create the app', () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform('hello')).toEqual('olleh');
  });
});
