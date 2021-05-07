/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
// import { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (isNaN(height)) throw new Error('Height was not a number');
    if (isNaN(weight)) throw new Error('Weight was not a number');

    const bmi = calculateBmi(height, weight);
    res.json({ height, weight, bmi });
  }
  catch(exception) {
    res.status(400).json({ error: (exception as Error).message });
  }
});


app.post('/exercises', (req, res) => {

  const daily: Array<number> = req.body.daily_exercises;

  try {
    if (!daily) throw new Error('parameters missing');
    if (!Array.isArray(daily)) throw new Error('malformatted parameters');

    const daily_exercises = daily.map(Number);
    if (daily_exercises.find(isNaN)) throw new Error('malformatted parameters');

    const target = Number(req.body.target);
    if (!target) throw new Error('parameters missing');
    if (isNaN(target)) throw new Error('malformatted parameters');

    const report = calculateExercises(daily_exercises, target);
    res.json(report);
  }
  catch(e) {
    res.status(400).json({error: e.message});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

