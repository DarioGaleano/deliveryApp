export default function fortamAmount(amount){
    try{
        let i = parseInt(amount = Math.abs(Number(amount)||0).toFixed(2)).toString();
        //console.log('i',i)
        let j = (i.length > 3) ? i.length % 3 : 0;

        return (j? i.substr(0,j)+'.':'')+i.substr(j).replace(/(\d{3})(?=\d)/g, "$1.")+(','+Math.abs(amount-i).toFixed(2).slice(2))
    }catch(e){
        console.log(e)
    }
}