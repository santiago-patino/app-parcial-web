import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../Vehicle';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.css'
})
export class VehicleListComponent implements OnInit {

  vehicles!: Array<Vehicle>;
  marcasCounts: Array<{marca:string, count:number}> = [];
  headers:Array<string> = ["#","Marca","Linea","Modelo"]

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicleService.getVehicles().subscribe((vehicles: Array<Vehicle>) => {
      this.vehicles = vehicles;
      this.getCountMarcas()
    }, (error) => {
      console.log(error)
    });
  }

  getCountMarcas() {
    const brandCounts: { [marca: string]: number } = {};

    // Iterar sobre cada vehículo y contar las marcas
    this.vehicles.forEach(vehicle => {
      if (brandCounts[vehicle.marca]) {
        brandCounts[vehicle.marca]++;
      } else {
        brandCounts[vehicle.marca] = 1;
      }
    });

    // Imprimir el recuento de cada marca
    for (const marca in brandCounts) {
      if (brandCounts.hasOwnProperty(marca)) {
        this.marcasCounts.push({
          marca: marca,
          count: brandCounts[marca]
        }) 
      }
    }
  }

}
