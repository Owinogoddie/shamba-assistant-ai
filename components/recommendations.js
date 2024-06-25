import React from "react";

export const Recommendations = ({data}) => {
  const reportData = [
    {
      "title": "Introduction",
      "content": "This report provides a comprehensive analysis of the soil test results for a lima bean crop, with a target pH of 6.2. The soil pH, macronutrient levels, and organic matter content will be evaluated to provide tailored recommendations for improving soil health and crop yield."
    },
    {
      "title": "Nutrient Analysis",
      "content": [
        {
          "title": "- Nitrogen (N)",
          "content": "The nitrogen level is 45 ppm, which is considered low. Nitrogen is crucial for vegetative growth, and a deficiency can lead to stunted plants and reduced yields. To increase nitrogen levels, consider applying 40-60 lb/acre of a nitrogen-rich fertilizer, depending on the soil productivity group."
        },
        {
          "title": "- Phosphorus (P)",
          "content": "Phosphorus levels are at 30 ppm, which is also low. Phosphorus supports root development and energy transfer in plants. To enhance phosphorus availability, apply 70-90lb/acre of a phosphorus-containing fertilizer, according to the soil productivity group."
        },
        {
          "title": "- Potassium (K)",
          "content": "Potassium levels are optimal at 120 ppm. Potassium plays a vital role in water and nutrient uptake, as well as disease resistance. Since potassium levels are already adequate, no additional potassium fertilizer is required at this time."
        }
      ]
    },
    {
      "title": "Soil pH Assessment",
      "content": "The current soil pH is 6.5, slightly higher than the target pH of 6.2. To lower the soil pH, apply elemental sulfur or sulfur-containing products, following the manufacturer's recommendations. Periodically retest the soil pH to ensure it remains close to the target value."
    },
    {
      "title": "Soil Health Enhancements",
      "content": [
        {
          "title": "- Organic Matter",
          "content": "With 5% organic matter, the soil has a good foundation for nutrient retention and water holding capacity. To maintain or improve organic matter, incorporate cover crops, crop rotations, and organic residues."
        },
        {
          "title": "- Microbial Support",
          "content": "Encourage beneficial microbial activity by minimizing soil disturbance, maintaining appropriate moisture levels, and applying organic amendments."
        }
      ]
    },
    {
      "title": "Crop-Specific Insights",
      "content": "Lima beans benefit from well-drained, loose soil with a pH between 6.0 and 6.5. Maintain optimal nutrient levels through regular soil testing and adjust fertilizer applications accordingly."
    },
    {
      "title": "Ongoing Monitoring",
      "content": "Regularly monitor soil health by conducting annual or bi-annual soil tests. Adapt farming practices based on the soil test results and crop performance to ensure sustainable and productive agricultural practices."
    },
    {
      "title": "Conclusion",
      "content": "This comprehensive soil test report for lima beans highlights the importance of maintaining optimal nutrient levels, addressing the slightly elevated pH, and enhancing soil health through organic amendments and microbial support. By following these recommendations, you can promote sustainable crop production while maximizing yields."
    }
  ]

  const data2=[
    {
      "title": "Introduction",
      "content": "In this comprehensive recommendation, we will analyze the soil test results and provide tailored suggestions to enhance soil health and crop yield for a loamy soil with 5% organic matter, a pH level of 5.5, and the following nutrient levels: Nitrogen (N) - 15 ppm, Phosphorus (P) - 40 ppm, and Potassium (K) - 120 ppm. A crop of beans is planned for this field."
    },
    {
      "title": "Nutrient Analysis",
      "content": [
        {
          "title": "Nitrogen (N)",
          "content": "With a nitrogen level of 15 ppm, the soil has a deficiency in nitrogen. Nitrogen is crucial for vegetative growth, so it's essential to increase nitrogen availability for the beans. We recommend applying 40-60 lb/A of nitrogen as a fertilizer to address the deficiency."
        },
        {
          "title": "Phosphorus (P)",
          "content": "The phosphorus level of 40 ppm is low, but beans can tolerate lower phosphorus levels. However, it's still beneficial to apply some phosphorus to promote root development and seed formation. Apply 30-50 lb/A of phosphorus as a fertilizer to improve phosphorus availability."
        },
        {
          "title": "Potassium (K)",
          "content": "The potassium level of 120 ppm is within the optimum range for beans. Potassium supports various plant functions, including water and nutrient transport, so there's no need for potassium fertilization in this case."
        }
      ]
    },
    {
      "title": "Soil pH Assessment",
      "content": "The soil pH level of 5.5 is acidic and may negatively impact nutrient availability and microbial activity. To raise the soil pH, apply lime at a rate of 2-3 tons/A. Repeat liming every 2-3 years to maintain the desired pH level."
    },
    {
      "title": "Soil Health Enhancements",
      "content": [
        {
          "title": "Organic Matter",
          "content": "The 5% organic matter level is good, but it can still be improved. Incorporating cover crops, compost, or manure can enhance organic matter content, improving soil structure, nutrient retention, and microbial activity."
        },
        {
          "title": "Microbial Support",
          "content": "Encourage beneficial microbial activity by reducing soil disturbance, maintaining adequate moisture, and adding organic amendments. Avoid excessive tillage and consider using cover crops to support soil microorganisms."
        }
      ]
    },
    {
      "title": "Crop-Specific Insights",
      "content": "For beans, ensure adequate phosphorus levels for root development and seed formation. Also, maintain the appropriate soil pH for optimal nutrient availability and microbial activity."
    },
    {
      "title": "Ongoing Monitoring",
      "content": "Regularly test the soil every 2-3 years to monitor nutrient levels, pH, and organic matter content. Adapt farming practices based on the test results to maintain a balanced soil environment that supports crop growth and yield."
    },
    {
      "title": "Conclusion",
      "content": "In conclusion, the soil test results indicate that nitrogen and phosphorus levels should be increased, while maintaining the sufficient potassium levels. Addressing the acidic soil pH and enhancing soil health through organic matter additions and microbial support will contribute to improved bean growth and yield. Regular monitoring and adaptive management are essential for long-term soil and crop success."
    }
  ]
  
  

  return (
    // <div title="Soil Testing Report Recommendations" style={{ width: "100%" }}>
    //   {data.map((section, index) => {
    //     // Check if the section is 'Nutrient Analysis' or 'Soil Health Enhancements' to handle them differently
    //     if (section.title === "Nutrient Analysis" || section.title === "Soil Health Enhancements") {
    //       return (
    //         <div key={index}>
    //           <h2>{section.title}</h2>
    //           {section.content.map((item, itemIndex) => (
    //             <div key={itemIndex}>
    //               <h3>{item.title}</h3>
    //               <p>{item.content}</p>
    //             </div>
    //           ))}
    //         </div>
    //       );
    //     } else {
    //       // Render other sections normally
    //       return (
    //         <div key={index}>
    //           <h2>{section.title}</h2>
    //           <p>{section.content}</p>
    //         </div>
    //       );
    //     }
    //   })}
    // </div>

   
    <div title="Soil Testing Report Recommendations" style={{ width: "100%" }} className="max-w-6xl text-black mt-4 p-4 mx-auto bg-slate-300 shadow-lg">
    {
    data.length > 0 ? (
    data.map((section, index) => {
      // Check if the content is an array and render accordingly
      if (Array.isArray(section.content)) {
        return (
          <div key={index}>
            <h2 className="font-bold text-2xl">{section.title}</h2>
            {section.content.map((item, itemIndex) => (
              <div key={itemIndex}>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
          </div>
        );
      } else {
        // If content is a string, render it directly
        return (
          <div key={index}>
            <h2 className="font-bold text-2xl">{section.title}</h2>
            <p>{section.content}</p>
          </div>
        );
      }
    })
  ) : (
    <p>No data available.</p>
  )
  }
  </div>
    );
};
