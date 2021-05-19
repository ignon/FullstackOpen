import calculateExercises from './calculateExercises';

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


try {
  const { hours, target } = parseArguments(process.argv);
  
  const report = calculateExercises(hours, target);
  console.log(JSON.stringify(report, null, 4));
}
catch(e) {
  console.log((e as Error).message);
}