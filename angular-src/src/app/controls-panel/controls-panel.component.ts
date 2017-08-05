import { Component, OnInit } from '@angular/core';

declare var option;
declare var setup;

@Component({
  selector: 'app-controls-panel',
  templateUrl: './controls-panel.component.html',
  styleUrls: ['./controls-panel.component.css']
})
export class ControlsPanelComponent implements OnInit {
  selectedAlgoId: number = option;
  algorithms: Algorithm[] = [
    new Algorithm(0, "Brute Force with Repetition"),
    new Algorithm(1, "Brute Force without Repetition"),
    new Algorithm(2, "Genetic Algorithm without Crossover"),
    new Algorithm(3, "Genetic Algorithm with Crossover")
  ];
  constructor() {
  }

  ngOnInit() {
  }

  selectAlgorithm(id: number) {
    this.selectedAlgoId = id;
    setup(this.selectedAlgoId, this.algorithms[id].name);
  }

  changeCities() {
    var id = this.selectedAlgoId;

    var algoName = this.algorithms[id].name;
    setup(id, algoName, true);
  }
}

/**
 * Class for containing algorithm information
 */
export class Algorithm {
  //Create public property id and name
  constructor(public id: number, public name: string) {}
}
