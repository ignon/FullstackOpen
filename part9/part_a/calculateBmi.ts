const calculateBmi = (heightCm: number, weightKg: number): string => {
  if (heightCm <= 0) return 'Grow some height and try again';
  if (weightKg < 0) return 'Scientists want to know your location';
  
  const bmi = weightKg / Math.pow(heightCm / 100, 2);

  if (bmi <= 15) return 'Very severely underweight';
  if (bmi <= 16) return 'Severely underweight';
  if (bmi <= 18.5) return 'Underweight';
  if (bmi <= 25) return 'Normal (heavy weight)';
  if (bmi <= 30) return 'Overweight';
  if (bmi <= 35) return 'Obese Class I (moderately obese)';
  if (bmi <= 40) return 'Obese Class II (severely obese)';

  return 'Obese Class III (Very severely obese)';
};

export default calculateBmi;