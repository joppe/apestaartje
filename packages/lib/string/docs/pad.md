# pad

Pad a string to a desired length with a given character. The character can be used as a suffix or as a prefix.

## Definition:
```typescript
pad(input: string, char: string, length: number, type?: PadType): string;
```

## Usage:
```javascript
import { pad, PadType } from 'dist/pad';

const input = '1';
const output = pad(input, '0', 4, PadType.Left);

// output = '0001'
```
