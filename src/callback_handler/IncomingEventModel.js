import { decompress } from "../utils/compressor";

// // Example usage

// const rawEvent = {
//   event_id: "evt_12345",
//   user_id: "user_67890",
//   project_id: "proj_54321",
//   screen_id: "screen_home",
//   action: "click_button",
//   payload: "<ArrayBufferCompressedData>", // Your compressed ArrayBuffer payload here
//   buffered: false,
//   compressed: true, // Marking the event as compressed
//   metadata: { date: 1673543480000 }
// };

// let incomingEvent = IncomingEvent.fromJson(rawEvent);

// // Decompress the event payload
// incomingEvent.decompress();

// console.log(incomingEvent); // Now the payload should be decompressed and the event is ready for use

export class IncomingEvent {
  constructor({
    event_id,
    user_id,
    project_id,
    screen_id,
    action,
    payload,
    buffered = false,
    metadata = {}
  }) {
    this.event_id = event_id;
    this.user_id = user_id;
    this.project_id = project_id;
    this.screen_id = screen_id;
    this.action = action || null;
    this.payload = payload;
    this.buffered = buffered;
    this.metadata = metadata || { date: Date.now() };
  }

  static fromJson(data) {
    return new IncomingEvent({
      event_id: data.event_id,
      user_id: data.user_id,
      project_id: data.project_id,
      screen_id: data.screen_id,
      action: data.action,
      payload: data.payload,
      buffered: data.buffered,
      compressed: data.compressed,
      metadata: data.metadata
    });
  }

  static fromArrayBuffer(event) {
    const data = decompress(event);
    return new IncomingEvent({
      event_id: data.event_id,
      user_id: data.user_id,
      project_id: data.project_id,
      screen_id: data.screen_id,
      action: data.action,
      payload: data.payload,
      buffered: data.buffered,
      compressed: data.compressed,
      metadata: data.metadata
    });
  }
}