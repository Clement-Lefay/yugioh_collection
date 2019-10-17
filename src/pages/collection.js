import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Collection = ({ data }) => {
  return (
    <Layout>
      <SEO title="collection"></SEO>
      <h1>il faut bien commencer quelque part</h1>
      <br></br>
      <table>
        <tbody>
          <tr>
            <td>YEAH</td>
          </tr>
          {CardIterationDisplay(data)}
        </tbody>
      </table>
      <Link to="/">homepage</Link>
    </Layout>
  )
}

function CardIterationDisplay(data) {
  const cardItemArray = []

  data.dataJson.list.slice(0, 200).forEach(card => {
    cardItemArray.push(
      <tr key={card.cardId}>
        <td>
          <img
            src={card.imageLink}
            alt="http://www.otk-expert.fr/cartes/yugioh/Dos-YGO.jpg"
            width="100"
            style={{ marginBottom: "0" }}
          ></img>
        </td>
        {/* <td>categorie</td> */}
        <td>{card.name}</td>
        <td>{card.totalQuantity}</td>
        <td>
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
