import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Paper } from '@material-ui/core'

import { useStore } from '../store'
import '../styles/topsteppers.css'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
  smallMobile: {
    breakpoint: { max: 290, min: 0 },
    items: 2,
  },
}

const TopSteppers = () => {
  const { contest } = useStore()

  return (
    <div style={{ width: '100%', maxWidth: '80ch' }}>
      <div className="topSteppers">
        <div className="homePageHeadline">
          <h2>Contest Top Steppers</h2>
        </div>
        {contest.topSteppers && (
          <Carousel
            responsive={responsive}
            swipeable={true}
            infinite={false}
            autoPlaySpeed={5000}
            autoPlay={false}>
            {contest.topSteppers.map((user, i) => (
              <Paper key={i} className="stepperPaper">
                {/* <img className="topSteppersAvatar" src={user.avatar} alt="" /> */}
                <p>{user.username}</p>
                <p>{user.sum} steps</p>
                <p>{user.teamName}</p>
              </Paper>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  )
}

export default TopSteppers
