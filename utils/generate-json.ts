export const stringResponse= "**Introduction**\n" +
  "This report provides a comprehensive analysis of the soil test results for a lima bean crop, with a target pH of 6.2. The soil pH, macronutrient levels, and organic matter content will be evaluated to provide tailored recommendations for improving soil health and crop yield.\n" +
  "\n" +
  "**Nutrient Analysis**\n" +
  "\n" +
  "- **Nitrogen (N)**: The nitrogen level is 45 ppm, which is considered low. Nitrogen is crucial for vegetative growth, and a deficiency can lead to stunted plants and reduced yields. To increase nitrogen levels, consider applying 40-60 lb/acre of a nitrogen-rich fertilizer, depending on the soil productivity group.\n" +
  "\n" +
  "- **Phosphorus (P)**: Phosphorus levels are at 30 ppm, which is also low. Phosphorus supports root development and energy transfer in plants. To enhance phosphorus availability, apply 70-90 lb/acre of a phosphorus-containing fertilizer, according to the soil productivity group.\n" +
  "\n" +
  "- **Potassium (K)**: Potassium levels are optimal at 120 ppm. Potassium plays a vital role in water and nutrient uptake, as well as disease resistance. Since potassium levels are already adequate, no additional potassium fertilizer is required at this time.\n" +
  "\n" +
  "**Soil pH Assessment**\n" +
  "The current soil pH is 6.5, slightly higher than the target pH of 6.2. To lower the soil pH, apply elemental sulfur or sulfur-containing products, following the manufacturer's recommendations. Periodically retest the soil pH to ensure it remains close to the target value.\n" +
  "\n" +
  "**Soil Health Enhancements**\n" +
  "\n" +
  "- **Organic Matter**: With 5% organic matter, the soil has a good foundation for nutrient retention and water holding capacity. To maintain or improve organic matter, incorporate cover crops, crop rotations, and organic residues.\n" +
  "\n" +
  "- **Microbial Support**: Encourage beneficial microbial activity by minimizing soil disturbance, maintaining appropriate moisture levels, and applying organic amendments.\n" +
  "\n" +
  "**Crop-Specific Insights**\n" +
  "Lima beans benefit from well-drained, loose soil with a pH between 6.0 and 6.5. Maintain optimal nutrient levels through regular soil testing and adjust fertilizer applications accordingly.\n" +
  "\n" +
  "**Ongoing Monitoring**\n" +
  "Regularly monitor soil health by conducting annual or bi-annual soil tests. Adapt farming practices based on the soil test results and crop performance to ensure sustainable and productive agricultural practices.\n" +
  "\n" +
  "**Conclusion**\n" +
  "This comprehensive soil test report for lima beans highlights the importance of maintaining optimal nutrient levels, addressing the slightly elevated pH, and enhancing soil health through organic amendments and microbial support. By following these recommendations, you can promote sustainable crop production while maximizing yields.";


  export function convertToStructuredJSON33(stringResponse) {
    const sections = stringResponse.split('\n\n');
    let jsonStructure = [];
    let nutrientAnalysisContent = [];
  
    sections.forEach(section => {
      const lines = section.split('\n');
      const titleLine = lines[0].replace(/\*\*/g, '');
      const contentLines = lines.slice(1);
  
      if (titleLine === 'Nutrient Analysis') {
        // Prepare the Nutrient Analysis section with an empty content array
        jsonStructure.push({ title: titleLine, content: nutrientAnalysisContent });
      } else if (titleLine.startsWith('- ')) {
        // Add nutrient details as objects to the Nutrient Analysis content array
        const nutrientTitle = titleLine.split(': ')[0].replace(/- \*\*/g, '').replace(/\*\*/g, '');
        const nutrientContent = titleLine.split(': ')[1].trim();
        nutrientAnalysisContent.push({ title: nutrientTitle, content: nutrientContent });
      } else {
        // Regular section with content as a single string
        const contentString = contentLines.join(' ');
        jsonStructure.push({ title: titleLine, content: contentString });
      }
    });
  
    return jsonStructure;
  }
  
  
  export function convertToStructuredJSON333(stringResponse) {
    stringResponse = stringResponse.replace(/\\n/g, '\n');
    const sections = stringResponse.split('\n\n');
    let jsonStructure = [];
    let nutrientAnalysisContent = [];
    let soilHealthEnhancementsContent = [];
  
    sections.forEach(section => {
      const lines = section.split('\n');
      const titleLine = lines[0].replace(/\*\*/g, '');
      const contentLines = lines.slice(1);
  
      if (titleLine === 'Nutrient Analysis' || titleLine === 'Soil Health Enhancements') {
        // Prepare the Nutrient Analysis or Soil Health Enhancements section with an empty content array
        const contentArray = titleLine === 'Nutrient Analysis' ? nutrientAnalysisContent : soilHealthEnhancementsContent;
        jsonStructure.push({ title: titleLine, content: contentArray });
      } else if (titleLine.startsWith('- ')) {
        // Add details as objects to the Nutrient Analysis or Soil Health Enhancements content array
        const subtitle = titleLine.split(': ')[0].replace(/- \*\*/g, '').replace(/\*\*/g, '');
        const subtitleContent = titleLine.split(': ')[1].trim();
        const contentObject = { title: subtitle, content: subtitleContent };
  
        if (titleLine.includes('Organic Matter') || titleLine.includes('Microbial Support')) {
          soilHealthEnhancementsContent.push(contentObject);
        } else {
          nutrientAnalysisContent.push(contentObject);
        }
      } else {
        // Regular section with content as a single string
        const contentString = contentLines.join(' ');
        jsonStructure.push({ title: titleLine, content: contentString });
      }
    });
  
    console.log(JSON.stringify(jsonStructure,null,2))
  }
  
  
  export function convertToStructuredJSON3(stringResponse) {
    stringResponse = stringResponse.replace(/\\n/g, '\n');
    const sections = stringResponse.split('\n\n');
    let jsonStructure = [];
  
    sections.forEach(section => {
      const lines = section.split('\n');
      const titleLine = lines[0].replace(/\*\*/g, '').trim();
      const contentLines = lines.slice(1);
  
      // Check if the section has a title and is not a continuation of the content
      if (titleLine && !titleLine.startsWith('- ')) {
        // Create a new section with the title and empty content
        jsonStructure.push({ title: titleLine, content: [] });
      }
  
      // Process content lines
      contentLines.forEach(contentLine => {
        if (contentLine.startsWith('- **')) {
          // It's a subtitle with content
          const subtitleMatch = contentLine.match(/- \*\*(.*?)\*\*: (.*)/);
          if (subtitleMatch) {
            const lastSection = jsonStructure[jsonStructure.length - 1];
            lastSection.content.push({
              title: subtitleMatch[1],
              content: subtitleMatch[2]
            });
          }
        } else if (contentLine.trim() !== '') {
          // It's a continuation of the content for the current section
          const lastSection = jsonStructure[jsonStructure.length - 1];
          if (Array.isArray(lastSection.content) && lastSection.content.length === 0) {
            // If the content array is empty, replace it with the content string
            lastSection.content = contentLine.trim();
          } else if (typeof lastSection.content === 'string') {
            // If the content is already a string, append the new content
            lastSection.content += ' ' + contentLine.trim();
          }
        }
      });
    });
  
    return jsonStructure;
  }
  
  