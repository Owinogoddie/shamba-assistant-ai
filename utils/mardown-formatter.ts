export function formatContent(expertiseText) {
    if(!expertiseText){
        return "no content"
    }
    // Split the text into individual points based on the numbering
    const points = expertiseText.split(/\n\n\d+\. \*\*/);
  
    // Remove the bold markdown and trim whitespace
    const cleanPoints = points.map(point => point.replace(/\*\*/g, '').trim());
  
    // Map over the points to create a structured object
    const formattedPoints = cleanPoints.map((point, index) => {
      // Check if the point starts with a number (for numbered list)
      if (point.match(/^\d+\./)) {
        return { type: 'numbered', content: point };
      }
      // Otherwise, it's part of the bullet list
      return { type: 'bullet', content: point.replace(/^\- /, '') };
    });
  
    // Return the structured list of points
    // return formattedPoints;
    // return(
    //     <div>
    //   {formattedPoints.map((point, index) => {
    //     // Render a numbered list item if the type is 'numbered'
    //     if (point.type === 'numbered') {
    //       return (
    //         <ol key={index}>
    //           <li dangerouslySetInnerHTML={{ __html: point.content }}></li>
    //         </ol>
    //       );
    //     }
    //     // Render a bullet list item if the type is 'bullet'
    //     else if (point.type === 'bullet') {
    //       return (
    //         <ul key={index}>
    //           <li dangerouslySetInnerHTML={{ __html: point.content }}></li>
    //         </ul>
    //       );
    //     }
    //     // If the point doesn't match the expected types, return null
    //     return null;
    //   })}
    // </div>
    // )
    console.log(formattedPoints)
  }
  