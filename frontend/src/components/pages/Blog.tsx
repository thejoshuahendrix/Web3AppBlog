import React from 'react'

const Blog = ({isAuth}) => {
    return (
        <div>
            {isAuth? "Your Authed":"Your not logged in"}
        </div>
    )
}

export default Blog
