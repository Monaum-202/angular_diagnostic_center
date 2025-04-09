import { Component } from '@angular/core';

@Component({
  selector: 'app-lab-inventory',
  templateUrl: './lab-inventory.component.html',
  styleUrls: ['./lab-inventory.component.scss']
})
export class LabInventoryComponent {
  inventory = [
      { toolName: "Test Tube",available: true, availableAmount: 100 },
      { toolName: "Syringe",available: true, availableAmount: 200 },
      { toolName: "Bandage",available: true, availableAmount: 300 },
      { toolName: "Gloves",available: false, availableAmount: null },
      { toolName: "Thermometer",available: true, availableAmount: 50 },
      { toolName: "Cotton Swabs",available: true, availableAmount: 250 },
      { toolName: "Pipette",available: true, availableAmount: 120 },
      { toolName: "Lab Coat",available: true, availableAmount: 80 },
      { toolName: "Alcohol Pads",available: true, availableAmount: 180 },
      { toolName: "Needles",available: true, availableAmount: 100 },
      { toolName: "Beakers",available: true, availableAmount: 90 },
      { toolName: "Microscope Slides",available: true, availableAmount: 75 },
      { toolName: "Petri Dishes",available: true, availableAmount: 60 },
      { toolName: "Safety Glasses",available: true, availableAmount: 50 },
      { toolName: "Bunsen Burner",available: true, availableAmount: 10 },
      { toolName: "Clamp Stand",available: true, availableAmount: 20 },
      { toolName: "Filter Papers",available: true, availableAmount: 40 },
      { toolName: "Thermocouples",available: false, availableAmount: null },
    ];
    
  
  
  searchInput = '';
  filteredInventory = this.inventory;

  onSearch() {
    const input = this.searchInput.toLowerCase().trim();
    this.filteredInventory = this.inventory.filter(item =>
      item.toolName.toLowerCase().includes(input)
    );
  }
}
