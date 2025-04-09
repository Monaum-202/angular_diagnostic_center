import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  inventory = [
    { toolName: "24122083",available: true,  },
    { toolName: "24122084",available: true, },
    { toolName: "24122085",available: true,  },
    { toolName: "24122086",available: false,  },
    { toolName: "24122087",available: true, }
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
