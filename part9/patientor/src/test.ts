import { Entry } from "./types";

enum EntryType {
  HealthCheck = "HealthCheck",
  Hospital  = "Hospital"
}

interface BaseEntry {
  type: EntryType;
}

interface HealthCheck extends BaseEntry {
  type: EntryType.HealthCheck;
  rating: number;
}

interface Hospital extends BaseEntry {
  type: EntryType.Hospital;
  date: string;
}

type Entry = HealthCheck | Hospital;

const healthCheck: Entry = {
  type: EntryType.HealthCheck,
  rating: 3
};


const hospital: Entry = {
  type: EntryType.Hospital,
  date: '123'
};

// const myEntry = (Math.random() < 0.5) ? hospital : healthCheck;

const initialValue: { entry: Entry } = { entry: healthCheck };

switch(initialValue.entry.type) {
  case EntryType.Hospital:
    console.log('hospital');
    break;

  case EntryType.HealthCheck:
    console.log('health check');
    break;
}


