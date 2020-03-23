import { TestBed, inject } from '@angular/core/testing';

import { ToolCommunicationService } from './tool-communication.service';

describe('ToolCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolCommunicationService]
    });
  });

  it('should be created', inject(
    [ToolCommunicationService],
    (service: ToolCommunicationService) => {
      expect(service).toBeTruthy();
    }
  ));
});
