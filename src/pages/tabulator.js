import React from "react"
import { Link, graphql } from "gatsby"

import "react-tabulator/lib/styles.css" // required styles
import "react-tabulator/lib/css/tabulator.min.css" // theme
import { ReactTabulator } from "react-tabulator"
import Tabulator from "tabulator-tables" //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css" //import Tabulator stylesheet

import Layout from "../components/layout"
import SEO from "../components/seo"

// Exemple
// const columns = [
//   { title: "Name", field: "name", width: 150 },
//   { title: "Age", field: "age", align: "left", formatter: "progress" },
//   { title: "Favourite Color", field: "col" },
//   { title: "Date Of Birth", field: "dob", align: "center" },
//   { title: "Rating", field: "rating", align: "center", formatter: "star" },
//   {
//     title: "Passed?",
//     field: "passed",
//     align: "center",
//     formatter: "tickCross",
//   },
// ]

// var data = [
//   { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
//   { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
//   {
//     id: 3,
//     name: "Christine Lobowski",
//     age: "42",
//     col: "green",
//     dob: "22/05/1982",
//   },
//   {
//     id: 4,
//     name: "Brendon Philips",
//     age: "125",
//     col: "orange",
//     dob: "01/08/1980",
//   },
//   {
//     id: 5,
//     name: "Margret Marmajuke",
//     age: "16",
//     col: "yellow",
//     dob: "31/01/1999",
//   },
// ]

const columnsCard = [
  // {
  //   title: "Image",
  //   field: "imageLink",
  //   formatter: "image",
  //   formatterParams: {
  //     height: "150px",
  //     width: "100px",
  //   },
  //   cellClick: function(e, cell) {
  //     window.open(cell.getRow().getData().imageLink, "_blank")
  //   },
  //   tooltips: function(cell) {
  //     return cell.getRow().getData().imageLink // take a look in the library and try to customize it
  //   },
  //   width: 100,
  // },
  {
    title: "name",
    field: "name",
    align: "center",

    headerFilter: true,
    headerFilterPlaceholder: "Find a card",
    tooltip: "Click to see the image of the card",
    cellClick: function(e, cell) {
      window.open(cell.getRow().getData().imageLink, "_blank")
    },
  },
  { title: "Quantity", field: "totalQuantity", align: "center" },
]

const TabulatorPage = ({ data }) => (
  <Layout>
    <SEO title="Tabulator Page" />
    {/* <h1>Hi Let's try tabulator</h1>
    <ReactTabulator
      data={data.dataJson.list}
      columns={columns}
      tooltips={true}
      layout={"fitData"}
      height={300}
    /> */}
    <ReactTabulator
      data={data.dataJson.list}
      columns={columnsCard}
      tooltips={false}
      resizableColumns={false}
      initialSort={[
        { column: "name", dir: "asc" }, //sort by this first
      ]}
      height={"400px"}
      rowFormatter={row => {
        // documentation: http://tabulator.info/examples/4.0#nested-tables
        //create and style holder elements
        var holderEl = document.createElement("div")
        var tableEl = document.createElement("div")

        holderEl.style.boxSizing = "border-box"
        holderEl.style.padding = "10px 30px 10px 10px"
        holderEl.style.borderTop = "1px solid #333"
        holderEl.style.borderBotom = "1px solid #333"
        holderEl.style.background = "#ddd"

        tableEl.style.border = "1px solid #333"

        holderEl.appendChild(tableEl)

        row.getElement().appendChild(tableEl)

        var subTable = new Tabulator(tableEl, {
          layout: "fitColumns",
          data: row.getData().edition,
          dataTree: true,
          dataTreeStartExpanded: false,
          dataTreeChildField: "detailed",
          // dataTreeElementColumn: "cardNumber",
          columns: [
            { title: "Edition", field: "edditionName" },
            { title: "Reference Edition", field: "editionReference" },
            { title: "Quantity", field: "quantityInEdition", align: "center" },
            { title: "Card code", field: "cardNumber" },
            { title: "Language", field: "language" },
            { title: "Rarity", field: "rarity" },
            { title: "State", field: "state" },
          ],
        })
      }}
    />
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
  query giveMeExample {
    dataJson {
      list {
        cardId
        category
        imageLink
        name
        totalQuantity
        edition {
          edditionName
          quantityInEdition
          editionReference
          detailed {
            cardNumber
            language
            rarity
            state
          }
        }
      }
    }
  }
`

export default TabulatorPage
