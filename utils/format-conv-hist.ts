export const formatConvHist=(messages:any)=>{
    return messages.map((message,i)=>{
        if(i%2===o){
            return `Human: ${message}`
        }
        if(i%2===1){
            return `AI: ${message}`
        }
    }).join('\n')
}