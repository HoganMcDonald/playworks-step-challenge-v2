import React from 'react'

const Avatar = ({ src, size = '3rem', styles }) => {
  return (
    <div
      style={{
        height: size,
        width: size,
        backgroundImage: `url("${src}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '999px',
        ...styles,
      }}
    />
  )
}

export default Avatar
