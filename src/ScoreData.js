async function getScoreList(){
    return new Promise(resolve=>{
        resolve(JSON.parse(localStorage.getItem("memcard-scores-list") || "[]"))
    });
}

async function checkBestScore(score){
    const list=await getScoreList();
    return list.filter(item=>item.score<score).length===0;
}

async function addBestScore(name,score){
    let list=await getScoreList();
    const date=new Date();
    const seconds = score / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    date.setHours(hours, minutes, seconds);      
    list.push({name:name,score:score,time:date.toLocaleTimeString("en-GB")})
    list.sort((a,b)=>{return a.score-b.score});
    list=list.slice(0,10);
    localStorage.setItem("memcard-scores-list",JSON.stringify(list));
}

export default {
    checkBestScore:checkBestScore,
    getScoreList:getScoreList,
    addBestScore:addBestScore
}