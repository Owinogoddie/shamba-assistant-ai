export const formatConvHist=(messages:any)=>{
    return messages.map((message:any,i:any)=>{
        if(i%2===0){
            return `Human: ${message}`
        }
        if(i%2===1){
            return `AI: ${message}`
        }
    }).join('\n')
}