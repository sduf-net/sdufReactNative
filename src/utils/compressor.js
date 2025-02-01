import pako from "pako";

/**
 * Compresses a JavaScript object or string into raw binary (Zlib).
 * @param {Object|string} data - The data to compress (can be an object or a string).
 * @returns {ArrayBuffer} - The compressed raw binary data.
 */
export function compress(data) {
  try {
    // Convert object to JSON string if needed
    const stringData = typeof data === "object" ? JSON.stringify(data) : data;

    // Compress data using pako (returns Uint8Array)
    const compressed = pako.deflate(stringData);

    // Return the compressed binary as an ArrayBuffer
    return compressed.buffer;
  } catch (error) {
    console.error("Compression error:", error);
    return null;
  }
}

/**
 * Decompresses raw binary data (Zlib) into its original form.
 * @param {ArrayBuffer} compressedData - The raw binary (ArrayBuffer) compressed data.
 * @returns {Object|string|null} - The decompressed data (JSON object if possible, otherwise string).
 */
export function decompress(compressedData) {
  try {
    // Convert ArrayBuffer to Uint8Array for pako
    const uint8Array = new Uint8Array(compressedData);

    // Decompress the data using pako
    const decompressed = pako.inflate(uint8Array, { to: "string" });

    // Try to parse as JSON if it was originally an object
    try {
      return JSON.parse(decompressed);
    } catch (e) {
      return decompressed; // Return as string if not JSON
    }
  } catch (error) {
    console.error("Decompression error:", error);
    return null;
  }
}
