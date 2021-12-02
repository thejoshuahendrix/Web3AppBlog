import React from 'react'

const Posts = ({ isAuth }) => {
    return (
        <div>
            {isAuth ? "Your Authed" : "Your not logged in"}

        </div>
    )
}

export default Posts
