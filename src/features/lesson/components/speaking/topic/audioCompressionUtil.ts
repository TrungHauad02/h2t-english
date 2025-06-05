interface CompressionOptions {
  targetSampleRate?: number;
  targetBitDepth?: number;
  quality?: number; // 0-1, where 1 is highest quality
}

/**
 * Compress audio blob using Web Audio API
 * @param audioBlob - The original audio blob
 * @param options - Compression options
 * @returns Compressed audio blob
 */
export async function compressAudioBlob(
  audioBlob: Blob,
  options: CompressionOptions = {}
): Promise<Blob> {
  const {
    targetSampleRate = 16000, // 16kHz is good for speech
    targetBitDepth = 16,
    quality = 0.8,
  } = options;

  try {
    // Convert blob to ArrayBuffer
    const arrayBuffer = await audioBlob.arrayBuffer();

    // Create AudioContext with target sample rate
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)({
      sampleRate: targetSampleRate,
    });

    // Decode audio data
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // If the original sample rate is already low enough, return original
    if (audioBuffer.sampleRate <= targetSampleRate) {
      audioContext.close();
      return audioBlob;
    }

    // Create offline context for processing
    const offlineContext = new OfflineAudioContext(
      audioBuffer.numberOfChannels,
      Math.ceil(audioBuffer.duration * targetSampleRate),
      targetSampleRate
    );

    // Create buffer source
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;

    // Apply compression
    const compressor = offlineContext.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 12;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;

    // Connect nodes
    source.connect(compressor);
    compressor.connect(offlineContext.destination);

    // Start processing
    source.start(0);
    const renderedBuffer = await offlineContext.startRendering();

    // Convert to WAV format with reduced bit depth
    const wavBlob = await audioBufferToWav(renderedBuffer, targetBitDepth);

    // Clean up
    audioContext.close();

    return wavBlob;
  } catch (error) {
    console.error("Error compressing audio:", error);
    // Return original blob if compression fails
    return audioBlob;
  }
}

/**
 * Convert AudioBuffer to WAV blob
 */
async function audioBufferToWav(
  audioBuffer: AudioBuffer,
  bitDepth: number = 16
): Promise<Blob> {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const format = bitDepth === 16 ? 1 : 3;
  const bytesPerSample = bitDepth / 8;

  // Calculate sizes
  const blockAlign = numberOfChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = audioBuffer.length * blockAlign;

  // Create buffer
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // Write WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, format, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  // Write audio data
  let offset = 44;
  for (let channel = 0; channel < numberOfChannels; channel++) {
    const channelData = audioBuffer.getChannelData(channel);
    for (let i = 0; i < channelData.length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      if (bitDepth === 16) {
        view.setInt16(offset, sample * 0x7fff, true);
        offset += 2;
      } else if (bitDepth === 8) {
        view.setInt8(offset, sample * 0x7f);
        offset += 1;
      }
    }
  }

  return new Blob([buffer], { type: "audio/wav" });
}

/**
 * Get file size in MB
 */
export function getFileSizeInMB(file: File | Blob): number {
  return file.size / (1024 * 1024);
}

/**
 * Estimate compressed size based on current size and compression settings
 */
export function estimateCompressedSize(
  originalSize: number,
  originalSampleRate: number = 44100,
  targetSampleRate: number = 16000
): number {
  const compressionRatio = targetSampleRate / originalSampleRate;
  return originalSize * compressionRatio;
}
