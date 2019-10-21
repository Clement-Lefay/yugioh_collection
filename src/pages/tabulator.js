import React from "react"
import { Link } from "gatsby"

import "react-tabulator/lib/styles.css" // required styles
import "react-tabulator/lib/css/tabulator.min.css" // theme
import { ReactTabulator } from "react-tabulator"

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

const columns = [
  { title: "Category", field: "category", width: 150 },
  { title: "Image", field: "imageLink", align: "left" },
  { title: "name", field: "name" },
  { title: "Quantity", field: "totalQuantity", align: "center" },
]

const columns2 = [
  {
    title: "Image",
    field: "imageLink",
    formatter: "image",
    formatterParams: {
      height: "150px",
      width: "100px",
    },
    cellClick: function(e, cell) {
      window.open(cell.getRow().getData().imageLink, "_blank")
    },
    width: 100,
  },
  { title: "name", field: "name", align: "center" },
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
    <h1>More detailed</h1>
    <ReactTabulator
      data={data.dataJson.list}
      columns={columns2}
      tooltips={false}
      layout={"fitData"}
      height={"300px"}
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
      }
    }
  }
`

export default TabulatorPage
