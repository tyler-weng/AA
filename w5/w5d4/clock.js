class Clock {
  constructor() {
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.
    let date = new Date();
    this.hrs = date.getHours();
    this.mins = date.getMinutes();
    this.secs = date.getSeconds();
    this.printTime();
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    console.log(`${this.hrs}:${this.mins}:${this.secs}`);
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    this.secs += 1;
    if (this.secs === 60) {
      this.mins += 1;
      this.secs = 0;
    }
    if (this.mins === 60) {
      this.hrs += 1;
      this.mins = 0;
    }
    if (this.hrs === 60) {
      this.hrs = 0;
    }
    this.printTime();
  }
}

const clock = new Clock();
