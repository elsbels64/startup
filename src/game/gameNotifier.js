class EventMessage {
    constructor(from, value) {
      this.from = from;
      this.value = value;
    }
  }

  class GameEventNotifier {
    events = [];
    handlers = [];
  
    constructor() {
      let port = window.location.port;
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'; // switch between websocket and secure websocket depending on http or https
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      this.socket.onopen = (event) => {
        this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'connected' }));
      };
      this.socket.onclose = (event) => {
        this.receiveEvent(new EventMessage('Simon', GameEvent.System, { msg: 'disconnected' }));
      };
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch {}
      };
    }

}