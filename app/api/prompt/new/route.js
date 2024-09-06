import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    connectToDb();
    const createdPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    return new Response(JSON.stringify(createdPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
  }
};
