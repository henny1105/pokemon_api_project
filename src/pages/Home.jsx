import React from 'react'
// > router
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/pokemondex">
        <button>이동</button>
      </Link>
    </div>
  )
}

export default Home;
