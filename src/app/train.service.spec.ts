import { TrainService } from './train.service';
import { defer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('Test train service', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let trainService: TrainService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    trainService = new TrainService(<any> httpClientSpy);
  });

  it('Test getTrainStations function when train is found', () => {
    let expected = {
      "Brooklyn": [
        "86th street",
        "avenue u"
      ],
      "Manhattan": [
        "Canal street",
        "14th street/union square"
      ]
    };

    httpClientSpy.get.and.returnValue(asyncData(expected));

    trainService.getTrainStations("D").subscribe(stations => {
      expect(stations).toEqual(expected)
    })
  });

  it('Test getTrainStations function when train is not found', () => {
    const errorResponse = new HttpErrorResponse({
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    trainService.getTrainStations("0").subscribe(
      _ => fail("should be an error!"),
      error => expect(error.message).toContain('404 Not Found')
    )
  }); 
});