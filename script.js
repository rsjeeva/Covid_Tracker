var c_list = document.getElementById('country_list');

c_list.addEventListener('click',function(event){

    event.preventDefault();

    // console.log('yes');
    var url = "https://covid-api.mmediagroup.fr/v1/cases";

    fetch(url)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        con_list(data);
    })
    .catch((err)=>{
        console.log('error');
    });
});


function con_list(data)
{
    var arr1 = Object.keys(data);
    // console.log(arr1);
    var i=0;
    var opt=[];
    for(i=0;i<arr1.length;i++)
    {
        opt[i]= document.createElement('option');
        opt[i].innerHTML=arr1[i];
        c_list.append(opt[i]);
    }
}


function getresult(event)
{
    event.preventDefault();

    var country_name = c_list.value.toUpperCase();
    
    // console.log(country_name);

    var url = "https://covid-api.mmediagroup.fr/v1/cases";

    fetch(url)
    .then((res)=>{
        // console.log(res);
        return res.json();
    })
    .then((data)=>{
        apidata(data, country_name);
    })
    .catch((err)=>{
        console.log('error');
    });

}

var rec = document.getElementById('recovered');
var conf = document.getElementById('confirmed');
var pop = document.getElementById('population');
var ded = document.getElementById('deaths');

function apidata(data, country_name)
{
    var i=0, count=0;
    // console.log(data.Afghanistan.All.confirmed);
    var arr= Object.keys(data);
    // console.log(arr);
    for(i=0;i<arr.length;i++)
    {
        var x = arr[i];
        // console.log(x);

        if(country_name === x.toUpperCase())
        {            
            var confirmedcases = data[arr[i]].All.confirmed;    
            conf.innerHTML=confirmedcases;
            // console.log(confirmedcases);

            var casesrecovered = data[arr[i]].All.recovered;
            rec.innerHTML=casesrecovered;
            // console.log(casesrecovered);

            var death = data[arr[i]].All.deaths;
            ded.innerHTML = death;
            // console.log(death);

            var total_pop = data[arr[i]].All.population;
            pop.innerHTML=total_pop;
            // console.log(total_pop);

            count=1;
        }
    }

    if(count===0)
    {
            window.alert('Enter a correct country name');
    }

}