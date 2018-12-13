import { TestBed } from '@angular/core/testing';

import { TrainService } from './train.service';
import { HttpClientModule } from '@angular/common/http';

describe('TrainService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: TrainService = TestBed.get(TrainService);
    expect(service).toBeTruthy();
  });
});
