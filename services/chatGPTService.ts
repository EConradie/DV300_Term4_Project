import axios from "axios";

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const MODEL = "gpt-3.5-turbo";

export const sendToChatGPT = async (sourceText: string, targetText: string) => {
    const prompt = `
    Provide a clear, concise breakdown of the following translation with key insights. Use bullet points and keep it simple:
    
    1. **Grammar & Syntax**: Key differences in sentence structure or grammar.
    2. **Vocabulary & Usage**: Important words or phrases, including idioms or untranslatable words.
    3. **Cultural Context**: Any cultural nuances or context that affect meaning.
    4. **Learning Tips**: Short tips to help understand and remember this translation.
    
    Translation:
    Source: ${sourceText}
    Translated: ${targetText}
    `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: MODEL,
        messages: [
          { role: "system", content: "You are a language analysis assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 150, // Adjust based on response length needed
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`, // API key for auth
          "Content-Type": "application/json",
        },
      }
    );

    // Extract and return the response text
    console.log("ChatGPT Response:", response.data);
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    // Improved error handling to understand specific issues
    if (axios.isAxiosError(error)) {
      console.error(
        "Error communicating with ChatGPT:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error; // Rethrow error to be handled by caller if necessary
  }
};
