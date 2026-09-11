import { FilesetResolver, ImageEmbedder, type Embedding } from '@mediapipe/tasks-vision';
import type { Dog } from './data';

let embedderPromise: Promise<ImageEmbedder> | null = null;
const embeddingCache = new Map<string, Embedding>();

function getEmbedder() {
  embedderPromise ??= FilesetResolver.forVisionTasks('/mediapipe').then(files =>
    ImageEmbedder.createFromOptions(files, {
      baseOptions: { modelAssetPath: '/mediapipe/dog-image-embedder.tflite' },
      runningMode: 'IMAGE',
      l2Normalize: true,
    })
  );
  return embedderPromise;
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image could not be loaded'));
    image.src = source;
  });
}

async function embeddingFor(source: string) {
  const cached = embeddingCache.get(source);
  if (cached) return cached;
  const [embedder, image] = await Promise.all([getEmbedder(), loadImage(source)]);
  const embedding = embedder.embed(image).embeddings[0];
  if (!embedding) throw new Error('No image embedding returned');
  embeddingCache.set(source, embedding);
  return embedding;
}

export type VisualMatch = {
  dog: Dog;
  visualScore: number;
};

export async function findVisualMatches(photo: string, dogs: Dog[]): Promise<VisualMatch[]> {
  const query = await embeddingFor(photo);
  const results = await Promise.all(dogs.map(async dog => {
    try {
      const candidate = await embeddingFor(dog.photo);
      const similarity = ImageEmbedder.cosineSimilarity(query, candidate);
      const visualScore = Math.round(Math.max(0, Math.min(1, (similarity - 0.35) / 0.6)) * 100);
      return { dog, visualScore };
    } catch {
      return { dog, visualScore: 0 };
    }
  }));
  return results.sort((a, b) => b.visualScore - a.visualScore).slice(0, 5);
}
