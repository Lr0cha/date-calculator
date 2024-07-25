function checkInputs(){
    const inicial_date = form.getInitialDate().value;
    const final_date = form.getFinalDate().value;
    if (isDateValid(inicial_date) && isDateValid(final_date)){
        error.innerHTML = "";
        calculateTime(inicial_date,final_date);
        openResult();
    }
    else{ 
        InvalidDateMensage();
    }
}

function openResult(){  
    response.popup().classList.add("open-popup");
}

function closeResult(){
   response.popup().classList.remove("open-popup");
}

function InvalidDateMensage(){
    error.innerHTML = "Digite duas datas válidas";
    setTimeout(function(){
    error.innerHTML = "";
    },2000);
}

function isDateValid(dateString) {
    // Expressão regular para verificar o formato yyyy-mm-dd
    let regexDate = /^\d{4}-\d{2}-\d{2}$/;
    return regexDate.test(dateString);//True or false
}

function calculateTime(inicial_date,final_date){
    //transformar string para tipo date
    var init_date = new Date(inicial_date);
    var end_date = new Date(final_date);
    //formato pt-br
    response.titlePopup().innerHTML = dateBr(init_date,end_date) ;
    //pegar diferença em ms
    var difference_time = end_date.getTime() - init_date.getTime();
    //calculo dias
    var difference_days = Math.ceil(difference_time / (24 * 60 * 60 * 1000));
    // Calculando diferença em semanas
    var difference_weeks = Math.floor(difference_days / 7);
    // Cálculo dos meses
    var difference_months = (end_date.getMonth() + 1) - (init_date.getMonth() + 1);
    difference_months += (end_date.getFullYear() - init_date.getFullYear()) * 12;
    // calculo anos
    var difference_years = (difference_days/365);
    // Exibindo os resultados no popup
    response.days().innerHTML = difference_days + " dias";
    response.weeks().innerHTML = difference_weeks + " semanas";
    response.months().innerHTML =  difference_months + " meses";
    response.years().innerHTML = difference_years.toFixed(1) + " anos";
}

function dateBr(init_date,final_date){
    init_date.setDate(init_date.getDate() + 1);
    final_date.setDate(final_date.getDate() + 1);
    return (init_date.toLocaleString('pt-BR', {dateStyle : 'short'}) + " à " + final_date.toLocaleString('pt-BR', {dateStyle : 'short'}));
}

//objetos com métodos de referências para elementos HTML específicos com base em seus ID
const form ={
    getInitialDate: () => document.getElementById("inicial_date"),
    getFinalDate: () => document.getElementById("final_date"),
    error: () => document.getElementById("error"),
}
const response ={
    titlePopup : () => document.getElementById("title-popup"),
    days: () => document.getElementById("response-days"),
    weeks: () => document.getElementById("response-weeks"),
    months: () => document.getElementById("response-months"),
    years: () => document.getElementById("response-years"),
    popup: () => document.getElementById("popup"),
}


