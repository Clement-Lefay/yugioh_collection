import React from "react"
import { Link, graphql } from "gatsby"

import "react-tabulator/lib/styles.css" // required styles
import "react-tabulator/lib/css/tabulator.min.css" // theme
import { ReactTabulator } from "react-tabulator"

import Layout from "../components/layout"
import SEO from "../components/seo"

const columns = [
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

const Collection = ({ data }) => {
  return (
    <Layout>
      <SEO title="collection"></SEO>
      <h1>Toute les cartes de ma collection</h1>
      <br></br>
      <table>
        <tbody>
          {CardIterationDisplay(data)}
          {/* <ReactTabulator
            data={data.dataJson.list}
            columns={columns}
            tooltips={false}
            layout={"fitData"}
            height={"300px"}
          /> */}
        </tbody>
      </table>
      <Link to="/">homepage</Link>
    </Layout>
  )
}

function CardIterationDisplay(data) {
  const cardItemArray = []

  // Sort by category and then by alphabetic order in color
  const cardItemArraySorted = data.dataJson.list.sort(function(a, b) {
    return a.name.localeCompare(b.name)
  })

  cardItemArraySorted.slice(0, 20).forEach(card => {
    cardItemArray.push(
      <tr key={card.cardId}>
        <td style={{ width: "100px" }}>
          <img
            src={card.imageLink}
            alt="http://www.otk-expert.fr/cartes/yugioh/Dos-YGO.jpg"
            width="50%"
            style={{ marginBottom: "0", cursor: "pointer" }}
            onClick={function() {
              window.open(card.imageLink, "_blank")
            }}
          ></img>
        </td>
        {/* <td>categorie</td> */}
        <td width="20%">{card.name}</td>
        <td width="10%">{card.totalQuantity}</td>
        <td width="50%">
          <table style={{ marginBottom: "0" }}>
            <tbody>
              {card.edition.map(ed => (
                <tr key={`${card.cardId}_${ed.editionReference}`}>
                  <td>{ed.quantityInEdition}</td>
                  <td>{ed.edditionName}</td>
                  <td>{ed.editionReference}</td>
                  <td>
                    <table style={{ marginBottom: "0" }}>
                      <tbody>
                        {ed.detailed.map((det, index) => (
                          <tr key={`${det.cardNumber}-${index}`}>
                            <td>{det.cardNumber}</td>
                            <td>{det.language}</td>
                            <td>{det.rarity}</td>
                            <td>{det.state}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    )
  })

  return cardItemArray
}

export const query = graphql`
  query giveMeMyCardsQuery {
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

export default Collection
