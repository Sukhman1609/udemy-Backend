const express = require('express');
const router = express.Router();
const Course = require('../model/model'); 
router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q; 
    
  
    const regex = new RegExp(searchTerm, 'i');

    
    const results = await Course.find({ name: regex });

    res.json(results);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/search-results/:id', async (req, res) => {
  const { id } = req.params;
  // Fetch data based on the id and send it back in the response
  // ...
});

module.exports = router;
