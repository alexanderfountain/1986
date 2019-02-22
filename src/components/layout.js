import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header from './header'
import Footer from './footer'
import './layout.css';
import Footercopy from './footercopy';
import PageTransition from 'gatsby-v2-plugin-page-transitions';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div style={{
          overflow: 'hidden',
        }}>
        <PageTransition>
          {children}
        </PageTransition>
          <Footer />
          <Footercopy />
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
