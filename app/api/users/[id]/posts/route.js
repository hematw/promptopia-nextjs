import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const posts = await Prompt.find({ creator: params.id }).populate("creator");    
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data!", { status: 500 });
  }
};

