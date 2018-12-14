import { TestBed, getTestBed } from '@angular/core/testing';

import { TrainService } from './train.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('TrainService', () => {
  let httpMock: HttpTestingController
  let trainService: TrainService;
  let injector;
  let expectedObject = {
    "D": {
      "brooklyn": ["coney island", "bay 50th street"]
    },
    "N": {
      "brooklyn": ["coney island", "86th street"]
    }
  }
  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [ TrainService ]
  }));

  beforeEach(() => {
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    trainService = injector.get(TrainService);
  });

  it('should be created', () => {
    const service: TrainService = TestBed.get(TrainService);
    expect(service).toBeTruthy();
  });

  it('Test getTrainStations function when train is found', () => {
    let trainID = "N"
    let urlFormat = `https://firebasestorage.googleapis.com/v0/b/transit-project-bb22b.appspot.com/o/${trainID}.json?alt=media`
  
    trainService.getTrainStations(trainID).subscribe(stations => {
      expect(stations).toEqual(expectedObject[trainID])
    })

    let req = httpMock.expectOne(urlFormat)
    req.flush(expectedObject[trainID])
  });

  it('Test getTrainStations function when train is not found', () => {
    let trainID = "9"
    let urlFormat = `https://firebasestorage.googleapis.com/v0/b/transit-project-bb22b.appspot.com/o/${trainID}.json?alt=media`
  
    trainService.getTrainStations(trainID).subscribe(
      _ => fail("should not be here"),
      err => { expect(err.message).toContain("Http failure") }
    )

    let req = httpMock.expectOne(urlFormat)
    req.error(null);
  });
});
