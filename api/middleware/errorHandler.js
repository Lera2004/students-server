module.exports = (err, req, res, next) => {
  console.log('error handler', err)

  const errMsg = err.message ?? `${err}`

  if (errMsg.includes('validation failed')) {
    return res.status(400).json({ error: errMsg });
  } else if (errMsg.includes('not found')) {
    return res.status(404).json({ error: errMsg });
  } else {
    return res.status(500).json({ error: errMsg });
    }
    
};