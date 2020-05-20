import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,

  UP_ARROW = 38,
  DOWN_ARROW = 40
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('ITable', null) ITableRef: ElementRef;

  value = 0;
  colArray = [];
  rowArray = [];
  colums: number = 6;
  rows: number = 6;

  randomRow: any;
  randomColumn: any;
  start: any;

  MushroomsArray = [];

  MarioObj: any;
  columsCellIndex: number;
  totalScore: number = 0;

  gameOver: boolean = false;
  gameStart: boolean = false;
  ngOnInit() {

  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    // if (event.keyCode === KEY_CODE.RIGHT_ARROW || event.keyCode === KEY_CODE.LEFT_ARROW || event.keyCode === KEY_CODE.DOWN_ARROW ||event.keyCode === KEY_CODE.UP_ARROW ) {
    //   this.changeMario();
    // }
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.checkKey(event);
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.checkKey(event);
    }
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.checkKey(event);
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.checkKey(event);
    }
  }


  startGame() {
    if (this.MushroomsArray.length == 0) {
      this.colArray = [];
      this.rowArray = [];
      // this.MushroomsArray=[];
      for (let i = 0; i < this.rows; i++) {
        this.rowArray.push(i);
      }
      for (let i = 0; i < this.colums; i++) {
        this.colArray.push(i);
      }
      this.randomColumn = this.colArray[Math.floor(Math.random() * this.colArray.length)];
      this.randomRow = this.rowArray[Math.floor(Math.random() * this.rowArray.length)];
      this.gameStart = true;
      setTimeout(() => {
        this.gameStart = false;
      }, 3000)
      setTimeout(() => {

        //Mushrooms
        this.rowArray.forEach(item => {
          let col = this.colArray[Math.floor(Math.random() * this.colArray.length)];
          this.MushroomsArray.push({
            row: item,
            col: col
          })
          this.displayMushrooms(item, col);
        });
        console.log(this.MushroomsArray);
        //mario
        this.check(this.randomRow, this.randomColumn);

        //clear Inputs
        this.colums = null;
        this.rows = null;
      }, 1000)
    } else {
      console.log("game started");
    }
  }

  check(i, j) {
    //mario element
    let matchedData = this.MushroomsArray.filter(item => {
      return item.row == i && item.col == j;
    });
    if (matchedData.length == 0) {
      this.MarioObj = {
        row: i,
        col: j
      }
      console.log(this.MarioObj)
      this.start = document.getElementById(i + '.' + j);
      this.start.innerHTML = `
      <img width="40" height="40" src="../assets/img/8-512.png" alt="">`;
      this.start.focus();
    } else {
      this.doNextCheckForMario();

    }
  }
  doNextCheckForMario() {
    this.randomColumn = this.colArray[Math.floor(Math.random() * this.colArray.length)];
    this.randomRow = this.rowArray[Math.floor(Math.random() * this.rowArray.length)];
    setTimeout(() => {
      //mario
      this.check(this.randomRow, this.randomColumn);
    }, 1000)
  }
  dotheneedful(sibling) {
    if (sibling != null) {
      this.start.focus();
      this.start.innerHTML = `
    <img width="40" height="40" src="" alt="">`;
      sibling.focus();
      sibling.innerHTML = `
      <img width="40" height="40" src="../assets/img/8-512.png" alt="">`;
      this.start = sibling;
      // console.log(this.start.cellIndex);
      // this.MarioObj.col = this.start.cellIndex;
    }
  }
  checkKey(e) {
    e = e || window.event;
    console.log(this.MarioObj);
    if (e.keyCode == '38') {
      // up arrow
      if (this.MarioObj.row != 0) {
        this.MarioObj.row = this.MarioObj.row - 1;
        this.totalScore++;
      }
      console.log("up arrow:", this.MarioObj.row);


      var idx = this.start.cellIndex;
      var nextrow = this.start.parentElement.previousElementSibling;
      if (nextrow != null) {
        var sibling = nextrow.cells[idx];
        this.dotheneedful(sibling);
      }
    } else if (e.keyCode == '40') {
      // down arrow
      if (this.MarioObj.col != this.rows - 1) {
        this.MarioObj.row = this.MarioObj.row + 1;
        this.totalScore++;

      }
      console.log("down arrow:", this.MarioObj.row);

      var idx = this.start.cellIndex;
      var nextrow = this.start.parentElement.nextElementSibling;
      if (nextrow != null) {
        var sibling = nextrow.cells[idx];
        this.dotheneedful(sibling);
      }
    } else if (e.keyCode == '37') {
      // left arrow
      if (this.MarioObj.col != 0) {
        this.MarioObj.col = this.MarioObj.col - 1;
        this.totalScore++;

      }
      console.log("left arrow:", this.MarioObj.col - 1);

      var sibling = this.start.previousElementSibling;
      this.dotheneedful(sibling);
    } else if (e.keyCode == '39') {
      // right arrow
      if (this.MarioObj.col != this.colums - 1) {
        this.MarioObj.col = this.MarioObj.col + 1;
        this.totalScore++;

      }
      console.log("right arrow:", this.MarioObj.col);

      var sibling = this.start.nextElementSibling;
      this.dotheneedful(sibling);
    }
    console.log(this.MarioObj);
    this.feedMario();

  }
  feedMario() {
    this.MushroomsArray.filter((item, i) => {
      if (item.row == this.MarioObj.row && item.col == this.MarioObj.col) {
        this.MushroomsArray.splice(i, 1);
      }
      // return item.row !== this.MarioObj.row && item.col !== this.MarioObj.col;
    });
    if (this.MushroomsArray.length == 0) {
      console.log("Game Over: Score", this.totalScore);
      this.gameOver = true;
    }
    console.log(this.MushroomsArray);
  }

  displayMushrooms(i, j) {
    document.getElementById(i + '.' + j).innerHTML = `<img width="30" height="30" src="../assets/img/greenMushrooms.png" alt="">`
  }
  restart() {
    this.start.innerHTML = `
      <img width="40" height="40" src="" alt="">`;
    this.colums = 0;
    this.rows = 0;
    this.rowArray = [];
    this.colArray = [];
    this.gameOver = false;

  }
}
