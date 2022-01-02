import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description,keywords}) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
            <title>{title}</title>    
        </Helmet> 
    )
}

Meta.defaultProps = {
    title: 'Welcome to the shop',
    keywords: 'mobiles,electronics,shop,shipping,headphones',
    description:'e-shop for selling electronic stuff for good prices!'
}
export default Meta
