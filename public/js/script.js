$(document).ready(function () { 
    var url = "https://api.covid19india.org/data.json";
    var urlTN = "https://api.covid19india.org/state_district_wise.json";
    var urlDailyTn = "https://api.covid19india.org/states_daily.json";

    $.getJSON(url,function (data) { 

        var total_confirmed,total_active,total_recovered,total_death;
        total_confirmed = data.statewise[0].confirmed;
        total_active = data.statewise[0].active;
        total_recovered = data.statewise[0].recovered;
        total_death = data.statewise[0].deaths;

        $("#confirmed").append(total_confirmed);
        $("#active").append(total_active);
        $("#recovered").append(total_recovered);
        $("#death").append(total_death);

        var confirmed = [];
        var state = [];
        var recovered = [];
        var death = [];

        $.each(data.statewise,function (id,obj) { 
            state.push(obj.state);
            confirmed.push(obj.confirmed);
            recovered.push(obj.recovered);
            death.push(obj.deaths);    
        });

        state.shift();
        confirmed.shift();
        recovered.shift();
        death.shift();

        var myChart = document.getElementById('myChart').getContext('2d');

        var chart = new Chart(myChart,{
            type: 'line',
            data: {
                labels: state,
                datasets: [
                    {
                        label: "confirmed",
                        data: confirmed,
                        backgroundColor: "#f1c40f",
                        minBarLength: 100
                    },
                    {
                        label: "recovered",
                        data: recovered,
                        backgroundColor: "#2ec771",
                        minBarLength: 100
                    },
                    {
                        label: "death",
                        data: death,
                        backgroundColor: "#e74c3c",
                        minBarLength: 100
                    }
                ]
            },
            options: {}
        });

    });

    $.getJSON(urlTN,function (data) { 
        var tn_confirmed = [];
        var tn_active = [];
        var tn_recovered = [];
        var tn_death = [];
        var tnState = [];
        var collection = data['Tamil Nadu']['districtData'];
        
        for(var key in collection){
            tn_confirmed.push(collection[key].confirmed);
            tn_active.push(collection[key].active);
            tn_recovered.push(collection[key].recovered);
            tn_death.push(collection[key].deceased);
            tnState.push(key);
        }
        
        var tnChart = document.getElementById('tnGraph').getContext('2d');

        var chart = new Chart(tnChart,{
            type: 'bar',
            data: {
                labels: tnState,
                datasets: [
                    {
                        label: "confirmed",
                        data: tn_confirmed,
                        backgroundColor: "#f1c40f",
                        minBarLength: 100
                    },
                    {
                        label: "recovered",
                        data: tn_recovered,
                        backgroundColor: "#2ec771",
                        minBarLength: 100
                    },
                    {
                        label: "death",
                        data: tn_death,
                        backgroundColor: "#e74c3c",
                        minBarLength: 100
                    }
                ]
            },
            options: {}
        });

    });

    $.getJSON(urlDailyTn,function (data) { 
        var dailyConfirmed = [];
        var dailyRecovered = [];
        var dailyDeath = [];
        var date = [];

        $.each(data.states_daily,function (id,obj) { 
            if(obj.status === "Confirmed"){
                dailyConfirmed.push(obj.tn);
                date.push(obj.date);
            }
            else if(obj.status === "Recovered"){
                dailyRecovered.push(obj.tn);
            }
            else if(obj.status === "Deceased"){
                dailyDeath.push(obj.tn);
            }
        });

        var tnDailyChart = document.getElementById('tnDailyGraph').getContext('2d');

        var chart = new Chart(tnDailyChart,{
            type: 'line',
            data: {
                labels: date,
                datasets: [
                    {
                        label: "confirmed",
                        data: dailyConfirmed,
                        backgroundColor: "#f1c40f",
                        minBarLength: 100
                    },
                    {
                        label: "recovered",
                        data: dailyRecovered,
                        backgroundColor: "#2ec771",
                        minBarLength: 100
                    },
                    {
                        label: "death",
                        data: dailyDeath,
                        backgroundColor: "#e74c3c",
                        minBarLength: 100
                    }
                ]
            },
            options: {}
        });
        

    });

    $("#submitBtn").click(function () { 
        alert("Your Information is Submitted Successfully");
    });
        
});
