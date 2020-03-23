import cubejs from '@cubejs-client/core';
import echarts from 'echarts';

let measure = [],dimension = []


//----------------------------------Handle Dimension--------------------------------------------------------------

 export function handledimension()  {
  
   dimension.push(event.target.value);
   console.log(dimension)
   LoadCube(measure,dimension)


}

//-----------------------------------Handle Measures-----------------------------------------------------------------
export function handlemeasure() {
  measure.push(event.target.value);
  console.log(measure)
  LoadCube(measure,dimension)
  
  
}



//-------------------------------------Cubejs Meta--------------------------------------------------------------------
const cubejsApi = cubejs(
  'secret',
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' },
);

cubejsApi
  .meta({
       

  })
  .then((resultSet) => {
            
           console.log(resultSet)

          var seldim = document.getElementById('selectdimension');
          let myOption ;
          resultSet.meta.cubes[0].dimensions.map((e,i) =>{ 
                 
                    myOption = document.createElement("option");
                    myOption.text = e.title;
                    myOption.value = e.name;
                    seldim.add(myOption);
          });

          var  selmea = document.getElementById('selectmeasure');
          let meaoption ;
          meaoption = document.createElement("option");
            meaoption.text = "Select option";
            meaoption.value = "";
            selmea.add(meaoption);

          resultSet.meta.cubes[0].measures.map((e,i) =>{ 
          
            meaoption = document.createElement("option");
            meaoption.text = e.title;
            meaoption.value = e.name;
            selmea.add(meaoption);
            console.log('hi')
  });
   
  });





  //---------------------------------------Cubejs Load-------------------------------------------------------

 const LoadCube =(measure,dimensions)=> {
  cubejsApi
  .sql({
  
    measures: measure,
    dimensions: dimension   

  })
  .then((resultSet) => {
    // initialize echarts instance with prepared DOM
    
    console.log(resultSet)
    var myChart = echarts.init(document.getElementById('chart'));
    // draw chart
    myChart.setOption({
      tooltip: {
        axisPointer: {
                type: ''
            }
    },
      xAxis: {
        data: resultSet.chartPivot().map(i => i.x)
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: resultSet.chartPivot().map(i => i['Volkswagen.count'])
        }
      ]
    });
  });
 }

 //------------------------------------------------------------------------------------------------------------------




cubejsApi
  .sql({
    measures:["Tataq.buckets","Tataq.overallopinion"],
    dimensions:["Tataq.count"]

  })
  .then((resultSet) => {
            
           console.log('sql', resultSet)

          var seldim = document.getElementById('selectdimension');
          let myOption ;
          resultSet.meta.cubes[0].dimensions.map((e,i) =>{ 
                 
                    myOption = document.createElement("option");
                    myOption.text = e.title;
                    myOption.value = e.name;
                    seldim.add(myOption);
          });

          var  selmea = document.getElementById('selectmeasure');
          let meaoption ;
          meaoption = document.createElement("option");
            meaoption.text = "Select option";
            meaoption.value = "";
            selmea.add(meaoption);

          resultSet.meta.cubes[0].measures.map((e,i) =>{ 
          
            meaoption = document.createElement("option");
            meaoption.text = e.title;
            meaoption.value = e.name;
            selmea.add(meaoption);
            console.log('hi')
  });
   
  });

