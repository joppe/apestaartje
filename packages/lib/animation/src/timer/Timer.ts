export class Timer {
  private readonly _duration: number;
  private _timeLeft: number;
  private _isReady = false;

  public get isReady(): boolean {
    return this._isReady;
  }

  /**
   * @param duration The duration of the timer in milliseconds
   */
  constructor(duration: number) {
    this._duration = duration;
    this._timeLeft = duration;
  }

  public reset(): void {
    this._timeLeft = this._duration;
    this._isReady = false;
  }

  public update(delta: number): void {
    if (this._isReady) {
      return;
    }

    this._timeLeft -= delta;

    if (this._timeLeft <= 0) {
      this._isReady = true;
    }
  }
}
