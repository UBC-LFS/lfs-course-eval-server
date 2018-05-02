import app from './app'
require('dotenv').config()

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)) // eslint-disable-line no-console
