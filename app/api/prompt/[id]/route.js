import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

// GET Prompt
export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify("Prompt not found!"), { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data!", { status: 500 });
  }
};

// Update Prompt
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(params.id).populate("creator");
    if (!existingPrompt) {
      return new Response(JSON.stringify("Prompt not found!"), { status: 404 });
    }

    existingPrompt.tag = tag;
    existingPrompt.prompt = prompt;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data!", { status: 500 });
  }
};

// DELETE Prompt
export const DELETE = async (req, { params }) => {
    console.log(params);
    
  try {
    await connectToDb();
    const deletedPrompt = await Prompt.findByIdAndDelete(params.id).populate(
      "creator"
    );
    return new Response(JSON.stringify(deletedPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data!", { status: 500 });
  }
};
