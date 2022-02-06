async function getContext(token) {
  // if (token) {
  return {
    token, me: { email: 'a@a.com', name: 'a' }
  }

  // const { userId } = await jwt.verify(token, process.env.JWT_SECRET)
  // const user = await User.findById(userId)
  // return user
  // }
  // return null
}

export default getContext
