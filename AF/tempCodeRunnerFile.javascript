function getAverage(scores) {
    let total = 0
    for(let i = 0;i<scores.length-1 ;i){
      total = total + scores[i]
    }
    let average = total/scores.length
    console.log(average)
  }
  
  console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
  console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95]));