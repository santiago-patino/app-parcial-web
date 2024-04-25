import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleListComponent } from './vehicle-list.component';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../Vehicle';
import { faker } from '@faker-js/faker';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let mockVehicleService: jasmine.SpyObj<VehicleService>;
  let debug: DebugElement;
  let vehicles: Vehicle[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [VehicleListComponent],
      providers: [ VehicleService ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    
  });

  beforeEach(() => {
    vehicles = Array.from({ length: 3 }, () => ({
      id: faker.datatype.number(),
      marca: faker.vehicle.manufacturer(),
      linea: faker.vehicle.model(),
      referencia: faker.lorem.words(),
      modelo: faker.datatype.number(),
      kilometraje: faker.datatype.number(),
      color: faker.lorem.words(),
      imagen: faker.image.imageUrl()
    }));

    component.vehicles = vehicles;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display table with 4 thead', () => {
   expect(debug.queryAll(By.css('thead tr th'))).toHaveSize(component.headers.length)

   debug.queryAll(By.css('thead tr th')).forEach((th, i)=>{
    expect(th.nativeElement.textContent).toContain(component.headers[i])
   });

  });

  it('should display table with 3 rows', () => {
    expect(debug.queryAll(By.css('tbody tr'))).toHaveSize(vehicles.length)
  });

});
