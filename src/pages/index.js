import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"

import "react-tabulator/lib/styles.css" // required styles
import "react-tabulator/lib/css/tabulator.min.css" // theme
import { ReactTabulator } from "react-tabulator"
import Tabulator from "tabulator-tables" //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css" //import Tabulator stylesheet

import Layout from "../components/layout"
import SEO from "../components/seo"

const TabulatorPage = ({ data }) => {
  const [availableHeigh, setAvailableHeigh] = useState(0)
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
      formatter: function(cell, formatterParams) {
        var cellValue = cell.getValue()
        if (cellValue !== "") {
          const cardCategory = cell.getRow().getData().category
          switch (cardCategory) {
            case "normal":
              cell.getRow().getElement().style.backgroundColor = "yellow"
              break
            case "effet":
              cell.getRow().getElement().style.backgroundColor = "#E2E1E7;"
              break
            case "fusion":
              cell.getRow().getElement().style.backgroundColor = "#CEC3E1"
              break
            case "synchro":
              cell.getRow().getElement().style.backgroundColor = "#E2E1E7;"
              break
            case "xyz":
              cell.getRow().getElement().style.backgroundColor = "#CBCAC8"
              cell.getRow().getElement().style.color = "white"
              break
            case "rituel":
              cell.getRow().getElement().style.backgroundColor = "#9AA8CB"
              break
            case "magie":
              cell.getRow().getElement().style.backgroundColor = "#BBD7D8"
              break
            case "piege":
              cell.getRow().getElement().style.backgroundColor = "#E9D1DE"
              break
            case "pandulum":
              // no card
              break
            case "link":
              // no card
              break
          }

          return cellValue
        } else {
          cell.getRow().getElement().style.backgroundColor = "transparent"
          return cellValue
        }
      },
    },
    { title: "Quantity", field: "totalQuantity", align: "center" },
  ]

  /**
 * Couleur
 * 
 * normal => background-color: yellow;
 * effet => background-color: #E3C5AD;
 * rituel => #9AA8CB
 * fusion => #CEC3E1
 * synchro => background-color: #E2E1E7;
 * xyz => background-color: #CBCAC8;
    color: white;
 * pandulum => background-color: greenyellow;
 * link => background-color: powderblue;
 * magie => background-color: #BBD7D8;
 * piege => background-color: #E9D1DE;
 */

  // set the heigh after the window object is defined
  useEffect(() => {
    // take the availbe height and remove the header and footer
    setAvailableHeigh(window.innerHeight - 86 - 26)
  }, [])

  return (
    <Layout>
      <SEO title="YGO collection" />
      {availableHeigh > 0 && (
        <ReactTabulator
          data={data.dataJson.list}
          columns={columnsCard}
          tooltips={false}
          resizableColumns={false}
          initialSort={[
            { column: "name", dir: "asc" }, //sort by this first
          ]}
          height={availableHeigh}
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
                {
                  title: "Quantity",
                  field: "quantityInEdition",
                  align: "center",
                },
                { title: "Card code", field: "cardNumber" },
                { title: "Language", field: "language" },
                { title: "Rarity", field: "rarity" },
                { title: "Etat", field: "state" },
              ],
            })
          }}
        />
      )}
    </Layout>
  )
}

export const query = graphql`
  query giveMeCollection {
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
