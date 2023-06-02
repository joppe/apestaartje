# rand

Generate a random float that is greater or equal than 0 and less or equal than 1.
This function uses the [crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto) to generate random values.

## Definition:

```typescript
rand(): number;
```

## Usage:

```javascript
import { rand } from 'dist/rand';

const output = rand();
```
