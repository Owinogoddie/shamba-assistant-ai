export function extractJsonFromString(str: string): any {
    const jsonRegex = /{[\s\S]*}/;
    const match = str.match(jsonRegex);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
      }
    }
    return null;
  }