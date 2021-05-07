export {};

interface TrainingData {
  target: number
  hours: Array<number>
}

const parseArguments = (args: Array<string>): TrainingData => {
  if (args.length < 3) throw new Error('Not enough arguments');
  
  const target = Number(args[2]);
  const hours = args.slice(3, args.length).map(Number);

  if (isNaN(target)) throw new Error('Target was not a number');
  if (hours.find(isNaN)) throw new Error('All training hours must be numbers');
  
  return { target, hours };
};

interface TrainingReport {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}


export const calculateExercises = (hours: Array<number>, target: number): TrainingReport => {
  
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

try {
  const { hours, target } = parseArguments(process.argv);
  
  console.log(hours, '|', target);
  const report = calculateExercises(hours, target);
  console.log(JSON.stringify(report, null, 4));
}
catch(e) {
  console.log((e as Error).message);
}