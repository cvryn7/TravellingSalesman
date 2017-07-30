import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controls-panel',
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.css']
})
export class ControlsPanelComponent implements OnInit {
  algoTypes: AlgorithmType[];
  constructor() {
    this.algoTypes[0].id = 0;
    this.algoTypes[0].name = "Brute Force with Repetition";
  }

  ngOnInit() {
  }
}

interface AlgorithmType {
  id: Number;
  name: String;
}
