# Matrix digital rain effect

https://en.wikipedia.org/wiki/Matrix_digital_rain

Apply blur with css filter on canvas element.
Create a Column factory, that keeps track of the open spots
Check in render if column is removed, if so openup spot.

Column receives

- x position
  A letter in a column can be dynamic
  chars: {
  dynamic: boolean;
  char: string;
  }
  Add remove prop (private with public getter), value is set in render, cleanup returns the value.
