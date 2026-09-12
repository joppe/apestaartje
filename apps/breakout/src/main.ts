import { app } from './app.js';

app({
  container: document.body,
  width: 800,
  height: 600,
  wallOffset: {
    top: 10,
    right: 10,
    bottom: 50,
    left: 10,
  },
  wallSize: 10,
});
