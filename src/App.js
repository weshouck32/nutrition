import React, { useState, useEffect } from "react";

import {Button} from '@material-ui/core';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MUIDataTable from 'mui-datatables';
import $ from 'jquery';

import './App.css';

function App() {
  const [page] = useState(1);
  const [count] = useState(1);
  const [data, setData] = useState([["Loading Data..."]]);

  const APP_ID = process.env.REACT_APP_NUTRIION_API_APP_ID;
  const APP_KEY = process.env.REACT_APP_NUTRIION_API_APP_KEY;

    useEffect(() => {
    //getData();
  });

  const columns = [
      {
        name: "Image",
        options: {
          sort: true,
          customBodyRender: (value) => {
            return (
            <div><img className="App-thumb" alt="" src={value} /></div>
            );
          },


        }
      },
      { name: "brand_name", options: { filter: true, sort: true, } },
      { name: "serving_qty", options: { filter: true, sort: true, } },
      { name: "serving_unit", options: { filter: true, sort: true, } },
      { name: "serving_weight_grams", options: { filter: true, sort: true, } },
      { name: "nf_calories", options: { filter: true, sort: true, } },
      { name: "nf_total_fat", options: { filter: true, sort: true, } },
      { name: "nf_saturated_fat", options: { filter: true, sort: true, } },
      { name: "nf_cholesterol", options: { filter: true, sort: true, } },
      { name: "nf_sodium", options: { filter: true, sort: true, } },
      { name: "nf_total_carbohydrate", options: { filter: true, sort: true, } },
      { name: "nf_dietary_fiber", options: { filter: true, sort: true, } },
      { name: "nf_sugars", options: { filter: true, sort: true, } },
      { name: "nf_protein", options: { filter: true, sort: true, } },
      { name: "nf_potassium", options: { filter: true, sort: true, } },
    ];

  //const changePage = (page) => {
//getData(page);

//getData2(page);
//setPage(page);
// this.xhrRequest(http://localhost:3000/api/musers/${page}).then((res) => {
// this.setState({
// isLoading: false,
// page: page,
// data: res.data,
// count: res.total,
// });
// });
//};

  const options = {
    filter: true,
    filterType: "checkbox",
    responsive: "stacked",
    serverSide: true,
    count: count,
    page: page,
    searchBox: true,
    pagination: {
    next: "Next Page",
    previous: "Previous Page",
    rowsPerPage: "Rows per page:",
    displayRows: "off",
    },
    onTableChange: (action, tableState) => {
    console.log(action, tableState);
    // a developer could react to change on an action basis or
    // examine the state as a whole and do whatever they want

      //switch (action) {
      //  case "changePage":
      //    changePage(tableState.page);
      //    alert(page);
      //    break;
    //  }
    },
  };

  /*
  const options = {
  filterType: 'checkbox',
  serverSide: true,
  onTableChange: (action, tableState) => {
    this.xhrRequest('/getdata.js?id=1', result => {
      this.setState({ data: result });
    });
  }
};
*/

var rows = [];

function getNutirtionData(nix_item_id) {
  $.ajax({
    url: "https://trackapi.nutritionix.com/v2/search/item",
    type: "GET",
    dataType: 'json',
    headers: { 'x-app-id': APP_ID,
               'x-app-key': APP_KEY
             },
    contentType: 'application/json; charset=utf-8',
    data: { nix_item_id: nix_item_id },
    success: function(nutritiondata) {
      var api_data = [nutritiondata.foods[0].photo.thumb, nutritiondata.foods[0].food_name, nutritiondata.foods[0].serving_qty, nutritiondata.foods[0].serving_unit,
                      nutritiondata.foods[0].serving_weight_grams, nutritiondata.foods[0].nf_calories, nutritiondata.foods[0].nf_total_fat,
                      nutritiondata.foods[0].nf_saturated_fat, nutritiondata.foods[0].nf_cholesterol, nutritiondata.foods[0].nf_sodium, nutritiondata.foods[0].nf_total_carbohydrate,
                      nutritiondata.foods[0].nf_dietary_fiber, nutritiondata.foods[0].nf_sugars, nutritiondata.foods[0].nf_protein, nutritiondata.foods[0].nf_potassium];
      rows.push(api_data);
    }
  });

}

const nutritionSearch = (page = 1) => {
  $.ajax({
    url: "https://trackapi.nutritionix.com/v2/search/instant",
    type: "GET",
    dataType: 'json',
    headers: { 'x-app-id': APP_ID,
               'x-app-key': APP_KEY
             },
    contentType: 'application/json; charset=utf-8',
    data: { query: $("#searchbox").val() },
    success: function(result) {
      rows = [];
      for (var i = 0; i < result.branded.length; i++) {
        getNutirtionData(result.branded[i].nix_item_id);
        //console.log(nutrition_data);
        //var api_data = [result.branded[i].photo.thumb, result.branded[i].brand_name_item_name, result.branded[i].serving_qty, result.branded[i].serving_unit, "serving_weight_grams", result.branded[i].nf_calories, "nf_total_fat",
        //                  "nf_saturated_fat", "nf_cholesterol", "nf_sodium", "nf_total_carbohydrate", "nf_dietary_fiber",
        //                  "nf_sugars", "nf_protein", "nf_potassium"];
        //rows.push(api_data);
      }
      setData(rows);
    }
  });
 }

  return (
    <MuiThemeProvider >
    <div className="App">
      <h1>Nutrition Information App</h1>
      <div className="row app-text-left">
        <input id="searchbox" type="text"></input>
          <Button onClick={nutritionSearch}>Search</Button>
      </div>
      <MUIDataTable title={"Nutrition Information"} data={data} columns={columns} options={options} />
    </div>
  </MuiThemeProvider >

  );
}

export default App;
