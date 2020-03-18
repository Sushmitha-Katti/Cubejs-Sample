import React, { Component } from "react";
import { Layout, Divider, Empty, Select } from "antd";

import {
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  LineChart,
  Line
} from "recharts";


import cubejs from "@cubejs-client/core";
import moment, { relativeTimeThreshold } from "moment";
import numeral from "numeral";

import { QueryRenderer, QueryBuilder } from "@cubejs-client/react";
import { ListGroupItemHeading } from "reactstrap";

const cubejsApi = cubejs(
  'secret',
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' },
);
const numberFormatter = item => numeral(item).format("0,0");
const dateFormatter = item => moment(item).format("MMM YYYY");
const colors = ["#7DB3FF", "#49457B", "#FF7C78"];


class Chart extends Component {
  state = {
    chart :0,
    filter: []
  

  };
  //
   dateRange = [
    'Today' ,
    'Yesterday' ,
    'This week' ,
    'This month' ,
    'This quarter' ,
    'This year' ,
    'Last 7 days' ,
    'Last 30 days' ,
    'Last week' ,
    'Last month' ,
    'Last quarter' ,
    'Last year' 


  ]
   Granual = [
     undefined ,
     'hour',
     'day',
     'week',
     'month',
     'year',
  
  ]
  Filter = [
    'contains',
    'notContains',
    'equals',
    'notEquals',
    'set',
    'notSet'
  ]

  //------------------------------------PieChart--------------------------------------------------------------------
   PieChart = (resultSet) => (
    <ResponsiveContainer width="100%" height={400}>
    <PieChart>
      <Pie
        isAnimationActive={false}
        data={resultSet.chartPivot()}
        nameKey="x"
        dataKey={resultSet.seriesNames()[0].key}
        fill="#8884d8"
      >
      {
        resultSet.chartPivot().map((e, index) =>
          <Cell key={index} fill={colors[index % colors.length]}/>
        )
      }
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
     </ResponsiveContainer>);


//-------------------------------------------Bar Chart------------------------------------------------------------------
    
    BarChart = (resultSet)=>(
      <ResponsiveContainer width="80%" height={400}>

             <BarChart data={resultSet.chartPivot()}>
               <XAxis dataKey="x"  />
               <YAxis />
               {resultSet.seriesNames().map((series, i) => ( 
                 <Bar  stackId="a"
                 key = {series.key}
                 dataKey={series.key}
                 name={series.title}
                 fill={colors[i]} />))}
                 
               <Tooltip  />
               
             </BarChart>
       </ResponsiveContainer> 


    )
//------------------------------------------------Line Chart---------------------------------------------------
    
LineChart = (resultSet)=>(
    <ResponsiveContainer width="100%" height={700}>

           <LineChart data={resultSet.chartPivot()}>
             <XAxis dataKey="x"  />
             <YAxis />
             {resultSet.seriesNames().map((series, i) => ( 
               <Line stackId="a"
               key = {series.key}
               dataKey={series.key}
               name={series.title}
               stroke={colors[i]} />))}
               
             <Tooltip  />
             
           </LineChart>
     </ResponsiveContainer> 


  )

    //--------------------------------Switch Between Charts---------------------------------------------------------
    renderSwitch(param,resultSet) {
      switch(param) {
        case 'bar':
          return this.BarChart(resultSet);
      case 'pie':
            return this.PieChart(resultSet);
      case 'Line':
           return this.LineChart(resultSet);
  
        default:
          return '';
      }
    }


   
 render() {
  
   
   return (
     <QueryBuilder
     
     query={{
      "dimensions": [
        "Tataq.buckets",
        
      ],
      // "timeDimensions": [{
      //   "dimension": 'TataQ.createdat',
      //   "dateRange": ['2020-02-18', '2020-02-24'],
      //   "granularity": 'day'
      // }],
      "measures": [
       "Tataq.count"

      ],
    
    }}
       cubejsApi={cubejsApi}
       render={({ resultSet,measures,availableMeasures,availableDimensions, updateMeasures,dimensions,updateDimensions,availableTimeDimensions,timeDimensions,updateTimeDimensions,filters,updateFilters}) => {
         if (!resultSet) {
           return "Loading...";
         }
         console.log("timedimension",timeDimensions);
        //  resultSet.seriesNames().map(series=> console.log(series['title'].split(',')[0]));
        //  console.log("****",dimensions);

        //-----------------------------------Handle Change of Charts---------------------------------
        const handleChange=(event) =>{
          this.setState({[event.target.name]: event.target.value}); 
      }
      //-------------------------------------Handle Change Of Dimension ------------------------------------
      const handleDimensionChange=(event) =>{
         console.log(event.target.value);

       
        
        updateDimensions.add(availableDimensions[event.target.value]);
    }
    //--------------------------------------Handle Time Dimension ///////////Todo///////-----------------------------------------
    const handleTimeDimensionChange=(type , event) =>{
        console.log(event.target.value);
        if(type==="dimension"){
          this.setState({showtimebox:1})
          updateTimeDimensions.add({dimension:availableTimeDimensions[event.target.value],granularity:"day",dataRange:"This quarter"});
        }
        if(type === "granual"){
          console.log(timeDimensions[0])
          updateTimeDimensions.update(timeDimensions[0],{...timeDimensions[0],granularity:event.target.value})

        }
        if(type === "daterange"){
          updateTimeDimensions.update(timeDimensions[0],{...timeDimensions[0],dateRange:event.target.value})

        }
   }
//-----------------------------------------Deselcting Dimension------------------------------------
const handleDeselectDimensionChange=(event) =>{

  updateDimensions.remove(event);
 
 
}
  
//---------------------------------------Deselcting Time dimension----------------------------------------------
const handleDeselectTimeDimensionChange=(event) =>{
  this.setState({showtimebox:0})

  updateTimeDimensions.remove(event);
 
 
}
//-----------------------------------------Deselcting Measure Change--------------------------------------------

 const handleDeselectMeasureChange=(event) =>{

  updateMeasures.remove(event);
 
 
}
//-------------------------------------------Handling Measure Change--------------------------------------------
    const handleMeasureChange=(event) =>{
      console.log(event.target.value);
     
     updateMeasures.add(availableMeasures[event.target.value]);


 }

//----------------------------------------------Handling Filter-----------------------------------------------

const handleFilter =(type,i,event) => {
  // alert("handle pressed");

 
  if(type==='fildimension'){
     
      this.setState({filter:[...this.state.filter,{dimension:availableDimensions[event.target.value]}]})
  }
  if(type==='filoper'){
   
    let temp = [...this.state.filter]
    temp[i].operator = event.target.value ;
    this.setState({filter:[...temp]})
  }
    
    
  if(type==='values'){
    let temp = [...this.state.filter]
    temp[i].values =[ event.target.value] ;
    this.setState({filter:[...temp]})

  }
  if(i>=0){
  
    if(Object.keys(this.state.filter[i]).length===3 ){
    console.log(this.state.filter[i])
    console.log('index',)

    if(filters.findIndex(e=>e['dimension']['name'] === this.state.filter[i]['dimension']['name'])>=0)
    {
      
     let index = filters.findIndex(e=>e['dimension']['name'] === this.state.filter[i]['dimension']['name'])
        updateFilters.update(filters[index],this.state.filter[i])
    }
    else{
    
          updateFilters.add(this.state.filter[i])}
   
    }
  }


}

//-------------------------------------------------Handle Deselect Filter----------------------------------
const handledeselectfilter = (i,event) => {
  console.log('hi')
  const fil = this.state.filter

 
  if(filters.findIndex(e=>e['dimension']['name'] === this.state.filter[i]['dimension']['name'])>=0)
      updateFilters.remove(this.state.filter[i])
  fil.splice(i,1)
  this.setState({filter:fil})
  

}

 //-----------------------------------------------Return-----------------------------------------------------

         return (<>
         <bold>Select Chart</bold>
         
         <select name="chart"   onChange={handleChange}>
           <option >Select Chart</option>
          <option value="bar">BarChart</option>
          <option value="pie">PieChart</option>
           <option value="Line">LineChart</option>
          </select>
          <br/>
          <br/>

          {/* Dimension */}
       
          <bold>Dimensions</bold>
          <select name="dimension"   onChange={handleDimensionChange}>
         {availableDimensions.length>0 && availableDimensions.map((dimension,i)=> <option key={dimension.name} value={i}>
             {dimension.title}</option>)}
          </select>

          {dimensions.map(dimension => <span onClick ={ (e) =>handleDeselectDimensionChange(dimension, e)} style={{border:"1px solid black" , marginLeft: "1rem"}}>{dimension.name}</span>)}
         <br/><br/>

          {/* Measure */}

          <bold>Measures</bold>
          <select name="dimension"   onChange={handleMeasureChange}>
         {availableMeasures.length>0 && availableMeasures.map((measure,i)=> <option key={measure.name} value={i}>
             {measure.title}</option>)}
          </select>
          {measures.map(measure => <span onClick ={ (e) =>handleDeselectMeasureChange(measure, e)} style={{border:"1px solid black" , marginLeft: "1rem",}}>{measure.name}</span>)}
          <br/><br/>
          
         

          {/* Time Dimesion */}
          <bold>TimeDimensions</bold>
          <select name = "TimeDimension" onChange = {(e) =>handleTimeDimensionChange('dimension',e)}>
          <option>Select Dimension</option>
         {availableTimeDimensions.length>0 && availableTimeDimensions.map((tdimension,i) => <option key = {tdimension.name} value = {i}>{tdimension.title}</option>)}
          </select>
          {timeDimensions.map(block => <span onClick ={ (e) =>handleDeselectTimeDimensionChange(block, e)} style={{border:"1px solid black" , marginLeft: "1rem",}}>{block.dimension.title}</span>)}
         {this.state.showtimebox===1?<><bold>For</bold>
         <select name = "daterange" onChange = {(e) =>handleTimeDimensionChange('daterange',e)}>
         {this.dateRange.map(date => <option>{date}</option>)}
          </select>
         <bold>By</bold>
         <select name = "granual" onChange = {(e) =>handleTimeDimensionChange('granual',e)}>
         {this.Granual.map(gran=><option>{gran}</option>)}
         </select>
         </>:"" }
         <br/>
         <br/>


         {/* Filter */}
         <bold>Filter</bold>
         <select name = "filter" onChange = {(e) =>handleFilter('fildimension',-1,e)}>
           <option>Select Filter</option>
           {availableDimensions.length>0 && availableDimensions.map((dimension,i)=> <option key={dimension.name} value={i}>
             {dimension.title}</option>)}
           {availableMeasures.length>0 && availableMeasures.map((measure,i)=> <option key={measure.name} value={measure.title}>
             {measure.title}</option>)}
         </select>
        
         {this.state.filter.length>0 && this.state.filter.map((fil,i) =><><span onClick={(e => handledeselectfilter(i,e))} style={{border:"1px solid black" , marginLeft: "1rem",}}>{fil.dimension.name}</span>
         <select name = "filteroper" value = {this.state.filter[i].operator} onChange = {(e) =>handleFilter('filoper',i,e)}>{this.Filter.map(fil => <option value= {fil}>{fil}</option>)}</select>
         <input type="string" placeholder= "insert a string" value = {this.state.filter[i].values? this.state.filter[i].values[0]: ""} onChange={(e) =>handleFilter('values',i,e)}></input>
         </> )}





          {this.renderSwitch(this.state.chart,resultSet)}
          <br/><br/>




           
      </>
         );
       }}
     />
   );
 }
}

export default Chart;