export {};

interface TrainingReport {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

const calculateExercises = (hours: Array<number>, target: number): TrainingReport => {
  
  const clamp = (num: number, min: number, max: number): number => {
    return Math.min(Math.max(num, min), max);
  };

  const periodLength = hours.length;
  const trainingDays = hours.filter(time => time > 0).length;
  const totalHoursTrained = hours.reduce((sum, hours) => sum + hours);

  const average = totalHoursTrained / periodLength;
  const success = (average >= target);
  const rating = clamp(average / target * 3, 0, 3);

  const ratingDescription = (success)
    ? 'Good job!'
    : 'Welll, at least you tried';


  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

export default calculateExercises;