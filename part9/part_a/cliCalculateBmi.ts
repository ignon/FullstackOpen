import calculateBmi from './calculateBmi';

interface BmiValues {
  heightCm: number;
  weightKg: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  
  const heightCm = Number(args[2]);
  const weightKg = Number(args[3]);
  
  if (isNaN(heightCm)) throw new Error('Height was not a number');
  if (isNaN(weightKg)) throw new Error('Weight was not a number');
  
  return { heightCm, weightKg };
};

try {
  const { heightCm, weightKg } = parseArguments(process.argv);
  
  const bmiType = calculateBmi(heightCm, weightKg);
  console.log(bmiType);
}
catch(e) {
  console.log((e as Error).message);
}

