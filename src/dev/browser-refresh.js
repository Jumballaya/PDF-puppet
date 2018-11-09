/**
 * Browser Refresh Script
 */

module.exports = (host, port) => `
const socket = new WebSocket("ws://${host}:${port}");
socket.onmessage = evt => {
  if (evt.data === 'RELOAD') {
    window.setTimeout(() => { location.reload(); }, 2000);
  }
  console.log(evt.data);
};
socket.onopen = () => {
  socket.send('Browser connected');
};
`;
