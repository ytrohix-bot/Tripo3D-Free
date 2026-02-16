import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HF_TOKEN);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as Blob;

    // We call the TripoSR model on Hugging Face
    const response = await hf.request({
      model: 'stabilityai/TripoSR',
      data: image,
      // Note: TripoSR is an image-to-3D task
      // The exact method may vary depending on the HF Space API
    });

    return new NextResponse(response, {
      headers: { 'Content-Type': 'model/gltf-binary' },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate 3D" }, { status: 500 });
  }
}
